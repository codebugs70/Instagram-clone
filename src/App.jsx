import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import SecondLayout from "./components/layouts/SecondLayout";
/* ====================================================== */
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const Search = lazy(() => import("./pages/Search"));
const Profile = lazy(() => import("./pages/Profile"));
const Notification = lazy(() => import("./pages/Notification"));
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Saved = lazy(() => import("./pages/Saved"));
/* ====================================================== */

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <span className="loadingSpin"></span>
        </div>
      }
    >
      <Routes>
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Route>

        <Route element={<SecondLayout />}>
          <Route path="/explore" element={<Explore />} />
          <Route path="/notification" element={<Notification />} />

          <Route path={`/:slug`} element={<Profile />}>
            <Route path="saved" element={<Saved />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
