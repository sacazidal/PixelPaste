import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/context/UserContext";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "PixelPaste",
  description:
    "PixelPaste — это платформа для дизайнеров и разработчиков, где можно найти готовые макеты Figma, полезные CSS-сниппеты и JavaScript-скрипты. Вдохновляйся, используй и создавай крутые проекты с легкостью!",
  keywords:
    "Figma макеты, CSS сниппеты, JavaScript скрипты, веб-дизайн, верстка, Next.js, React.js, дизайн для разработчиков, макеты для верстки",
  author: "PixelPaste",
  openGraph: {
    title: "PixelPaste — Готовые макеты Figma, CSS и JavaScript сниппеты",
    description:
      "PixelPaste — это платформа для дизайнеров и разработчиков, где можно найти готовые макеты Figma, полезные CSS-сниппеты и JavaScript-скрипты.",
    url: "https://www.pixelpaste.com",
    siteName: "PixelPaste",
    images: [
      {
        url: "https://www.pixelpaste.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "PixelPaste — Платформа для дизайнеров и разработчиков",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelPaste — Готовые макеты Figma, CSS и JavaScript сниппеты",
    description:
      "PixelPaste — это платформа для дизайнеров и разработчиков, где можно найти готовые макеты Figma, полезные CSS-сниппеты и JavaScript-скрипты.",
    images: ["https://www.pixelpaste.com/twitter-image.png"],
  },
  alternates: {
    canonical: "https://www.pixelpaste.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased dark:bg-neutral-800 bg-white`}
      >
        <div className="flex flex-col min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UserProvider>{children}</UserProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
