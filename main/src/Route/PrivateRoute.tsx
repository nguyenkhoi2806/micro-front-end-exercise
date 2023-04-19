import React from 'react';
import { Navigate } from 'react-router';

type PrivateRouteProps = {
  isAuthenticated: boolean | undefined;
  component: JSX.Element;
};

export default function PrivateRoute({
  isAuthenticated,
  component,
}: PrivateRouteProps) {
  if (isAuthenticated) {
    return component;
  } else {
    return <Navigate to={{ pathname: '/auth' }} />;
  }
}
