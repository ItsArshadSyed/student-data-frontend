export default function DataCard({label, value}:{label:string; value:React.ReactNode}) {
  return (
    <div className="border rounded p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold">{String(value)}</div>
    </div>
  );
}
