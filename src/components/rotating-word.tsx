'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const WORDS = ['bill', 'scale', 'grow', 'manage'];

export function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number>();
  const measureRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    setWidth(measureRef.current?.offsetWidth);
  }, [index]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="inline-block align-bottom transition-[width] duration-500 ease-out"
      style={{ width }}
    >
      <span
        key={index}
        ref={measureRef}
        className="inline-block whitespace-nowrap text-blue-500"
        style={{ animation: 'word-fade-in 0.5s ease-out' }}
      >
        {WORDS[index]}
      </span>
    </span>
  );
}
