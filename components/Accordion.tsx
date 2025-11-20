"use client";

import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { FiPlus, FiMinus } from 'react-icons/fi';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  // We need a ref to the content container to animate its height
  const contentRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect is perfect for animations that depend on DOM layout
  useLayoutEffect(() => {
    if (contentRef.current) {
      // Use GSAP to animate the height and opacity
      gsap.to(contentRef.current, {
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        marginTop: isOpen ? '16px' : '0px',
        duration: 0.4,
        ease: 'power2.inOut',
      });
    }
  }, [isOpen]); // This effect re-runs whenever 'isOpen' changes

  return (
    <div className="border-b border-neutral-800 py-6 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-sm font-bold uppercase tracking-widest">{title}</h3>
        <div className="text-lg">
          {isOpen ? <FiMinus /> : <FiPlus />}
        </div>
      </button>
      {/* The content is always in the DOM, just hidden with height: 0 */}
      <div ref={contentRef} style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
        <div className="prose prose-invert prose-sm text-neutral-400 max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}