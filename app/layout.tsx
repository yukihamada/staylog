import { Metadata } from 'next';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import { I18nProvider } from '@/i18n/context';
import { defaultLocale } from '@/i18n/config';
import 'styles/main.css';

const title = 'StayLog - Easy & Secure Guest Registration';
const description = 'A service that makes it easy to register guest information based on the Ryokan Business Act.';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description
  }
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang={defaultLocale}>
      <body className="bg-black">
        <I18nProvider>
          <Navbar />
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
          >
            {children}
          </main>
          <Footer />
          <Suspense>
            <Toaster />
          </Suspense>
        </I18nProvider>
      </body>
    </html>
  );
}
