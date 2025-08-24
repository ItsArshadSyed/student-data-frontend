import { api } from "@/lib/api";
import DataCard from "@/components/DataCard";

export default async function DashboardPage() {
  const d = await api.dashboard();
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <DataCard label="Total Courses" value={d.totalCourses}/>
      <DataCard label="Completed Assignments" value={d.completedAssignments}/>
      <DataCard label="Ongoing Assignments" value={d.ongoingAssignments}/>
      <DataCard label="Current CGPA" value={d.currentCgpa}/>
      <div className="col-span-full border rounded p-4">
        <div className="font-medium mb-2">Upcoming</div>
        {d.nextDue ? (
          <div>{d.nextDue.title} · {d.nextDue.courseId} · due {d.nextDue.dueDate}</div>
        ) : "No upcoming items"}
      </div>
    </div>
  );
}