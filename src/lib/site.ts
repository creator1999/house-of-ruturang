// ---------------------------------------------------------------------------
// Central brand configuration. Update these once real contact details and
// social handles are confirmed.
// ---------------------------------------------------------------------------

export const site = {
  name: "House of Ruturang",
  brandLine: "House of Ruturang by Rutuja",
  tagline: "Elegance in Every Shade",
  description:
    "Thoughtfully curated sarees, celebrating timeless elegance and every shade of you.",
  instagramHandle: "@houseofruturang",
  instagramUrl: "https://www.instagram.com/houseofruturang/",
  whatsappDisplay: "+91 99605 58963",
  email: "hello@houseofruturang.in", // placeholder — confirm before going live
  location: "India",
};

const WHATSAPP_NUMBER = "919960558963";

/** Build a WhatsApp deep link, optionally pre-filling a message. */
export function whatsappLink(message?: string): string {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${WHATSAPP_NUMBER}${text}`;
}
