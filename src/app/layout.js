import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Ajay S | Full-Stack Developer & CS Student",
  description:
    "Portfolio of Ajay S — Computer Science student and aspiring Full-Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: [
    "Ajay S",
    "Full-Stack Developer",
    "React Developer",
    "Next.js",
    "Portfolio",
    "Computer Science",
    "Web Developer",
  ],
  authors: [{ name: "Ajay S" }],
  openGraph: {
    title: "Ajay S | Full-Stack Developer",
    description: "Explore the portfolio of Ajay S — building cutting-edge web experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
