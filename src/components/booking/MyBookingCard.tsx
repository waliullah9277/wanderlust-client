'use client'
import Image from "next/image";
import Link from "next/link";
import {
    CalendarDays,
    MapPin,
    Eye,
    Trash2,
    CheckCircle2,
    Clock3,
} from "lucide-react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

export interface Booking {
    _id: string;
    destinationId?: string;
    name: string;
    country?: string;
    price: number | string;
    imageUrl?: string;
    image?: string;
    departureDate: string;
    status?: string;
}

interface MyBookingCardProps {
    booking: Booking;
}

const MyBookingCard = ({ booking }: MyBookingCardProps) => {
    const status = booking.status || "Pending";
    const isConfirmed = status.toLowerCase() === "confirmed";
    const image = booking.imageUrl || booking.image;

    const handleCancelBooking = async () => {
        const token = await getTokenFromClient()
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/my-booking/${booking._id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const data = res.json()
        console.log(data)
        toast.success(`${booking.name} has deleted Successfully!`)
        redirect("/my-bookings")
    }


    return (
        <article className="group flex flex-col gap-4 border border-gray-200 bg-white p-3 transition hover:border-sky-200 hover:shadow-md sm:flex-row sm:items-center sm:gap-5 sm:p-4">
            {/* Destination Image */}
            <div className="relative h-48 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-32 sm:w-56">
                {image ? (
                    <Image
                        src={image}
                        alt={booking.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 224px"
                        className="object-cover transition duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No image available
                    </div>
                )}
            </div>

            {/* Booking Information */}
            <div className="min-w-0 flex-1">
                <div
                    className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${isConfirmed
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                        }`}
                >
                    {isConfirmed ? (
                        <CheckCircle2 size={14} />
                    ) : (
                        <Clock3 size={14} />
                    )}
                    {status}
                </div>

                <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                    {booking.name}
                </h2>

                {booking.country && (
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                        <MapPin size={15} />
                        {booking.country}
                    </p>
                )}

                <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <CalendarDays size={15} />
                    Departure:{" "}
                    {booking.departureDate
                        ? new Date(
                            `${booking.departureDate.slice(0, 10)}T00:00:00`
                        ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })
                        : "Not specified"}
                </p>

                <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={15} />
                    Booking ID: {booking._id}
                </p>

                <p className="mt-2 text-2xl font-semibold text-sky-500">
                    ${Number(booking.price).toLocaleString("en-BD")}
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex shrink-0 items-center gap-2 sm:self-end">
                <button
                    onClick={handleCancelBooking}
                    type="button"
                    title="Connect this button to your booking cancellation API"
                    className="inline-flex items-center justify-center gap-1.5 border border-red-300 px-3 py-2 text-xs font-medium text-red-500 opacity-70 sm:px-4 cursor-pointer"
                >
                    <Trash2 size={14} />
                    Cancel
                </button>

                <Link
                    href={`/destinations/${booking.destinationId || booking._id}`}
                    className="inline-flex items-center justify-center gap-1.5 bg-sky-500 px-4 py-2 text-xs font-medium text-white transition hover:bg-sky-600 cursor-pointer"
                >
                    <Eye size={14} />
                    View
                </Link>
            </div>
        </article>
    );
};

export default MyBookingCard;
