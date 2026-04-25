export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { 
  Users, 
  Home, 
  FileText, 
  CreditCard,
  ArrowUpRight,
  TrendingUp
} from "lucide-react";

async function getStats() {
  try {
    const [registrations, rooms, tenants, payments] = await Promise.all([
      prisma.registration.count(),
      prisma.room.count(),
      prisma.tenant.count(),
      prisma.payment.count({ where: { status: "unpaid" } }),
    ]);

    return {
      registrations,
      rooms,
      tenants,
      unpaidPayments: payments,
    };
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return { registrations: 0, rooms: 0, tenants: 0, unpaidPayments: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    { name: "Total Pendaftar", value: stats.registrations, icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { name: "Kapasitas Kamar", value: stats.rooms, icon: Home, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { name: "Penghuni Aktif", value: stats.tenants, icon: Users, color: "text-teal-500", bg: "bg-teal-500/10", border: "border-teal-500/20" },
    { name: "Tagihan Pending", value: stats.unpaidPayments, icon: CreditCard, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  ];

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className={`bg-card/40 backdrop-blur-sm p-8 rounded-[2rem] border ${stat.border} shadow-sm group hover:scale-[1.02] transition-all duration-300`}>
            <div className="flex items-center justify-between mb-6">
              <div className={`${stat.bg} p-4 rounded-2xl`}>
                <stat.icon className={stat.color} size={28} />
              </div>
              <div className="p-2 rounded-full bg-muted/20 text-muted-foreground group-hover:text-teal-500 transition-colors">
                 <ArrowUpRight size={18} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.name}</p>
              <h3 className="text-3xl font-black mt-1 text-foreground tabular-nums">{stat.value}</h3>
              <div className="flex items-center gap-1 mt-4 text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">
                <TrendingUp size={12} />
                <span>Terhubung Real-time</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card/30 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 shadow-xl">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="text-xl font-black tracking-tight text-foreground">Pendaftaran Terbaru</h3>
                <p className="text-muted-foreground text-xs mt-1">Daftar calon penghuni yang baru saja masuk.</p>
             </div>
             <button className="text-[10px] font-black uppercase tracking-widest text-teal-600 hover:underline">Lihat Semua</button>
          </div>
          <div className="h-48 flex items-center justify-center border-2 border-dashed border-white/5 rounded-[2rem] text-muted-foreground/30 text-xs uppercase font-black tracking-widest">
             Tabel Ringkasan Segera Hadir
          </div>
        </div>

        <div className="bg-card/30 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 shadow-xl">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="text-xl font-black tracking-tight text-foreground">Okupansi Kamar</h3>
                <p className="text-muted-foreground text-xs mt-1">Analisis ketersediaan kapasitas asrama.</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center">
                 <Home size={18} className="text-muted-foreground" />
             </div>
          </div>
          <div className="h-48 flex items-center justify-center border-2 border-dashed border-white/5 rounded-[2rem] text-muted-foreground/30 text-xs uppercase font-black tracking-widest">
             Grafik Statistik Segera Hadir
          </div>
        </div>
      </div>
    </div>
  );
}
