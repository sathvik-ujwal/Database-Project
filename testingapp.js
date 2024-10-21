/*
import { useState } from "react";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Loginpage from "./components/Loginpage";
import Notes from "./components/Notes";
import Books from "./components/Books";

function App() {
  const [mode, setMode] = useState(light);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#212529";
      document.body.style.color = "white";
      showAlert("Dark mode has been enables", "success");
      const titleChangeInterval = setInterval(() => {
        document.title = "install TextUtils Now";
      }, 3000);
      setTimeout(() => {
        clearInterval(titleChangeInterval);
        document.title = "TextUtils";
      }, 9000);
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "#212529";
      showAlert("Light mode has been enabled", "success");
    }
  };
  return (
    <>
      {/<Navbar title="TextUtils" aboutText="About us" />/}
      <Router>
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route
            path="*"
            element={
              <>
                <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
                <div className="container-fluid">
                  <div className="row">
                    <Sidebar />
                    <div className="col-md-9 col-xl-10">
                      <Alert alert={alert} />
                      <div className="container">
                        <Routes>
                          <Route
                            exact
                            path="/about"
                            element={<About mode={mode} />}
                          />
                          <Route
                            exact
                            path="/"
                            element={
                              <Textform
                                showAlert={showAlert}
                                heading="Enter Text to Analyse"
                                mode={mode}
                              />
                            }
                          />
                          <Route exact path="/notes" element={<Notes />} />
                          <Route exact path="/books" element={<Books />} />
                        </Routes>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
*/
