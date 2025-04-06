import StayLogPricing from '@/components/ui/Pricing/StayLogPricing';
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import Hero from '@/components/ui/Hero';
import Features from '@/components/ui/Features';

export default async function HomePage() {
  const supabase = createClient();
  const user = await getUser(supabase);

  return (
    <>
      <Hero />
      <StayLogPricing user={user} />
      <Features />
    </>
  );
}
