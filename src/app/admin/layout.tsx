"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Home,
  FileText,
  CreditCard,
  LogOut,
  Menu,
  X,
  LayoutDashboard
} from "lucide-react";
import { useEffect, useState } from "react";
import { jakarta } from "@/styles/font";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Pendaftaran", href: "/admin/registrations", icon: FileText },
  { name: "Manajemen Kamar", href: "/admin/rooms", icon: Home },
  { name: "Data Penghuni", href: "/admin/tenants", icon: Users },
  { name: "Tagihan & Bayar", href: "/admin/payments", icon: CreditCard },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; username: string } | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage) {
      fetch('/api/auth/me')
        .then(res => res.json())
        .then(data => {
          if (data.user) setUser(data.user);
        })
        .catch(() => { });
    }
  }, [isLoginPage]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Sampai jumpa kembali!');
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      toast.error('Gagal keluar sistem');
    } finally {
      setShowLogoutModal(false);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className={`${jakarta.className} min-h-screen bg-[#F8FAFC] dark:bg-[#0B1114] flex text-foreground`}>
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLogoutModal(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-card border border-border p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center"
          >
            <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-red-500">
              <LogOut size={40} />
            </div>
            <h3 className="text-2xl font-black mb-2">Keluar Sistem?</h3>
            <p className="text-muted-foreground text-sm font-medium mb-8 leading-relaxed">
              Anda akan mengakhiri sesi admin saat ini. Pastikan semua perubahan telah tersimpan.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-4 rounded-2xl bg-muted font-black text-xs uppercase tracking-widest hover:bg-muted/80 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-4 rounded-2xl bg-red-500 text-white font-black text-xs uppercase tracking-widest hover:bg-red-600 shadow-lg shadow-red-500/20 active:scale-95 transition-all"
              >
                Keluar
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-white dark:bg-card border-r border-border shrink-0 h-screen sticky top-0 shadow-sm z-50">
        <div className="p-8 border-b border-border flex items-center justify-center">
          <Image
            src="/images/Visual Idententy - Remake Logo Ladorm 2.webp"
            alt="LADorm Admin"
            width={140}
            height={40}
            className="object-contain"
          />
        </div>

        <div className="px-6 py-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-4 px-4">Menu Utama</p>
          <nav className="space-y-1.5">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
                    ? "bg-teal-600 text-white shadow-xl shadow-teal-600/30"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-teal-600"
                    }`}
                >
                  <Icon size={20} className={`${isActive ? 'scale-110' : 'group-hover:scale-110 transition-transform'}`} />
                  <span className={`text-sm font-bold tracking-tight ${isActive ? 'opacity-100' : 'opacity-80'}`}>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-border space-y-4">
          <div className="bg-muted/30 p-4 rounded-2xl border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center font-black text-white text-xs shadow-lg">
                {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
              </div>
              <div>
                <p className="text-xs font-black uppercase text-foreground truncate max-w-[120px]">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-muted-foreground font-medium truncate max-w-[120px]">@{user?.username || 'admin'}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-red-500 transition-all bg-muted/20 rounded-xl hover:bg-red-500/10 active:scale-95"
          >
            <LogOut size={14} />
            <span>Keluar Sistem</span>
          </button>

        </div>
      </aside>

      <div className="flex-grow flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-card/80 backdrop-blur-xl border-b border-border p-4 flex items-center justify-between sticky top-0 z-[60] shadow-sm">
          <div className="flex items-center gap-3">
            <Image
              src="/images/Visual Idententy - Remake Logo Ladorm 2.webp"
              alt="LADorm Logo"
              width={100}
              height={30}
              className="object-contain w-24 h-auto"
            />
            <div className="h-4 w-[1px] bg-border mx-1" />
            <span className="text-[10px] font-black uppercase tracking-widest text-teal-600">Admin</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-10 h-10 flex items-center justify-center text-muted-foreground bg-muted/50 rounded-xl active:scale-95 transition-all shadow-inner"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Mobile Navigation overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Mobile Navigation drawer */}
        <nav className={`md:hidden bg-card/95 backdrop-blur-2xl border-b border-border px-6 py-8 space-y-3 fixed top-[73px] left-0 right-0 z-[56] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${isSidebarOpen ? 'translate-y-0 opacity-100 visibility-visible' : '-translate-y-10 opacity-0 visibility-hidden pointer-events-none'}`}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-4 px-2">Menu Navigasi</p>
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${isActive
                  ? "bg-teal-600 text-white shadow-xl shadow-teal-600/30 font-black italic"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-teal-600 font-bold"
                  }`}
              >
                <Icon size={20} className={isActive ? 'scale-110' : ''} />
                <span className="text-sm tracking-tight">{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-6 mt-4 border-t border-border flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-border/50">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center font-black text-white text-xs shadow-lg">
                {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black uppercase text-foreground truncate">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-muted-foreground font-medium truncate">@{user?.username || 'admin'}</p>
              </div>
              <button
                onClick={() => { setIsSidebarOpen(false); setShowLogoutModal(true); }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow p-5 md:p-12 max-w-7xl w-full mx-auto relative">
          <header className="hidden md:flex mb-12 justify-between items-end">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-teal-600 mb-1">
                <div className="w-4 h-[1px] bg-teal-600" />
                Sistem Manajemen Asrama
              </div>
              <h1 className="text-4xl font-black text-foreground tracking-tight">
                {sidebarItems.find(i => i.href === pathname)?.name || "Pusat Kendali"}
              </h1>
              <p className="text-muted-foreground font-medium text-sm">Selamat datang kembali di pusat kendali <span className="text-teal-600 font-bold">Ladorm</span>.</p>
            </div>

            <div className="bg-white dark:bg-card px-6 py-3 rounded-2xl border border-border shadow-sm flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status Server</p>
                <div className="flex items-center justify-end gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-emerald-500 uppercase">Optimal</span>
                </div>
              </div>
              <div className="w-[1px] h-8 bg-border" />
              <div className="text-right font-black text-sm tabular-nums">
                {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </header>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
