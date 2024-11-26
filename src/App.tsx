import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { TestingPage } from "./components/test/TestingPage";
import { SideBarContex } from "./context/SideBarContex";

function App() {

  return (
    <main className="textGothamMedium">
      <SideBarContex>
        <Router>
          <Routes>
            {/* <Route path="/" element={<IsAuthLogin>
          <Login />
          </IsAuthLogin>} /> */}
            <Route path="/" element={
              <Login />
            } />
            <Route path="/test"
              element={
                /*     <IsAuth route={"/test"}> */
                /*     <LogicDesktopView> */
                <TestingPage />
                /*   </LogicDesktopView> */
                /*  </IsAuth> */
              } />

          </Routes>
        </Router>
      </SideBarContex>
    </main>
  )
}

export default App
