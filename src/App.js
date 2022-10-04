import ItemListContainer from "./components/ItemListContainer";
import NavBar from "./components/NavBar";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cart from "./components/Cart";

import GlobalContextProvider from "./components/CartContext";

function App() {
  return (
    <GlobalContextProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<ItemListContainer />} />
          <Route path='/category/:categoryId' element={<ItemListContainer />} />
          <Route path='/item/:id' element={<ItemDetailContainer />} />
          <Route path='cart' element={<Cart />} />
          <Route path='*' element={<h1>404 Not Found. <Link to='/'>Volver a inicio</Link></h1>} />
        </Routes>
      </Router>
    </GlobalContextProvider>
  );
}

export default App;
