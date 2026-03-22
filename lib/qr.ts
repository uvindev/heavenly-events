import QRCode from "qrcode";

export async function generateTicketQR(payload: string): Promise<string> {
  const dataUrl = await QRCode.toDataURL(payload, {
    width: 500,
    margin: 3,
    errorCorrectionLevel: "H",
    color: {
      dark: "#070708",
      light: "#FFFFFF",
    },
  });

  return dataUrl;
}
