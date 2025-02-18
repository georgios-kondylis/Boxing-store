
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Boxers from "./components/Boxers";
import Gloves from "./components/Gloves";
import Mouthpiece from "./components/Mouthpiece";
import Wraps from "./components/Wraps";
import Shoes from "./components/Shoes";
import { useState } from "react";

function App() {

  const [cartIsOpen, setCartIsOpen] = useState(false);

  return (
    <BrowserRouter>
        <Navbar  cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen}/>

        <Routes>
          <Route path="/"/>
          <Route path="/boxers" element={<Boxers/>}/>
          <Route path="/gloves" element={<Gloves/>}/>
          <Route path="/mouthpiece" element={<Mouthpiece/>}/>
          <Route path="/wraps" element={<Wraps/>}/>
          <Route path="/shoes" element={<Shoes/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;

//  https://g-kondylis.imgbb.com/   Is the image cloud im using for the mongoDB pictures