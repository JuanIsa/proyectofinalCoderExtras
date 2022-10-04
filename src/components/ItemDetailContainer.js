import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";

import { getFirestore } from "../firebase/firebase.config";


const ItemDetailContainer = () => {
    const [dato, setDato] = useState([]);
    const { id } = useParams();
    const [bandera, setBandera] = useState(false);


    useEffect(() => {
        const db = getFirestore();
        const itemCollection = db.collection("items");
        itemCollection.get()
            .then(res => {
                res.forEach(item => {
                    if (item.id === id) {
                        setDato(item.data());
                        setBandera(true);
                    }
                });
            })
            .catch(error => console.log(error))

    }, [id]);

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Detalle del producto:</h1>
            <ItemDetail item={dato} bandera={bandera}/>
        </div>
    );
}
export default ItemDetailContainer;
