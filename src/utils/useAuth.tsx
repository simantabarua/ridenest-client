import Loading from "@/components/loading";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const location = useLocation();
    if (isLoading) {
      return <Loading fullScreen={true} variant="bars" />;
    }
    
    if (!isLoading && !data?.data?.email) {
      return (
        <Navigate to="/login" replace state={{ from: location.pathname }} />
      );
    }

    if (
      !isLoading &&
      requiredRole &&
      requiredRole !== data?.data?.role
    ) {
      return (
        <Navigate
          to="/unauthorized"
          replace
          state={{ from: location.pathname }}
        />
      );
    }

    return <Component />;
  };
};
