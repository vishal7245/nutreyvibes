import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Food from "@/components/Food";
import Hero from "@/components/Hero";
import Guide from '@/components/Guide';
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <Food />
      <Guide />
      <Features />
      <CTA />
    </>
  );
}
