"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "Nama Minimal 3 Karakter")
    .required("Nama Depan wajib diisi"),
  lastName: yup.string().required("Nama Belakang wajib diisi"),
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  subject: yup.string().required("Subjeck wajib diisi"),
  message: yup.string().required("Pesan wajib diisi"),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await emailjs.send(
        "service_siwo3lf",
        "template_9ydesje",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: `${data.firstName} ${data.lastName}`,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
        "hjqGLDSGo6q3WnoJh"
      );
      await emailjs.send(
        "service_siwo3lf",
        "template_ojy8ov9",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
        "hjqGLDSGo6q3WnoJh"
      );

      toast.success("Pesan berhasil dikirim!");
      reset();
    } catch {
      toast.error("Gagal mengirim pesan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="border border-gray-200 rounded-xl p-6 bg-white shadow-lg"
      variants={fadeInUp}
      custom={2}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <p className="text-base sm:text-lg md:text-xl font-semibold text-green-800 mb-4">
        Hubungi Kami
      </p>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        initial="hidden"
        animate="visible"
      >
        {/* Nama */}
        <motion.div
          className="flex flex-col md:flex-row gap-4"
          variants={fadeInUp}
          custom={3}
        >
          <div className="w-full">
            <input
              {...register("firstName")}
              type="text"
              placeholder="Nama Depan"
              className={`w-full border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-black text-sm sm:text-base md:text-lg`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <input
              {...register("lastName")}
              type="text"
              placeholder="Nama Belakang"
              className={`w-full border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-black text-sm sm:text-base md:text-lg`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </motion.div>

        {/* Email */}
        <motion.div variants={fadeInUp} custom={4}>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className={`w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-black text-sm sm:text-base md:text-lg`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </motion.div>

        {/* Subjek */}
        <motion.div variants={fadeInUp} custom={5}>
          <input
            {...register("subject")}
            type="text"
            placeholder="Subjeck"
            className={`w-full border ${
              errors.subject ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-black text-sm sm:text-base md:text-lg`}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </motion.div>

        {/* Pesan */}
        <motion.div variants={fadeInUp} custom={6}>
          <textarea
            {...register("message")}
            placeholder="Pesan"
            rows={4}
            className={`w-full border ${
              errors.message ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-black text-sm sm:text-base md:text-lg`}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </motion.div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className={`w-full md:w-auto cursor-pointer
            bg-gradient-to-r from-[#016072] to-[#2c705b]
            text-sm sm:text-base md:text-sm
            text-white font-medium
            px-6 py-2 rounded shadow rounded-lg 
            transition-colors duration-300
            hover:from-[#018484] hover:to-[#3b9e7e]
    ${
      isLoading
        ? "opacity-70 cursor-not-allowed hover:from-[#016072] hover:to-[#2c705b]"
        : ""
    }`}
          variants={fadeInUp}
          custom={7}
        >
          {isLoading ? "Mengirim..." : "Kirim Pesan"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
