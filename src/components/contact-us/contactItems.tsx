import { generateWhatsAppLink } from "@/utils/whatsAppMessage";
import { ReactElement } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
} from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

type ContactItem = {
  icon: ReactElement;
  label: string;
  value: string;
  href?: string;
};

export const getContactItems = (dictionary: any): ContactItem[] => [
  {
    icon: <FaMapMarkerAlt />,
    label: "Address",
    value: "Jakarta, Indonesia",
    href: "https://maps.app.goo.gl/C7RHGFq932H6UqxY9",
  },
  {
    icon: <FaPhone />,
    label: "Call Me",
    value: "+62 895-6301-73507",
    href: generateWhatsAppLink(
      "62895630173507",
      dictionary?.contactUs?.whatsappMessage ||
      "Halo Pengurus LADORM! 👋\n\nSaya tertarik dan ingin bertanya lebih lanjut mengenai fasilitas dan ketersediaan kamar di Asrama Mahasiswa Gorontalo - Lenteng Agung.\n\nMohon infonya ya Kak, terima kasih! ✨"
    ),
  },
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "ladormgorontalo@gmail.com",
    href: "mailto:ladormgorontalo@gmail.com",
  },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    value: "@ladormy_",
    href: "https://www.instagram.com/ladormy_/",
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    value: "linkedin.com/company/ladorm",
    href: "https://www.linkedin.com/in/ladorm-gorontalo-522188372/",
  },
  {
    icon: <FaXTwitter />,
    label: "Twitter",
    value: "twitter.com/ladorm_id",
    href: "https://x.com/Ladorm_Family",
  },
];
