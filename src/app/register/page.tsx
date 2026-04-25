"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { jakarta } from "@/styles/font";
import { ChevronDown, Loader2, MessageSquare, ShieldCheck } from "lucide-react";
import Image from "next/image";

const schema = yup.object().shape({
  fullName: yup.string().required("Nama lengkap wajib diisi"),
  phoneNumber: yup.string()
    .required("Nomor WhatsApp wajib diisi")
    .matches(/^[0-9+\- ]+$/, "Format nomor tidak valid"),
  university: yup.string().optional(),
  origin: yup.string().optional(),
  gender: yup.string().oneOf(["Laki-laki", "Perempuan"]).required("Jenis kelamin wajib dipilih"),
});

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      origin: "",
      university: "",
    }
  });

  const onSubmit = async (data: any) => {
    console.log("Submitting registration data:", data);
    setLoading(true);
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) {
        toast.success("Pendaftaran berhasil! Tim kami akan menghubungi anda via WhatsApp.");
        router.push("/register/success");
      } else {
        toast.error(result.message || "Terjadi kesalahan");
      }
    } catch (error) {
      toast.error("Gagal mengirim pendaftaran");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${jakarta.className} min-h-screen bg-[#081115] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-xl w-full space-y-8 bg-card/40 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/10 relative z-10">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/Visual Idententy - Remake Logo Ladorm 2.webp"
              alt="LADorm"
              width={200}
              height={60}
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-black text-foreground tracking-tight">
            Fast Track <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent underline decoration-teal-500/30 underline-offset-8">Onboarding</span>
          </h2>
          <div className="flex items-center justify-center gap-2 py-1 px-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit mx-auto">
            <MessageSquare size={12} className="text-emerald-500" />
            <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Integrasi Verifikasi WhatsApp</p>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto">
            Daftar sekarang. Verifikasi instan melalui chat bersama Admin <span className="text-teal-500 font-bold">Ladorm</span>.
          </p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Lengkap */}
            <div className="space-y-1.5 md:col-span-2">
              <label htmlFor="fullName" className="block text-[10px] uppercase tracking-widest font-black text-muted-foreground ml-1">
                Nama Lengkap
              </label>
              <input
                {...register("fullName")}
                type="text"
                className="block w-full px-5 py-4 bg-background/50 border border-white/5 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all text-foreground placeholder:text-muted-foreground/20 font-medium"
                placeholder="Masukkan nama lengkap anda"
              />
              {errors.fullName && <p className="mt-1 text-[10px] text-red-400 font-bold uppercase tracking-tight">{errors.fullName.message}</p>}
            </div>

            {/* Nomor Telepon */}
            <div className="space-y-1.5 md:col-span-1">
              <label htmlFor="phoneNumber" className="block text-[10px] uppercase tracking-widest font-black text-muted-foreground ml-1">
                WhatsApp Number
              </label>
              <input
                {...register("phoneNumber")}
                type="text"
                className="block w-full px-5 py-4 bg-background/50 border border-white/5 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all text-foreground placeholder:text-muted-foreground/20 font-medium"
                placeholder="Contoh: 081234567890"
              />
              {errors.phoneNumber && <p className="mt-1 text-[10px] text-red-400 font-bold uppercase tracking-tight">{errors.phoneNumber.message}</p>}
            </div>

            {/* Jenis Kelamin */}
            <div className="space-y-1.5 md:col-span-1">
              <label htmlFor="gender" className="block text-[10px] uppercase tracking-widest font-black text-muted-foreground ml-1">
                Jenis Kelamin
              </label>
              <div className="relative group">
                <select
                  {...register("gender")}
                  className="block w-full appearance-none px-5 py-4 bg-background/50 border border-white/5 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all text-foreground font-medium cursor-pointer"
                >
                  <option value="" className="bg-muted">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki" className="bg-muted">Laki-laki</option>
                  <option value="Perempuan" className="bg-muted">Perempuan</option>
                </select>
                <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-muted-foreground group-hover:text-teal-500 transition-colors">
                  <ChevronDown size={20} />
                </div>
              </div>
              {errors.gender && <p className="mt-1 text-[10px] text-red-400 font-bold uppercase tracking-tight">{errors.gender.message}</p>}
            </div>

            {/* Universitas (Optional) */}
            <div className="space-y-1.5 md:col-span-1">
              <label htmlFor="university" className="block text-[10px] uppercase tracking-widest font-black text-muted-foreground ml-1">
                Universitas <span className="text-[8px] opacity-40 italic">(Opsional)</span>
              </label>
              <input
                {...register("university")}
                type="text"
                className="block w-full px-5 py-4 bg-background/50 border border-white/5 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all text-foreground placeholder:text-muted-foreground/20 font-medium"
                placeholder="Nama Kampus"
              />
            </div>

            {/* Asal Wilayah (Optional) */}
            <div className="space-y-1.5 md:col-span-1">
              <label htmlFor="origin" className="block text-[10px] uppercase tracking-widest font-black text-muted-foreground ml-1">
                Asal Wilayah <span className="text-[8px] opacity-40 italic">(Opsional)</span>
              </label>
              <input
                {...register("origin")}
                type="text"
                className="block w-full px-5 py-4 bg-background/50 border border-white/5 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all text-foreground placeholder:text-muted-foreground/20 font-medium"
                placeholder="Provinsi / Kota"
              />
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center items-center py-5 px-4 border border-transparent text-sm font-black uppercase tracking-[0.2em] rounded-2xl text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(13,148,136,0.5)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                "Kirim & Mulai Verifikasi"
              )}
            </button>
            <div className="flex items-center justify-center gap-2 opacity-30 group hover:opacity-100 transition-opacity">
               <ShieldCheck size={12} />
               <p className="text-[8px] font-bold uppercase tracking-widest">End-to-End Verification Secure Data</p>
            </div>
          </div>
        </form>
      </div>

      <div className="fixed bottom-6 text-[10px] uppercase tracking-widest font-black text-muted-foreground/30 select-none">
        Copyright © 2024 Ladorm Fast-Onboarding
      </div>
    </div>
  );
}
