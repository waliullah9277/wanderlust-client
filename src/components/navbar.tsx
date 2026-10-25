"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { User, Menu, X } from "lucide-react";
import { cn } from "cn";

const navLinks = [
  { href: "/", label: "Home", active: true},
  { href: "/destinations", label: "Destinations" },
  { href: "/add-destination", label: "Add Destination" },
  { href: "/my-bookings", label: "My Bookings" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <nav className="relative mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Desktop navigation */}
        <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "border-b-2 border-transparent py-1 text-sm transition-colors hover:text-[#00A8E8]",
                  isActive(link.href)
                    ? "border-b-2 border-[#00A8E8] font-medium text-[#00A8E8]"
                    : "text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-bold tracking-tight text-[#00A8E8] sm:text-3xl lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          Wanderlast
        </Link>

        {/* Desktop account links */}
        <div className="hidden items-center gap-4 md:flex lg:gap-6">
          <Link
            href="/profile"
            className={cn(
              "flex items-center gap-1.5 text-sm transition-colors hover:text-[#00A8E8]",
              isActive("/profile")
                ? "font-medium text-[#00A8E8]"
                : "text-foreground",
            )}
          >
            <User className="size-4" />
            Profile
          </Link>

          <Link
            href="/login"
            className={cn(
              "text-sm transition-colors hover:text-[#00A8E8]",
              isActive("/login")
                ? "font-medium text-[#00A8E8]"
                : "text-foreground",
            )}
          >
            Login
          </Link>

          <Link
            href="/signup"
            className={cn(
              "text-sm transition-colors hover:text-[#00A8E8]",
              isActive("/signup")
                ? "font-medium text-[#00A8E8]"
                : "text-foreground",
            )}
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          className="inline-flex size-10 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted md:hidden"
        >
          {isMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background px-4 py-4 md:hidden sm:px-6"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted hover:text-[#00A8E8]",
                    isActive(link.href)
                      ? "bg-[#00A8E8]/10 font-medium text-[#00A8E8]"
                      : "text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3">
            <Link
              href="/profile"
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted hover:text-[#00A8E8]"
            >
              <User className="size-4" />
              Profile
            </Link>

            <Link
              href="/login"
              onClick={closeMenu}
              className="rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted hover:text-[#00A8E8]"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={closeMenu}
              className="rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted hover:text-[#00A8E8]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}