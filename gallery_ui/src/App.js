 import { BrowserRouter,Routes,Route } from "react-router-dom";
 import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//  import '@fortawesome/fontawesome-free/css/all.min.css';

import Gallery from "./pages/Gallery";
import LayOut from "./pages/Layout";
import AddImage from "./pages/AddImage";
 function App() {
  return (
     <>
 
 <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Gallery />} />
          <Route path="/AddImage" element={<AddImage />} />
         </Route>
      </Routes>
    </BrowserRouter>
     </>
    
  );
}

export default App;
