export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import {
  Users,
  Home,
  FileText,
  CreditCard,
  ArrowUpRight,
  TrendingUp,
  Clock,
  LayoutDashboard,
  Box,
  Inbox,
  BarChart3,
  PieChart,
  Activity,
  DollarSign
} from "lucide-react";
import Link from "next/link";

async function getStats() {
  try {
    const [
      registrationsCount,
      rooms,
      tenantsCount,
      unpaidPaymentsCount,
      latestRegistrations,
      allPayments
    ] = await Promise.all([
      prisma.registration.count(),
      prisma.room.findMany({ include: { tenants: true } }),
      prisma.tenant.count(),
      prisma.payment.count({ where: { status: "unpaid" } }),
      prisma.registration.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.payment.findMany({ select: { amount: true, status: true } })
    ]);

    const totalCapacity = rooms.reduce((acc, room) => acc + room.capacity, 0);

    // Room Distribution Analysis
    const emptyRooms = rooms.filter(r => r.tenants.length === 0).length;
    const fullyOccupiedRooms = rooms.filter(r => r.tenants.length >= r.capacity).length;
    const partiallyOccupiedRooms = rooms.length - emptyRooms - fullyOccupiedRooms;

    // Financial Analysis
    const totalUnpaidRevenue = allPayments
      .filter(p => p.status === 'unpaid')
      .reduce((acc, p) => acc + p.amount, 0);
    const totalPaidRevenue = allPayments
      .filter(p => p.status === 'paid')
      .reduce((acc, p) => acc + p.amount, 0);

    return {
      registrationsCount,
      totalRooms: rooms.length,
      tenantsCount,
      unpaidPaymentsCount,
      latestRegistrations,
      totalCapacity,
      occupancyRate: totalCapacity > 0 ? (tenantsCount / totalCapacity) * 100 : 0,
      distribution: {
        empty: emptyRooms,
        partial: partiallyOccupiedRooms,
        full: fullyOccupiedRooms
      },
      finance: {
        unpaid: totalUnpaidRevenue,
        paid: totalPaidRevenue
      }
    };
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return {
      registrationsCount: 0,
      totalRooms: 0,
      tenantsCount: 0,
      unpaidPaymentsCount: 0,
      latestRegistrations: [],
      totalCapacity: 0,
      occupancyRate: 0,
      distribution: { empty: 0, partial: 0, full: 0 },
      finance: { unpaid: 0, paid: 0 }
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    { name: "Total Pendaftar", value: stats.registrationsCount, icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { name: "Total Kamar", value: stats.totalRooms, icon: Home, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { name: "Penghuni Aktif", value: stats.tenantsCount, icon: Users, color: "text-teal-500", bg: "bg-teal-500/10", border: "border-teal-500/20" },
    { name: "Tagihan Pending", value: stats.unpaidPaymentsCount, icon: CreditCard, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inventory Analytics */}
        <div className="bg-card/30 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <div className="flex items-center gap-2 text-indigo-500 mb-1">
                <PieChart size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Status Inventori</span>
              </div>
              <h3 className="text-xl font-black tracking-tight text-foreground italic uppercase">Distribusi <span className="text-indigo-500">Kamar</span></h3>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
              <Activity size={18} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center justify-between group hover:bg-white/[0.05] transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                  <Home size={20} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Kamar Kosong</div>
                  <div className="text-xl font-black text-foreground italic">Unit Tersedia</div>
                </div>
              </div>
              <div className="text-3xl font-black text-emerald-500">{stats.distribution.empty}</div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center justify-between group hover:bg-white/[0.05] transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                  <Users size={20} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Terisi Sebagian</div>
                  <div className="text-xl font-black text-foreground italic">Slot Tersedia</div>
                </div>
              </div>
              <div className="text-3xl font-black text-amber-500">{stats.distribution.partial}</div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center justify-between group hover:bg-white/[0.05] transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center border border-red-500/20">
                  <Box size={20} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Kamar Penuh</div>
                  <div className="text-xl font-black text-foreground italic">Tidak Ada Slot</div>
                </div>
              </div>
              <div className="text-3xl font-black text-red-500">{stats.distribution.full}</div>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="bg-card/30 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <div className="flex items-center gap-2 text-emerald-500 mb-1">
                <BarChart3 size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Buku Besar Premium</span>
              </div>
              <h3 className="text-xl font-black tracking-tight text-foreground italic uppercase">Nadi <span className="text-emerald-500">Pendapatan</span></h3>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
              <DollarSign size={18} />
            </div>
          </div>

          <div className="flex-1 space-y-6 flex flex-col justify-center">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Pendapatan Lunas</div>
                <div className="text-2xl font-black text-foreground italic tracking-tighter">Rp {stats.finance.paid.toLocaleString('id-ID')}</div>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-1000 ease-out"
                  style={{ width: `${(stats.finance.paid / (stats.finance.paid + stats.finance.unpaid || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <div className="text-[10px] font-black uppercase tracking-widest text-amber-500">Tunggakan Pending</div>
                <div className="text-2xl font-black text-foreground italic tracking-tighter">Rp {stats.finance.unpaid.toLocaleString('id-ID')}</div>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-1000 ease-out opacity-50"
                  style={{ width: `${(stats.finance.unpaid / (stats.finance.paid + stats.finance.unpaid || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl mt-4">
              <div className="text-[9px] font-black uppercase tracking-widest text-emerald-500/60 mb-1">Total Target Pendapatan</div>
              <div className="text-3xl font-black text-foreground italic tracking-tighter">Rp {(stats.finance.paid + stats.finance.unpaid).toLocaleString('id-ID')}</div>
            </div>
          </div>
        </div>

        {/* Occupancy Analytics */}
        <div className="bg-card/30 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <div className="flex items-center gap-2 text-purple-500 mb-1">
                <LayoutDashboard size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Metrik Utilitas</span>
              </div>
              <h3 className="text-xl font-black tracking-tight text-foreground italic uppercase">Okupansi <span className="text-purple-500">Kamar</span></h3>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
              <Home size={18} />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-8 justify-center py-4">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="relative w-40 h-40 mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                  <circle
                    cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * stats.occupancyRate) / 100}
                    className="text-purple-500 transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black italic tracking-tighter text-foreground">{Math.round(stats.occupancyRate)}%</span>
                  <span className="text-[8px] font-black uppercase text-muted-foreground leading-none">Terisi</span>
                </div>
              </div>
              <p className="text-xs font-bold text-muted-foreground max-w-[200px]">Data mencakup seluruh unit kamar yang aktif dalam sistem Asrama.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white/5 rounded-3xl border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Box size={14} className="text-purple-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Total Slot</span>
                </div>
                <div className="text-2xl font-black italic text-foreground tracking-tighter">{stats.totalCapacity}</div>
                <div className="text-[9px] font-bold text-muted-foreground/50 uppercase">Kapasitas tersedia</div>
              </div>
              <div className="p-5 bg-white/5 rounded-3xl border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Users size={14} className="text-teal-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Terisi</span>
                </div>
                <div className="text-2xl font-black italic text-foreground tracking-tighter">{stats.tenantsCount}</div>
                <div className="text-[9px] font-bold text-muted-foreground/50 uppercase">Penghuni Aktif</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Registrations Table */}
        <div className="bg-card/30 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <div className="flex items-center gap-2 text-teal-500 mb-1">
                <Clock size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Feed Real-time</span>
              </div>
              <h3 className="text-xl font-black tracking-tight text-foreground italic uppercase">Pendaftaran <span className="text-teal-500">Terbaru</span></h3>
            </div>
            <Link href="/admin/registrations" className="px-5 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-teal-600 hover:text-white transition-all shadow-lg active:scale-95">Lihat Semua</Link>
          </div>

          <div className="flex-1 overflow-hidden">
            {stats.latestRegistrations.length === 0 ? (
              <div className="h-full min-h-[280px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2rem] opacity-20 gap-3">
                <Inbox className="w-10 h-10" />
                <p className="text-[10px] font-black uppercase tracking-widest">Belum Ada Pendaftaran</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.latestRegistrations.map((reg) => (
                  <div key={reg.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                        <span className="text-teal-500 font-black text-xs">{reg.fullName.substring(0, 2).toUpperCase()}</span>
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-bold text-foreground text-sm tracking-tight">{reg.fullName}</div>
                        <div className="text-[10px] font-medium text-muted-foreground">{reg.university || "Klien Umum"}</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${reg.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      reg.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                      {reg.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
