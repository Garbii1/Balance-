import type {Metadata} from 'next';
import { Geist_Sans } from 'next/font/google'; // Corrected import
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Added Toaster

const geistSans = Geist_Sans({ // Corrected usage
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// Geist_Mono is not explicitly used in the proposal's typography, 
// but keeping it if other parts of the scaffold rely on it.
// If not, it can be removed. For now, let's assume it might be used implicitly by some components.
// const geistMono = Geist_Mono({ 
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'AutoEase - Smart Car Repair Booking',
  description: 'Intelligently book your car repair services with AutoEase.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
