'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { User } from '@supabase/supabase-js';

interface ConfirmationContentProps {
  bookingId: string;
  user: User | null | undefined;
}

export default function ConfirmationContent({ bookingId, user }: ConfirmationContentProps) {
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const registrationUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/register?booking_id=${bookingId}`
    : '';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(registrationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'StayLog - Guest Registration',
          text: `Please register your guest information. Booking ID: ${bookingId}`,
          url: registrationUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="bg-zinc-900 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-white">Registration Successful</h3>
        <p className="mt-1 max-w-2xl text-sm text-zinc-300">
          Your information has been successfully registered. Booking ID: {bookingId}
        </p>
      </div>
      <div className="border-t border-zinc-700 px-4 py-5 sm:p-6">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h3 className="mt-2 text-xl font-medium text-white">Registration Complete!</h3>
          <div className="mt-3 text-sm text-zinc-300">
            <p>Thank you for registering your information.</p>
            <p className="mt-2">If there are other guests in your party, you can share the registration link with them.</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="rounded-md bg-zinc-800 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-indigo-200">
                  Share this link with other guests in your party to register their information.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="registration-url" className="block text-sm font-medium text-white">
            Registration URL
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="registration-url"
              id="registration-url"
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-zinc-700 bg-zinc-800 text-white"
              value={registrationUrl}
              readOnly
            />
            <button
              type="button"
              onClick={handleCopyUrl}
              className="inline-flex items-center px-3 py-2 border border-l-0 border-zinc-700 rounded-r-md bg-zinc-800 text-zinc-300 hover:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {copied ? (
                <span className="text-green-500">Copied!</span>
              ) : (
                <span>Copy</span>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <Button
            variant="slim"
            onClick={() => setShowQR(!showQR)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {showQR ? 'Hide QR Code' : 'Show QR Code'}
          </Button>
          
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <Button
              variant="slim"
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Share
            </Button>
          )}
          
          <Button
            variant="slim"
            onClick={() => router.push('/')}
            className="inline-flex items-center px-4 py-2 border border-zinc-700 rounded-md shadow-sm text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
          >
            Back to Home
          </Button>
        </div>

        {showQR && (
          <div className="mt-6 flex justify-center">
            <div className="p-4 bg-white rounded-lg">
              {/* This would be a real QR code in production */}
              <div className="w-64 h-64 bg-black flex items-center justify-center text-white">
                QR Code for {bookingId}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}