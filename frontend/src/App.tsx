import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Sidebar from "./components/Sidebar"
import Project from "./pages/Project"
import PriceCalculator from "./pages/PriceCalculator"
import NewProject from "./pages/NewProject"
import Login from "./auth_pages/Login"
import Calendar from "./pages/Calendar"

const App = () => {
  const isLoggedIn = true;

  return (
    <>
    { isLoggedIn ?
      <div className="bg-black w-full h-screen text-white grid grid-cols-[1fr_5fr]">
      <Sidebar />
      <div className="px-20 py-10">
      <Routes>
        <Route path="/" element={ <Dashboard />} />
        <Route path="/projects" element={ <Projects />} />
        <Route path="/project/:projectId" element={ <Project />} />
        <Route path="/pricecalculator" element={ <PriceCalculator /> } />
        <Route path="/newproject" element={ <NewProject />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div> : <Login /> }
    </>
  )
}

export default App
