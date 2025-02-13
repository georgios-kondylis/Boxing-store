import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Gloves from "./components/Gloves";
import Mouthpiece from "./components/Mouthpiece";
import Wraps from "./components/Wraps";
import Shoes from "./components/Shoes";

function App() {

  return (
    <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path="/"/>
          <Route path="/gloves" element={<Gloves/>}/>
          <Route path="/mouthpiece" element={<Mouthpiece/>}/>
          <Route path="/wraps" element={<Wraps/>}/>
          <Route path="/shoes" element={<Shoes/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
