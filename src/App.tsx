import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import { PermissionContext } from "./contexts/permission-provider";
import { checkSession } from "./features/auth/authSlice";
import { useAppDispatch } from "./hooks";
import LayoutWrapper from "./layout-wrapper";
import IndexRoutes from "./routes";
import ScrollToTop from "./components/scroll-to-to";



// hi my name i hhh
function App() {

  const dispatch = useAppDispatch()
  const { removePermissions } = useContext(PermissionContext)

  useEffect(() => {
    removePermissions()
    dispatch(checkSession())
  }, [dispatch])


  return (
    <div className=" dark:bg-background dark:text-white">
      <Router>
        <Toaster toastOptions={{ duration: 2000}} />
        <LayoutWrapper>
          <ScrollToTop />
          <IndexRoutes />
        </LayoutWrapper>
      </Router>
    </div>
  );
}

export default App;
