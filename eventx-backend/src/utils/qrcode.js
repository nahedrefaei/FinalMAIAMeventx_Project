import QRCode from 'qrcode';

export const generateQRCodeDataURL = async (text) => {
  // returns data:image/png;base64,...
  return QRCode.toDataURL(text, { errorCorrectionLevel: 'M', margin: 1, scale: 6 });
};
