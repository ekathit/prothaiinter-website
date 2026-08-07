import Navbar from "@/components/Navbar";
import HeroTh from "@/components/HeroTh";
import WhyChooseTh from "@/components/WhyChooseTh";
import SolutionsTh from "@/components/SolutionsTh";
import IndustriesTh from "@/components/IndustriesTh";
import ProjectsTh from "@/components/ProjectsTh";
import Contact from "@/components/Contact";
import FloatingContactBar from "@/components/FloatingContactBar";


export default function ThaiPage() {
  return (
    <>
      <Navbar />
      <HeroTh />
      <WhyChooseTh />
      <SolutionsTh />
      <IndustriesTh />
      <ProjectsTh />
      <Contact />
      <FloatingContactBar />

    </>
  );
}
