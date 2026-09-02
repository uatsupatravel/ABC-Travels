import React from 'react';
import { Tour } from '@/types';
import ExpeditionRouteDrawer from './ExpeditionRouteDrawer';
import ChapterJourneyTimeline from './ChapterJourneyTimeline';

interface TourDetailExperienceProps {
  tour: Tour;
}

export default function TourDetailExperience({ tour }: TourDetailExperienceProps) {
  return (
    <>
      {/* 1. PERSISTENT EXPEDITION ROUTE DRAWER (Left Floating Tab & Bottom Mobile Pill) */}
      <ExpeditionRouteDrawer tour={tour} />

      {/* 2. CURATED DESTINATION CHAPTER HUBS & TRANSIT BRIDGES */}
      <ChapterJourneyTimeline tour={tour} />
    </>
  );
}
