"use client"

import { useRouter } from "next/navigation";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const DeleteDestinationDialog = ({ destination }: { destination: { _id: string; name: string } }) => {
    const router = useRouter();


    const handleDelete = async () => {
        try {
            const res = await fetch(
                `http://localhost:8000/destinations/${destination._id}`,
                { method: "DELETE" }
            );

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(data?.message || "Failed to delete destination.");
            }

            toast.success(`${destination.name} deleted successfully!`);
            router.push("/destinations");
        } catch (error) {
            console.error("Delete error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );
        }
    };



    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger render={
                    <Button
                        type="button"
                        variant="outline"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm transition-all duration-200 hover:border-red-600 hover:bg-red-600 hover:text-white active:scale-95 cursor-pointer"
                    >
                        <Trash2 className="size-4" />
                        Delete
                    </Button>
                }>
                    Show Dialog
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure Delete This Destination?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="cursor-pointer" variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DeleteDestinationDialog;