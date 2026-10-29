"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../stores/useLengauage";

const sessionKey = "ladorm-initial-loader-shown";

type LoaderState = "loading" | "slow" | "error";

export function GlobalPreloader() {
  const { dictionary } = useLanguage();
  const [visible, setVisible] = useState(true);
  const [state, setState] = useState<LoaderState>("loading");

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(sessionKey)) {
        setVisible(false);
        return;
      }
      window.sessionStorage.setItem(sessionKey, "true");
    } catch (error) {
      console.warn(
        "Unable to persist the initial loading session state.",
        error,
      );
    }

    let slowTimer: number | undefined = undefined;
    let observer: MutationObserver | undefined = undefined;

    const hasMainContent = () => {
      const main = document.querySelector("main");
      return Boolean(main?.textContent?.trim());
    };

    function handleResourceError(event: Event) {
      if (event.target instanceof HTMLScriptElement && !hasMainContent()) {
        window.clearTimeout(slowTimer);
        setState("error");
      }
    }

    const finish = () => {
      if (slowTimer) window.clearTimeout(slowTimer);
      observer?.disconnect();
      window.removeEventListener("error", handleResourceError, true);
      setVisible(false);
    };

    if (hasMainContent()) {
      finish();
      return;
    }

    observer = new MutationObserver(() => {
      if (hasMainContent()) finish();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    window.addEventListener("error", handleResourceError, true);
    slowTimer = window.setTimeout(() => {
      if (hasMainContent()) {
        finish();
      } else {
        setState((current) => (current === "error" ? current : "slow"));
      }
    }, 3000);

    return () => {
      if (slowTimer) window.clearTimeout(slowTimer);
      observer?.disconnect();
      window.removeEventListener("error", handleResourceError, true);
    };
  }, []);

  const retry = () => {
    try {
      window.sessionStorage.removeItem(sessionKey);
    } catch (error) {
      console.warn("Unable to reset the initial loading session state.", error);
    }
    window.location.reload();
  };

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-background text-foreground transition-colors duration-500 motion-reduce:transition-none">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(17,94,89,0.12)_0%,transparent_68%)] transition-opacity duration-700 motion-reduce:transition-none dark:opacity-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.18)_0%,transparent_68%)] opacity-0 transition-opacity duration-700 motion-reduce:transition-none dark:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center">
        <span className="text-[20vw] font-black uppercase leading-none tracking-tighter text-primary/[0.035] dark:text-white/[0.025]">
          LADORM
        </span>
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-6 text-center">
        <div className="relative">
          <Image
            src="/images/Logotype%20-%20Ladorm%20Hijau.webp"
            alt="LADORM"
            width={320}
            height={100}
            className="no-filter h-auto w-full max-w-[300px] object-contain dark:hidden"
            style={{ height: "auto" }}
          />
          <Image
            src="/images/Logotype%20-%20Ladorm%20Putih.webp"
            alt="LADORM"
            width={320}
            height={100}
            className="no-filter hidden h-auto w-full max-w-[300px] object-contain dark:block"
            style={{ height: "auto" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/15 blur-3xl motion-safe:animate-pulse motion-reduce:animate-none"
          />
        </div>

        <div className="mt-16 w-full max-w-xs sm:mt-20 sm:w-80">
          <div
            aria-hidden="true"
            className="relative h-px w-full overflow-hidden bg-border/80 dark:bg-white/[0.08]">
            <div className="h-full w-1/3 animate-pulse bg-primary motion-reduce:animate-none" />
          </div>
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              Loading System
            </span>
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${
                state === "error"
                  ? "bg-red-500"
                  : "bg-primary motion-safe:animate-pulse motion-reduce:animate-none"
              }`}
            />
          </div>
        </div>

        <p className="mt-5 text-sm text-muted-foreground" aria-live="off">
          {state === "error"
            ? dictionary.common?.loadingFailed
            : state === "slow"
              ? dictionary.common?.loadingSlow
              : dictionary.common?.loading}
        </p>
        <p className="mt-24 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/70 sm:mt-32">
          Redefining Residence
        </p>
        {state === "error" && (
          <button
            type="button"
            onClick={retry}
            className="mt-5 rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {dictionary.common?.retry}
          </button>
        )}
      </div>
    </div>
  );
}
