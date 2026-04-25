"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Home, Loader2, X, Users, Info, Box } from "lucide-react";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: "", capacity: "2" });

  const fetchRooms = async () => {
    try {
      const res = await fetch("/api/rooms");
      const data = await res.json();
      if (data.success) {
        setRooms(data.data);
      }
    } catch (error) {
      toast.error("Gagal mengambil data kamar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Kamar berhasil dibuat");
        setIsAdding(false);
        setFormData({ name: "", capacity: "2" });
        fetchRooms();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Gagal membuat kamar");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
      <p className="text-muted-foreground animate-pulse font-medium">Memuat data kamar...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center bg-card/30 backdrop-blur-md p-6 rounded-[2rem] border border-white/5">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-600">
             <Home size={24} />
           </div>
           <div>
              <h2 className="text-xl font-black tracking-tight">Manajemen Kamar</h2>
              <p className="text-xs text-muted-foreground">Kelola kapasitas dan okupansi kamar asrama.</p>
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
          {isAdding ? <><X size={16} /> Batal</> : <><Plus size={16} /> Tambah Kamar</>}
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-card w-full max-w-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="text-center mb-8">
               <h3 className="text-2xl font-black tracking-tight">Tambah Kamar Baru</h3>
               <p className="text-sm text-muted-foreground mt-1">Gunakan kapasitas standar (2 orang) atau sesuaikan.</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nama / Nomor Kamar</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 bg-background border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
                  placeholder="Contoh: Kamar 101"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Kapasitas (Orang)</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-muted-foreground">
                      <Users size={16} />
                   </div>
                   <input 
                    required
                    type="number" 
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                    className="w-full pl-12 pr-5 py-4 bg-background border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
                    placeholder="2"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
               <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-4 bg-muted text-foreground rounded-2xl font-black text-xs uppercase tracking-widest">Batal</button>
               <button type="submit" className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20">Simpan Kamar</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {rooms.length === 0 ? (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-card/20">
            <div className="flex flex-col items-center gap-4 opacity-30">
               <Home size={48} />
               <p className="text-sm font-black uppercase tracking-widest">Belum Ada Data Kamar</p>
            </div>
          </div>
        ) : (
          rooms.map((room) => {
            const isFull = (room.tenants?.length || 0) >= room.capacity;
            return (
              <div key={room.id} className="bg-card/40 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 shadow-lg group hover:scale-[1.03] hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${!isFull ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    <Home size={28} />
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                    !isFull ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${!isFull ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    {!isFull ? 'Tersedia' : 'Penuh'}
                  </div>
                </div>

                <div className="space-y-1">
                   <h3 className="text-xl font-black tracking-tight text-foreground">{room.name}</h3>
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      <Box size={12} />
                      Kapasitas: {room.capacity} Orang
                   </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
                   <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                      <div className="flex items-center gap-2">
                         <Users size={14} />
                         {room.tenants?.length || 0} Terisi
                      </div>
                      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                         <div 
                           className={`h-full transition-all duration-500 ${isFull ? 'bg-red-500' : 'bg-teal-500'}`}
                           style={{ width: `${Math.min(100, ((room.tenants?.length || 0) / room.capacity) * 100)}%` }}
                         />
                      </div>
                   </div>
                   
                   <button className="w-full py-3 bg-muted/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-teal-600 hover:text-white transition-all">
                      Kelola Kamar
                   </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
