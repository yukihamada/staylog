'use client';

import Button from '@/components/ui/Button';
import { pricingPlans } from '@/fixtures/pricing-plans';
import { User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useI18n } from '@/i18n/context';

interface Props {
  user: User | null | undefined;
}

type BillingInterval = 'year' | 'month';

export default function StayLogPricing({ user }: Props) {
  const router = useRouter();
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();
  const { t } = useI18n();

  const handleCheckout = async (priceId: string) => {
    setPriceIdLoading(priceId);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signin/signup');
    }

    // 実際のStripe連携が実装されるまでは、アカウントページにリダイレクト
    router.push('/account');
    setPriceIdLoading(undefined);
  };

  return (
    <section className="bg-black" id="pricing">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            {t('pricing.title')}
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            {t('pricing.subtitle')}
          </p>
          <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
            <button
              onClick={() => setBillingInterval('month')}
              type="button"
              className={`${
                billingInterval === 'month'
                  ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                  : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
              } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
            >
              {t('pricing.monthlyBilling')}
            </button>
            <button
              onClick={() => setBillingInterval('year')}
              type="button"
              className={`${
                billingInterval === 'year'
                  ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                  : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
              } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
            >
              {t('pricing.yearlyBilling')}
            </button>
          </div>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {pricingPlans.map((plan) => {
            const price = plan.prices[billingInterval];
            const priceString = new Intl.NumberFormat('ja-JP', {
              style: 'currency',
              currency: price.currency,
              minimumFractionDigits: 0
            }).format(price.amount);
            
            return (
              <div
                key={plan.id}
                className={cn(
                  'rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
                  {
                    'border border-indigo-500': plan.id === 'standard',
                    'border border-zinc-800': plan.id !== 'standard'
                  }
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 text-white">
                    {t(`pricing.plans.${plan.id}.name`)}
                  </h2>
                  <p className="mt-4 text-zinc-300">{t(`pricing.plans.${plan.id}.description`)}</p>
                  <p className="mt-8">
                    <span className="text-5xl font-extrabold white">
                      {priceString}
                    </span>
                    <span className="text-base font-medium text-zinc-100">
                      {billingInterval === 'month' ? t('pricing.perMonth') : t('pricing.perYear')}
                    </span>
                  </p>
                  <Button
                    variant="slim"
                    type="button"
                    loading={priceIdLoading === price.id}
                    onClick={() => handleCheckout(price.id)}
                    className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                  >
                    {user ? t('pricing.subscribe') : t('pricing.signUpToSubscribe')}
                  </Button>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <h3 className="text-xs font-medium text-white tracking-wide uppercase">
                    {t('pricing.whatsIncluded')}
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex space-x-3">
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-zinc-200">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <p className="text-zinc-400">
            {t('pricing.currencyNote')}
          </p>
        </div>
      </div>
    </section>
  );
}