"use client";
import { motion } from "framer-motion";
import ContactInfo from "./contactInfo";
import ContactForm from "./contactcForm";
import { useLanguage } from "../../../stores/useLengauage";

export default function ContactUsSection() {
  const { dictionary } = useLanguage();

  return (
    <motion.section
      className="py-16 px-4 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-left sm:text-center mb-10"
          variants={{ hidden: {}, visible: {} }}
        >
          <h5 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-6 text-[#016072] font-montserrat">
            {dictionary?.contactUs?.title ?? "test"}
          </h5>
          {/* <p className="text-sm sm:text-base md:text-lg font-medium text-gray-600 leading-relaxed">
            <span className="text-gray-800 font-bold">
              Hey, Mongowutata, Mongodula&apos;a!
            </span>{" "}
            Makasih wa so mampir di situs resmi LADorm - Asrama Mahasiswa
            Gorontalo di Lenteng Agung, Jakarta! 👋
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-2 leading-relaxed">
            Kalau ngoni punya pertanyaan, saran, atau kepikiran buat gabung jadi
            bagian dari keluarga asrama ini, langsung aja hubungi kami! Mari
            torang mo ambuwa!
          </p> */}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </motion.section>
  );
}
