import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProviders } from "./ThemeProviders";
import { SidebarProvider } from "@/hook/SidebarContext";

import { Navbar } from "@/components/navbar/Navbar";
import { prisma } from "@/lib/db";
import DesktopSidebar from "@/components/DesktopSidebar";
import { BoardWithId } from "@/lib/types";
import { ToastProvider } from "@/providers/ToastProvider";
import { Board, Column } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban Task Management",
  description: "Challenge take it from frontendmentor.com",
  icons: {
    icon: [
      {
        url: "/assets/favicon-32x32.png",
        href: "/assets/favicon-32x32.png",
      },
    ],
  },
};

interface TBoards extends Board {
  columns: Column[];
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const boards: TBoards[] = await prisma.board.findMany({
    include: {
      columns: true,
    },
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProviders>
          <SidebarProvider>
            <ToastProvider />
            <Navbar boards={boards} />
            <div
              className="
                flex
                min-h-[calc(100vh-81px)]
                sm-custom:min-h-[calc(100vh-96px)]
                md-custom:min-h-[calc(100vh-97px)]
              "
            >
              <DesktopSidebar boards={boards} />
              {children}
            </div>
          </SidebarProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
