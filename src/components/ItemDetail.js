import ItemCount from './ItemCount'
import './styles/DetalleProducto.css';
import imagenes from '../assets/img';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { GlobalContext } from './CartContext';


const ItemDetail = ({ item, bandera }) => {
    const [controlBoton, setControlBoton] = useState(true);

    const {addItem} = useContext(GlobalContext);

    function onAdd(valor) {
        alert(`Agregaste ${valor} item${valor > 1 ? 's' : ''}`);
        setControlBoton(false);
        addItem(item, valor);
    }
    return (
        <>{bandera ?
            <div id='mostrarDetalles'>
                <img src={imagenes[item.seccion]} alt="" />
                <h3>Descripion: {item.descripcion}</h3>
                <h3>Valor: U$S {item.precio}</h3>
                <h3>Cantidad en stok: {item.stock}</h3>
                <h3>Clasificación: {item.seccion}</h3>
                {
                    controlBoton ?
                        <ItemCount stock={item.stock} initial={0} onAdd={onAdd} /> :
                        <Link to='/cart'>Ir al carrito de compras</Link>
                }
            </div> :
            <div className="loader__container">
                Juan Isa programador
                <div className="loader">
                </div>
            </div>
        }
        </>
    );
}

export default ItemDetail;
