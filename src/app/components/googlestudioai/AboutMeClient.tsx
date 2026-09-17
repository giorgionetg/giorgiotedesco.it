'use client';

import { useState } from 'react';
import AboutFull from '@/app/components/googlestudioai/AboutFull';
import BookingModal from '@/app/components/googlestudioai/BookingModal';

export default function AboutMeClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return <>
    <AboutFull onBookCall={() => setIsModalOpen(true)} />
    <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  </>;
}
