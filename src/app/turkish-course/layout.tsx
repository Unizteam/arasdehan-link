import type { ReactNode } from "react";
import { COURSE_LANG_STORAGE_KEY } from "@/data/turkish-course";

export default function TurkishCourseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var l=localStorage.getItem(${JSON.stringify(COURSE_LANG_STORAGE_KEY)});if(l==="tr"){document.documentElement.lang="tr";document.documentElement.dir="ltr"}else{document.documentElement.lang="fa";document.documentElement.dir="rtl"}}catch(e){document.documentElement.lang="fa";document.documentElement.dir="rtl"}`,
        }}
      />
      {children}
    </>
  );
}
