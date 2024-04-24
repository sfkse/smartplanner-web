"use client";

import "@/app/(authenticated)/globals.css";
import Navbar from "@/app/(authenticated)/ui/Navbar";
import AuthenticationProvider from "./AuthenticationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material";
import { Lato } from "next/font/google";

type LayoutProps = {
  children: React.ReactNode;
};
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={lato.className}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

export default RootLayout;

const theme = createTheme({
  typography: {
    fontFamily: "Lato, sans-serif",
  },
  palette: {
    primary: {
      main: "#003366",
      light: "#6699cc",
      dark: "#003366",
      // tranparent: '#transparent',
    },
  },
});

