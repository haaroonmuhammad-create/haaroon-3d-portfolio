import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Haaroon Muhammad — 3D Product & Prototype Designer',
  description: 'Portfolio of Haaroon Muhammad: 3D product design, CAD, DfAM, prototyping and additive manufacturing.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
