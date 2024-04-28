import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/MTTailwind";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Toaster } from "react-hot-toast";
import { checkSignedIn } from "@/actions/auth";

const open_Sans = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2T Store",
  description: "Generated by create next app",
  icons: {
    icon: "../images/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const signedIn = await checkSignedIn();
  return (
    <html lang="en">
      <body className={`${open_Sans.className} bg-cs_primary_black text-white`}>
        <ThemeProvider>
          <div className="flex flex-col justify-between min-h-screen relative">
            <Header className="h-20" signedIn={signedIn} />
            <main className="flex-grow">{children}</main>
            <Footer className="h-80" />
          </div>
        </ThemeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
