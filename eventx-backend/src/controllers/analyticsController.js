import { StatusCodes } from 'http-status-codes';
import Event from '../models/Event.js';
import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import { toCSV } from '../utils/csvExport.js';

export const summary = async (req, res) => {
  const [events, tickets, revenue, attendees] = await Promise.all([
    Event.countDocuments(),
    Ticket.countDocuments(),
    Ticket.aggregate([{ $group: { _id: null, sum: { $sum: '$pricePaid' } } }]),
    Ticket.distinct('user')
  ]);
  res.status(StatusCodes.OK).json({
    totalEvents: events,
    ticketsSold: tickets,
    revenue: revenue[0]?.sum || 0,
    uniqueAttendees: attendees.length
  });
};

// In your Analytics Controller file

export const demographics = async (req, res) => {
  // 1. The pipeline now fetches 'birthDate' instead of 'age'
  const pipeline = [
    { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'u' } },
    { $unwind: '$u' },
    { $group: {
        _id: null,
        byGender: { $push: '$u.gender' },
        byBirthDate: { $push: '$u.birthDate' }, // Changed from byAge
        byLocation: { $push: { $toLower: '$u.location' } },
        interests: { $push: '$u.interests' }
    }}
  ];

  const agg = await Ticket.aggregate(pipeline);
  const data = agg[0] || {};
  
  // Helper function to count items in an array
  const count = (arr) => arr.reduce((acc, v) => {
    if (!v) return acc;
    acc[v] = (acc[v] || 0) + 1; 
    return acc;
  }, {});

  // 2. The age calculation logic is now in JavaScript
  const ageBuckets = { '0-17':0,'18-24':0,'25-34':0,'35-44':0,'45-54':0,'55+':0 };
  for (const dob of (data.byBirthDate || [])) {
    if (!dob) continue; // Skip if birthDate is not set
    
    // Calculate age from the birthDate
    const age = new Date().getFullYear() - new Date(dob).getFullYear();

    // Add to the correct bucket
    if (age < 18) ageBuckets['0-17']++;
    else if (age < 25) ageBuckets['18-24']++;
    else if (age < 35) ageBuckets['25-34']++;
    else if (age < 45) ageBuckets['35-44']++;
    else if (age < 55) ageBuckets['45-54']++;
    else ageBuckets['55+']++;
  }

  const byGender = count(data.byGender || []);
  const byLocation = count(data.byLocation || []);
  const interestsFlat = (data.interests || []).flat().filter(Boolean);
  const byInterests = count(interestsFlat);

  res.status(StatusCodes.OK).json({ ageBuckets, byGender, byLocation, byInterests });
};

