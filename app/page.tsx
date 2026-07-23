import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { NewsSection } from "@/components/landing/NewsSection";
import { FeatureHighlights } from "@/components/landing/FeatureHighlights";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrustSection } from "@/components/landing/TrustSection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { FinalCtaSection } from "@/components/landing/FinalCtaSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { Footer } from "@/components/landing/Footer";
import { ScrollDepthTracker } from "@/components/landing/ScrollDepthTracker";

export default function Home() {
  return (
    <>
      <a href="#top" className="sr-only">
        본문으로 건너뛰기
      </a>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <NewsSection />
        <FeatureHighlights />
        <HowItWorks />
        <TrustSection />
        <ReviewsSection />
        <FinalCtaSection />
        <FaqSection />
      </main>
      <Footer />
      <ScrollDepthTracker />
    </>
  );
}
