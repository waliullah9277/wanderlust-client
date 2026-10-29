
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    Camera,
    MapPin,
    CalendarDays,
    Pencil,
    Plane,
    Globe2,
    TrendingUp,
    Wallet,
    UserRound,
} from "lucide-react";

interface Booking {
    _id: string;
    name?: string;
    country?: string;
    price?: number | string;
    departureDate?: string;
    status?: string;
}

const ProfilePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user?.email) {
        redirect("/login");
    }

    let bookings: Booking[] = [];

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/my-bookings/${encodeURIComponent(user.email)}`,
            { cache: "no-store" }
        );

        if (res.ok) {
            const data: unknown = await res.json();

            if (Array.isArray(data)) {
                bookings = data as Booking[];
            }
        }
    } catch (error) {
        console.error("Failed to load booking statistics:", error);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeBookings = bookings.filter(
        (booking) =>
            booking.status?.toLowerCase() !== "cancelled"
    );

    const upcomingTrips = activeBookings.filter((booking) => {
        if (!booking.departureDate) return false;

        const departure = new Date(
            `${booking.departureDate.slice(0, 10)}T00:00:00`
        );

        return (
            !Number.isNaN(departure.getTime()) &&
            departure >= today
        );
    });

    const countriesBooked = new Set(
        activeBookings
            .map((booking) => booking.country?.trim())
            .filter((country): country is string => Boolean(country))
    ).size;

    const totalSpent = activeBookings.reduce((total, booking) => {
        const price = Number(booking.price);

        return total + (
            Number.isFinite(price) && price > 0 ? price : 0
        );
    }, 0);

    const initials =
        user.name
            ?.trim()
            .split(/\s+/)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";

    const memberSince = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
          })
        : "Member";

    const statistics = [
        {
            label: "Total Bookings",
            value: bookings.length.toString(),
            icon: Plane,
            color: "bg-cyan-50 text-cyan-500",
        },
        {
            label: "Countries Booked",
            value: countriesBooked.toString(),
            icon: Globe2,
            color: "bg-green-50 text-green-600",
        },
        {
            label: "Upcoming Trips",
            value: upcomingTrips.length.toString(),
            icon: TrendingUp,
            color: "bg-orange-50 text-orange-500",
        },
        {
            label: "Total Spent",
            value: `$${totalSpent.toLocaleString("en-BD")}`,
            icon: Wallet,
            color: "bg-fuchsia-50 text-fuchsia-500",
        },
    ];

    return (
        <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:py-10">
            <div className="mx-auto max-w-7xl">
                {/* Page heading */}
                <div className="mb-7">
                    <h1 className="text-3xl font-normal tracking-tight text-gray-900 sm:text-4xl">
                        My Profile
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Manage your account settings and travel preferences
                    </p>
                </div>

                {/* Main dashboard */}
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[218px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)]">
                    {/* Profile card */}
                    <section className="border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex flex-col items-center text-center">
                            <div className="group relative">
                                <div className="flex size-24 items-center justify-center overflow-hidden rounded-full bg-sky-100 text-2xl font-semibold text-sky-700">
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt={user.name || "Profile"}
                                            className="size-full object-cover"
                                        />
                                    ) : (
                                        initials
                                    )}
                                </div>

                                <span className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full border-2 border-white bg-[#00A8E8] text-white">
                                    <Camera size={14} />
                                </span>
                            </div>

                            <h2 className="mt-3 text-base font-semibold text-gray-900">
                                {user.name || "Wanderlust User"}
                            </h2>

                            <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                <MapPin size={13} />
                                Location not added
                            </p>
                        </div>

                        <div className="my-4 border-t border-gray-100" />

                        <div className="space-y-3 text-xs">
                            <div className="flex items-start justify-between gap-2">
                                <span className="text-gray-500">
                                    Member since
                                </span>

                                <span className="text-right font-semibold text-gray-800">
                                    {memberSince}
                                </span>
                            </div>

                            <div className="flex items-start justify-between gap-2">
                                <span className="text-gray-500">
                                    Nationality
                                </span>

                                <span className="text-right font-semibold text-gray-800">
                                    Not added
                                </span>
                            </div>

                            <div className="flex items-start justify-between gap-2">
                                <span className="text-gray-500">
                                    Email
                                </span>

                                <span className="max-w-[125px] break-all text-right font-medium text-gray-700">
                                    {user.email}
                                </span>
                            </div>
                        </div>

                        <ButtonLink />
                    </section>

                    {/* Travel statistics */}
                    <section className="min-w-0">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-base font-semibold text-gray-900">
                                Travel Statistics
                            </h2>

                            <Link
                                href="/my-bookings"
                                className="text-xs font-medium text-[#00A8E8] hover:underline"
                            >
                                View bookings
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {statistics.map((stat) => {
                                const Icon = stat.icon;

                                return (
                                    <div
                                        key={stat.label}
                                        className="flex min-h-[86px] items-center justify-between border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:border-sky-200 hover:shadow-md sm:px-5"
                                    >
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-500">
                                                {stat.label}
                                            </p>

                                            <p className="mt-1 break-words text-lg font-semibold text-gray-800">
                                                {stat.value}
                                            </p>
                                        </div>

                                        <div
                                            className={`ml-3 flex size-10 shrink-0 items-center justify-center rounded-full ${stat.color}`}
                                        >
                                            <Icon size={19} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Account information */}
                        <div className="mt-6 border border-gray-200 p-5 shadow-sm sm:p-6">
                            <h2 className="text-base font-semibold text-gray-900">
                                Account Information
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Your account details and quick links.
                            </p>

                            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="flex min-w-0 flex-1 items-center gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[#00A8E8]">
                                        <UserRound size={18} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Account name
                                        </p>
                                        <p className="truncate text-sm font-medium text-gray-800">
                                            {user.name || "Not provided"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex min-w-0 flex-1 items-center gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                                        <CalendarDays size={18} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Email verification
                                        </p>
                                        <p className="text-sm font-medium text-gray-800">
                                            {user.emailVerified
                                                ? "Verified"
                                                : "Not verified"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link
                                    href="/my-bookings"
                                    className="inline-flex items-center gap-2 bg-[#00A8E8] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-sky-600"
                                >
                                    <CalendarDays size={15} />
                                    My Bookings
                                </Link>

                                <Link
                                    href="/destinations"
                                    className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2.5 text-xs font-medium text-gray-700 transition hover:border-[#00A8E8] hover:text-[#00A8E8]"
                                >
                                    <Plane size={15} />
                                    Explore Destinations
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

function ButtonLink() {
    return (
        <Link
            href="/profile"
            className="mt-5 flex w-full items-center justify-center gap-2 bg-[#17A2B8] px-3 py-2.5 text-xs font-medium text-white transition hover:bg-[#138496]"
        >
            <Pencil size={14} />
            Edit Profile
        </Link>
    );
}

export default ProfilePage;
