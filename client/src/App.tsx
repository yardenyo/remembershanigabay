import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/views/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
};

export default App;
