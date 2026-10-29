import type { Metadata } from "next";
import AboutStory from "./AboutStory";

export const metadata: Metadata = {
  title: "Our Story | LADorm",
  description:
    "Read about the Gorontalo Student Dormitory in Lenteng Agung and its story.",
  alternates: {
    canonical: "https://ladorm.vercel.app/about/story",
  },
};

export default function AboutStoryPage() {
  return <AboutStory />;
}
