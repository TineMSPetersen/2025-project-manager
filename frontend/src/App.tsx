import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Sidebar from "./components/Sidebar"

const App = () => {
  return (
    <div className="bg-indigo-950 w-full h-screen text-white flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={ <Dashboard />} />
        <Route path="/projects" element={ <Projects />} />
      </Routes>
    </div>
  )
}

export default App
