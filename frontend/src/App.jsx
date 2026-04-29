
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import ScanPage from "./pages/scanPage";
import ResultPage from "./pages/resultPage";
import DemoPage from "./pages/demoPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/scan" element={<ScanPage/>} />
      <Route path="/result" element={<ResultPage/>} /> //will change path to path="/result/:barcode"
      <Route path="/demo" element={<DemoPage/>} />
    </Routes>
  )
}

export default App