'use client'

import { Destination } from "@/app/destinations/page";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { ArrowRight, Check } from "lucide-react";
import React from "react";
import { toast } from "sonner";


const BookingCard = ({ destination }: { destination: Destination }) => {
    // console.log(destination)
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleBooking = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()
        const departureDate = e.target.departureDate.value
        // console.log(departureDate);

        const data = {
            username: user?.name,
            email: user?.email,
            image: user?.image,
            ...destination,
            departureDate: departureDate,
            bookingDate: new Date()
        }

        const token = await getTokenFromClient()

        // console.log(data)
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/booking`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        const bookingResponse = await res.json();

        if (!res.ok) {
            toast.error(
                bookingResponse.message || "Booking failed!"
            );
            return;
        }

        toast.success(
            `${destination.name} booked successfully!`
        );

    }

    return (
        <aside className="h-fit border border-border bg-background p-5 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs text-muted-foreground">
                Starting from
            </p>

            <p className="mt-1 text-2xl font-medium tracking-tight text-[#00A8E8]">
                ${destination.price.toLocaleString("en-US")}
            </p>

            <p className="text-xs text-muted-foreground">
                per person
            </p>

            <form onSubmit={handleBooking}>
                <div className="mt-7">
                    <label
                        htmlFor="departureDate"
                        className="mb-2 block text-xs text-muted-foreground"
                    >
                        Departure Date
                    </label>

                    <input
                        id="departureDate"
                        type="date"
                        name="departureDate"
                        defaultValue={destination.departureDate}
                        className="h-10 w-full border border-border bg-muted/30 px-3 text-xs outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-5 flex h-11 w-full items-center justify-center gap-2 bg-[#17A2B8] px-4 text-xs font-medium text-white transition-colors hover:bg-[#138496]"
                >
                    Book Now
                    <ArrowRight className="size-4" />
                </button>
            </form>

            <ul className="mt-4 space-y-2.5 text-[11px] text-muted-foreground">
                <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-green-600" />
                    Free cancellation up to 7 days
                </li>
                <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-green-600" />
                    Travel assistance included
                </li>
                <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-green-600" />
                    Customer support
                </li>
            </ul>
        </aside>
    );
};

export default BookingCard;