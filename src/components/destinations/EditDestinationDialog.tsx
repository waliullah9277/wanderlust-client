
"use client";

import { useState } from "react";
import { PackageCheck, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

type Destination = {
    _id: string;
    name: string;
    country: string;
    category: string;
    price: string | number;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
};

const EditDestinationDialog = ({
    destination,
}: {
    destination: Destination;
}) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [form, setForm] = useState<Destination>(destination);

    const update = (field: keyof Destination, value: string) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (isUpdating) return;

        setIsUpdating(true);

        try {
            const { _id, ...rest } = form;

            const updatedData = {
                ...rest,
                price: Number(form.price),
            };

            const res = await fetch(
                `http://localhost:8000/destinations/${destination._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            const data = await res.json().catch(() => null);

            console.log("Update status:", res.status);
            console.log("Update response:", data);

            if (!res.ok) {
                throw new Error(
                    data?.message || "Failed to update destination"
                );
            }

            toast.success("Destination updated successfully!");

            // Close modal only after a successful update
            setOpen(false);

            // Refresh server-rendered destination data
            router.refresh();
        } catch (error) {
            console.error("Update error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button
                        type="button"
                        variant="outline"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white active:scale-95 cursor-pointer"
                    >
                        <Pencil className="size-4" />
                        Edit
                    </Button>
                }
            />

            <DialogContent className="w-[calc(100%-2rem)] min-w-xl max-h-[85dvh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Your Destination</DialogTitle>
                    <DialogDescription>
                        Update your destination details below.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 rounded-sm border border-border bg-white p-6 shadow-sm sm:p-8"
                >
                    <div className="grid gap-5">
                        {/* Destination Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">
                                Destination Name
                            </Label>
                            <Input
                                id="edit-name"
                                placeholder="Bali Paradise"
                                value={form.name}
                                onChange={(event) =>
                                    update("name", event.target.value)
                                }
                                required
                            />
                        </div>

                        {/* Country and Category */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-country">
                                    Country
                                </Label>
                                <Input
                                    id="edit-country"
                                    placeholder="Indonesia"
                                    value={form.country}
                                    onChange={(event) =>
                                        update("country", event.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="edit-category">
                                    Category
                                </Label>
                                <Select
                                    value={form.category}
                                    onValueChange={(value) =>
                                        update("category", value ?? "")
                                    }
                                >
                                    <SelectTrigger
                                        id="edit-category"
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Price and Duration */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-price">
                                    Price (USD)
                                </Label>
                                <Input
                                    id="edit-price"
                                    type="number"
                                    placeholder="e.g., 1299"
                                    value={form.price}
                                    onChange={(event) =>
                                        update("price", event.target.value)
                                    }
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="edit-duration">
                                    Duration
                                </Label>
                                <Input
                                    id="edit-duration"
                                    placeholder="e.g., 7 Days/6 Nights"
                                    value={form.duration}
                                    onChange={(event) =>
                                        update("duration", event.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {/* Departure Date */}
                        <div className="grid gap-2">
                            <Label htmlFor="edit-departureDate">
                                Departure Date
                            </Label>
                            <Input
                                id="edit-departureDate"
                                type="date"
                                value={form.departureDate}
                                onChange={(event) =>
                                    update(
                                        "departureDate",
                                        event.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        {/* Image URL */}
                        <div className="grid gap-2">
                            <Label htmlFor="edit-imageUrl">
                                Image URL
                            </Label>
                            <Input
                                id="edit-imageUrl"
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                value={form.imageUrl}
                                onChange={(event) =>
                                    update("imageUrl", event.target.value)
                                }
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="grid gap-2">
                            <Label htmlFor="edit-description">
                                Description
                            </Label>
                            <Textarea
                                id="edit-description"
                                placeholder="Describe the travel experience..."
                                className="min-h-36"
                                value={form.description}
                                onChange={(event) =>
                                    update("description", event.target.value)
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-wrap justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isUpdating}
                            onClick={() => setOpen(false)}
                            className="gap-2 border-gray-300 bg-white text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                            <X className="size-4" />
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isUpdating}
                            className="gap-2 bg-[#00A8E8] text-white hover:bg-[#0095d1] disabled:cursor-not-allowed cursor-pointer"
                        >
                            <PackageCheck className="size-4" />
                            {isUpdating
                                ? "Updating..."
                                : "Update Travel Package"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDestinationDialog;
