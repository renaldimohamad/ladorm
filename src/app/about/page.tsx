import type { Metadata } from "next";
import AboutLanding from "./AboutLanding";

export const metadata: Metadata = {
  title: "About LADORM | LADorm",
  description:
    "Discover LADORM, its residents, visual identity, and the story of the Gorontalo Student Dormitory in Jakarta.",
  alternates: {
    canonical: "https://ladorm.vercel.app/about",
  },
};

export default function AboutPage() {
  return <AboutLanding />;
}
