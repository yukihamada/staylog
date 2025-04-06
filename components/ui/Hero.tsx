'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useI18n } from '@/i18n/context';

export default function Hero() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <div className="relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-black sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">{t('home.title')}</span>{' '}
                <span className="block text-indigo-600 xl:inline">{t('home.subtitle')}</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {t('home.description')}
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button
                    variant="slim"
                    onClick={() => router.push('/signin/signup')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    {t('common.getStarted')}
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button
                    variant="slim"
                    onClick={() => {
                      const pricingSection = document.querySelector('#pricing');
                      pricingSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    {t('common.viewPricing')}
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-indigo-900 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
          <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('registration.title')}</h3>
              <div className="text-sm text-gray-500">Room 101</div>
            </div>
            <div className="space-y-3">
              <div className="flex flex-col">
                <label className="text-xs text-gray-500">{t('registration.form.fullName')}</label>
                <div className="h-8 bg-gray-100 rounded-md"></div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-500">{t('registration.form.address')}</label>
                <div className="h-8 bg-gray-100 rounded-md"></div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-500">{t('registration.form.idPhoto')}</label>
                <div className="h-8 bg-gray-100 rounded-md"></div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-500">{t('registration.form.phone')}</label>
                <div className="h-8 bg-gray-100 rounded-md"></div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <div className="w-24 h-8 bg-indigo-600 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}