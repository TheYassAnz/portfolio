export default function Button({ label }: { label: string }) {
  return (
    <button className="px-4 py-2 bg-gray-950 text-white rounded-3xl hover:bg-gray-800 hover:cursor-pointer">
      {label}
    </button>
  );
}
