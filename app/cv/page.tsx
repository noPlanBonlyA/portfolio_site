import type { Metadata } from "next";

import { CvPage } from "@/components/CvPage";
import { resumeEn } from "@/content/resume";

export const metadata: Metadata = {
  title: "CV",
  description: resumeEn.summary,
  alternates: { canonical: "/cv", languages: { ru: "/cv/ru" } },
};

export default function Page() {
  return <CvPage resume={resumeEn} />;
}
