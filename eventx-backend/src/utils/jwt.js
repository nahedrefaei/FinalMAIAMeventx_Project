import jwt from 'jsonwebtoken';

export const signAuthToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '300d'
  });
};

export const signQRToken = (ticketId) => {
  return jwt.sign({ ticketId }, process.env.QR_SECRET, {
    expiresIn: process.env.QR_EXPIRES_IN || '300d'
  });
};

export const verifyQRToken = (token) => {
  return jwt.verify(token, process.env.QR_SECRET);
};
