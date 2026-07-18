"use client";

// Adapted from 21st.dev "Vertical Cut Reveal" (cnippet.dev), ported from the
// `motion/react` package to this project's existing `framer-motion` dependency.
import { motion, type HTMLMotionProps } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type SpanTransition = HTMLMotionProps<"span">["transition"];

function splitIntoChars(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
}

type WordObject = {
  characters: string[];
  needsSpace: boolean;
};

export type VerticalCutRevealRef = {
  startAnimation: () => void;
  reset: () => void;
};

export type VerticalCutRevealProps = {
  children: string;
  reverse?: boolean;
  transition?: SpanTransition;
  splitBy?: "words" | "characters" | "lines";
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  containerClassName?: string;
  wordLevelClassName?: string;
  elementLevelClassName?: string;
  autoStart?: boolean;
  onComplete?: () => void;
};

export const VerticalCutReveal = forwardRef<
  VerticalCutRevealRef,
  VerticalCutRevealProps
>(
  (
    {
      children: text,
      reverse = false,
      transition = { damping: 22, stiffness: 190, type: "spring" },
      splitBy = "words",
      staggerDuration = 0.2,
      staggerFrom = "first",
      containerClassName,
      wordLevelClassName,
      elementLevelClassName,
      autoStart = true,
      onComplete,
    },
    ref
  ) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const elements = useMemo((): WordObject[] => {
      const words = text.split(" ");
      if (splitBy === "characters") {
        return words.map((word, i) => ({
          characters: splitIntoChars(word),
          needsSpace: i !== words.length - 1,
        }));
      }
      const parts = splitBy === "lines" ? text.split("\n") : words;
      return parts.map((part, i) => ({
        characters: [part],
        needsSpace: i !== parts.length - 1,
      }));
    }, [text, splitBy]);

    const totalChars = useMemo(
      () =>
        elements.reduce(
          (acc, word) => acc + word.characters.length + (word.needsSpace ? 1 : 0),
          0
        ),
      [elements]
    );

    const getStaggerDelay = useCallback(
      (index: number) => {
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last")
          return (totalChars - 1 - index) * staggerDuration;
        return Math.abs(Math.floor(totalChars / 2) - index) * staggerDuration;
      },
      [totalChars, staggerFrom, staggerDuration]
    );

    const startAnimation = useCallback(() => setIsAnimating(true), []);

    useImperativeHandle(ref, () => ({
      reset: () => setIsAnimating(false),
      startAnimation,
    }));

    useEffect(() => {
      if (autoStart) startAnimation();
    }, [autoStart, startAnimation]);

    const variants = useMemo(
      () => ({
        hidden: { y: reverse ? "-100%" : "100%" },
        visible: (i: number) => ({
          y: 0,
          transition: {
            ...transition,
            delay: getStaggerDelay(i),
          },
        }),
      }),
      [reverse, transition, getStaggerDelay]
    );

    let charCounter = 0;

    return (
      <span
        className={cn(
          containerClassName,
          "flex flex-wrap whitespace-pre-wrap",
          splitBy === "lines" && "flex-col"
        )}
      >
        <span className="sr-only">{text}</span>
        {elements.map((wordObj, wordIndex) => (
          <span
            aria-hidden="true"
            className={cn("inline-flex overflow-hidden", wordLevelClassName)}
            key={wordIndex}
          >
            {wordObj.characters.map((char, charIndex) => {
              const globalIndex = charCounter++;
              return (
                <span
                  className={cn(elementLevelClassName, "relative whitespace-pre-wrap")}
                  key={charIndex}
                >
                  <motion.span
                    animate={isAnimating ? "visible" : "hidden"}
                    className="inline-block"
                    custom={globalIndex}
                    initial="hidden"
                    onAnimationComplete={
                      wordIndex === elements.length - 1 &&
                      charIndex === wordObj.characters.length - 1
                        ? onComplete
                        : undefined
                    }
                    variants={variants}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
            {wordObj.needsSpace && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    );
  }
);

VerticalCutReveal.displayName = "VerticalCutReveal";
