import AuthzApi from "@/admin/setup/services/authorization";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./authContext";

export type PermissionContextValue = {
    hasPermission: (action: string, module: string) => boolean;
    removePermissions: () => Promise<void>;
    isLoading: boolean;
};

export const PermissionContext = createContext<PermissionContextValue>({
    hasPermission: () => false,
    removePermissions: async () => { },
    isLoading: true,
});

export const PermissionProvider = ({ children }: { children: ReactNode }) => {
    // const { user } = useAppSelector(authSelector);
    const { authUser } = useContext(AuthContext)
    const [permission, setPermission] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // initially loading thats why not updating while api call

    const loadPermissions = async () => {
        if (!authUser?.role) {
            // If there is no logged‐in user, we consider permissions loaded (nothing to fetch)
            setPermission([]);
            setIsLoading(false);
            return;
        }

        const storedPermissions = sessionStorage.getItem("permissions");
        if (storedPermissions) {
            setPermission(JSON.parse(storedPermissions));
            setIsLoading(false);
            return;
        }

        try {
            const data = await AuthzApi.getPermissions({ role: authUser.role });
            const names = data.map((p) => p.name);
            sessionStorage.setItem("permissions", JSON.stringify(names));
            setPermission(names);
        } catch {
            toast.error("Failed to load permissions");
            // If fetch fails, treat as “no permissions”
            setPermission([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        loadPermissions();
    }, [authUser?.role]);

    const removePermissions = async () => {
        sessionStorage.removeItem("permissions");
        await loadPermissions();
    };

    const hasPermission = (action: string, module: string) => {
        // If authUser is admin, automatically true
        if (authUser?.role === "admin") {
            return true;
        }
        if (!permission) {
            // If permissions not yet loaded, default to false. The guard will wait on isLoading anyway.
            return false;
        }
        return permission.includes(`${action}:${module}`);
    };

    const value = useMemo(
        () => ({ hasPermission, removePermissions, isLoading }),
        [permission, authUser?.role, isLoading]
    );

    return (
        <PermissionContext.Provider value={value}>
            {children}
        </PermissionContext.Provider>
    );
};
