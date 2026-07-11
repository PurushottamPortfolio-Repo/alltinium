import dynamic from "next/dynamic";

const HeroSection = dynamic(
  () => import("@/components/sections/HeroSection").then((module) => module.HeroSection),
  {
    loading: () => <div className="min-h-[40vh]" />,
  },
);

export default function HomePage() {
  return <HeroSection />;
}
