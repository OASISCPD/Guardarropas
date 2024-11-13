import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IsAuthLogin } from "./middleware/isAuthLogin";
import { Login } from "./components/auth/Login";
import { IsAuth } from "./middleware/isAuth";
import { TestingPage } from "./components/test/TestingPage";
import { LogicDesktopView } from "./components/logic/ContentDesktop";

function App() {

  return (
    <main className="textGothamMedium">
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
              <IsAuth route={"/test"}>
                <LogicDesktopView>
                  <TestingPage />
                </LogicDesktopView>
              </IsAuth>
            } />

        </Routes>
      </Router>
    </main>
  )
}

export default App
