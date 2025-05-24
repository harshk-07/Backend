import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./components/About";
import Register from "./components/RegisterForm";
import Contact from "./components/Contact";
import DonorList from "./pages/DonorList";
import AdminLogin from "./components/AdminLogin";
import Admin from "./pages/Admin";
import Patients from "./pages/Patients";

function App() {
  return (
    <div className="app">
      {/* <Navbar /> */}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donors" element={<DonorList />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
