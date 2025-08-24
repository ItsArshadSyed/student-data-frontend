import { api } from "@/lib/api";
export default async function CgpaPage() {
  const d = await api.cgpa();
  return (
    <div className="space-y-2">
      <div className="text-xl font-semibold">Current CGPA: {d.cgpa}</div>
      <div className="text-sm text-gray-600">Formula: {d.formula}</div>
      <div className="text-sm text-gray-600">Weighted Sum: {d.sumWeighted} | Credits: {d.sumCredits}</div>
    </div>
  );
}