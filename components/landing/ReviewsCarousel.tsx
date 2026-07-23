"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import type { Review } from "@/lib/reviews";
import styles from "./ReviewsSection.module.css";

type ReviewsCarouselProps = {
  reviews: Review[];
};

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLUListElement>({
    loop: reviews.length > 4,
    mode: "snap",
    rubberband: reviews.length > 4,
    slides: { perView: 1.08, spacing: 16 },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 20 },
      },
    },
    created() {
      setLoaded(true);
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  if (reviews.length === 0) {
    return (
      <div className={styles.empty}>
        <p>아직 등록된 후기가 없습니다. 첫 후기를 남겨보세요.</p>
        <Link href="/reviews" className={styles.emptyLink}>
          후기 남기기
        </Link>
      </div>
    );
  }

  const canMove = reviews.length > 4;

  return (
    <div className={styles.carousel}>
      <div className={styles.sliderFrame}>
        <ul
          ref={sliderRef}
          className={`keen-slider ${styles.slider}`}
          aria-label="고객 후기"
        >
          {reviews.map((review) => (
            <li key={review.id} className={`keen-slider__slide ${styles.card}`}>
              <span className={styles.rating} aria-label={`${review.rating}점`}>
                {"★".repeat(review.rating)}
                <span className={styles.ratingOff}>
                  {"★".repeat(5 - review.rating)}
                </span>
              </span>
              <p className={styles.content}>{review.content}</p>
              <span className={styles.author}>{review.author_name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.footer}>
        <p className={styles.dragHint}>카드를 좌우로 드래그해 보세요</p>

        <div className={styles.actions}>
          {loaded && canMove && (
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => instanceRef.current?.prev()}
                aria-label="이전 후기 보기"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <span className="sr-only" aria-live="polite">
                {currentSlide + 1}번째 후기
              </span>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => instanceRef.current?.next()}
                aria-label="다음 후기 보기"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          )}

          <Link href="/reviews" className={styles.moreLink}>
            후기 전체 보기
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
