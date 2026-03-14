import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tic Tac Toe Probability Analyzer',
  description: 'Play Tic Tac Toe and see live probabilities computed from full game-tree enumeration.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
