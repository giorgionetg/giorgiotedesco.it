import Image from "next/image";

import Hero from "@/components/landing/hero";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
}
