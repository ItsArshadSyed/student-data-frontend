import { api, Course } from "@/lib/api";

function Th({children}:{children:React.ReactNode}){return <th className="text-left p-2 text-sm font-medium">{children}</th>}
function Td({children}:{children:React.ReactNode}){return <td className="p-2 text-sm">{children}</td>}

export default async function CoursesPage() {
  const { items } = await api.courses();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded">
        <thead className="bg-gray-50">
          <tr>
            <Th>Course Name</Th><Th>Course Id</Th><Th>Credit Units</Th><Th>Student Grade</Th><Th>Grade Points</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((c: Course) => (
            <tr key={c.courseId} className="border-t">
              <Td>{c.courseName}</Td><Td>{c.courseId}</Td><Td>{c.creditUnits}</Td>
              <Td>{c.letterGrade ?? "-"}</Td><Td>{c.gradePoints ?? "-"}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}