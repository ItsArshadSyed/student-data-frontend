import { api, Assignment } from "@/lib/api";

function buildQuery(searchParams: URLSearchParams) {
  const q = new URLSearchParams();
  ["status","courseId","assignmentId"].forEach(k => {
    const v = searchParams.get(k);
    if (v) q.set(k, v);
  });
  const s = q.toString();
  return s ? `?${s}` : "";
}
function Th({children}:{children:React.ReactNode}){return <th className="text-left p-2 text-sm font-medium">{children}</th>}
function Td({children}:{children:React.ReactNode}){return <td className="p-2 text-sm">{children}</td>}

export default async function AssignmentsPage({ searchParams }: { searchParams: Record<string, string> }) {
  const q = buildQuery(new URLSearchParams(searchParams));
  const { items } = await api.assignments(q);
  return (
    <div className="space-y-4">
      <form className="flex gap-2">
        <select name="status" defaultValue={searchParams.status ?? ""} className="border rounded p-2 text-sm">
          <option value="">All</option>
          <option>Completed</option>
          <option>Ongoing</option>
        </select>
        <input name="courseId" placeholder="courseId" defaultValue={searchParams.courseId ?? ""} className="border rounded p-2 text-sm"/>
        <input name="assignmentId" placeholder="assignmentId" defaultValue={searchParams.assignmentId ?? ""} className="border rounded p-2 text-sm"/>
        <button className="border rounded px-3 text-sm">Apply</button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead className="bg-gray-50">
            <tr><Th>Assignment Id</Th><Th>Course Id</Th><Th>Title</Th><Th>Status</Th><Th>Due Date</Th></tr>
          </thead>
          <tbody>
            {items.map((a: Assignment) => (
              <tr key={a.assignmentId} className="border-t">
                <Td>{a.assignmentId}</Td><Td>{a.courseId}</Td><Td>{a.title}</Td><Td>{a.status}</Td><Td>{a.dueDate}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}