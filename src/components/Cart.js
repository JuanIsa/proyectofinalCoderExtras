import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './CartContext';
import './styles/ItemCart.css';
import imagenes from '../assets/img';
import { getFirestore } from "../firebase/firebase.config";
import Form from './Adicional/Form';
import { doc, updateDoc } from "firebase/firestore";

const Cart = () => {
    const { carrito, removeItem, clear, totalCart } = useContext(GlobalContext);
    const [flagLoad, setFlagLoad] = useState(true);
    const [flagForm, setFlagForm] = useState(false);

    function generarPedido(carritoFinal, dataUser) {
        const db = getFirestore();
        const itemCollection = db.collection("orders");
        let usuario = {
            buyer: {
                name: dataUser.name,
                phone: dataUser.phone,
                email: dataUser.email
            },
            items: carritoFinal.map(item => {
                return (
                    {
                        id: item.id,
                        title: item.descripcion,
                        price: item.precio,
                        quantity: item.quantity
                    }
                );
            }),
            date: new Date(),
            total: totalCart()
        }
        itemCollection.add(usuario)
            .then(res => {
                alert(dataUser.name +' se generó tu pedido con el id: ' + res.id)
                clear();
                setFlagLoad(true);
            })
            .catch(err => console.log(err))
    }

    function terminarCompra(dataUser) {
        const db = getFirestore();
        const itemCollection = db.collection("items");
        const auxArray = [...carrito];
        setFlagLoad(false);
        itemCollection.get()
            .then(res => {
                res.forEach(item => {
                    auxArray.forEach(el => {
                        if (item.data().id === el.id) {
                            const consulta = doc(db, "items", item.id);
                            if (el.quantity > item.data().stock) {
                                alert(`Uppss estás intentando comprar más cantidad de items de ${el.descripcion} de los que hay disponible en stock, a tu compra se le asignará la cantidad máxima disponible: ${item.data().stock}`);
                                updateDoc(consulta, { stock: 0 });
                                el.quantity = item.data().stock;
                            } else {
                                updateDoc(consulta, { stock: el.stock - el.quantity });
                            }
                        }
                    });
                });
                generarPedido(auxArray, dataUser);
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            {
                flagForm && <Form setFlagForm={setFlagForm} terminarCompra={terminarCompra} />
            }
            {
                flagLoad ?
                    <div>
                        {carrito.length > 0 ?
                            <div className='headerCarrito'>
                                <h1>Tu carrito.</h1>
                                <button onClick={() => clear()}>Vaciar carrito</button>
                                <br></br>
                                <br></br>
                            </div> :
                            <div className='headerCarrito'>
                                <h2>Tenés el carrito vacio</h2>
                                <Link to='/'>Volver a la tienda</Link>
                            </div>
                        }

                        <section>
                            {carrito.map((item) => {
                                return (
                                    <div key={item.id} className='itenCardContainer'>
                                        <img src={imagenes[item.seccion]} alt="" />
                                        <div>{item.descripcion}</div>
                                        <div>Precio: {item.precio}</div>
                                        <div>Cantidad: {item.quantity}</div>
                                        <div>U$S:{item.precio * item.quantity}</div>
                                        <button onClick={() => removeItem(item.id)}>X</button>
                                        <br></br>
                                        <br></br>
                                    </div>
                                );
                            })}
                        </section>
                        {carrito.length > 0 &&
                            <div className='itenCardContainer'>
                                El total de tu compra es: U$S {totalCart()}
                                <button onClick={() => setFlagForm(true)}>Terminar la compra</button>
                            </div>}
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

export default Cart;
