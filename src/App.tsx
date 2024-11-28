import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { SideBarContex } from "./context/SideBarContex";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { RedirectScreen } from "./components/logic/RedirectScreen";
import { HistoryMobile } from "./components/mobile/history/HistoryMobile";
import { HomeMobile } from "./components/mobile/home/HomeMobile";
function App() {

  return (
    <main className="textGothamMedium">
      <ToastContainer />
      <SideBarContex>
        <Router>
          <Routes>
            <Route path="/" element={
              <Login />
            } />
            <Route path="/home"
              element={<RedirectScreen MobileComponent={HomeMobile} TabletComponent={HomeMobile} DesktopComponent={HomeMobile} />} />
            <Route path="/historial"
              element={<RedirectScreen MobileComponent={HistoryMobile} TabletComponent={HistoryMobile} DesktopComponent={HistoryMobile} />} />
          </Routes>
        </Router>
      </SideBarContex>
    </main>
  )
}

export default App
