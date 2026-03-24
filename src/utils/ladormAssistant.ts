import { residents } from "@/utils/residents";

export function handleQuestion(question: string) {
  const q = normalize(question);

  // Greeting
  if (isGreeting(q)) {
    return "Halo 👋 Aku LADorm Assistant. Kamu bisa tanya soal statistik, jurusan, asal daerah, atau kombinasi seperti 'alumni hukum dari Boalemo'.";
  }

  // ===== Extract Filters =====
  const status = extractStatus(q);
  const major = extractMajor(q);
  const origin = extractOrigin(q);
  const university = extractUniversity(q);

  // ===== Extract Intent =====
  const wantsTop = q.includes("terbanyak") || q.includes("top");
  const wantsLongest = q.includes("paling lama") || q.includes("terlama");
  const wantsProductive = q.includes("produktif") || q.includes("berprestasi");
  const wantsCount =
    q.includes("berapa") || q.includes("jumlah") || q.includes("total");

  // ===== Apply Base Filter =====
  let result = [...residents];

  if (status) result = result.filter((r) => r.status === status);
  if (major)
    result = result.filter((r) => r.major.toLowerCase().includes(major));
  if (origin)
    result = result.filter((r) => r.from.toLowerCase().includes(origin));
  if (university)
    result = result.filter((r) =>
      r.university.toLowerCase().includes(university),
    );

  // ===== Ranking / Insight Mode =====
  if (wantsLongest) return getLongest(result);
  if (wantsProductive) return getMostProductive(result);
  if (wantsTop && q.includes("jurusan")) return getTopMajors();
  if (wantsTop && q.includes("kampus")) return getTopUniversities();
  if (wantsCount)
    return buildCount(result, { status, major, origin, university });

  // ===== If filtered list exists =====
  if (result.length) {
    return buildListResponse(result, { status, major, origin });
  }

  return randomFallback();
}

/* ================= UTILITIES ================= */

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function extractStatus(q: string) {
  if (q.includes("alumni")) return "alumni";
  if (q.includes("aktif")) return "active";
  return null;
}

function extractMajor(q: string) {
  const found = residents.find((r) => q.includes(r.major.toLowerCase()));
  return found ? found.major.toLowerCase() : null;
}

function extractOrigin(q: string) {
  const found = residents.find((r) => q.includes(r.from.toLowerCase()));
  return found ? found.from.toLowerCase() : null;
}

function extractUniversity(q: string) {
  const found = residents.find((r) => q.includes(r.university.toLowerCase()));
  return found ? found.university.toLowerCase() : null;
}

/* ================= RESPONSE BUILDERS ================= */

function buildCount(list: typeof residents, filters: any) {
  return `📊 Ditemukan ${list.length} penghuni yang sesuai dengan kriteria kamu.`;
}

function buildListResponse(list: typeof residents, filters: any) {
  const preview = list.slice(0, 10);

  return `
🔎 Ditemukan ${list.length} penghuni:

${preview.map((r) => `• ${r.name} (${r.major}, ${r.university})`).join("\n")}
`;
}

function getLongest(list: typeof residents) {
  const withYear = list.filter((r) => r.joinedYear);
  if (!withYear.length) return "Belum ada data tahun bergabung.";

  const sorted = [...withYear].sort(
    (a, b) => (a.joinedYear ?? 9999) - (b.joinedYear ?? 9999),
  );

  const top = sorted[0];
  return `🏆 Penghuni paling lama adalah ${top.name} (sejak ${top.joinedYear}).`;
}

function getMostProductive(list: typeof residents) {
  const sorted = [...list].sort(
    (a, b) =>
      (b.about?.achievements?.length ?? 0) -
      (a.about?.achievements?.length ?? 0),
  );

  const top = sorted[0];
  const total = top?.about?.achievements?.length ?? 0;

  if (!total) return "Belum ada data prestasi yang tersedia.";

  return `🌟 Penghuni paling produktif adalah ${top.name} dengan ${total} pencapaian.`;
}

function getTopMajors() {
  const count: Record<string, number> = {};

  residents.forEach((r) => {
    count[r.major] = (count[r.major] || 0) + 1;
  });

  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);

  return `
📚 3 Jurusan Terbanyak:

${sorted
  .slice(0, 3)
  .map(([major, total]) => `• ${major} (${total} orang)`)
  .join("\n")}
`;
}

function getTopUniversities() {
  const count: Record<string, number> = {};

  residents.forEach((r) => {
    count[r.university] = (count[r.university] || 0) + 1;
  });

  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);

  return `
🏫 3 Kampus Terbanyak:

${sorted
  .slice(0, 3)
  .map(([uni, total]) => `• ${uni} (${total} orang)`)
  .join("\n")}
`;
}

function isGreeting(q: string) {
  return ["halo", "hai", "hi", "assalamualaikum"].some((g) => q.includes(g));
}

function randomFallback() {
  const responses = [
    "Hmm 🤔 Aku belum mengerti. Coba tanya seperti: 'alumni hukum dari Boalemo'.",
    "Aku bisa bantu statistik, ranking, atau daftar penghuni tertentu 😊",
    "Coba tanya soal jurusan terbanyak atau siapa paling lama tinggal.",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
