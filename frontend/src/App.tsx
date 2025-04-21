import { Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import Sidebar from "./components/Sidebar";
import Project from "./pages/Project";
import PriceCalculator from "./pages/PriceCalculator";
import NewProject from "./pages/NewProject";
import Login from "./auth_pages/Login";
import PriceSettings from "./pages/PriceSettings";
import Archive from "./pages/Archive";
import Deadlines from "./pages/Deadlines";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import EditProject from "./pages/EditProject";
import { ToastContainer } from "react-toastify";
import Teams from "./pages/Teams";
import NewTeam from "./pages/NewTeam";
import Team from "./pages/Team";

const App = () => {
  const { token } = useContext(AppContext);

  return (
    <>
      {token ? (
        <div className="bg-black w-full h-screen text-white grid grid-cols-[1fr_5fr]">
          <Sidebar />

          <div className="px-2 md:px-20 py-10 overflow-y-auto h-screen">
            <Routes>
              <Route path="/" element={<Projects />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:projectId" element={<Project />} />
              <Route
                path="/project/:projectId/edit"
                element={<EditProject />}
              />
              <Route path="/pricecalculator" element={<PriceCalculator />} />
              <Route path="/newproject" element={<NewProject />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pricesettings" element={<PriceSettings />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/deadlines" element={<Deadlines />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/newteam" element={<NewTeam />} />
              <Route path="/team/:teamId" element={<Team />} />
            </Routes>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
