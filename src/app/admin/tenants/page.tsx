"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, UserPlus, Loader2, X, MapPin, School, Phone, Calendar, Home, Search, BadgeCheck } from "lucide-react";

export default function TenantsPage() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    university: "",
    origin: "",
    status: "mahasiswa",
    roomId: ""
  });

  const fetchData = async () => {
    try {
      const [tenantsRes, roomsRes] = await Promise.all([
        fetch("/api/tenants"),
        fetch("/api/rooms")
      ]);
      const tenantsData = await tenantsRes.json();
      const roomsData = await roomsRes.json();
      
      if (tenantsData.success) setTenants(tenantsData.data);
      if (roomsData.success) setRooms(roomsData.data);
    } catch (error) {
      toast.error("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const pendingTenant = localStorage.getItem('pendingTenant');
    if (pendingTenant) {
      const data = JSON.parse(pendingTenant);
      setFormData({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        university: data.university,
        origin: data.origin,
        status: data.tenantStatus || "mahasiswa",
        roomId: ""
      });
      setIsAdding(true);
      localStorage.removeItem('pendingTenant');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Penghuni berhasil didaftarkan");
        setIsAdding(false);
        setFormData({ fullName: "", phoneNumber: "", university: "", origin: "", status: "mahasiswa", roomId: "" });
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Gagal mendaftarkan penghuni");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
      <p className="text-muted-foreground animate-pulse font-medium">Memuat data penghuni...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center bg-card/30 backdrop-blur-md p-6 rounded-[2rem] border border-white/5">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-600">
             <UserPlus size={24} />
           </div>
           <div>
              <h2 className="text-xl font-black tracking-tight">Data Penghuni</h2>
              <p className="text-xs text-muted-foreground">Kelola informasi mahasiswa yang tinggal di asrama.</p>
           </div>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${
            isAdding 
            ? "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white" 
            : "bg-teal-600 text-white hover:scale-105 shadow-xl shadow-teal-600/20"
          }`}
        >
          {isAdding ? <><X size={16} /> Batal</> : <><Plus size={16} /> Registrasi Baru</>}
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-card w-full max-w-2xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
            <div className="text-center mb-8">
               <h3 className="text-2xl font-black tracking-tight">Registrasi Penghuni Baru</h3>
               <p className="text-sm text-muted-foreground mt-1">Lengkapi data mahasiswa untuk dialokasikan ke kamar.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nama Lengkap</label>
                <input 
                  required
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-5 py-4 bg-background border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nomor WhatsApp</label>
                <input 
                  required
                  type="text" 
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  className="w-full px-5 py-4 bg-background border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Kategori Penghuni</label>
                <select 
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-5 py-4 bg-background border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium appearance-none"
                >
                  <option value="mahasiswa">Mahasiswa</option>
                  <option value="alumni">Alumni</option>
                  <option value="tamu">Tamu</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Asal Daerah</label>
                <input 
                  required
                  type="text" 
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value})}
                  className="w-full px-5 py-4 bg-background border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Universitas / Instansi</label>
                <input 
                  required
                  type="text" 
                  value={formData.university}
                  onChange={(e) => setFormData({...formData, university: e.target.value})}
                  className="w-full px-5 py-4 bg-background border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Alokasi Kamar (Opsional)</label>
                <select 
                  value={formData.roomId}
                  onChange={(e) => setFormData({...formData, roomId: e.target.value})}
                  className="w-full px-5 py-4 bg-background border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium appearance-none"
                >
                  <option value="">Belum Ada Kamar</option>
                  {rooms.filter(r => r.tenants.length < r.capacity).map(room => (
                    <option key={room.id} value={room.id}>{room.name} (Tersedia: {room.capacity - room.tenants.length})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
               <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-4 bg-muted text-foreground rounded-2xl font-black text-xs uppercase tracking-widest">Batal</button>
               <button type="submit" className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20">Daftarkan Penghuni</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card/30 backdrop-blur-md rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Penghuni</th>
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Status & Kampus</th>
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Alokasi Kamar</th>
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Tanggal Gabung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tenants.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-30">
                       <Search size={48} />
                       <p className="text-sm font-black uppercase tracking-widest">Belum Ada Data Penghuni</p>
                    </div>
                  </td>
                </tr>
              ) : (
                tenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-white/[0.02] transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center border border-white/5">
                          <span className="text-teal-600 font-bold text-xs">{tenant.fullName.substring(0, 2).toUpperCase()}</span>
                        </div>
                        <div className="space-y-0.5">
                          <div className="font-bold text-foreground tracking-tight">{tenant.fullName}</div>
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground group-hover:text-teal-500 transition-colors">
                            <Phone size={10} />
                            {tenant.phoneNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-teal-600">
                          <BadgeCheck size={12} />
                          {tenant.status}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <School size={12} className="text-muted-foreground" />
                          {tenant.university}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {tenant.room ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-tighter">
                          <Home size={10} />
                          {tenant.room.name}
                        </div>
                      ) : (
                        <div className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest italic opacity-50 flex items-center gap-2">
                           <X size={10} />
                           Belum Ada Kamar
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 text-xs font-medium text-muted-foreground">
                        <Calendar size={12} />
                        {new Date(tenant.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
