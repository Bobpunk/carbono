"use client";

// useState not currently used but kept for future interactivity
import Link from "next/link";

// Import shared components
import { HeaderProvider } from "@/components/shared/header/HeaderContext";
// import HeaderBrandKit from "@/components/shared/header/BrandKit/BrandKit"; // Not used in current implementation
import HeaderWrapper from "@/components/shared/header/Wrapper/Wrapper";
import HeaderDropdownWrapper from "@/components/shared/header/Dropdown/Wrapper/Wrapper";

// Import hero section components
import HomeHeroBackground from "@/components/app/(home)/sections/hero/Background/Background";
import { BackgroundOuterPiece } from "@/components/app/(home)/sections/hero/Background/BackgroundOuterPiece";
import HomeHeroBadge from "@/components/app/(home)/sections/hero/Badge/Badge";
import HomeHeroPixi from "@/components/app/(home)/sections/hero/Pixi/Pixi";
import HomeHeroTitle from "@/components/app/(home)/sections/hero/Title/Title";
import HeroInput from "@/components/app/(home)/sections/hero-input/HeroInput";
import { Connector } from "@/components/shared/layout/curvy-rect";
import HeroFlame from "@/components/shared/effects/flame/hero-flame";


export default function LandingPage() {
  return (
    <HeaderProvider>
      <div className="min-h-screen bg-background-base">
        {/* Header/Navigation Section */}
        <HeaderDropdownWrapper />

        <div className="sticky top-0 left-0 w-full z-[101] bg-background-base header">
          <div className="absolute top-0 cmw-container border-x border-border-faint h-full pointer-events-none" />
          <div className="h-1 bg-border-faint w-full left-0 -bottom-1 absolute" />
          
          <div className="cmw-container absolute h-full pointer-events-none top-0">
            <Connector className="absolute -left-[10.5px] -bottom-11" />
            <Connector className="absolute -right-[10.5px] -bottom-11" />
          </div>

          <HeaderWrapper>
            <div className="max-w-[900px] mx-auto w-full flex justify-between items-center">
              <div className="flex gap-24 items-center">
                <Link href="/" className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="36" height="36">
                    <path d="M 387.9 112.1 A 195 195 0 0 0 353.3 84.6 L 316.2 144.0 A 125 125 0 0 1 338.4 161.6 Z" fill="#4285F4"/>
                    <path d="M 353.3 84.6 A 195 195 0 0 0 57.9 216.1 L 126.9 228.3 A 125 125 0 0 1 316.2 144.0 Z" fill="#EA4335"/>
                    <path d="M 57.9 216.1 A 195 195 0 0 0 112.1 387.9 L 161.6 338.4 A 125 125 0 0 1 126.9 228.3 Z" fill="#FBBC05"/>
                    <path d="M 112.1 387.9 A 195 195 0 0 0 387.9 387.9 L 338.4 338.4 A 125 125 0 0 1 161.6 338.4 Z" fill="#34A853"/>
                  </svg>
                </Link>
              </div>
            </div>
          </HeaderWrapper>
        </div>

        {/* Hero Section */}
        <section className="overflow-x-clip" id="home-hero">
          <div className="pt-28 lg:pt-254 lg:-mt-100 pb-115 relative" id="hero-content">
            <HomeHeroPixi />
            <HeroFlame />
            <BackgroundOuterPiece />
            <HomeHeroBackground />

            <div className="relative container px-16">
              <HomeHeroBadge />
              <HomeHeroTitle />
              
              {/* Hero Input */}
              <div className="mt-24">
                <HeroInput />
              </div>
            </div>
          </div>
        </section>
      </div>
    </HeaderProvider>
  );
}