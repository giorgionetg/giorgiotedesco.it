'use client';

import AboutFull from "@/app/components/googlestudioai/AboutFull";
import { useState } from 'react';
import BookingModal from "@/app/components/googlestudioai/BookingModal";


export default function AboutMe() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            {/* <h1>About Me</h1> header removed as it might be redundant with AboutFull's own header, or we can keep it hidden */}
            <AboutFull onBookCall={() => setIsModalOpen(true)} />
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}