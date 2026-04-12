"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import DynamicButton from "@/ui/common/DynamicButton";
import LoaderSpinner from "@/ui/common/LoaderSpinner";
import { useLanguage } from "../../../stores/useLengauage";

import { motion, AnimatePresence, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "Min 3 characters")
    .required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const { dictionary } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    emailjs.init("hjqGLDSGo6q3WnoJh");
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    if (isLoading) return; // Prevent double submit
    setIsLoading(true);

    const toastId = toast.loading(dictionary?.contactUs?.contactForm?.toast?.loading || "Sending message...");

    try {
      // Execute both sends in parallel for better performance
      const adminPromise = emailjs.send(
        "service_siwo3lf",
        "template_9ydesje",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: `${data.firstName} ${data.lastName}`,
          email: data.email,
          reply_to: data.email,
          subject: data.subject,
          message: data.message,
        }
      );

      const userPromise = emailjs.send(
        "service_siwo3lf",
        "template_ojy8ov9",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: `${data.firstName} ${data.lastName}`,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }
      );

      await Promise.all([adminPromise, userPromise]);

      toast.success(dictionary?.contactUs?.contactForm?.toast?.success || "✅ Message sent!", { id: toastId });
      reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error(dictionary?.contactUs?.contactForm?.toast?.error || "❌ Failed to send message.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = (isError: boolean | undefined) => `
    w-full bg-[var(--background)] border-2 ${isError ? "border-red-500/50" : "border-border/50"} 
    rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30
    focus:outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 
    disabled:opacity-40 disabled:cursor-not-allowed
    transition-all duration-300 text-sm md:text-base font-medium shadow-sm
  `;

  return (
    <motion.div
      className="relative bg-[var(--card)]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden h-full"
      variants={fadeInUp}
      custom={2}
      initial={false}
      animate="visible"
    >
      <div className="mb-10">
        <h3 className="text-2xl font-black tracking-tight mb-2">
          {dictionary?.contactUs?.contactForm?.title || "Send us a Message"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {dictionary?.contactUs?.contactForm?.subtitle || "Our team will get back to you within 24 hours."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <fieldset disabled={isLoading} className="space-y-6 border-none p-0 m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <input
                {...register("firstName")}
                type="text"
                placeholder={dictionary?.contactUs?.contactForm?.firstName || "First Name"}
                className={inputClasses(!!errors.firstName)}
              />
              <AnimatePresence>
                {errors.firstName && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-xs font-bold pl-2"
                  >
                    {errors.firstName.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <input
                {...register("lastName")}
                type="text"
                placeholder={dictionary?.contactUs?.contactForm?.lastName || "Last Name"}
                className={inputClasses(!!errors.lastName)}
              />
              <AnimatePresence>
                {errors.lastName && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-xs font-bold pl-2"
                  >
                    {errors.lastName.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-2">
            <input
              {...register("email")}
              type="email"
              placeholder={dictionary?.contactUs?.contactForm?.email || "Email Address"}
              className={inputClasses(!!errors.email)}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-xs font-bold pl-2"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <input
              {...register("subject")}
              type="text"
              placeholder={dictionary?.contactUs?.contactForm?.subject || "Subject"}
              className={inputClasses(!!errors.subject)}
            />
            <AnimatePresence>
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-xs font-bold pl-2"
                >
                  {errors.subject.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <textarea
              {...register("message")}
              placeholder={dictionary?.contactUs?.contactForm?.message || "Write your message here..."}
              rows={4}
              className={inputClasses(!!errors.message)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(onSubmit)();
                }
              }}
            />
            <AnimatePresence>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-xs font-bold pl-2"
                >
                  {errors.message.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </fieldset>

        <div className="pt-4">
          <DynamicButton
            type="submit"
            isLoading={isLoading}
            className={`w-full py-3 rounded-[2.5rem] bg-[var(--primary)] text-white font-black uppercase tracking-widest text-sm shadow-xl transition-all duration-300 ${isLoading ? 'opacity-60 grayscale' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
            loaderButton={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3"
              >
                <LoaderSpinner />
                <span className="text-xs">{dictionary?.contactUs?.contactForm?.loaderButton || "Sending..."}</span>
              </motion.div>
            }
          >
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: isLoading ? 0 : 1 }}
            >
              {dictionary?.contactUs?.contactForm?.submit || "Send Message"}
            </motion.span>
          </DynamicButton>
        </div>
      </form>
    </motion.div>
  );
}


