import { Banner } from "@/components/home/banner";
import Featured from "@/components/home/featured";
import { JourneyCta } from "@/components/home/journey-cta";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChooseUs } from "@/components/home/why-choose-us";


export default function Home() {
  return (
    <div >
      <Banner />
      <Featured/>
      <WhyChooseUs />
      <Testimonials />
      <JourneyCta />
    </div>
  );
}
