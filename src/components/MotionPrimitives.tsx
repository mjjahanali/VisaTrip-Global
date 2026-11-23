import React from 'react';
import { m, type Variants } from 'motion/react';

export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.12 as const,
};

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Scroll-triggered fade-up (runs once, GPU transform + opacity only, < 400ms).
 */
export function FadeUp({ children, className, delay = 0, y = 16 }: FadeUpProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.34, delay, ease: MOTION_EASE }}
      className={className}
    >
      {children}
    </m.div>
  );
}

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.02,
    },
  },
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: MOTION_EASE,
    },
  },
};

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Staggered card grid container — triggers once on scroll without blocking interaction.
 */
export function StaggerGroup({ children, className }: StaggerGroupProps) {
  return (
    <m.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.06 }}
      className={className}
    >
      {children}
    </m.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Child item inside a StaggerGroup (transform + opacity only, 320ms).
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <m.div variants={staggerItemVariants} className={className}>
      {children}
    </m.div>
  );
}

interface PageTransitionProps {
  routeKey: string;
  children: React.ReactNode;
}

/**
 * Lightweight route enter-fade (240ms opacity only — zero navigation delay or CLS).
 */
export function PageTransition({ routeKey, children }: PageTransitionProps) {
  return (
    <m.div
      key={routeKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.24, ease: MOTION_EASE }}
    >
      {children}
    </m.div>
  );
}
