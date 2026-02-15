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
  about?: {
    summary?: string;
    experience?: string;
    expertise?: string[];
    achievements?: string[];
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
    status: "alumni",
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
    major: "Sarjana Ekonomi ",
    university: "Alumni - Universitas Trilogi",
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
    major: "Profesi Apoteker",
    university: "Universitas UIN Jakarta",
    from: "Padebuolo / Kota Timur, Gorontalo",
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
    slug: "adhwa-sobah-al-amin-f-pakaya",
    name: "Adhwa Sobah Al Amin F Pakaya",
    photo: "/images/adhwa_pakaya.png",
    major: "Mahasiswa Sistem Informasi",
    university: "University of Ary Ginanjar",
    from: "Kecamatan Sipatana / Andalas",
    status: "active",
    bio: "Mahasiswa Sistem Informasi yang tertarik pada pengembangan aplikasi, manajemen data, dan transformasi digital berbasis teknologi.",

    about: {
      summary:
        "Adhwa merupakan mahasiswa Sistem Informasi yang memiliki ketertarikan pada pengembangan sistem berbasis web dan analisis data untuk mendukung pengambilan keputusan yang lebih efektif.",

      experience:
        "Selama perkuliahan, Adhwa aktif mengerjakan proyek pengembangan aplikasi berbasis web serta sistem manajemen data sederhana. Ia juga mempelajari perancangan basis data, analisis kebutuhan sistem, dan implementasi solusi digital untuk berbagai kebutuhan organisasi.",

      expertise: [
        "Web Development (Frontend & Backend)",
        "Database Design & Management",
        "System Analysis & Design",
        "Data Processing & Visualization",
      ],

      achievements: [
        "Mengembangkan proyek aplikasi berbasis web untuk tugas akademik",
        "Terlibat dalam tim pengembangan sistem informasi skala kecil",
        "Aktif mengikuti pelatihan dan workshop teknologi informasi",
      ],
    },

    socials: {
      instagram: "https://www.instagram.com/adhwapkaya_/",
    },

    coverPhoto: "/images/adhwa_pakaya.png",
    joinedYear: 2024,
  },
  {
    id: 5,
    slug: "dicky-prasandi-potutu",
    name: "Dicky Prasandi Potutu",
    photo: "/images/Dicky Potutu.png",
    major: "Profesi Apoteker",
    university: "Universitas ISTN",
    from: "Kabupaten / Boalemo",
    status: "alumni",
    bio: "Fokus pada farmasi klinis, pengelolaan dan pendistribusian obat sesuai standar regulasi dan keamanan.",
    about: {
      summary:
        "Lulusan Farmasi dengan minat pada pendistribusian kefarmasian dan pelayanan kefarmasian.",

      experience:
        "Berpengalaman dalam pelayanan farmasi klinis dan pendistribusian kefarmasian",

      expertise: [
        "Pendistribusian kefarmasian ",
        "Farmasi Klinis",
        "Manajemen Obat",
        "Edukasi Kesehatan",
      ],

      achievements: [
        "Program edukasi kesehatan",
        "Penelitian penggunaan obat rasional",
      ],
    },

    socials: {
      instagram: "https://www.instagram.com/dickypotutu_/",
    },

    coverPhoto: "/images/cover_dicky.webp",
    joinedYear: 2024,
  },
  {
    id: 6,
    slug: "ariksal-bahrudin",
    name: "Ariksal Bahrudin",
    photo: "/images/ariksal_bahrudin.png",
    major: "Mahasiswa Ilmu Komunikasi",
    university: "Pascasarjana Universitas Jayabaya",
    from: "Kabupaten Boalemo",
    status: "active",
    bio: "Berfokus pada komunikasi strategis, media digital, dan penguatan citra institusi melalui pendekatan komunikasi yang efektif dan berbasis riset.",
    about: {
      summary:
        "Mahasiswa Pascasarjana Ilmu Komunikasi dengan minat pada komunikasi publik, media digital, dan strategi komunikasi organisasi.",

      experience:
        "Berpengalaman dalam pengelolaan media sosial, penyusunan strategi komunikasi, serta pelaksanaan kampanye komunikasi berbasis data.",

      expertise: [
        "Komunikasi Strategis",
        "Public Relations",
        "Manajemen Media Digital",
        "Analisis Media dan Opini Publik",
      ],

      achievements: [
        "Pengembangan kampanye komunikasi berbasis digital",
        "Riset komunikasi dan analisis opini publik",
      ],
    },
    socials: {
      instagram: "https://www.instagram.com/ariksal_1997/",
    },
    coverPhoto: "/images/cover_ariksal.webp",
    joinedYear: 2024,
  },
  {
    id: 7,
    slug: "fahmi-tebeng",
    name: "Fahmi Tebeng",
    photo: "/images/fahmi_tebeng.png",
    major: "Mahasiswa Pendidikan Agama Islam",
    university: "Universitas NU Indonesia",
    from: "Kabupaten / Pohuwato",
    status: "active",
    bio: "Berfokus pada pengembangan pendidikan Islam yang moderat, pembinaan akhlak, serta penguatan nilai-nilai keislaman dalam dunia pendidikan dan masyarakat.",

    socials: {
      instagram: "https://www.instagram.com/aethera.pissa/",
    },

    coverPhoto: "/images/cover_amy.png",
    joinedYear: 2024,
  },
  {
    id: 8,
    slug: "mohammad-syahrul-abay",
    name: "Mohammad Syahrul Abay",
    photo: "/images/abay_aul.png",
    major: "Teknik Sipil",
    university: "Universitas Bakrie",
    from: " Kota Gorontalo",
    status: "alumni",
    bio: "Profesional Muda dgn latar belakang teknik sipil dgn minat pengembangan kompetensi teknis (Building Information Modeling, Project Management, Enhancing Construction Execution Quality)",
    about: {
      summary:
        "A passionate and driven individual committed to continuous growth and learning. Experienced in coordinating field supervision and project management, with a proven track record in both government and private sector projects.",

      experience: "-",
    },

    socials: {
      instagram: "https://www.instagram.com/syhrlby/",
    },

    coverPhoto: "/images/cover_abay.png",
    joinedYear: 2020,
  },
  {
    id: 9,
    slug: "nurul-alda",
    name: "Nurul Alda",
    photo: "/images/alda_usman.png",
    major: "Ekonomi Pembangunan",
    university: "Universitas Trilogi",
    from: "Kabupaten Bone Bolango",
    status: "active",
    bio: "Tertarik pada bidang administrasi dan event organizer, dengan fokus pada pengelolaan kegiatan dan koordinasi tim.",
    about: {
      summary:
        "Tertarik di bidang administrasi dan event, komunikatif, dan siap berkembang.",

      experience:
        "Berpengalaman dalam kegiatan organisasi dan kepanitiaan, serta membantu pengelolaan administrasi dan koordinasi acara.",

      expertise: [
        "Administrasi",
        "Manajemen Kegiatan",
        "Komunikasi",
        "Microsoft Office",
      ],

      achievements: [
        "Terlibat dalam kepanitiaan acara kampus",
        "Berkontribusi dalam kegiatan sosial/organisasi",
      ],
    },
    socials: {
      instagram: "https://www.instagram.com/aldaanrl/",
    },
    coverPhoto: "/images/cover_alda.jpeg",
    joinedYear: 2022,
  },
  {
    id: 10,
    slug: "nadia-nur-arifah-hulawa",
    name: "Nadia Nur Arifah Hulawa",
    photo: "/images/Nadia Arifah.png",
    major: "Profesi Apoteker",
    university: "Universitas Pancasila",
    from: "Marisa Pohuwato / Dulalowo Gorontalo",
    status: "alumni",
    bio: "Kerja di apotek: wajah harus ramah, stok harus lengkap, dan sabar harus unlimited (sayang nggak bisa di-order).",
    about: {
      summary:
        "Lulusan farmasi yang terus mengembangkan kemampuan di bidang pelayanan dan manajemen obat.",
      experience:
        "Memiliki pengalaman dalam praktik pelayanan di apotek dan rumah sakit, termasuk pelayanan resep, konseling pasien, pemantauan terapi obat (PTO), serta pengelolaan stok dan pengadaan obat. Terbiasa bekerja sesuai standar pelayanan kefarmasian serta berkoordinasi dengan tenaga kesehatan lainnya untuk memastikan terapi yang optimal.",
      expertise: [
        "Farmasi Klinis",
        "Edukasi kesehatan",
        "Manajemen terapi Obat",
        "Pengadaan Obat",
      ],
      achievements: ["Pemantauan Terapi Obat pada RSAL Mintohardjo"],
    },
    socials: {
      instagram: "https://www.instagram.com/ndiarifah/",
    },
    coverPhoto: "/images/cover_nadia.png",
    joinedYear: 2022,
  },
  {
    id: 11,
    slug: "clift-g-f-c-y-lumingas",
    name: "Clift G F C Y Lumingas",
    photo: "/images/clift.png",
    major: "Akuntansi",
    university: "Universitas Nasional",
    from: "Kabupaten Boalemo",
    status: "alumni",
    bio: "Detail adalah kunci, transparansi adalah prinsip, dan laporan keuangan harus selalu balance.",

    about: {
      summary:
        "Lulusan Akuntansi yang memiliki ketertarikan pada pengelolaan keuangan, audit, dan penyusunan laporan keuangan sesuai standar akuntansi yang berlaku.",

      experience:
        "Memiliki pengalaman dalam penyusunan laporan keuangan, pencatatan transaksi, rekonsiliasi bank, serta analisis arus kas. Terbiasa bekerja dengan ketelitian tinggi dalam memastikan akurasi data dan kepatuhan terhadap standar akuntansi dan perpajakan.",

      expertise: [
        "Penyusunan Laporan Keuangan",
        "Analisis Keuangan",
        "Rekonsiliasi & Pembukuan",
        "Perpajakan Dasar",
        "Audit Internal",
      ],
      achievements: [
        "Penyusunan Laporan Keuangan Tahunan Berbasis PSAK",
        "Analisis Kinerja Keuangan untuk Evaluasi Usaha",
      ],
    },
    socials: {
      instagram: "https://www.instagram.com/cliftlumingas_/",
    },
    coverPhoto: "/images/cover_clift.png",
    joinedYear: 2019,
  },
  {
    id: 12,
    slug: "frastika-damopolii",
    name: "Frastika Damopolii",
    photo: "/images/inka.png",
    major: "Psikologi",
    university: "Universitas Al Azhar Indonesia",
    from: "Kabupaten Pohuwato",
    status: "active",
    bio: "Memahami manusia bukan hanya soal teori, tapi tentang empati, observasi, dan komunikasi yang tulus.",

    about: {
      summary:
        "Mahasiswa Psikologi yang memiliki minat pada pengembangan diri, kesehatan mental, serta dinamika perilaku individu dan kelompok.",

      experience:
        "Aktif dalam kegiatan observasi dan asesmen psikologi dasar, diskusi kasus, serta praktik wawancara dan konseling awal. Terlibat dalam kegiatan kampus yang berfokus pada pengembangan karakter, komunikasi interpersonal, dan kerja tim.",

      expertise: [
        "Psikologi Perkembangan",
        "Psikologi Sosial",
        "Observasi & Wawancara Dasar",
        "Komunikasi Interpersonal",
        "Manajemen Emosi",
      ],

      achievements: [
        "Partisipasi dalam Seminar & Workshop Kesehatan Mental",
        "Asisten Observasi Studi Perilaku dalam Kegiatan Akademik",
      ],
    },

    socials: {
      instagram: "https://www.instagram.com/frstka_/",
    },

    coverPhoto: "/images/cover_inka.png",
    joinedYear: 2023,
  },
  {
    id: 13,
    slug: "rahmawati-musa",
    name: "Rahmawati Musa",
    photo: "/images/rati-musa.png",
    major: "Information System Management & Businessi",
    university: "President University",
    from: "Boalemo / Paguyaman",
    status: "alumni",
    bio: "Memiliki ketertarikan pada manajemen sistem informasi dan manajemen data guna mendukung transformasi digital.",

    about: {
      summary:
        "Lulusan IS dengan ketertarikan kuat pada pengelolaan sistem informasi, pengolahan data, dan optimalisasi proses bisnis",

      experience:
        "Berperan sebagai Data Process di berbagai lingkungan kerja dengan tanggung jawab utama memastikan akurasi, konsistensi, dan integritas data operasional",

      expertise: [
        "Data Processing & Data Validation",
        "Information System Management",
        "Microsoft office",
        "Reporting & Documentation",
        "Analytical & Critical Thinking",
        "Detail-Oriented & Problem Solving",
      ],

      achievements: [
        "Berkolaborasi dengan tim operasional dan keuangan dalam meningkatkan efektivitas alur kerja berbasis sistem informasi",
        "Menjaga konsistensi dan integritas database perusahaan dalam volume data yang besar",
      ],
    },

    socials: {
      instagram: "https://www.instagram.com/rattt__/",
    },

    coverPhoto: "/images/cover_rati.png",
    joinedYear: 2024,
  },
  {
    id: 14,
    slug: "hardiansyah-monoarfa",
    name: "Hardiansyah Monoarfa",
    photo: "/images/rolan_photo.png",
    major: "Ekonomi Syariah",
    university: "Universitas PTIQ Jakarta",
    from: "Kabupaten Pohuwato / Marisa",
    status: "active",
    bio: "Berkomitmen memahami sistem ekonomi berbasis prinsip syariah yang adil, transparan, dan berkelanjutan.",

    about: {
      summary:
        "Mahasiswa Ekonomi Syariah yang memiliki minat pada keuangan syariah, manajemen bisnis halal, serta pengelolaan ekonomi yang sesuai dengan prinsip-prinsip Islam.",

      experience:
        "Aktif mempelajari praktik ekonomi dan keuangan syariah, termasuk perbankan syariah, akad muamalah, serta analisis usaha berbasis prinsip halal dan keadilan. Terlibat dalam diskusi akademik serta kegiatan yang mendukung pemahaman sistem ekonomi Islam secara aplikatif.",

      expertise: [
        "Dasar-Dasar Keuangan Syariah",
        "Akad & Fiqih Muamalah",
        "Manajemen Bisnis Syariah",
        "Analisis Kelayakan Usaha",
        "Ekonomi Mikro & Makro Syariah",
      ],

      achievements: [
        "Partisipasi dalam Seminar & Kajian Ekonomi Islam",
        "Analisis Studi Kasus Perbankan Syariah dalam Kegiatan Akademik",
      ],
    },

    socials: {
      instagram: "https://www.instagram.com/hardiansyahmonoarfa_/",
    },

    coverPhoto: "/images/cover_rolan.png",
    joinedYear: 2025,
  },

  // ABAM
  // {
  //   id: 7,
  //   slug: "abam",
  //   name: "Abam",
  //   photo: "/images/ariksal_bahrudin.png",
  //   major: "Profesi Apoteker",
  //   university: "Universitas UMP",
  //   from: "Kota Tengah / Cendana",
  //   status: "alumni",
  //   bio: "Berkomitmen terhadap penggunaan obat yang rasional, peningkatan mutu layanan, serta pengembangan profesional berkelanjutan.",
  //   about: {
  //     summary:
  //       "Lulusan apoteker dengan minat di bidang industrial dan pelayanan kefarmasian.",

  //     experience:
  //       "Berpengalaman dalam pengelolaan media sosial, penyusunan strategi komunikasi, serta pelaksanaan kampanye komunikasi berbasis data.",

  //     expertise: [
  //       "Good manufacturing product",
  //       "Farmasi Klinis",
  //       "Manajemen Obat",
  //       "Edukasi Kesehatan",
  //     ],

  //     achievements: [
  //       "Program edukasi kesehatan",
  //       "Penelitian serta pengembangan bahan alam terhadap suatu penyakit",
  //     ],
  //   },
  //   socials: {
  //     instagram: "https://www.instagram.com/akmlamiruddin/",
  //   },
  //   coverPhoto: "/images/cover_abam.webp",
  //   joinedYear: 2025,
  // },
];