export const perEvent= async (req, res) => {
  try {
    const { id } = req.params;
    const eventId = new mongoose.Types.ObjectId(id);

    // --- 1. Fetch Basic Event Details and Summary Stats ---
    const eventDetailsQuery = Event.findById(eventId).lean();
    const ticketsSoldQuery = Ticket.countDocuments({ event: eventId });
    const revenueQuery = Ticket.aggregate([
      { $match: { event: eventId } },
      { $group: { _id: null, sum: { $sum: '$pricePaid' } } }
    ]);
    const checkedInQuery = Ticket.countDocuments({ event: eventId, checkedIn: true });

    // --- 2. Fetch Raw Demographic Data using the $push method ---
    const demographicPipeline = [
      // Crucial Step: Match tickets for THIS event ONLY
      { $match: { event: eventId } },
      
      // Join with the users collection to get user details
      { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'userDetails' } },
      { $unwind: '$userDetails' },

      // Group everything into a single document with arrays of raw data
      {
        $group: {
          _id: null,
          byGender: { $push: '$userDetails.gender' },
          byLocation: { $push: '$userDetails.location' },
          byBirthDate: { $push: '$userDetails.birthDate' },
          interests: { $push: '$userDetails.interests' },
        }
      }
    ];
    const demographicsQuery = Ticket.aggregate(demographicPipeline);

    // --- 3. Run all queries concurrently ---
    const [
      eventDetails,
      ticketsSold,
      revenueResult,
      checkedIns,
      demographicsResult
    ] = await Promise.all([
      eventDetailsQuery,
      ticketsSoldQuery,
      revenueQuery,
      checkedInQuery,
      demographicsQuery
    ]);

    if (!eventDetails) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Event not found' });
    }

    // --- 4. Process the Demographic Data in JavaScript ---
    const rawData = demographicsResult[0] || {};

    // Helper function to filter, normalize (to lowercase), and count items
    const count = (arr = []) => {
      return arr
        .filter(item => item && typeof item === 'string') // Filter out null/undefined
        .map(item => item.toLowerCase()) // Normalize to lowercase
        .reduce((acc, v) => {
          if (v.trim() === '') return acc; // Ignore empty strings after trimming
          const key = v.charAt(0).toUpperCase() + v.slice(1); // Capitalize for display
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});
    };

    const ageBuckets = { '0-17':0, '18-24':0, '25-34':0, '35-44':0, '45-54':0, '55+':0 };
    for (const dob of (rawData.byBirthDate || [])) {
        if (!dob) continue;
        const age = new Date().getFullYear() - new Date(dob).getFullYear();
        if (age < 18) ageBuckets['0-17']++;
        else if (age < 25) ageBuckets['18-24']++;
        else if (age < 35) ageBuckets['25-34']++;
        else if (age < 45) ageBuckets['35-44']++;
        else if (age < 55) ageBuckets['45-54']++;
        else ageBuckets['55+']++;
    }
    
    // Process each category
    const byGender = count(rawData.byGender);
    const byLocation = count(rawData.byLocation);
    const byInterests = count((rawData.interests || []).flat());


    // --- 5. Send the final, combined response ---
    res.status(StatusCodes.OK).json({
      event: {
        id: eventDetails._id,
        title: eventDetails.title,
        date: eventDetails.date,
        venue: eventDetails.venue
      },
      ticketsSold: ticketsSold,
      revenue: revenueResult[0]?.sum || 0,
      checkedIns: checkedIns,
      demographics: {
        ageBuckets,
        byGender,
        byLocation,
        byInterests,
      }
    });

  } catch (error) {
    console.error("Per-event analytics error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to retrieve event analytics." });
  }
};

export const salesTrend = async (req, res) => {
  try {
    // This pipeline groups tickets by the week they were created
    const pipeline = [
      {
        $group: {
          // Group by the ISO week of the year from the 'createdAt' timestamp
          _id: { $isoWeek: "$createdAt" }, 
          // Sum the price paid for all tickets in that week
          revenue: { $sum: "$pricePaid" }, 
        },
      },
      {
        // Sort the results by week number
        $sort: { "_id": 1 },
      },
      {
        // Format the output to match what the frontend chart expects
        $project: {
          _id: 0, // Exclude the default _id field
          week: { $concat: ["W", { $toString: "$_id" }] }, // Format as "W1", "W2", etc.
          revenue: "$revenue",
        },
      },
      {
        // Limit to the last 12 weeks for a clean chart
        $limit: 12 
      }
    ];

    const weeklySales = await Ticket.aggregate(pipeline);
    
    res.status(StatusCodes.OK).json(weeklySales);

  } catch (error) {
    console.error("Sales trend error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to retrieve sales trend data." });
  }
};

export const exportCSV = async (req, res) => {
  const { type = 'sales' } = req.query;
  if (type === 'events') {
    const rows = (await Event.find().lean()).map(e => ({
      id: e._id, title: e.title, date: e.date.toISOString(), venue: e.venue,
      price: e.price, totalSeats: e.totalSeats, status: e.status, createdAt: e.createdAt.toISOString()
    }));
    const csv = toCSV(rows);
    res.header('Content-Type','text/csv');
    res.attachment('events.csv');
    return res.send(csv);
  } else {
    const rows = (await Ticket.find().populate('event','title').populate('user','email').lean())
      .map(t => ({
        id: t._id, event: t.event?.title, user: t.user?.email, seat: t.seatNumber,
        pricePaid: t.pricePaid, checkedIn: t.checkedIn, createdAt: t.createdAt.toISOString()
      }));
    const csv = toCSV(rows);
    res.header('Content-Type','text/csv');
    res.attachment('sales.csv');
    return res.send(csv);
  }
};
