"use client";
import { RedirectType, redirect } from "next/navigation";
import { useFetchAuthUser } from "./hooks/auth/useFetchAuthUser";
import Loading from "./loading";

type AuthenticationProviderProps = {
  children: React.ReactNode;
};

function AuthenticationProvider({ children }: AuthenticationProviderProps) {
  const { authUser, isPending } = useFetchAuthUser();

  if (!authUser && !isPending) {
    redirect("/login", RedirectType.replace);
  }

  if (!authUser && isPending) {
    return <Loading isLoading={true}>{children}</Loading>;
  }

  return <>{children}</>;
}

export default AuthenticationProvider;

