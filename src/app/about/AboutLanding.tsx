"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Crown,
  FileText,
  LoaderCircle,
  Wallet,
} from "lucide-react";
import toast from "react-hot-toast";
import Footer from "@/components/common/Footer";
import { LayoutBlank } from "@/layouts";
import { useLanguage } from "../../../stores/useLengauage";

const visualIdentityPdf =
  "/documents/Visual%20Idententy%20-%20Remake%20Logo%20Ladorm.pdf";

const officers = [
  {
    name: "Adhwa Sobah Al Amin F Pakaya",
    roleKey: "chairpersonRole",
    image: "/pengurus/Adhwa%20Sobah%20Al%20Amin%20F%20Pakaya.jpeg",
    Icon: Crown,
  },
  {
    name: "Nurul Alda",
    roleKey: "secretaryRole",
    image: "/pengurus/Nurul%20Alda.jpeg",
    Icon: FileText,
  },
  {
    name: "Eca Batalipu",
    roleKey: "treasurerRole",
    image: "/pengurus/Eca%20Batalipu.jpeg",
    Icon: Wallet,
  },
] as const;

export default function AboutLanding() {
  const { dictionary } = useLanguage();
  const content = dictionary.aboutPage.landing;
  const downloadLink = useRef<HTMLAnchorElement>(null);
  const allowNativeDownload = useRef(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (event: MouseEvent<HTMLAnchorElement>) => {
    if (allowNativeDownload.current) {
      allowNativeDownload.current = false;
      return;
    }

    event.preventDefault();
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const response = await fetch(visualIdentityPdf, {
        method: "HEAD",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`PDF request failed with status ${response.status}`);
      }

      if (!downloadLink.current) {
        throw new Error("The PDF download link is not available.");
      }

      allowNativeDownload.current = true;
      downloadLink.current.click();
      toast.success(content.downloadStarted);
    } catch (error) {
      allowNativeDownload.current = false;
      console.error("Unable to start the LADORM identity PDF download.", error);
      toast.error(content.downloadFailed);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <LayoutBlank>
      <div className="w-full overflow-hidden bg-background text-foreground">
        <section
          aria-labelledby="about-landing-title"
          className="relative isolate flex min-h-[620px] items-end overflow-hidden bg-background text-foreground transition-colors duration-300 sm:min-h-[640px] lg:min-h-[660px] dark:bg-[#071216] dark:text-white">
          <Image
            src="/images/puncak_ladorm_2.jpg"
            alt={content.imageAlt}
            fill
            priority
            quality={80}
            sizes="100vw"
            className="z-[-2] object-cover object-[56%_58%] sm:object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[-1]
    bg-[linear-gradient(90deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.52)_42%,rgba(255,255,255,0.06)_100%)]
    transition-opacity duration-300 motion-reduce:transition-none
    max-sm:bg-[linear-gradient(0deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.58)_48%,rgba(255,255,255,0.08)_100%)]
    dark:opacity-0"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[-1] bg-[linear-gradient(90deg,rgba(4,13,16,0.94)_0%,rgba(4,13,16,0.78)_42%,rgba(4,13,16,0.18)_100%)] opacity-0 transition-opacity duration-300 motion-reduce:transition-none max-sm:bg-[linear-gradient(0deg,rgba(4,13,16,0.96)_0%,rgba(4,13,16,0.72)_48%,rgba(4,13,16,0.18)_100%)] dark:opacity-100"
          />
          <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-28 sm:px-10 sm:pb-20 lg:px-12 lg:pb-24">
            <div className="max-w-4xl">
              <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/80 sm:text-sm dark:text-white/80">
                <span aria-hidden="true" className="h-px w-8 bg-primary" />
                {content.eyebrow}
              </p>
              <h1
                id="about-landing-title"
                className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
                {content.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg dark:text-white/80">
                {content.description}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  href="/residents"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-offset-[#071216]">
                  {content.residentsAction}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  href="/about/story"
                  className="inline-flex min-h-12 items-center gap-2 border-b border-foreground/50 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/60 dark:text-white">
                  {content.storyAction}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="about-officers-title"
          className="px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid gap-5 border-b border-border pb-8 md:mb-14 md:grid-cols-[1fr_0.7fr] md:items-end md:gap-10">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
                  {content.officersEyebrow}
                </p>
                <h2
                  id="about-officers-title"
                  className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl">
                  {content.officersTitle}
                </h2>
              </div>
              <p className="max-w-xl leading-relaxed text-muted-foreground md:justify-self-end">
                {content.officersDescription}
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {officers.map((officer) => (
                <figure
                  key={officer.name}
                  className="group relative mx-auto flex h-full w-full max-w-[360px] flex-col
    overflow-hidden rounded-[1.5rem] border border-border/70 bg-card
    transition-all duration-500
    hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                  {/* Photo */}
                  <div className="relative aspect-[4/4.5] w-full shrink-0 overflow-hidden bg-muted">
                    <Image
                      src={officer.image}
                      alt={content.officerImageAlt.replace(
                        "{name}",
                        officer.name,
                      )}
                      fill
                      sizes="(max-width: 639px) calc(100vw - 3rem), (max-width: 1023px) 45vw, 30vw"
                      className="no-filter object-cover object-top transition-transform
        duration-700 ease-out group-hover:scale-[1.04]"
                    />

                    {/* Photo overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t
        from-black/55 via-transparent to-transparent opacity-80"
                    />

                    {/* Decorative index */}
                    <span
                      className="absolute right-4 top-4 rounded-full
        border border-white/30 bg-black/20 px-3 py-1.5
        text-[10px] font-medium tracking-[0.18em] text-white
        backdrop-blur-md">
                      LADORM /{" "}
                      {String(officers.indexOf(officer) + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Identity panel */}
                  <figcaption className="flex flex-1 flex-col p-5 sm:p-6">
                    {/* Role */}
                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-[2px] w-7 shrink-0 rounded-full bg-primary" />

                      <span
                        className="text-[10px] font-semibold uppercase
          tracking-[0.2em] text-primary">
                        {content[officer.roleKey]}
                      </span>
                    </div>

                    {/* Name */}
                    <h3
                      className="break-words text-xl font-semibold leading-snug
        tracking-tight text-foreground [overflow-wrap:anywhere]
        sm:text-[1.35rem] mb-4">
                      {officer.name}
                    </h3>

                    {/* Footer pinned to the bottom */}
                    <div
                      className="mt-auto flex items-center justify-between gap-3
        border-t border-border/70 pt-4 mt-8">
                      <span
                        className="text-[10px] font-medium uppercase
          tracking-[0.16em] text-muted-foreground">
                        Pengurus LADORM
                      </span>

                      <span className="shrink-0 font-mono text-xs font-semibold tabular-nums text-primary/70">
                        {String(officers.indexOf(officer) + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="about-destinations-title"
          className="border-t border-border bg-card/60 px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
                {content.officersEyebrow}
              </p>
              <h2
                id="about-destinations-title"
                className="text-3xl font-semibold leading-tight tracking-[-0.035em] text-foreground sm:text-4xl">
                {content.destinationsTitle}
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
                {content.identityDescription}
              </p>
            </div>

            <div className="divide-y divide-border border-y border-border">
              <Link
                href="/residents"
                className="group flex min-h-20 items-center justify-between gap-5 py-5 text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <span>
                  <span className="block text-lg font-semibold">
                    {content.residentsTitle}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {content.residentsDescription}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/about/story"
                className="group flex min-h-20 items-center justify-between gap-5 py-5 text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <span>
                  <span className="block text-lg font-semibold">
                    {content.storyTitle}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {content.storyDescription}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1"
                />
              </Link>
              <div className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-5">
                <span>
                  <span className="block text-lg font-semibold text-foreground">
                    {content.identityTitle}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {content.identityDescription}
                  </span>
                </span>
                <a
                  ref={downloadLink}
                  href={visualIdentityPdf}
                  download="Visual-Identity-LADORM.pdf"
                  onClick={handleDownload}
                  aria-disabled={isDownloading}
                  aria-busy={isDownloading}
                  tabIndex={isDownloading ? -1 : undefined}
                  className="inline-flex min-h-11 min-w-40 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card aria-disabled:cursor-wait aria-disabled:opacity-70">
                  {isDownloading ? (
                    <>
                      <LoaderCircle
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin motion-reduce:animate-none"
                      />
                      {content.downloadLoading}
                    </>
                  ) : (
                    <>
                      <ArrowDownToLine aria-hidden="true" className="h-4 w-4" />
                      {content.downloadPdf}
                    </>
                  )}
                </a>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </LayoutBlank>
  );
}
