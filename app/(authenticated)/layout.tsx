"use client";

import "@/app/(authenticated)/globals.css";
import Navbar from "@/app/(authenticated)/ui/Navbar";
import AuthenticationProvider from "./AuthenticationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

type LayoutProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

function Layout({ children }: LayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthenticationProvider>
        <ToastContainer />
        <Navbar />
        {children}
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}

export default Layout;

