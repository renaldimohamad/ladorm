"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Plus, CreditCard, Check, Loader2, X, User, Receipt,
  CalendarClock, Wallet, BadgeCheck, MessageSquare, ChevronDown
} from "lucide-react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [tenants, setTenants] = useState<any[]>([]);
  const [pricing, setPricing] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Helper to get default dates
  const getDefaultDates = () => {
    const now = new Date();
    const nextMonth10 = new Date(now.getFullYear(), now.getMonth() + 1, 10);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return {
      due: nextMonth10.toISOString().split('T')[0],
      start: startOfMonth.toISOString().split('T')[0],
      end: endOfMonth.toISOString().split('T')[0]
    };
  };

  const [formData, setFormData] = useState({
    tenantId: "",
    amount: "",
    dueDate: getDefaultDates().due,
    periodStart: getDefaultDates().start,
    periodEnd: getDefaultDates().end
  });

  const fetchData = async () => {
    try {
      const [paymentsRes, tenantsRes, pricingRes] = await Promise.all([
        fetch("/api/payments"),
        fetch("/api/tenants"),
        fetch("/api/pricing")
      ]);
      const [pData, tData, prData] = await Promise.all([
        paymentsRes.json(),
        tenantsRes.json(),
        pricingRes.json()
      ]);

      if (pData.success) setPayments(pData.data);
      if (tData.success) setTenants(tData.data);
      if (prData.success) setPricing(prData.data);
    } catch (error) {
      toast.error("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTenantChange = (id: string) => {
    const tenant = tenants.find(t => t.id === id);
    if (tenant) {
      const rate = pricing.find(p => p.type === tenant.status);
      setFormData({
        ...formData,
        tenantId: id,
        amount: rate ? rate.price.toString() : "0"
      });
    } else {
      setFormData({ ...formData, tenantId: "", amount: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Tagihan berhasil diterbitkan");
        setIsAdding(false);
        const defaults = getDefaultDates();
        setFormData({
          tenantId: "",
          amount: "",
          dueDate: defaults.due,
          periodStart: defaults.start,
          periodEnd: defaults.end
        });
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Gagal menerbitkan tagihan");
    }
  };

  const markAsPaid = async (id: string) => {
    try {
      const res = await fetch(`/api/payments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "paid" }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Pembayaran tercatat lunas");
        fetchData();
      }
    } catch (error) {
      toast.error("Gagal memperbarui status");
    }
  };

  const handleSendInvoice = (payment: any) => {
    const dueDateFormatted = new Date(payment.dueDate).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const pStart = payment.periodStart ? new Date(payment.periodStart).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : "";
    const pEnd = payment.periodEnd ? new Date(payment.periodEnd).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : "";

    const template = `Halo ${payment.tenant.fullName} 👋

Terima kasih telah menjadi bagian dari Ladorm.

Berikut adalah rincian tagihan Anda:
📌 Invoice ID: #LDRM-${payment.id.slice(-6).toUpperCase()}
📅 Periode: ${pStart} - ${pEnd}
💰 Total Tagihan: Rp ${payment.amount.toLocaleString('id-ID')}
⚠️ Jatuh Tempo: ${dueDateFormatted}

Pembayaran dapat dikirimkan melalui transfer ke:
🏦 BANK CENTRAL ASIA (BCA)
A/N: PENGELOLA LADORM
No. Rekening: 123-456-7890

Mohon kirimkan bukti bayar ke nomor ini ya. Terima kasih! 🙏`;

    let phone = payment.tenant.phoneNumber.replace(/[^0-9]/g, '');
    if (phone.startsWith('0')) {
      phone = '62' + phone.slice(1);
    } else if (!phone.startsWith('62')) {
      phone = '62' + phone;
    }

    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(template)}`;
    window.open(waLink, '_blank');
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
        <Loader2 className="w-6 h-6 text-teal-500 absolute inset-0 m-auto animate-pulse" />
      </div>
      <p className="text-muted-foreground font-medium tracking-wide animate-pulse">Menghubungkan ke Pusat Pembayaran...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-card/30 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-500/20 transition-all duration-700" />
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-3xl flex items-center justify-center text-teal-500 border border-white/10 shadow-inner group-hover:scale-105 transition-all duration-500">
            <CreditCard size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight italic uppercase text-foreground">Billing <span className="text-teal-500">Center</span></h2>
            <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase opacity-60">Ladorm Premium Financial Ledger</p>
          </div>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 ${isAdding
            ? "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white"
            : "bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:scale-[1.03] shadow-[0_15px_40px_-5px_rgba(13,148,136,0.3)] active:scale-95"
            }`}
        >
          {isAdding ? <><X size={16} /> Batal</> : <><Plus size={16} /> Issue New Bill</>}
        </button>
      </div>

      {/* Issuance Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <form onSubmit={handleSubmit} className="bg-[#0f1d23] w-full max-w-xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black tracking-tight italic text-white">Issue <span className="text-teal-500">New Bill</span></h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1 opacity-60">Ladorm Premium Billing Entry</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Pilih Penghuni</label>
                <div className="relative group">
                  <select
                    required
                    value={formData.tenantId}
                    onChange={(e) => handleTenantChange(e.target.value)}
                    className="w-full px-5 py-4 bg-background/50 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium appearance-none text-foreground"
                  >
                    <option value="" className="bg-[#0f1d23]">Pilih Penghuni</option>
                    {tenants.map(tenant => (
                      <option key={tenant.id} value={tenant.id} className="bg-[#0f1d23]">{tenant.fullName} ({tenant.status})</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-focus-within:text-teal-500" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Dari Tanggal (Periode)</label>
                <input
                  required type="date" value={formData.periodStart}
                  onChange={(e) => setFormData({ ...formData, periodStart: e.target.value })}
                  className="w-full px-5 py-4 bg-background/50 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-foreground uppercase text-xs tracking-widest"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Sampai Tanggal</label>
                <input
                  required type="date" value={formData.periodEnd}
                  onChange={(e) => setFormData({ ...formData, periodEnd: e.target.value })}
                  className="w-full px-5 py-4 bg-background/50 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-foreground uppercase text-xs tracking-widest"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nominal Tagihan</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-muted-foreground font-black text-[10px] uppercase">Rp</div>
                  <input
                    required type="number" value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full pl-12 pr-5 py-4 bg-background/50 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all font-black italic tracking-tight text-lg text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Tenggat Waktu (Jatuh Tempo)</label>
                <input
                  required type="date" value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-5 py-4 bg-background/50 border border-teal-500/20 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-foreground uppercase text-xs tracking-widest"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-white/5">
              <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-4 bg-white/5 text-muted-foreground hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Batal</button>
              <button type="submit" className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-teal-600/20 active:scale-95 transition-all">Issue Global Bill</button>
            </div>
          </form>
        </div>
      )}

      {/* Ledger Table Section */}
      <div className="bg-card/30 backdrop-blur-md rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-8 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Beneficiary</th>
                <th className="px-8 py-8 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Billing Period</th>
                <th className="px-8 py-8 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Amount</th>
                <th className="px-8 py-8 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Settlement</th>
                <th className="px-8 py-8 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] text-right">Dispatch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-10">
                      <Wallet size={64} strokeWidth={1} />
                      <p className="text-xl font-black uppercase tracking-widest italic text-foreground">Ledger Empty</p>
                    </div>
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-white/[0.02] transition-all group">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 group-hover:border-teal-500/30 flex items-center justify-center transition-all duration-500 group-hover:rotate-12">
                          <User size={20} className="text-muted-foreground group-hover:text-teal-500" />
                        </div>
                        <div className="space-y-1">
                          <div className="font-black text-foreground tracking-tight text-lg">{payment.tenant.fullName}</div>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-teal-600/60">
                            <BadgeCheck size={12} />
                            {payment.tenant.status}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs font-black text-foreground uppercase tracking-wider">
                          <CalendarClock size={12} className="text-teal-500" />
                          {payment.periodStart
                            ? new Date(payment.periodStart).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
                            : new Date(payment.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
                          }
                          {payment.periodStart && (
                            <>
                              <span className="text-muted-foreground opacity-30">—</span>
                              {new Date(payment.periodEnd).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </>
                          )}
                        </div>
                        <span className="text-[9px] font-black uppercase text-muted-foreground/30 ml-5 tracking-widest">
                          {payment.periodStart ? 'Rent Duration Period' : 'Legacy Record / Creation Month'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-[10px] font-black uppercase text-muted-foreground/30">Contractual Due</span>
                        <div className="flex items-center gap-2 text-xl font-black text-foreground italic tracking-tighter">
                          Rp {payment.amount.toLocaleString('id-ID')}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8 text-center">
                      <div className={`group/status relative cursor-default inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${payment.status === 'paid'
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        : 'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_20px_-5px_rgba(239,68,68,0.4)] hover:shadow-red-500/30'
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${payment.status === 'paid' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]'}`} />
                        {payment.status === 'paid' ? 'Settled' : 'Unpaid'}
                      </div>
                      <div className="text-[9px] font-black text-muted-foreground/30 uppercase mt-2">Due {new Date(payment.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</div>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {payment.status === 'unpaid' && (
                          <button
                            onClick={() => handleSendInvoice(payment)}
                            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white hover:scale-110 active:scale-95 transition-all shadow-lg shadow-[#25D366]/10 group/wa"
                            title="Send WhatsApp Invoice"
                          >
                            <MessageSquare size={20} className="group-hover/wa:rotate-[-12deg] transition-transform" />
                          </button>
                        )}
                        {payment.status === 'unpaid' && (
                          <button
                            onClick={() => markAsPaid(payment.id)}
                            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-teal-600/10 text-teal-500 border border-teal-500/20 hover:bg-teal-600 hover:text-white hover:scale-110 active:scale-95 transition-all shadow-lg shadow-teal-600/20"
                            title="Mark as Paid"
                          >
                            <Check size={22} strokeWidth={3} />
                          </button>
                        )}
                        {payment.status === 'paid' && (
                          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl border border-emerald-500/20 shadow-inner">
                            <Receipt size={20} />
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
    </div>
  );
}
