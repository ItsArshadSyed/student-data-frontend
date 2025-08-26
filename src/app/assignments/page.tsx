import { api, Assignment } from "@/lib/api";

// Safely build a query string from Next.js searchParams (values can be string | string[] | undefined)
function buildQuery(input: { [key: string]: string | string[] | undefined }) {
  const q = new URLSearchParams();
  const keys = ["status", "courseId", "assignmentId"] as const;
  for (const k of keys) {
    const v = input[k];
    if (Array.isArray(v)) {
      for (const item of v) {
        if (typeof item === "string" && item) q.set(k, item);
      }
    } else if (typeof v === "string" && v) {
      q.set(k, v);
    }
  }
  const s = q.toString();
  return s ? `?${s}` : "";
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left p-2 text-sm font-medium border-b-2 border-red-500">
      {children}
    </th>
  );
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="p-2 text-sm">{children}</td>;
}

export default async function AssignmentsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const q = buildQuery(searchParams);
  const { items } = await api.assignments(q);
  return (
    <div className="space-y-4">
      <form className="flex gap-2">
        <select
          name="status"
          defaultValue={(Array.isArray(searchParams.status) ? searchParams.status[0] : searchParams.status) ?? ""}
          className="border rounded p-2 text-sm"
        >
          <option value="">All</option>
          <option>Completed</option>
          <option>Ongoing</option>
        </select>
        <input
          name="courseId"
          placeholder="courseId"
          defaultValue={(Array.isArray(searchParams.courseId) ? searchParams.courseId[0] : searchParams.courseId) ?? ""}
          className="border rounded p-2 text-sm"
        />
        <input
          name="assignmentId"
          placeholder="assignmentId"
          defaultValue={(Array.isArray(searchParams.assignmentId) ? searchParams.assignmentId[0] : searchParams.assignmentId) ?? ""}
          className="border rounded p-2 text-sm"
        />
        <button className="border rounded px-3 text-sm">Apply</button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border rounded border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <Th>Assignment Id</Th>
              <Th>Course Id</Th>
              <Th>Title</Th>
              <Th>Status</Th>
              <Th>Due Date</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((a: Assignment) => (
              <tr key={a.assignmentId} className="border-t">
                <Td>{a.assignmentId}</Td>
                <Td>{a.courseId}</Td>
                <Td>{a.title}</Td>
                <Td>{a.status}</Td>
                <Td>{a.dueDate}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}