
import { SideBarContex } from "./context/SideBarContex";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from "react-toastify";
import { RoutesContainer } from "./routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <main className="textGothamMedium">
      <ToastContainer theme="dark" transition={Bounce} />
      <SideBarContex>
        <Router>
          <RoutesContainer />
        </Router>
      </SideBarContex>
    </main>
  )
}

export default App
