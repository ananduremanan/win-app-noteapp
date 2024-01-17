import type { Metadata } from "next";
import "./globals.css";
import TitleBar from "./components/TitleBar";
import Drawer from "./components/Drawer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden">
        <div className="flex-shrink-0">
          <Drawer />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="h-16 flex-shrink-0">
            <TitleBar />
          </div>
          <div className="flex-grow overflow-auto">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
