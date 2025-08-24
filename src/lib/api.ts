const RAW_API = process.env.NEXT_PUBLIC_API_BASE;
const API = RAW_API && RAW_API.trim().length > 0 ? RAW_API.trim().replace(/\/+$/,'') : "http://localhost:8000";
export { API };
async function get<T>(p: string): Promise<T> {
  const url = `${API}${p}`;
  try {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      throw new Error(`GET ${url} -> ${r.status} ${r.statusText}${text ? ` :: ${text}` : ""}`);
    }
    return r.json();
  } catch (err:any) {
    console.error("GET failed:", url, err?.message || err);
    throw err;
  }
}
async function patch<T>(p: string, body: unknown): Promise<T> {
  const url = `${API}${p}`;
  try {
    const r = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      throw new Error(`PATCH ${url} -> ${r.status} ${r.statusText}${text ? ` :: ${text}` : ""}`);
    }
    return r.json();
  } catch (err:any) {
    console.error("PATCH failed:", url, err?.message || err);
    throw err;
  }
}
async function post<T>(p: string, body: unknown): Promise<T> {
  const url = `${API}${p}`;
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      throw new Error(`POST ${url} -> ${r.status} ${r.statusText}${text ? ` :: ${text}` : ""}`);
    }
    return r.json();
  } catch (err:any) {
    console.error("POST failed:", url, err?.message || err);
    throw err;
  }
}

export type Course = { courseId:string; courseName:string; creditUnits:number; letterGrade?:string; gradePoints?:number };
export type Assignment = { assignmentId:string; courseId:string; title:string; status:"Completed"|"Ongoing"; dueDate:string };
export type Cgpa = { cgpa:number; sumWeighted:number; sumCredits:number; formula:string };
export type Dashboard = {
  totalCourses:number; completedAssignments:number; ongoingAssignments:number;
  currentCgpa:number; upcomingDueCount:number; nextDue?: Assignment|null
};
export type Profile = { studentId:string; name:string; email:string; phone?:string; semester?:string };

export const api = {
  dashboard: () => get<Dashboard>("/dashboard"),
  courses: () => get<{items: Course[]; total: number}>("/courses"),
  cgpa: () => get<Cgpa>("/cgpa"),
  assignments: (q="") => get<{items: Assignment[]; total: number}>(`/assignments${q}`),
  profile: () => get<Profile>("/profile"),
  saveProfile: (body: Partial<Profile>) => patch<Profile>("/profile", body),
  changePassword: (body: {currentPassword:string; newPassword:string}) =>
    post<{ok: boolean}>("/auth/change-password", body),
};