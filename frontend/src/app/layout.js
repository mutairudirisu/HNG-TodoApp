import './globals.css';

export const metadata = {
  title: 'Onward — Your Task Management Companion',
  description: 'A beautiful, modern todo application to help you stay organized and move forward. Track tasks with priorities, due dates, and categories.',
  keywords: ['todo', 'task manager', 'productivity', 'organization'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
