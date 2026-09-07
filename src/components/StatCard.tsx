// a single labelled bubble for key value
export default function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm uppercase text-gray-500 mb-2">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
