import Link from "next/link";
import { HomeIcon, BookOpenIcon, CalculatorIcon, ClipboardIcon } from "@heroicons/react/24/outline";

const Item = ({ href, children }: React.PropsWithChildren<{href:string}>) => (
  <Link className="flex items-center gap-2 p-3 hover:bg-gray-100 block" href={href}>{children}</Link>
);

export default function Sidebar() {
  return (
    <nav className="h-full p-2">
      <Item href="/"><HomeIcon className="h-5 w-5"/> Dashboard</Item>
      <Item href="/courses"><BookOpenIcon className="h-5 w-5"/> Courses</Item>
      <Item href="/cgpa"><CalculatorIcon className="h-5 w-5"/> CGPA</Item>
      <Item href="/assignments"><ClipboardIcon className="h-5 w-5"/> Assignments</Item>
    </nav>
  );
}