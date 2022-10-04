import { useState } from 'react';
import './styles/ItemCount.css'
const ItemCount = ({ stock, initial, onAdd, }) => {
    const [cantidad, setCantidad] = useState(initial);
    
    function incrementar() {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    }
    function decrementar() {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
        }
    }
    return (
        <>
            <div className='contenedorBotones'>
                <div className='botones' onClick={decrementar}>-</div>
                <div className='botones'>{cantidad}</div>
                <div className='botones' onClick={incrementar}>+</div>
            </div>
            {
                cantidad > 0 ?
                    <button className='botonAgregarAlCarrito' onClick={() => onAdd(cantidad)}>Agregar al carrito</button> :
                    <button className='botonAgregarAlCarrito' disabled>Agregar al carrito</button>
            }
        </>
    );
}

export default ItemCount;
