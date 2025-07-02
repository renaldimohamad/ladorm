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

const contactItems: ContactItem[] = [
  {
    icon: <FaMapMarkerAlt />,
    label: "Address",
    value: "Jakarta, Indonesia",
    href: "https://maps.app.goo.gl/C7RHGFq932H6UqxY9",
  },
  {
    icon: <FaPhone />,
    label: "Call Me",
    value: "+62-811-4383-99",
    href: generateWhatsAppLink(
      "62811438399",
      "Halo kak, saya mau tanya tentang Asrama Mahasiswa Gorontalo."
    ),
  },
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "ladormgorontalo@gmail.com",
    href: "mailto:ladormgorontalo@gmailcom",
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
    label: "X (Twitter)",
    value: "twitter.com/ladorm_id",
    href: "https://x.com/Ladorm_Family",
  },
];

export default contactItems;
