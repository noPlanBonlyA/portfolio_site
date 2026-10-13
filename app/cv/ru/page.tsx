import type { Metadata } from "next";

import { CvPage } from "@/components/CvPage";
import { resumeRu } from "@/content/resume";

export const metadata: Metadata = {
  title: "Резюме",
  description: resumeRu.summary,
  alternates: { canonical: "/cv/ru", languages: { en: "/cv" } },
};

export default function Page() {
  return <CvPage resume={resumeRu} />;
}
