import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchBar from "./components/SearchBar";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AlephSettings from "./pages/AlephSettings";
import { SearchResults } from "./pages/SearchResult";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/pages/about" element={<About />} />
          <Route path="/pages/privacy" element={<Privacy />} />
          <Route path="/pages/terms" element={<Terms />} />
          <Route path="/pages/settings" element={<AlephSettings />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
