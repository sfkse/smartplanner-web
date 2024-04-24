"use client";

import { Lato } from "next/font/google";
import "@/app/(authenticated)/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

