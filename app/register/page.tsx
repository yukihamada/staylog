import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import RegistrationForm from '@/components/ui/Registration/RegistrationForm';
import { redirect } from 'next/navigation';

interface RegisterPageProps {
  searchParams: { booking_id?: string };
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
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
          Guest Registration
        </h1>
        <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
          Please provide your information as required by the Ryokan Business Act.
        </p>
      </div>
      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-zinc-900 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegistrationForm bookingId={bookingId} user={user} />
        </div>
      </div>
    </div>
  );
}