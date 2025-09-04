import ResponsiveDrawer from "../DashboardScreen/maindashboard";
import { useState } from "react";
import {
  createEventService,
  publishEventService,
} from "../services/authService"; // ⚠️ make sure it's eventService not authService
import { useAuth } from "../Auth/AuthContext";

export default function CreateEvent() {
  const {user} = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    price: 0,
    totalSeats: 10,
    status: "", // 👈 added status
  });

  const [createdEvent, setCreatedEvent] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      const res = await createEventService(form);
      setCreatedEvent(res.data.event);
      alert("Event created!");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating event");
    }
  };

  const handlePublish = async () => {
    if (!createdEvent) {
      alert("Please create an event first!");
      return;
    }
    try {
      const res = await publishEventService(createdEvent._id);
      setCreatedEvent(res.data.event);
      alert("Event published!");
    } catch (err) {
      alert(err.response?.data?.message || "Error publishing event");
    }
  };

  return (
    <ResponsiveDrawer>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Create Event</h2>

        {/* Title */}
        <div>
          <label className="block text-gray-600 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-indigo-300"
            placeholder="Enter event title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-indigo-300"
            placeholder="Enter event description"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-600 font-medium">Date</label>
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Venue */}
        <div>
          <label className="block text-gray-600 font-medium">Venue</label>
          <input
            type="text"
            name="venue"
            value={form.venue}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-indigo-300"
            placeholder="Enter venue"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-600 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Total Seats */}
        <div>
          <label className="block text-gray-600 font-medium">Total Seats</label>
          <input
            type="number"
            name="totalSeats"
            value={form.totalSeats}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-600 font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-indigo-300"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCreate}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Save Event
          </button>

          <button
            onClick={handlePublish}
            disabled={!createdEvent}
            className={`px-4 py-2 rounded-lg transition ${
              createdEvent
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Publish
          </button>
        </div>

        {createdEvent && (
          <div className="mt-4 p-3 border rounded-lg bg-gray-50">
            <p>
              <span className="font-semibold">Created Event:</span>{" "}
              {createdEvent.title} ({createdEvent.status})
            </p>
          </div>
        )}
      </div>
    </ResponsiveDrawer>
  );
}
