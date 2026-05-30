"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Fade-in + slide-up on scroll for any elements matching the selector */
export function useGsapReveal(
  selector: string,
  options?: {
    from?: gsap.TweenVars;
    stagger?: number;
    trigger?: string;
  }
) {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      selector,
      { opacity: 0, y: 40, ...options?.from },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: options?.stagger ?? 0.12,
        scrollTrigger: {
          trigger: options?.trigger ?? selector,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef, dependencies: [selector, options] });

  return containerRef;
}

/** Hero entry timeline — runs once on mount */
export function useGsapHeroEntry(enabled = true) {
  useGSAP(() => {
    if (!enabled) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".gsap-hero-tag",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55 }
    )
      .fromTo(
        ".gsap-hero-h1",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.65 },
        "-=0.3"
      )
      .fromTo(
        ".gsap-hero-desc",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55 },
        "-=0.35"
      )
      .fromTo(
        ".gsap-hero-rating",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45 },
        "-=0.25"
      )
      .fromTo(
        ".gsap-hero-cta",
        { opacity: 0, y: 20, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        "-=0.2"
      )
      .fromTo(
        ".gsap-hero-stats",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45 },
        "-=0.15"
      )
      .fromTo(
        ".gsap-hero-img",
        { opacity: 0, x: 50, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.75 },
        "<0.1"
      );
  }, { dependencies: [enabled] });
}

/** Counter animation for stat numbers */
export function useGsapCounter(selector: string, target: number, suffix = "") {
  useGSAP(() => {
    const el = document.querySelector(selector);
    if (!el) return;
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: target,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: { trigger: selector, start: "top 85%" },
      onUpdate() {
        el.textContent = Math.round(proxy.val).toLocaleString() + suffix;
      },
    });
  }, { dependencies: [selector, target, suffix] });
}
