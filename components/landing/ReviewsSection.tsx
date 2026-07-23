import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { getReviews } from "@/lib/reviews";
import { brand } from "@/lib/landing-content";
import { ReviewsCarousel } from "./ReviewsCarousel";

export async function ReviewsSection() {
  const reviews = await getReviews(12);

  return (
    <Section id="reviews" variant="subtle" aria-labelledby="reviews-title">
      <SectionHeading
        id="reviews-title"
        align="center"
        eyebrow="고객 후기"
        title="먼저 써본 분들의 이야기"
        subtitle={`${brand.name}을 이용한 고객들이 남긴 생생한 후기예요.`}
      />

      <ReviewsCarousel reviews={reviews} />
    </Section>
  );
}
