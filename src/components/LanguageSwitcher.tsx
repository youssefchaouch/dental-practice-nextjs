'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

const languages = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
];

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLanguage = (locale: string) => {
    document.cookie = `locale=${locale}; path=/; max-age=31536000`;
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-3">
      {languages.map((lang) => {
        const isActive = currentLocale === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => switchLanguage(lang.code)}
            className={`text-sm font-medium transition-colors duration-200 ${
              isActive
                ? 'text-[var(--color-text-primary)] underline underline-offset-4 decoration-[var(--color-accent)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
            disabled={isPending && !isActive}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}