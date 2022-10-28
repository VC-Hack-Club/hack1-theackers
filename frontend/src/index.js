import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Helpout from "./pages/Helpout";
import Volunteer from "./pages/Volunteer";
import Login from "./pages/Login";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Helpout" element={<Helpout />} />
          <Route path="Volunteer" element={<Volunteer />} />
          <Route path="Login" element={<Login />} />
          {/* <Route path = "Submit Request" elemnt = {<SubmitReq/>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
root.render(<App tab="home" />);
