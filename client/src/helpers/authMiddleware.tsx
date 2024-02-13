import React from "react";
import { useCookies } from "react-cookie";
import { useGetUserQuery } from "@/features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import NoTimeForDrama from "@/components/Layout/NoTimeForDrama";

type Props = {
  children: React.ReactElement;
};

const AuthMiddleware = ({ children }: Props) => {
  const [cookies] = useCookies(["isAuthenticated"]);
  const { isLoading, isFetching } = useGetUserQuery(null, {
    skip: !cookies.isAuthenticated,
    refetchOnMountOrArgChange: true,
  });
  const user = useSelector(selectCurrentUser);
  const loading = isLoading || isFetching;

  if (loading) return <NoTimeForDrama />;

  if (!user && cookies.isAuthenticated) return <NoTimeForDrama />;

  return <>{children}</>;
};

export default AuthMiddleware;
