'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { User } from '@supabase/supabase-js';

interface RegistrationFormProps {
  bookingId: string;
  user: User | null | undefined;
}

export default function RegistrationForm({ bookingId, user }: RegistrationFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    dateOfBirth: '',
    idPhoto: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, idPhoto: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real implementation, this would send the data to the server
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to confirmation page
      router.push(`/register/confirmation?booking_id=${bookingId}`);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-zinc-800 text-white"
            placeholder="e.g. John Smith"
          />
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-white">
          Address <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            id="address"
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-zinc-800 text-white"
            placeholder="e.g. 123 Main St, New York, NY 10001"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-white">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-zinc-800 text-white"
            placeholder="e.g. 123-456-7890"
          />
        </div>
      </div>

      <div>
        <label htmlFor="nationality" className="block text-sm font-medium text-white">
          Nationality <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            id="nationality"
            name="nationality"
            type="text"
            required
            value={formData.nationality}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-zinc-800 text-white"
            placeholder="e.g. United States"
          />
        </div>
      </div>

      <div>
        <label htmlFor="passportNumber" className="block text-sm font-medium text-white">
          Passport Number (for non-Japanese nationals)
        </label>
        <div className="mt-1">
          <input
            id="passportNumber"
            name="passportNumber"
            type="text"
            value={formData.passportNumber}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-zinc-800 text-white"
            placeholder="e.g. AB1234567"
          />
        </div>
        <p className="mt-1 text-sm text-zinc-400">Not required for Japanese nationals</p>
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-white">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            required
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-zinc-800 text-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="idPhoto" className="block text-sm font-medium text-white">
          ID Photo <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            id="idPhoto"
            name="idPhoto"
            type="file"
            required
            accept="image/*"
            onChange={handleFileChange}
            className="appearance-none block w-full px-3 py-2 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-zinc-800 text-white"
          />
        </div>
        <p className="mt-1 text-sm text-zinc-400">
          Please upload a photo of your ID (driver's license, passport, etc.).
          For privacy protection, please hide any sensitive information.
        </p>
      </div>

      <div>
        <Button
          variant="slim"
          type="submit"
          loading={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </Button>
      </div>
    </form>
  );
}