import "./globals.css";

export const metadata = {
  title: "Khidmaat Bros — Home Services in Lahore",
  description: "Book trusted plumbers, electricians, cleaners & more in Lahore. Verified service providers at your doorstep.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
