'use client';

import { useState, useEffect } from 'react';

function CountdownTimer({ targetDate, dict } : {targetDate : string, dict : any}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set your target date here - replace with your actual target date
    const target = targetDate ? new Date(targetDate) : new Date('2024-12-31T23:59:59');
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const targetTime = target.getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="p-8 text-center border-[#FFFFFF]">
      <div className="flex justify-center space-x-8 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-[#FFFFFF]">{timeLeft.days}</div>
          <div className="text-sm text-[#FFFFFF] font-medium">{dict.home.days}</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-[#FFFFFF]">{timeLeft.hours}</div>
          <div className="text-sm text-[#FFFFFF] font-medium">{dict.home.hours}</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-[#FFFFFF]">{timeLeft.minutes}</div>
          <div className="text-sm text-[#FFFFFF] font-medium">{dict.home.mins}</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-[#FFFFFF]">{timeLeft.seconds}</div>
          <div className="text-sm text-[#FFFFFF] font-medium">{dict.home.sec}</div>
        </div>
      </div>
      <h3 className="text-3xl md:text-3xl font-bold text-[#FFFFFF]">
        {dict?.home?.untilCountdown || 'Until Launch'}
      </h3>
    </div>
  );
}

// Wrapper component that uses dynamic import
import dynamic from 'next/dynamic';

const DynamicCountdown = dynamic(() => Promise.resolve(CountdownTimer), {
  ssr: false,
  loading: () => (
    <div className="p-8 text-center border-[#FFFFFF]">
      <div className="flex justify-center space-x-8 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-[#FFFFFF]">0</div>
          <div className="text-sm text-[#FFFFFF] font-medium">DAYS</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-[#FFFFFF]">0</div>
          <div className="text-sm text-[#FFFFFF] font-medium">HOURS</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-[#FFFFFF]">0</div>
          <div className="text-sm text-[#FFFFFF] font-medium">MINUTES</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-[#FFFFFF]">0</div>
          <div className="text-sm text-[#FFFFFF] font-medium">SECONDS</div>
        </div>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-[#FFFFFF]">
        Loading...
      </h3>
    </div>
  )
});

export default DynamicCountdown;