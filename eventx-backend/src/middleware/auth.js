import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = (header && header.startsWith('Bearer ')) ? header.split(' ')[1] : req.cookies?.token;
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Auth required' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (e) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  }
  next();
};
