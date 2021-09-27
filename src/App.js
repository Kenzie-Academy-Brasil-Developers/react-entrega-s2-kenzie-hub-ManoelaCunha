import "./App.css";
import Routes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <header className="App-header">
        <h1>KenzieHUB</h1>
      </header>
      <section className="App-content">
        <Routes />
      </section>
    </>
  );
}

export default App;
