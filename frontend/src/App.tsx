import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Sidebar from "./components/Sidebar"
import Project from "./pages/Project"

const App = () => {
  return (
    <div className="bg-black w-full h-screen text-white grid grid-cols-[1fr_5fr]">
      <Sidebar />
      <Routes>
        <Route path="/" element={ <Dashboard />} />
        <Route path="/projects" element={ <Projects />} />
        <Route path="/project/:projectId" element={ <Project />} />
      </Routes>
    </div>
  )
}

export default App
