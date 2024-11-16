import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RedirectUrl from "./components/RedirectUrl";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<RedirectUrl />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
