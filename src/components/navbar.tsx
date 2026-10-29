
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    UserRound,
    Menu,
    X,
    LogOut,
    CalendarDays,
    LogIn,
    UserPlus,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverDescription,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/add-destination", label: "Add Destination" },
    { href: "/my-bookings", label: "My Bookings" },
];

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname === href;

    const closeMenu = () => setIsMenuOpen(false);

    const initials =
        user?.name
            ?.trim()
            .split(/\s+/)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";

    const handleSignOut = async () => {
        if (isSigningOut) return;

        setIsSigningOut(true);

        try {
            const result = await authClient.signOut();

            if (result.error) {
                toast.error(
                    result.error.message || "Failed to sign out."
                );
                return;
            }

            closeMenu();
            toast.success("Signed out successfully!");
            router.push("/login");
            router.refresh();
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSigningOut(false);
        }
    };

    const accountLinks = (
        <>
            <Link
                href="/profile"
                onClick={closeMenu}
                className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm transition hover:bg-muted hover:text-[#00A8E8]",
                    isActive("/profile") &&
                        "bg-[#00A8E8]/10 font-medium text-[#00A8E8]"
                )}
            >
                <UserRound size={17} />
                My Profile
            </Link>

            <Link
                href="/my-bookings"
                onClick={closeMenu}
                className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm transition hover:bg-muted hover:text-[#00A8E8]",
                    isActive("/my-bookings") &&
                        "bg-[#00A8E8]/10 font-medium text-[#00A8E8]"
                )}
            >
                <CalendarDays size={17} />
                My Bookings
            </Link>
        </>
    );

    const authLinks = (
        <>
            <Link
                href="/login"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm transition hover:bg-muted hover:text-[#00A8E8]"
            >
                <LogIn size={17} />
                Login
            </Link>

            <Link
                href="/signup"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm transition hover:bg-muted hover:text-[#00A8E8]"
            >
                <UserPlus size={17} />
                Sign Up
            </Link>
        </>
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
            <nav className="relative mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4  py-3 sm:px-6">
                {/* Desktop navigation */}
                <ul className="hidden items-center gap-4 lg:flex xl:gap-6">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                aria-current={
                                    isActive(link.href) ? "page" : undefined
                                }
                                className={cn(
                                    "border-b-2 border-transparent py-2 text-sm transition-colors hover:text-[#00A8E8]",
                                    isActive(link.href)
                                        ? "border-[#00A8E8] font-medium text-[#00A8E8]"
                                        : "text-foreground"
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
                    Wanderlust
                </Link>

                {/* Desktop account section */}
                <div className="hidden items-center gap-4 md:flex">
                    {user ? (
                        <Popover>
                            <PopoverTrigger
                                render={
                                    <button
                                        type="button"
                                        aria-label="Open account menu"
                                        className="flex items-center gap-2 rounded-full outline-none ring-offset-background transition hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#00A8E8]"
                                    >
                                        <Avatar className="size-9">
                                            <AvatarImage
                                                src={user.image || undefined}
                                                alt={user.name || "User"}
                                            />
                                            <AvatarFallback>
                                                {initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="hidden max-w-28 truncate text-sm font-medium xl:block">
                                            {user.name}
                                        </span>
                                    </button>
                                }
                            />

                            <PopoverContent
                                align="end"
                                className="w-64"
                            >
                                <PopoverHeader>
                                    <PopoverTitle>
                                        {user.name || "Your Account"}
                                    </PopoverTitle>
                                    <PopoverDescription className="break-all">
                                        {user.email}
                                    </PopoverDescription>
                                </PopoverHeader>

                                <div className="mt-3 space-y-1">
                                    {accountLinks}
                                </div>

                                <Button
                                    variant="destructive"
                                    className="mt-3 w-full"
                                    disabled={isSigningOut}
                                    onClick={handleSignOut}
                                >
                                    <LogOut size={16} />
                                    {isSigningOut
                                        ? "Signing out..."
                                        : "Sign Out"}
                                </Button>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className={cn(
                                    "text-sm transition hover:text-[#00A8E8]",
                                    isActive("/login") &&
                                        "font-medium text-[#00A8E8]"
                                )}
                            >
                                Login
                            </Link>

                            <Link
                                href="/signup"
                                className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors bg-[#00A8E8] text-white hover:bg-sky-600"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile menu toggle */}
                <button
                    type="button"
                    onClick={() => setIsMenuOpen((open) => !open)}
                    aria-label={
                        isMenuOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                    className="inline-flex size-10 items-center justify-center rounded-md border border-border transition hover:bg-muted md:hidden"
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
                    className="border-t border-border bg-background px-4 py-4 sm:px-6 md:hidden"
                >
                    <ul className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={closeMenu}
                                    aria-current={
                                        isActive(link.href)
                                            ? "page"
                                            : undefined
                                    }
                                    className={cn(
                                        "block rounded-md px-3 py-2.5 text-sm transition hover:bg-muted hover:text-[#00A8E8]",
                                        isActive(link.href)
                                            ? "bg-[#00A8E8]/10 font-medium text-[#00A8E8]"
                                            : "text-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-3 border-t border-border pt-3">
                        {user ? (
                            <>
                                <div className="mb-3 flex items-center gap-3 px-3 py-2">
                                    <Avatar className="size-10">
                                        <AvatarImage
                                            src={user.image || undefined}
                                            alt={user.name || "User"}
                                        />
                                        <AvatarFallback>
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">
                                            {user.name}
                                        </p>
                                        <p className="truncate text-xs text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    {accountLinks}
                                </div>

                                <Button
                                    variant="destructive"
                                    className="mt-3 w-full"
                                    disabled={isSigningOut}
                                    onClick={handleSignOut}
                                >
                                    <LogOut size={16} />
                                    {isSigningOut
                                        ? "Signing out..."
                                        : "Sign Out"}
                                </Button>
                            </>
                        ) : (
                            <div className="space-y-1">
                                {authLinks}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
