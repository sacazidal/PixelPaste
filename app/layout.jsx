import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/context/UserContext";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
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
    url: "https://pixelpaste.vercel.app/",
    siteName: "PixelPaste",
    images: [
      {
        url: "https://i.postimg.cc/c1z3H5nz/Pixel-Launcher.webp",
        width: 60,
        height: 60,
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
    images: ["https://i.postimg.cc/c1z3H5nz/Pixel-Launcher.webp"],
  },
  alternates: {
    canonical: "https://pixelpaste.vercel.app/",
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
