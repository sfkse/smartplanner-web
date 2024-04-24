"use client";

import "@/app/(authenticated)/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Navbar from "../ui/Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthenticationProvider from "../AuthenticationProvider";

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
        <Navbar type="nonAdmin" />
        {children}
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}

export default Layout;

