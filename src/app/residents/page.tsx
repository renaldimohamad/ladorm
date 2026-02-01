"use client";

import { residents } from "@/utils/residents";
import Link from "next/link";

export default function ResidentsPage() {
  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {residents.map((r) => (
        <Link
          key={r.id}
          href={`/residents/${r.id}`}
          className="rounded-2xl shadow-md p-4 text-center hover:shadow-lg transition"
        >
          <img
            src={r.photo}
            alt={r.name}
            className="w-24 h-24 mx-auto rounded-full mb-3"
          />
          <h2 className="font-bold text-lg">{r.name}</h2>
          <p className="text-sm">
            {r.major} - {r.university}
          </p>
          <p className="text-gray-500 text-sm">Asal: {r.from}</p>
        </Link>
      ))}
    </div>
  );
}
