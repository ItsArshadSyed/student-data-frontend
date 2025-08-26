// src/components/Sidebar.tsx
import Link from "next/link";
import { HomeIcon, BookOpenIcon, CalculatorIcon, ClipboardIcon } from "@heroicons/react/24/outline";

type ItemProps = { href: string; icon: React.ElementType; label: string };

const Item = ({ href, icon: Icon, label }: ItemProps) => (
  <Link
    href={href}
    className="group flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
  >
    <Icon className="h-[50px] w-[50px] text-purple-600" />
    <span className="text-[15px] font-medium leading-5">{label}</span>
  </Link>
);

export default function Sidebar() {
  return (
    <aside className="h-full bg-white border-r flex flex-col py-6">
      <div className="px-4 pb-6 text-[25px] font-semibold text-purple-700">Student Portal</div>
      <nav className="flex flex-col divide-y divide-gray-200">
        <Item href="/" icon={HomeIcon} label="Dashboard" />
        <Item href="/courses" icon={BookOpenIcon} label="Courses" />
        <Item href="/cgpa" icon={CalculatorIcon} label="CGPA" />
        <Item href="/assignments" icon={ClipboardIcon} label="Assignments" />
      </nav>
    </aside>
  );
}