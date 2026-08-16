import type { Metadata } from "next";
import { TurkishCoursePage } from "@/components/turkish-course/TurkishCoursePage";
import { courseContent } from "@/data/turkish-course";

export const metadata: Metadata = {
  title: courseContent.fa.metaTitle,
  description: courseContent.fa.metaDescription,
  openGraph: {
    title: courseContent.fa.metaTitle,
    description: courseContent.fa.metaDescription,
    locale: "fa_IR",
    type: "website",
  },
};

export default function TurkishCourseRoute() {
  return <TurkishCoursePage />;
}
