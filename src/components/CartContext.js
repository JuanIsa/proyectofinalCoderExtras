import { createContext, useState, useEffect } from "react";
export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
    const [carrito, setCarrito] = useState([]);
    
    useEffect(() => {
        setCarrito(JSON.parse(localStorage.getItem('cart')));
    }, []);
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(carrito));
    }, [carrito]);

    function addItem(item, quantity) {
        if (!isInCart(item.id)) {    
            setCarrito([...carrito, {...item, quantity}]);
        } else {
            let arrayAux = [...carrito];
            arrayAux[carrito.findIndex(el => el.id === item.id)].quantity += quantity;
            setCarrito([...arrayAux]);
        }
    }
    function isInCart(id) {
        return carrito.some(el => el.id === id) 
    }

    function removeItem(itemId) {
        setCarrito(carrito.filter((el) => el.id !== itemId));
    }

    function clear() {
        setCarrito([]);
    }
    
    function cartWidget() {
        return carrito.reduce((acum, item) => acum + item.quantity, 0);
    }
    function totalCart() {
        return carrito.reduce((acum, el) => acum + (el.precio * el.quantity), 0)
    }

    return (
        <GlobalContext.Provider value={{ carrito, addItem, removeItem, clear, cartWidget, totalCart }}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;
