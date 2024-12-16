import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { SideBarContex } from "./context/SideBarContex";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { RedirectScreen } from "./components/logic/RedirectScreen";
import { HistoryMobile } from "./components/history/HistoryMobile";
import { HomeMobile } from "./components/home/HomeMobile";
import { ClientsMobile } from "./components/clients/ClientsMobile";
import { NewsMobile } from "./components/news/NewsMobile";
import { ObjectsLost } from "./components/lost/ObjectsLost";
import { ObjectsForgotten } from "./components/forgotten/ObjectsForgotten";
import { PrintTicket } from "./components/ticket/PrintTicket";
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
            <Route path="/abm_clientes"
              element={<RedirectScreen MobileComponent={ClientsMobile} TabletComponent={ClientsMobile} DesktopComponent={ClientsMobile} />} />
            <Route path="/novedades"
              element={<RedirectScreen MobileComponent={NewsMobile} TabletComponent={NewsMobile} DesktopComponent={NewsMobile} />} />
            <Route path="/objetos_perdidos" element={<RedirectScreen MobileComponent={ObjectsLost} TabletComponent={ObjectsLost} DesktopComponent={ObjectsLost} />} />
            <Route path="/objetos_olvidados" element={<RedirectScreen MobileComponent={ObjectsForgotten} TabletComponent={ObjectsForgotten} DesktopComponent={ObjectsForgotten} />} />
            <Route path="/printTicket" element={<PrintTicket />} />
            <Route path="/test" element={<div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, consequuntur, cum atque eos reprehenderit nam necessitatibus numquam assumenda voluptates fuga, culpa laborum autem reiciendis rem voluptas at ducimus sapiente cupiditate.</div>} />
          </Routes>
        </Router>
      </SideBarContex>
    </main>
  )
}

export default App
