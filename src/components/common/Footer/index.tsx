"use client";

import { scrollToIdWithMotion } from "@/utils/smoothScrollMotion";
import Link from "next/link";
import { generateWhatsAppLink } from "@/utils/whatsAppMessage";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "../../../../stores/useLengauage";
import "./index.css";

export default function Footer() {
  // const phone = "62811438399";
  // const message = "Halo kak, saya mau tanya tentang Asrama Mahasiswa Gorontalo";
  // const waLink = generateWhatsAppLink(phone, message);

  const pathname = usePathname();
  const router = useRouter();
  const { dictionary } = useLanguage();

  const handleGoToHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (pathname === "/") {
      scrollToIdWithMotion("home");
    } else {
      router.push("/#home");
    }
  };

  const handleGoToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (pathname === "/contact-us") {
      scrollToIdWithMotion("contact");
    } else {
      router.push("/contact-us");
    }
  };

  return (
    <footer className="relative z-10 bg-gradient-to-b from-[#0a1f26] to-[#050e12] dark:from-[#081115] dark:to-[#030608] text-white px-6 md:px-20 py-10 border-t-[0.5px] border-[#0a1f26] dark:border-white/20 sm:border-white/1">
      <div className="mb-10">
        <div className="md:max-w-screen-xl md:mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex gap-4 items-center">
              <Image
                src="/images/Ladorm Logo - Putih.png"
                alt="LADORM - LOGO"
                width={60}
                height={20}
                className="object-containr"
              />
              <p className="font-semibold">{dictionary.footer?.brandText || "Asrama Mahasiswa Gorontalo"}</p>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="font-medium">{dictionary.footer?.websiteLabel || "Website:"}</span>
                <span className="text-gray-200">www.gorontalo.id</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium">{dictionary.footer?.emailLabel || "Email:"}</span>{" "}
                <span className="text-gray-200">info@asramamahasiswa.id</span>
              </div>

              <p>
                <Link
                  href="https://maps.app.goo.gl/C7RHGFq932H6UqxY9"
                  target="_blank"
                  className="group pointer"
                >
                  <span className="font-medium">{dictionary.footer?.addressLabel || "Address:"}</span>
                  <br />
                  <span className="text-gray-20">
                    {dictionary.footer?.addressText || "Jl. Kramat Gg. Pribadi No.39, RT.8/RW.2, Lenteng Agung, Kec. Jagakarsa"}
                  </span>
                  <br />
                  <span className="text-gray-200">
                    {dictionary.footer?.cityText || "Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12630"}
                  </span>
                </Link>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{dictionary.footer?.ladormyLabel || "Ladormy"}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#home"
                  onClick={handleGoToHome}
                  className="pointer footer-link-hover"
                >
                  {dictionary.navbar?.home || "Beranda"}
                </Link>
              </li>
              <li>
                <Link href="#" className="cursor-not-allowed">
                  {dictionary.navbar?.blog || "Blog"}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  onClick={handleGoToContact}
                  className="cursor-pointer footer-link-hover"
                >
                  {dictionary.navbar?.contact || "Contact us"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{dictionary.footer?.socialMediaLabel || "Social Media"}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={
                    "https://www.linkedin.com/in/ladorm-gorontalo-522188372/"
                  }
                  target="_blank"
                  className="pointer footer-link-hover"
                >
                  Linkedin
                </Link>
              </li>
              <li>
                <Link
                  href={generateWhatsAppLink(
                    "62811438399",
                    "Halo kak saya mau tanya tentang Asrama Mahasiswa Gorontalo",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer footer-link-hover"
                >
                  whatssApp
                </Link>
              </li>
              <li>
                <Link
                  href="https://x.com/Ladorm_Family"
                  target="_blank"
                  className="pointer footer-link-hover"
                >
                  X (Twitter)
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/ladormy_/"
                  target="_blank"
                  className="pointer footer-link-hover"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{dictionary.footer?.legalLabel || "Legal"}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="cursor-not-allowed">
                  {dictionary.footer?.termsOfService || "Terms of Service"}
                </Link>
              </li>
              <li>
                <Link href="#" className="cursor-not-allowed">
                  {dictionary.footer?.privacyPolicy || "Privacy Policy"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col gap-10 border-t border-white/10 sm:border-white/20 pt-6 text-center text-sm">
        <div className="flex justify-start md:justify-end px-4 md:px-10 gap-2">
          <div className="flex items-center gap-5">
            <span className="font-semibold">{dictionary.footer?.ladormyLabel || "Ladormy"} :</span>
            {/* instagram */}
            <Link href="https://www.instagram.com/ladormy_/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 rotate-on-hover"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.75 8.25h.008v.008h-.008V8.25z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                />
              </svg>
            </Link>
            {/* twiter */}
            <Link
              href={"https://x.com/Ladorm_Family"}
              target="_blank"
              className="pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 rotate-on-hover"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.72 2H21l-6.77 7.73L22 22h-6.88l-5.4-6.66L3.27 22H0l7.45-8.5L2 2h7.12l4.94 6.1L17.72 2zm-2.07 18h2.3L8.35 4H5.9l9.75 16z" />
              </svg>
            </Link>
            {/* // whatsapp */}
            <Link
              href={generateWhatsAppLink(
                "62811438399",
                "Halo kak saya mau tanya tentang Asrama Mahasiswa Gorontalo",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 rotate-on-hover"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M16.005 2.003C8.28 2.003 2 8.284 2 16.01c0 2.823.75 5.43 2.05 7.708L2 30l6.42-2.003a13.94 13.94 0 007.585 2.222c7.723 0 14.004-6.28 14.004-14.006S23.728 2.003 16.005 2.003zM16 26.972c-2.468 0-4.766-.72-6.695-1.955l-.478-.306-3.813 1.19 1.19-3.707-.312-.48C4.655 20.755 4 18.438 4 16.01 4 9.388 9.383 4.003 16.005 4.003S28 9.388 28 16.01c0 6.62-5.388 10.962-12 10.962zm6.808-8.745c-.369-.183-2.186-1.078-2.526-1.2-.34-.12-.59-.183-.839.184-.248.369-.96 1.2-1.177 1.448-.217.248-.434.28-.803.093-.368-.185-1.557-.57-2.963-1.817-1.096-.979-1.837-2.188-2.05-2.558-.213-.37-.022-.57.16-.753.164-.162.368-.434.552-.651.184-.217.245-.37.368-.617.122-.248.062-.463-.03-.647-.093-.184-.839-2.027-1.15-2.78-.302-.726-.61-.628-.839-.639l-.712-.012c-.248 0-.647.093-.985.463-.34.369-1.294 1.264-1.294 3.08s1.325 3.57 1.51 3.818c.185.248 2.61 3.986 6.316 5.589.883.38 1.57.608 2.105.778.883.281 1.688.24 2.325.146.709-.106 2.186-.89 2.497-1.752.31-.863.31-1.603.217-1.752-.093-.145-.34-.23-.709-.403z" />
              </svg>
            </Link>
            {/* . LinkedIn */}
            <Link
              href={"https://www.linkedin.com/in/ladorm-gorontalo-522188372/"}
              target="_blank"
              className="pointer rotate-on-hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.12 8.25h4.74V24H.12V8.25zM8.98 8.25h4.54v2.13h.06c.63-1.2 2.18-2.46 4.48-2.46 4.79 0 5.67 3.15 5.67 7.25V24h-4.74v-6.92c0-1.65-.03-3.77-2.3-3.77s-2.65 1.8-2.65 3.64V24H8.98V8.25z" />
              </svg>
            </Link>
          </div>
        </div>
        <span>{dictionary.footer?.copyright || "© 2025 Asrama Mahasiswa Gorontalo. All Rights Reserved."}</span>
      </div>
    </footer>
  );
}
