"use client";

import Link from "next/link";
import { LayoutBlank } from "@/layouts";
import Footer from "@/components/common/Footer";
import { CheckCircle } from "lucide-react";

export default function RegisterSuccessPage() {
  return (
    <LayoutBlank>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full text-center space-y-8 bg-card p-10 rounded-2xl shadow-xl border border-border">
            <div className="flex justify-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-foreground">
                Pendaftaran Berhasil!
              </h2>
              <p className="mt-4 text-muted-foreground">
                Terima kasih telah mendaftar di Ladorm. Admin kami akan segera meninjau pendaftaran Anda dan menghubungi Anda melalui nomor WhatsApp yang diberikan.
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:opacity-90 transition-opacity shadow-lg"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </LayoutBlank>
  );
}
