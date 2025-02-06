import { Navigate } from "react-router-dom";

interface RequireAuthProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
}

export function RequireAuth({ children, isAuthenticated }: RequireAuthProps) {
    return (
        isAuthenticated ? <>{children}</> : <Navigate to={'/'} />
    )
}