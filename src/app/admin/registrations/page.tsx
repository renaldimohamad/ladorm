"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Check, X, Loader2, Clock, User, Phone, School, MapPin,
  History, Inbox, MessageSquare, ChevronDown, Bed, DoorOpen
} from "lucide-react";

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [tenantStatusMap, setTenantStatusMap] = useState<Record<string, string>>({});

  // Assign Room States
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedReg, setSelectedReg] = useState<any>(null);
  const [assigningRoom, setAssigningRoom] = useState(false);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch("/api/registrations");
      const data = await res.json();
      if (data.success) {
        setRegistrations(data.data);
        const initialMap: Record<string, string> = {};
        data.data.forEach((reg: any) => {
          if (reg.status === 'pending') {
            initialMap[reg.id] = reg.tenantStatus || 'mahasiswa';
          }
        });
        setTenantStatusMap(initialMap);
      }
    } catch (error) {
      toast.error("Gagal mengambil data pendaftaran");
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await fetch("/api/rooms");
      const data = await res.json();
      if (data.success) {
        setRooms(data.data.filter((r: any) => r.status === 'available'));
      }
    } catch (error) {
      console.error("Failed to fetch rooms");
    }
  };

  useEffect(() => {
    fetchRegistrations();
    fetchRooms();
  }, []);

  const handleWhatsAppChat = (reg: any, type: 'initial' | 'approve' | 'reject' = 'initial', tenantStatus?: string) => {
    let template = "";

    if (type === 'initial') {
      template = `Halo ${reg.fullName} 👋

Terima kasih sudah mendaftar di Ladorm.

Kami ingin melakukan konfirmasi singkat terkait pendaftaran Anda:

1. Saat ini domisili Anda di mana?
2. Kapan rencana mulai tinggal di Asrama?
3. Apakah Anda mahasiswa aktif?
4. Mohon lampirkan FOTO KTP dan KTM (Kartu Mahasiswa) Anda ya.

Mohon dibalas pesan ini agar kami dapat melanjutkan proses verifikasi 🙏`;
    } else if (type === 'approve') {
      template = `Halo ${reg.fullName} 👋

Selamat! Pendaftaran Anda di Ladorm telah DISETUJUI 🎉
Status Anda: ${tenantStatus?.toUpperCase() || 'PENGHUNI'}

Silakan hubungi kami kembali untuk pengaturan jadwal masuk dan pengambilan kunci. Terima kasih!`;
    } else {
      template = `Halo ${reg.fullName} 👋

Kami memohon maaf, pendaftaran Anda di Ladorm saat ini belum dapat kami setujui. 

Terima kasih atas minat Anda 🙏`;
    }

    let phone = reg.phoneNumber.replace(/[^0-9]/g, '');
    if (phone.startsWith('0')) {
      phone = '62' + phone.slice(1);
    } else if (!phone.startsWith('62')) {
      phone = '62' + phone;
    }

    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(template)}`;
    window.open(waLink, '_blank');
  };

  const handleAction = async (reg: any, action: 'approve' | 'reject') => {
    const statusToApply = tenantStatusMap[reg.id];

    if (action === 'approve' && !statusToApply) {
      toast.error("Silakan pilih status penghuni");
      return;
    }

    setProcessingId(reg.id);
    try {
      const res = await fetch(`/api/registrations/${reg.id}/${action}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: action === 'approve' ? JSON.stringify({ tenantStatus: statusToApply }) : undefined,
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Pendaftaran ${action === 'approve' ? 'disetujui' : 'ditolak'}`);
        handleWhatsAppChat(reg, action, statusToApply);
        fetchRegistrations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`Gagal ${action} pendaftaran`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleAssignRoom = async (roomId: string) => {
    if (!selectedReg) return;
    setAssigningRoom(true);
    try {
      const res = await fetch(`/api/registrations/${selectedReg.id}/assign-room`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Kamar berhasil ditetapkan!");
        setShowRoomModal(false);
        fetchRegistrations();
        fetchRooms();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Gagal menetapkan kamar");
    } finally {
      setAssigningRoom(false);
    }
  };

  const filteredRegistrations = registrations.filter(reg =>
    activeTab === 'pending' ? reg.status === 'pending' : reg.status !== 'pending'
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
        <Loader2 className="w-6 h-6 text-teal-500 absolute inset-0 m-auto animate-pulse" />
      </div>
      <p className="text-muted-foreground font-medium tracking-wide animate-pulse">Menghubungkan ke Pusat Data...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-foreground tracking-tight uppercase italic">WhatsApp <span className="text-teal-500">Boarding</span></h1>
          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">Sistem Verifikasi Chat & Onboarding</p>
        </div>
        <div className="flex p-1.5 bg-card/30 backdrop-blur-md rounded-2xl border border-white/5 w-fit">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'pending'
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <Inbox size={14} />
            Pending ({registrations.filter(r => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'history'
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <History size={14} />
            History
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-card/30 backdrop-blur-md rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">User & Contacts</th>
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Background Info</th>
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Tenant Type</th>
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Actions</th>
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-30">
                      <div className="p-4 bg-muted rounded-full">
                        <Clock className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-bold uppercase tracking-widest">
                        {activeTab === 'pending' ? 'No pending requests' : 'Empty history'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-white/[0.02] transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-all duration-500">
                          <User size={18} className="text-teal-500" />
                        </div>
                        <div className="space-y-1">
                          <div className="font-black text-foreground tracking-tight">{reg.fullName}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-emerald-500 transition-colors">
                            <Phone size={10} />
                            {reg.phoneNumber}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                          <School size={14} className="text-muted-foreground" />
                          {reg.university || "Public Client"}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground transition-all">
                          <MapPin size={10} />
                          {reg.origin || "Unknown Origin"}
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      <div className="relative w-32 group">
                        <select
                          value={tenantStatusMap[reg.id] || 'mahasiswa'}
                          disabled={reg.status !== 'pending'}
                          onChange={(e) => setTenantStatusMap({ ...tenantStatusMap, [reg.id]: e.target.value })}
                          className={`w-full appearance-none bg-muted/50 border border-white/5 rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-widest outline-none transition-all ${reg.status === 'pending' ? 'cursor-pointer hover:border-teal-500/50' : 'opacity-50 cursor-not-allowed'}`}
                        >
                          <option value="mahasiswa">Mahasiswa</option>
                          <option value="alumni">Alumni</option>
                          <option value="tamu">Tamu</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-hover:text-teal-500 transition-colors" />
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        {reg.status === 'pending' ? (
                          <>
                            <button
                              disabled={processingId === reg.id}
                              onClick={() => handleAction(reg, 'approve')}
                              className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all duration-300 border border-emerald-500/20 active:scale-95 flex items-center gap-2"
                            >
                              <Check size={14} />
                              Approve
                            </button>
                            <button
                              disabled={processingId === reg.id}
                              onClick={() => handleAction(reg, 'reject')}
                              className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-500/20 active:scale-95 flex items-center gap-2"
                            >
                              <X size={14} />
                              Reject
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${reg.status === 'approved' || reg.status === 'occupied' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                              {reg.status === 'approved' || reg.status === 'occupied' ? <Check size={10} /> : <X size={10} />}
                              {reg.status}
                            </div>

                            {reg.status === 'approved' && (
                              <button
                                onClick={() => { setSelectedReg(reg); setShowRoomModal(true); }}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black bg-teal-600 text-white hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
                              >
                                <Bed size={12} />
                                Assign Room
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end">
                        {reg.status === 'pending' ? (
                          <button
                            onClick={() => handleWhatsAppChat(reg)}
                            className="group relative flex items-center gap-3 px-6 py-3 bg-[#25D366]/10 text-[#25D366] rounded-2xl border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white transition-all duration-500 overflow-hidden shadow-lg shadow-[#25D366]/10"
                          >
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <div className="flex flex-col items-end text-right">
                              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Chat Verification</span>
                              <span className="text-[9px] opacity-70 font-medium">WhatsApp Onboarding</span>
                            </div>
                            <MessageSquare className="w-5 h-5 group-hover:scale-125 transition-transform duration-500" />
                          </button>
                        ) : (
                          <div className="flex h-12 items-center text-[10px] uppercase font-black tracking-widest text-muted-foreground/20 italic">
                            Log Verified
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Room Selection Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#0f1d23] border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-white italic tracking-tight">Pilih <span className="text-teal-500">Kamar</span></h3>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Assign ke: {selectedReg?.fullName}</p>
              </div>
              <button
                onClick={() => setShowRoomModal(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {rooms.length === 0 ? (
                <div className="col-span-2 py-10 text-center text-muted-foreground italic text-sm">
                  Tidak ada kamar tersedia
                </div>
              ) : (
                rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => handleAssignRoom(room.id)}
                    disabled={assigningRoom}
                    className="flex flex-col items-start p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-teal-500/50 hover:bg-teal-500/5 transition-all group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <DoorOpen size={16} className="text-teal-500" />
                    </div>
                    <span className="font-black text-white tracking-tight text-lg mb-1">{room.name}</span>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                      <span>Kap: {room.capacity}</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span className="text-emerald-500">Available</span>
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-3">
              <button
                onClick={() => setShowRoomModal(false)}
                className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
