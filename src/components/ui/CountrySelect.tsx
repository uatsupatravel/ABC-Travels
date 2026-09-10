'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { COUNTRIES, CountryOption } from '@/lib/constants/countries';
import { ChevronDown, Search, Check } from 'lucide-react';

interface CountrySelectProps {
  value: string; // e.g. "Canada" or "CA"
  onChange: (country: CountryOption) => void;
  error?: string;
  className?: string;
}

export default function CountrySelect({
  value,
  onChange,
  error,
  className = '',
}: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Match country by name or code
  const currentCountry =
    COUNTRIES.find(
      (c) =>
        c.name.toLowerCase() === value.toLowerCase() ||
        c.code.toUpperCase() === value.toUpperCase()
    ) || COUNTRIES[0];

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dialCode.includes(searchQuery)
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleSelect = (country: CountryOption) => {
    onChange(country);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-12 px-3.5 bg-[#FBF9F5] dark:bg-card rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
          error ? 'border-red-500 ring-1 ring-red-500' : 'border-[#E4DDD0] focus:border-[#1C1C1E]'
        } ${className}`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-5 h-3.5 rounded-xs overflow-hidden border border-black/10 shrink-0 bg-white">
            <Image
              src={`https://flagcdn.com/w40/${currentCountry.code.toLowerCase()}.png`}
              alt={currentCountry.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <span className="text-sm font-medium text-[#1C1C1E] truncate">
            {currentCountry.name}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-[#686461] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {error && <span className="text-[11px] text-red-600 mt-1 block">{error}</span>}

      {/* Downward-Opening Luxury Popover Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-full bg-white rounded-xl border border-[#E4DDD0] shadow-2xl z-[99999] overflow-hidden flex flex-col animate-in fade-in-50 zoom-in-95 duration-150">
          {/* Quick Search */}
          <div className="p-2.5 border-b border-[#E4DDD0] bg-[#FBF9F5] flex items-center gap-2 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#686461] shrink-0 ml-1" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country..."
              className="w-full bg-transparent text-base sm:text-xs text-[#1C1C1E] placeholder:text-[#686461]/60 focus:outline-none"
            />
          </div>

          {/* Scrollable Country List */}
          <div className="max-h-52 overflow-y-auto p-1 space-y-0.5">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-[#686461]">
                No country found
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = c.code === currentCountry.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`w-full px-3 py-2 rounded-lg text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#FEDEB1]/50 text-[#1C1C1E] font-bold'
                        : 'text-[#1C1C1E] hover:bg-[#F4F0E8]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-5 h-3.5 rounded-xs overflow-hidden border border-black/10 shrink-0 bg-white">
                        <Image
                          src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                          alt={c.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <span className="truncate">{c.name}</span>
                    </div>

                    {isSelected && <Check className="w-3.5 h-3.5 text-[#9E7D53]" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
