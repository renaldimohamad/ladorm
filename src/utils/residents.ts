export type ResidentStatus = "active" | "alumni";

export interface ResidentSocials {
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  tiktok?: string;
}

export interface ResidentAbout {
  summary?: string;
  experience?: string;
  expertise?: string[];
  achievements?: string[];
}

export interface Resident {
  id: number;
  slug: string;
  name: string;
  photo: string;
  major: string;
  university: string;
  from: string;
  status: "active" | "alumni";
  bio?: string;
  joinedYear?: number; // ✅ Tambahan baru
  about: {
    summary: string;
    experience: string;
    expertise: string[];
    achievements: string[];
  };
  socials?: {
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
  };
  coverPhoto?: string;
}

export const residents: Resident[] = [
  {
    id: 1,
    slug: "fian-naway",
    name: "Fian Naway",
    photo: "/images/Fian Naway.png",
    major: "Teknik Arsitek",
    university: "Pascasarjana Universitas Trisakti",
    from: "Kabupaten Boalemo",
    status: "active",
    bio: "Berfokus pada perancangan arsitektur modern dengan pendekatan estetika, fungsi, dan keberlanjutan.",
    about: {
      summary:
        "Fian merupakan lulusan Teknik Arsitek yang memiliki ketertarikan pada perancangan ruang yang fungsional, estetis, dan berkelanjutan.",

      experience:
        "Selama masa studi dan profesional, Fian terlibat dalam berbagai proyek perancangan bangunan residensial dan komersial. Ia memiliki pengalaman dalam penyusunan konsep desain, visualisasi 3D, serta pengembangan masterplan berbasis kebutuhan pengguna dan lingkungan sekitar.",

      expertise: [
        "Perancangan Arsitektur",
        "Desain Konseptual & Masterplan",
        "Visualisasi 3D (SketchUp, Lumion)",
        "Analisis Tata Ruang & Lingkungan",
      ],

      achievements: [
        "Terlibat dalam proyek desain hunian berkelanjutan",
        "Mengikuti kompetisi desain arsitektur tingkat nasional",
      ],
    },
    socials: {
      instagram: "https://www.instagram.com/fian_naway/",
      // linkedin: "https://linkedin.com/in/username",
      // tiktok: "https://tiktok.com/@username",
    },
    joinedYear: 2021,
    coverPhoto: "/images/Fian Naway.png",
  },
  {
    id: 2,
    slug: "yoanli-mananohas",
    name: "Yoanli Mananohas",
    photo: "/images/yoanli-image.png",
    major: "Alumni - Sarjana Ekonomi ",
    university: "Universitas Trilogi",
    from: "Kabupaten Pohuwato",
    status: "alumni",
    bio: "Alumni ekonomi dengan fokus pada analisis keuangan dan strategi bisnis berbasis data.",
    about: {
      summary:
        "Yoanli adalah lulusan Sarjana Ekonomi yang memiliki fokus pada analisis bisnis, manajemen keuangan, dan strategi pengembangan usaha.",

      experience:
        "Berpengalaman dalam melakukan analisis laporan keuangan, perencanaan anggaran, serta pengembangan strategi bisnis berbasis data. Yoanli juga aktif dalam pengelolaan proyek kewirausahaan dan perencanaan investasi jangka panjang.",

      expertise: [
        "Analisis Keuangan",
        "Perencanaan Bisnis",
        "Manajemen Strategis",
        "Pengelolaan Anggaran",
      ],
      achievements: [
        "Mengelola proyek pengembangan usaha skala lokal",
        "Menyusun strategi perencanaan keuangan untuk UMKM",
      ],
    },
    socials: {
      instagram: "https://www.instagram.com/yowanli/",
      // linkedin: "https://linkedin.com/in/username",
      // tiktok: "https://tiktok.com/@username",
    },
    coverPhoto: "/images/cover_yoan.png",
    joinedYear: 2015,
  },
  {
    id: 3,
    slug: "taufiq-hidayatullah-balu",
    name: "Taufiq Hidayatullah Balu",
    photo: "/images/Taufiq hidyatullah Balu.png",
    major: "Farmasi",
    university: "Universitas UIN Jakarta",
    from: "Padebuoolo",
    status: "alumni",
    bio: "Fokus pada farmasi klinis dan pengelolaan obat sesuai standar regulasi dan keamanan.",
    about: {
      summary:
        "Taufiq merupakan lulusan Farmasi yang memiliki minat pada pengembangan obat, pelayanan kefarmasian, dan edukasi kesehatan masyarakat.",

      experience:
        "Memiliki pengalaman dalam pelayanan farmasi klinis, pengelolaan obat, serta konsultasi penggunaan obat yang tepat dan aman. Ia juga terlibat dalam kegiatan edukasi kesehatan serta distribusi farmasi sesuai standar regulasi.",

      expertise: [
        "Farmasi Klinis",
        "Manajemen Obat",
        "Edukasi Kesehatan",
        "Regulasi & Standar Kefarmasian",
      ],
      achievements: [
        "Terlibat dalam program edukasi kesehatan masyarakat",
        "Berpartisipasi dalam penelitian terkait penggunaan obat rasional",
      ],
    },

    socials: {
      instagram: "https://www.instagram.com/_tfiqbalu/",
      // linkedin: "https://linkedin.com/in/username",
      // tiktok: "https://tiktok.com/@username",
    },
    coverPhoto: "/images/Taufiq hidyatullah Balu.png",
    joinedYear: 2024,
  },
  {
    id: 4,
    slug: "dicky-prasandi-potutu",
    name: "Dicky Prasandi Potutu",
    photo: "/images/Dicky Potutu.png",
    major: "Profesi Apoteker",
    university: "Mahasiswa Farmasi ISTN",
    from: "Boalemo",
    status: "alumni",
    bio: "Fokus pada farmasi klinis dan pengelolaan obat sesuai standar regulasi dan keamanan.",
    about: {
      summary:
        "Taufiq merupakan lulusan Farmasi yang memiliki minat pada pengembangan obat, pelayanan kefarmasian, dan edukasi kesehatan masyarakat.",

      experience:
        "Memiliki pengalaman dalam pelayanan farmasi klinis, pengelolaan obat, serta konsultasi penggunaan obat yang tepat dan aman. Ia juga terlibat dalam kegiatan edukasi kesehatan serta distribusi farmasi sesuai standar regulasi.",

      expertise: [
        "Farmasi Klinis",
        "Manajemen Obat",
        "Edukasi Kesehatan",
        "Regulasi & Standar Kefarmasian",
      ],
      achievements: [
        "Terlibat dalam program edukasi kesehatan masyarakat",
        "Berpartisipasi dalam penelitian terkait penggunaan obat rasional",
      ],
    },
    socials: {
      instagram: "https://www.instagram.com/_tfiqbalu/",
      // linkedin: "https://linkedin.com/in/username",
      // tiktok: "https://tiktok.com/@username",
    },
    coverPhoto: "/images/cover_dicky.png",
    joinedYear: 2024,
  },
  {
    id: 5,
    slug: "adhwa-sobah-al-amin-f-pakaya",
    name: "Adhwa Sobah Al Amin F Pakaya",
    photo: "/images/adhwa_pakaya.png",
    major: "Mahasiswa Sistem Informasi",
    university: "University of Ary Ginanjar",
    from: "Andalas",
    status: "alumni",
    bio: "Fokus pada farmasi klinis dan pengelolaan obat sesuai standar regulasi dan keamanan.",
    about: {
      summary:
        "Taufiq merupakan lulusan Farmasi yang memiliki minat pada pengembangan obat, pelayanan kefarmasian, dan edukasi kesehatan masyarakat.",

      experience:
        "Memiliki pengalaman dalam pelayanan farmasi klinis, pengelolaan obat, serta konsultasi penggunaan obat yang tepat dan aman. Ia juga terlibat dalam kegiatan edukasi kesehatan serta distribusi farmasi sesuai standar regulasi.",

      expertise: [
        "Farmasi Klinis",
        "Manajemen Obat",
        "Edukasi Kesehatan",
        "Regulasi & Standar Kefarmasian",
      ],
      achievements: [
        "Terlibat dalam program edukasi kesehatan masyarakat",
        "Berpartisipasi dalam penelitian terkait penggunaan obat rasional",
      ],
    },
    socials: {
      instagram: "https://www.instagram.com/_tfiqbalu/",
      // linkedin: "https://linkedin.com/in/username",
      // tiktok: "https://tiktok.com/@username",
    },
    coverPhoto: "/images/adhwa_pakaya.png",
    joinedYear: 2024,
  },
];
