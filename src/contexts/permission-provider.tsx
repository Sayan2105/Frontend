import AuthzApi from "@/admin/setup/services/authorization";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { AuthContext } from "./authContext";

export type PermissionContextValue = {
    hasPermission: (action: string, module: string) => boolean;
    removePermissions: () => void;
    isLoading: boolean;
};

export const PermissionContext = createContext<PermissionContextValue>({
    hasPermission: () => false,
    removePermissions: () => { },
    isLoading: true,
});

export const PermissionProvider = ({ children }: { children: ReactNode }) => {
    const { authUser } = useContext(AuthContext);

    const { data: permissions = [], isLoading, refetch } = useQuery<string[]>({
        queryKey: ["permissions", authUser?.role],
        queryFn: async () => {
            if (!authUser?.role) return [];

            const storedPermissions = sessionStorage.getItem("permissions");
            if (storedPermissions) return JSON.parse(storedPermissions);

            const data = await AuthzApi.getPermissions({ role: authUser.role });
            const names = data.map((p) => p.name);
            sessionStorage.setItem("permissions", JSON.stringify(names));
            return names;
        },
        enabled: !!authUser?.role,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    const removePermissions = () => {
        sessionStorage.removeItem("permissions");
        refetch();
    };

    const hasPermission = (action: string, module: string) => {
        if (authUser?.role === "admin") return true;
        return permissions.includes(`${action}:${module}`);
    };

    const value = useMemo(
        () => ({
            hasPermission,
            removePermissions,
            isLoading,
        }),
        [permissions, authUser?.role, isLoading]
    );

    return (
        <PermissionContext.Provider value={value}>
            {children}
        </PermissionContext.Provider>
    );
};
