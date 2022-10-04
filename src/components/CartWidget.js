import './styles/CartWidget.css';
import {useContext } from 'react';
import { GlobalContext } from './CartContext';
const CartWidget = () => {
    const { cartWidget } = useContext(GlobalContext);
    return (
        <div id='carrito'>
            {
                cartWidget() > 0 && <div id='notificacionCarrito'>{cartWidget()}</div>
            }
        </div>
    );
}
export default CartWidget;
