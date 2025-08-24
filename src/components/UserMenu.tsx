"use client";
import { useState } from "react";
// Hook up to forms later; for now it satisfies the dropdown requirement.
export default function UserMenu() {
  const [open,setOpen]=useState(false);
  return (
    <div className="relative">
      <button onClick={()=>setOpen(v=>!v)} aria-label="User menu" className="w-8 h-8 rounded-full bg-gray-200"/>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow">
          <button className="w-full text-left px-3 py-2 hover:bg-gray-50">Change Password</button>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-50">Edit Personal Data</button>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-50">Logout</button>
        </div>
      )}
    </div>
  );
}