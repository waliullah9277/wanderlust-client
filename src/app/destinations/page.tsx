
import AllDestinationsContent from "@/components/destinations/all-destinations-content";
export const dynamic = "force-dynamic";

export interface Destination {
  _id?: string;
  id?: string;
  name: string;
  country: string;
  category: string;
  price: number | string;
  duration: string;
  departureDate?: string;
  imageUrl: string;
  description?: string;
  rating?: number;
}

const AllDestinationsPage = async () => {
  let destinations: Destination[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/destinations`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch destinations");
    }

    const data: unknown = await res.json();


    if (Array.isArray(data)) {
      destinations = data as Destination[];
    } else if (
      typeof data === "object" &&
      data !== null &&
      "destinations" in data &&
      Array.isArray(data.destinations)
    ) {
      destinations = data.destinations as Destination[];
    }
  } catch (error) {
    console.error("Error fetching destinations:", error);
  }

  return <AllDestinationsContent destinations={destinations} />;
};

export default AllDestinationsPage;
