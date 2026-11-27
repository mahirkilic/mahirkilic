"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-40 border-b border-line/70 bg-bg/90 backdrop-blur-sm">
      <div className="site-shell flex items-center justify-between gap-6 py-5">
        <Link href="/" className="group flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={1113}
            height={203}
            className="h-8 w-auto sm:h-9"
            priority
          />
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-line lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-4 flex-col gap-1.5">
            <span className={`h-px w-full bg-ink transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-full bg-ink transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-full bg-ink transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>

        <nav
          className={`${
            open
              ? "absolute inset-x-0 top-full flex flex-col gap-1 border-b border-line bg-bg px-5 py-4 shadow-sm"
              : "hidden"
          } lg:static lg:flex lg:flex-row lg:items-start lg:gap-6 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || ("child" in item && item.child && pathname === item.child.href);
            return (
              <div key={item.href} className="flex flex-col items-start lg:items-center">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`whitespace-nowrap text-[0.95rem] tracking-wide transition ${
                    active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
                {"child" in item && item.child ? (
                  <Link
                    href={item.child.href}
                    onClick={() => setOpen(false)}
                    className={`mt-1 text-xs tracking-wide ${
                      pathname === item.child.href ? "text-ink" : "text-soft hover:text-muted"
                    }`}
                  >
                    {item.child.label}
                  </Link>
                ) : null}
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
