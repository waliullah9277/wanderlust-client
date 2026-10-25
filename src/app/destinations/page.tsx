
import AllDestinationsContent from "@/components/destinations/all-destinations-content";

export interface Destination {
  _id?: string;
  id?: string;
  destinationName: string;
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
    const res = await fetch("http://localhost:8000/destinations", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch destinations");
    }

    const data: unknown = await res.json();

    // API সরাসরি array অথবা { destinations: [...] } দিলে support করবে।
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
