import { motion, type Transition, type Variants } from 'framer-motion';
import { type FC, type ReactNode } from 'react';

interface FramerAnimationProps {
  duration?: number; // 지속 시간
  delay?: number; // 지연 시간
  yStart?: number; // 시작 Y 위치
  children: ReactNode; // 애니메이션 대상 요소
  once?: boolean; // 애니메이션을 한 번만 실행할지 여부 (기본값: true)
  amount?: number | 'some' | 'all'; // 애니메이션 트리거 시점
}

const ANIMATE_DURATION = 0.8;
const STARGGER_DURATION = 0.2;
const SCROLL_AMOUNT = 0.5;

export const FadeInFromTop: FC<FramerAnimationProps> = ({
  duration = ANIMATE_DURATION,
  delay = 0,
  yStart = -50,
  children,
  once = true,
  amount = SCROLL_AMOUNT,
}) => {
  const variants: Variants = {
    // initial: 컴포넌트가 처음 마운트될 때의 상태 (시작 상태)
    initial: {
      opacity: 0,
      y: yStart,
    },
    // animate: 컴포넌트가 나타나면서 도달할 최종 상태
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: 'easeInOut',
        // 자식 요소들의 애니메이션을 특정 간격에 따라 순차적으로 실행
        staggerChildren: STARGGER_DURATION,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial='initial'
      whileInView='animate'
      viewport={{ once: once, amount: amount }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInFromBottom: FC<FramerAnimationProps> = ({
  duration = ANIMATE_DURATION,
  delay = 0,
  yStart = 50,
  children,
  once = true,
  amount = SCROLL_AMOUNT,
}) => {
  const variants: Variants = {
    initial: {
      opacity: 0,
      y: yStart,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: 'easeInOut',
        staggerChildren: STARGGER_DURATION,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial='initial'
      whileInView='animate'
      viewport={{ once: once, amount: amount }}
    >
      {children}
    </motion.div>
  );
};

export const FadeIn: FC<FramerAnimationProps> = ({
  duration = ANIMATE_DURATION,
  delay = 0,
  children,
  once = true,
  amount = SCROLL_AMOUNT,
}) => {
  const variants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: 'easeInOut',
        staggerChildren: STARGGER_DURATION,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial='initial'
      whileInView='animate'
      viewport={{ once: once, amount: amount }}
    >
      {children}
    </motion.div>
  );
};

// 자식 요소(staggerChildren)에 적용할 애니메이션
export const itemVariantsFromTop = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: ANIMATE_DURATION,
      ease: 'easeInOut',
    } as Transition,
  },
};

export const itemVariantsFromBottom = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: ANIMATE_DURATION,
      ease: 'easeInOut',
    } as Transition,
  },
};
