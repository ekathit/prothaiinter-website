import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyChoose from "../components/WhyChoose";
import Solutions from "../components/Solutions";
import Industries from "../components/Industries";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChoose />
      <Solutions />
      <Industries />
      <Projects />
      <Contact />
    </>
  );
}