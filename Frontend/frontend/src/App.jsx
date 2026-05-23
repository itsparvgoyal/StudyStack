import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";


function App() {

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Toaster position="top-right" />
      <Navbar />
      <AppRoutes />
    </div>
  )
}

export default App;