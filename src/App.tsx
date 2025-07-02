import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/scroll-to-to";
import { AuthContext } from "./contexts/authContext";
import { PermissionContext } from "./contexts/permission-provider";
import LayoutWrapper from "./layout-wrapper";
import IndexRoutes from "./routes";
import LoaderModel from "./components/loader";



// hi my name i hhh
function App() {

  // const dispatch = useAppDispatch()
  const { removePermissions } = useContext(PermissionContext)
  const { authUser, isCheckingAuth } = useContext(AuthContext)

  useEffect(() => {
    removePermissions()
  }, [authUser])

  if (isCheckingAuth && !authUser) {
    return <LoaderModel />
  }

  return (
    <div className="dark:bg-background dark:text-white">
      <Toaster toastOptions={{ duration: 2000 }} />
      <LayoutWrapper>
        <ScrollToTop />
        <IndexRoutes />
      </LayoutWrapper>
    </div>
  );
}

export default App;
