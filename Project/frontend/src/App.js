import './App.css';
import {BrowserRouter, Route , Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import Regsiter from "./Component/Regsiter"
import Showdata from './Component/Showdata';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
            <Route path="/" element={<Regsiter/>}/>
            <Route path="/get" element={<Showdata/>}/>
        </Routes>
    </div>
    </BrowserRouter>

  );
}

export default App;
