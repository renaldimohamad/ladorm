export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  readTime?: string;
  tags?: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    id: "jalan-jalan-puncak-2026",
    slug: "jalan-jalan-spontan-anak-ladorm-ke-puncak",
    title: "Jalan-Jalan Spontan Anak LADORM ke Puncak!",
    excerpt:
      "Berawal dari obrolan santai di asrama, teman-teman LADORM akhirnya benar-benar berangkat ke Puncak untuk menikmati waktu bersama di alam yang sejuk.",
    category: "Kegiatan Asrama",
    date: "15 Juli 2026",
    image: "/images/puncak_ladorm_2.jpg",
    content:
      "Pernah nggak sih ngerasain obrolan iseng yang ujung-ujungnya malah kejadian beneran? Nah, persis kayak gitu cerita jalan-jalan anak-anak LADORM bulan Juli kemarin. Berawal dari sekadar nongkrong santai di asrama dan ngobrolin betapa suntuknya dengan rutinitas harian di Jakarta, tiba-tiba muncul ide, 'Eh, refreshing ke Puncak yuk!' Nggak ada yang namanya kepanitiaan atau agenda yang kaku, ide sederhana ini langsung disambut antusias sama teman-teman dari Gorontalo yang lain. Akhirnya, kami semua sepakat buat berangkat bareng.\n\nPerjalanan kami dimulai dari Stasiun Lenteng Agung. Rasanya seru banget bisa berangkat rame-rame bareng teman seperantauan. Di dalam kereta menuju Stasiun Bogor, suasananya udah kayak mindahin tempat nongkrong aja; penuh candaan dan cerita ngalor-ngidul. Sesampainya di Bogor, petualangan berlanjut dengan nyewa beberapa angkot buat bawa kami semua naik ke arah villa di kawasan Puncak.\n\nNamanya juga ke Puncak pas akhir pekan, udah pasti kami disuguhi kemacetan yang luar biasa. Berjam-jam kejebak macet di dalam angkot yang sempit awalnya lumayan bikin pegal, tapi karena perginya bareng sahabat di asrama, momen yang harusnya nyebelin ini malah jadi bahan ketawaan. Kami nyanyi-nyanyi nggak jelas, ngabisin cemilan bareng, dan saling ledek buat bunuh bosan. Kemacetan yang panjang ini justru jadi salah satu bagian dari cerita lucu yang bakal terus kami kenang.\n\nBegitu sampai di villa, udara sejuk Puncak langsung sukses menyingkirkan semua rasa capek. Suasana di villa benar-benar cair dan penuh kebersamaan. Nggak ada rundown khusus, semuanya ngalir santai gitu aja. Ada teman-teman LADORM yang langsung asyik di dapur nyiapin makan bareng, ada yang main gitar, dan sisanya milih rebahan sambil menikmati angin sejuk. Malamnya, kami semua ngumpul, makan bareng hasil masakan sendiri, dan lanjut ngobrol ngalor-ngidul sampai larut malam.\n\nTentu aja, malam itu nggak lengkap tanpa main Werewolf. Hampir seisi villa ikut main, dan ini asli seru sekalis. Bahkan ada beberapa teman yang sempat nyaris 'diadukan' karena terlalu fokus bermain sampai lupa waktu. Tapi semua itu justru jadi bagian dari nostalgia yang bikin kami tertawa sampai pagi.",
    readTime: "5 menit",
    tags: ["LADORM", "Kegiatan Asrama", "Gorontalo Jakarta"],
  },
  {
    id: "1",
    slug: "buka-puasa-bersama-ramadhan-penuh-berkah",
    title: "Buka Puasa Bersama Ramadhan Penuh Berkah",
    excerpt:
      "Cerita di balik layar keramaian dapur asrama saat mempersiapkan menu buka puasa khas Gorontalo bersama-sama.",
    category: "Sosial & Agama",
    date: "10 April 2025",
    image:
      "https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=2574&auto=format&fit=crop",
    content:
      "Bulan suci Ramadhan membawa cita rasa Gorontalo ke jantung Jakarta. Dapur bersama kami dipenuhi energi saat para mahasiswa menyiapkan 'Binte Biluhuta' dan 'Panada' untuk berbuka puasa bersama. Lebih dari 50 penghuni berkumpul di aula utama untuk membatalkan puasa, memperkuat ikatan persaudaraan yang menjadi ciri khas LADorm. Rasanya benar-benar seperti kembali ke rumah bersama keluarga.",
    readTime: "4 menit",
    tags: ["Ramadhan", "Komunitas", "Kebersamaan"],
  },
  {
    id: "2",
    slug: "pertandingan-futsal-akhir-pekan",
    title: "Pertandingan Futsal Akhir Pekan",
    excerpt:
      "Ajang silaturahmi olahraga mingguan untuk merekatkan solidaritas dan menjaga kesehatan mahasiswa ditengah padatnya jadwal kuliah.",
    category: "Olahraga",
    date: "25 Mei 2025",
    image:
      "https://images.unsplash.com/photo-1536122985607-4fe00b283652?q=80&w=2714&auto=format&fit=crop",
    content:
      "Keringat, tawa, dan kompetisi memenuhi lapangan futsal terdekat Sabtu lalu. Rutinitas olahraga mingguan kami lebih dari sekadar latihan fisik; ini adalah outlet vital untuk melepaskan stres dari tugas universitas. Baik penghuni senior maupun junior tim bergabung dalam turnamen persahabatan, membuktikan bahwa olahraga tetap menjadi bahasa universal terbaik untuk membangun komunitas yang solid.",
    readTime: "4 menit",
    tags: ["Olahraga", "Mahasiswa", "Komunitas"],
  },
  {
    id: "3",
    slug: "kerja-bakti-rutin-lingkungan-asrama",
    title: "Kerja Bakti Rutin Lingkungan Asrama",
    excerpt:
      "Tradisi gotong royong Minggu pagi membersihkan fasilitas umum, memastikan rumah persinggahan kita selalu nyaman dihuni.",
    category: "Gotong Royong",
    date: "12 Juni 2025",
    image:
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2670&auto=format&fit=crop",
    content:
      "Mahasiswa LADorm turun ke jalanan Lenteng Agung untuk proyek pengabdian masyarakat bulanan kami. Kami percaya bahwa menjadi mahasiswa yang baik juga berarti menjadi tetangga yang baik. Berbekal sapu dan kantong sampah, kami bekerja bersama warga setempat untuk membersihkan drainase sekitar dan taman umum. Kegiatan diakhiri dengan sarapan hangat yang disiapkan oleh ketua RT setempat.",
    readTime: "4 menit",
    tags: ["Gotong Royong", "Komunitas", "Lingkungan"],
  },
];

export function getBlogArticleBySlug(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}

export function getBlogArticleById(id: string) {
  return blogArticles.find((article) => article.id === id);
}

export function getBlogArticleSlugs() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export function getBlogArticleCanonicalUrl(
  slugOrId: string,
  baseUrl = "https://ladorm.vercel.app",
) {
  const article =
    getBlogArticleBySlug(slugOrId) || getBlogArticleById(slugOrId);
  const slug = article?.slug ?? slugOrId;
  return `${baseUrl}/blog/${slug}`;
}

export function resolveAbsoluteAssetUrl(
  image: string | undefined,
  baseUrl = "https://ladorm.vercel.app",
) {
  if (!image) {
    return `${baseUrl}/images/LADORM_FORM.webp`;
  }

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  return `${baseUrl}${image.startsWith("/") ? image : `/${image}`}`;
}

export function getDefaultBlogOgImage(baseUrl = "https://ladorm.vercel.app") {
  return `${baseUrl}/images/LADORM_FORM.webp`;
}
