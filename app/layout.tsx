"use client";

import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/ui/Navbar";
import { registerLicense } from "@syncfusion/ej2-base";
import { ThemeProvider, createTheme } from "@mui/material";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

// registerLicense(
//   "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXtfcnRWRWNYUkRzWEY="
// );

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
        <ThemeProvider theme={theme}>
          <Navbar />
          {children}
        </ThemeProvider>
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

