"use client";

import { Lato } from "next/font/google";
import "@/app/(authenticated)/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthenticationProvider from "../AuthenticationProvider";
import Navbar from "../ui/Navbar";

const queryClient = new QueryClient();

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthenticationProvider>
        <ToastContainer />
        <Navbar type="admin" />
        {children}
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}

