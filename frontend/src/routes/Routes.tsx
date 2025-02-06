import { Routes, Route } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { RedirectScreen } from "../components/logic/RedirectScreen";
import { History } from "../components/history/History";
import { Home } from "../components/home/Home";
import { Clients } from "../components/clients/Clients";
import { NewsMobile } from "../components/news/NewsMobile";
import { ObjectsLost } from "../components/lost/ObjectsLost";
import { ObjectsForgotten } from "../components/forgotten/ObjectsForgotten";
import { PrintTicket } from "../components/ticket/PrintTicket";
import { Instructive } from "../pages/instructive/Page";

export const RoutesContainer = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<RedirectScreen MobileComponent={Home} TabletComponent={Home} DesktopComponent={Home} />} />
            <Route path="/historial" element={<RedirectScreen MobileComponent={History} TabletComponent={History} DesktopComponent={History} />} />
            <Route path="/abm_clientes" element={<RedirectScreen MobileComponent={Clients} TabletComponent={Clients} DesktopComponent={Clients} />} />
            <Route path="/novedades" element={<RedirectScreen MobileComponent={NewsMobile} TabletComponent={NewsMobile} DesktopComponent={NewsMobile} />} />
            <Route path="/objetos_perdidos" element={<RedirectScreen MobileComponent={ObjectsLost} TabletComponent={ObjectsLost} DesktopComponent={ObjectsLost} />} />
            <Route path="/objetos_olvidados" element={<RedirectScreen MobileComponent={ObjectsForgotten} TabletComponent={ObjectsForgotten} DesktopComponent={ObjectsForgotten} />} />
            <Route path="/instructive" element={<RedirectScreen MobileComponent={Instructive} TabletComponent={Instructive} DesktopComponent={Instructive} />} />
            <Route path="/printTicket" element={<PrintTicket />} />
        </Routes>
    )
}