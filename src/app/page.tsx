import { Banner } from "@/components/home/banner";
import { JourneyCta } from "@/components/home/journey-cta";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChooseUs } from "@/components/home/why-choose-us";


export default function Home() {
  return (
    <div >
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <JourneyCta />
    </div>
  );
}
