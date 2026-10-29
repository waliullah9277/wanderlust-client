
import MyBookingCard, { Booking } from "@/components/booking/MyBookingCard";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";


const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user?.email) {
        redirect("/login");
    }

    let bookings: Booking[] = [];
    let errorMessage = "";
    const token = await getTokenFromServer()

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/my-bookings/${encodeURIComponent(user.email)}`,
            {
                cache: "no-store",
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        );

        if (!res.ok) {
            throw new Error("Failed to load your bookings.");
        }

        const data = await res.json();

        // Backend should return an array of booking documents.
        bookings = Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("My bookings error:", error);
        errorMessage = "Unable to load bookings. Please try again later.";
    }

    return (
        <main className="min-h-screen bg-gray-50/70">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                        My Bookings
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Manage and view your upcoming travel plans
                    </p>
                </div>

                {errorMessage ? (
                    <div className="border border-red-200 bg-red-50 p-5 text-sm text-red-600">
                        {errorMessage}
                    </div>
                ) : bookings.length > 0 ? (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <MyBookingCard
                                key={booking._id}
                                booking={booking}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="border border-gray-200 bg-white px-5 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-500">
                            <span className="text-2xl">✈</span>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-900">
                            No bookings yet
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Your next adventure is waiting for you.
                        </p>

                        <Link
                            href="/destinations"
                            className="mt-6 inline-flex bg-sky-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-600"
                        >
                            Explore Destinations
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyBookingsPage;
