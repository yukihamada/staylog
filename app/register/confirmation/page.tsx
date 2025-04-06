import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import ConfirmationContent from '@/components/ui/Registration/ConfirmationContent';
import { redirect } from 'next/navigation';

interface ConfirmationPageProps {
  searchParams: { booking_id?: string };
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const supabase = createClient();
  const user = await getUser(supabase);
  const bookingId = searchParams.booking_id;

  // If no booking ID is provided, redirect to the home page
  if (!bookingId) {
    return redirect('/');
  }

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
      <div className="sm:flex sm:flex-col sm:align-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
          Registration Complete
        </h1>
        <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
          Thank you for registering your information.
        </p>
      </div>
      <div className="mt-12">
        <ConfirmationContent bookingId={bookingId} user={user} />
      </div>
    </div>
  );
}