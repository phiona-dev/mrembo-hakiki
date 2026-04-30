import { useEffect } from "react"
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import ScanPage from "./pages/scanPage";
import ResultPage from "./pages/resultPage";
import DemoPage from "./pages/demoPage"
import logger from "./utils/logger"

const App = () => {
  useEffect(() => {
    logger.debug("Debug test", { user: "phi" })
    logger.info("Info test")
    logger.warn("Warn test", {error: "this is a warning"})
    logger.error("Error test", { code: 500 })
  }, [])

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