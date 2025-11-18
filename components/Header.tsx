"use client";

import { useState } from "react";
import Link from "next/link";
import { Category } from "@/types";

interface HeaderProps {
  categories: Category[];
}

export function Header({ categories }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Main Header Bar */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/30 backdrop-blur-lg">
        <nav className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="shrink-0">
              <Link
                href="/"
                className="text-3xl font-black text-stone-200 tracking-widest text-primary uppercase"
              >
                BALENCIAGA
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-baseline space-x-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="text-stone-200 hover:text-primary px-3 py-2 text-sm font-bold uppercase tracking-[0.2em] transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none p-2"
                aria-label="Open navigation menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/95 backdrop-blur-md lg:hidden
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col items-center justify-center h-full pt-20 space-y-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="text-stone-200 hover:text-primary text-2xl font-bold uppercase tracking-[0.2em] transition-colors"
              onClick={handleMobileLinkClick}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
