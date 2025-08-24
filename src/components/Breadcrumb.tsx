"use client";
import { usePathname } from "next/navigation";
export default function Breadcrumb() {
  const path = usePathname();
  const map: Record<string,string> = {
    "/": "Home",
    "/courses": "Home / Courses",
    "/cgpa": "Home / CGPA",
    "/assignments": "Home / Assignments",
  };
  return <div className="text-sm text-gray-500">{map[path] ?? "Home"}</div>;
}