import { residents } from "@/utils/residents";

export default function ResidentDetail({ params }: { params: { id: string } }) {
  const resident = residents.find((r) => r.id === params.id);

  if (!resident) {
    return <div className="p-6">Data penghuni tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 text-center">
      <img
        src={resident.photo}
        alt={resident.name}
        className="w-32 h-32 mx-auto rounded-full mb-4"
      />
      <h1 className="text-2xl font-bold">{resident.name}</h1>
      <p className="text-gray-600 mb-2">
        {resident.major} - {resident.university}
      </p>
      <p className="text-gray-500 mb-4">Asal: {resident.from}</p>
      <p className="text-sm">{resident.bio}</p>
    </div>
  );
}
