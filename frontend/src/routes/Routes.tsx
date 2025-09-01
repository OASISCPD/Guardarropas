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
import { PrintTicketLost } from "../components/ticket/PrintTicketLost";

export const RoutesContainer = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<RedirectScreen Component={Home} />} />
            <Route path="/historial" element={<RedirectScreen Component={History} />} />
            <Route path="/abm_clientes" element={<RedirectScreen Component={Clients} />} />
            <Route path="/novedades" element={<RedirectScreen Component={NewsMobile} />} />
            <Route path="/objetos_perdidos" element={<RedirectScreen Component={ObjectsLost} />} />
            <Route path="/objetos_olvidados" element={<RedirectScreen Component={ObjectsForgotten} />} />
            <Route path="/instructivo" element={<RedirectScreen Component={Instructive} />} />
            <Route path="/printTicket" element={<PrintTicket />} />
            <Route path="/printTicketLost" element={<PrintTicketLost />} />
        </Routes>
    )
}