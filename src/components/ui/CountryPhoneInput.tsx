'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { COUNTRIES, CountryOption } from '@/lib/constants/countries';
import { ChevronDown, Search, Check } from 'lucide-react';

interface CountryPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  selectedDialCode: string;
  onDialCodeChange: (dialCode: string) => void;
  selectedCountryCode?: string;
  onCountryChange?: (country: CountryOption) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  variant?: 'boxed' | 'underline';
}

export default function CountryPhoneInput({
  value,
  onChange,
  selectedDialCode,
  onDialCodeChange,
  selectedCountryCode,
  onCountryChange,
  placeholder = '555 123 4567',
  error,
  className = '',
  disabled = false,
  variant = 'boxed',
}: CountryPhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Match by unique country code first (e.g. CA vs US), fallback to dialCode
  const currentCountry =
    (selectedCountryCode
      ? COUNTRIES.find((c) => c.code.toUpperCase() === selectedCountryCode.toUpperCase())
      : null) ||
    COUNTRIES.find((c) => c.dialCode === selectedDialCode) ||
    COUNTRIES[0];

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dialCode.includes(searchQuery) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleSelectCountry = (country: CountryOption) => {
    onDialCodeChange(country.dialCode);
    if (onCountryChange) {
      onCountryChange(country);
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  const isUnderline = variant === 'underline';

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className={
          isUnderline
            ? `h-9 flex items-center border-b border-[#D8CFBE] bg-transparent focus-within:border-[#2C241D] transition-colors ${
                error ? 'border-red-600' : ''
              } ${className}`
            : `flex items-center rounded-lg border bg-[#FBF9F5] dark:bg-card transition-all overflow-hidden focus-within:border-[#1C1C1E] focus-within:ring-1 focus-within:ring-[#1C1C1E] ${
                error ? 'border-red-500 ring-1 ring-red-500' : 'border-[#E4DDD0]'
              } ${className}`
        }
      >
        {/* Country Flag & Dial Code Trigger Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={
            isUnderline
              ? 'h-full px-1 bg-transparent border-r border-[#D8CFBE]/70 flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer shrink-0 select-none'
              : 'h-11 sm:h-12 px-3 bg-[#F4F0E8] dark:bg-muted border-r border-[#E4DDD0] flex items-center gap-2 hover:bg-[#EAE4D8] transition-colors cursor-pointer shrink-0 select-none'
          }
        >
          {/* HD Country Flag Image */}
          <div className="relative w-5 h-3.5 rounded-xs overflow-hidden border border-black/10 shrink-0 bg-white">
            <Image
              src={`https://flagcdn.com/w40/${currentCountry.code.toLowerCase()}.png`}
              alt={currentCountry.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <span
            className={
              isUnderline
                ? 'text-xs font-mono font-medium text-[#2A2421]'
                : 'text-xs font-bold text-[#1C1C1E] font-mono'
            }
          >
            {currentCountry.dialCode}
          </span>

          <ChevronDown
            className={`w-3 h-3 text-[#686461] transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Numeric Phone Number Input */}
        <input
          type="tel"
          inputMode="numeric"
          disabled={disabled}
          value={value}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/[^0-9\s\-\(\)]/g, '');
            onChange(cleaned);
          }}
          placeholder={placeholder}
          className={
            isUnderline
              ? 'flex-1 h-full bg-transparent px-2.5 text-sm text-[#2A2421] placeholder:text-[#A8A096] placeholder:font-light focus:outline-none'
              : 'flex-1 h-11 sm:h-12 bg-transparent px-3 text-sm text-[#1C1C1E] placeholder:text-[#686461]/60 focus:outline-none'
          }
        />
      </div>

      {error && <span className="text-[10px] text-red-600 mt-1 block">{error}</span>}

      {/* Downward-Opening Luxury Popover Dropdown with Unique Code Selection */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-72 max-h-64 bg-white rounded-xl border border-[#E4DDD0] shadow-2xl z-[99999] overflow-hidden flex flex-col animate-in fade-in-50 zoom-in-95 duration-150">
          {/* Search Header */}
          <div className="p-2 border-b border-[#E4DDD0] bg-[#FBF9F5] flex items-center gap-2 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#686461] shrink-0 ml-1" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country or code..."
              className="w-full bg-transparent text-xs text-[#1C1C1E] placeholder:text-[#686461]/60 focus:outline-none"
            />
          </div>

          {/* Scrollable List */}
          <div className="max-h-48 overflow-y-auto p-1 space-y-0.5">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-[#686461]">
                No country found
              </div>
            ) : (
              filteredCountries.map((country) => {
                const isSelected = country.code === currentCountry.code;
                return (
                  <button
                    key={`${country.code}-${country.dialCode}`}
                    type="button"
                    onClick={() => handleSelectCountry(country)}
                    className={`w-full px-2.5 py-2 rounded-lg text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#FEDEB1]/50 text-[#1C1C1E] font-bold'
                        : 'text-[#1C1C1E] hover:bg-[#F4F0E8]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-5 h-3.5 rounded-xs overflow-hidden border border-black/10 shrink-0 bg-white">
                        <Image
                          src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                          alt={country.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <span className="truncate">{country.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="font-mono text-[#686461] font-medium text-[11px]">
                        {country.dialCode}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#9E7D53]" />}
                    </div>
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
