"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";

type Coords = { top: number; right: number };

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Reposition on open, resize, and scroll
  useEffect(() => {
    function update() {
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const top = rect.bottom + 8; // 8px below button
      const right = Math.max(16, window.innerWidth - rect.right - 16); // keep ≥16px margin to viewport right
      setCoords({ top, right });
    }
    if (open) {
      update();
      window.addEventListener("resize", update);
      window.addEventListener("scroll", update, true);
    }
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  // Close on outside click / ESC
  useEffect(() => {
    function onDocDown(e: MouseEvent | TouchEvent) {
      const menu = document.getElementById("profile-menu");
      if (menu && (menu.contains(e.target as Node) || btnRef.current?.contains(e.target as Node))) return;
      setOpen(false);
    }
    function onEsc(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    if (open) {
      document.addEventListener("mousedown", onDocDown);
      document.addEventListener("touchstart", onDocDown);
      document.addEventListener("keydown", onEsc);
    }
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("touchstart", onDocDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const onEditProfile = () => { alert("Edit Personal Info (stub)"); setOpen(false); };
  const onChangePassword = () => { alert("Change Password (stub)"); setOpen(false); };
  const onLogout = () => { alert("Logged out (stub)"); setOpen(false); };

  const menu = open && coords
    ? createPortal(
        <div
          id="profile-menu"
          role="menu"
          style={{ position: "fixed", top: coords.top, right: coords.right, zIndex: 50 }}
          className="w-[min(14rem,calc(100vw-1rem))] rounded-md border bg-white shadow"
        >
          <button onClick={onEditProfile} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" role="menuitem">
            Edit Personal Info
          </button>
          <button onClick={onChangePassword} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" role="menuitem">
            Change Password
          </button>
          <div className="my-1 border-t" />
          <button onClick={onLogout} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" role="menuitem">
            Logout
          </button>
        </div>,
        document.body
      )
    : null;

  return (
    <div className="relative ">
      {/* Profile icon is the trigger (no chevron) */}
      <button
        ref={btnRef}
        onClick={() => setOpen(v => !v)}
        className="rounded-full border p-2 hover:bg-gray-50"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="profile-menu"
        aria-label="Open profile menu"
        type="button"
      >
        {/* <UserCircleIcon className="h-6 w-6 text-gray-700" /> */}
        EDIT PROFILE
      </button>
      <button>
        LOGOUT
      </button>
      {menu}
    </div>
  );
}