'use client';

import { ThemeProvider } from 'next-themes';
import { Interactions } from '@/components/brand/Interactions';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Interactions />
    </ThemeProvider>
  );
}
