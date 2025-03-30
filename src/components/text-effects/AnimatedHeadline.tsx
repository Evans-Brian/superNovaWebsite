'use client';

interface AnimatedHeadlineProps {
  text: string;
}

export function AnimatedHeadline({ text }: AnimatedHeadlineProps) {
  return (
    <span className="text-white font-bold">
      {text}
    </span>
  );
}
