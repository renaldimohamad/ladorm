export function generateWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);

  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;
}
