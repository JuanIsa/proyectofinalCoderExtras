import { useEffect, useState } from "react";
import ItemList from './ItemList';
import { useParams } from "react-router-dom";

import { getFirestore } from "../firebase/firebase.config";


const ItemListContainer = () => {
    const [res, setRes] = useState([]);
    const { categoryId } = useParams();
    const [bandera, setBandera] = useState(false);

    useEffect(() => {
        setBandera(false);
        const db = getFirestore();
        const itemCollection = db.collection("items");
    
        if (categoryId) {
            const regexp = /_/g;
            let aux = [...categoryId.matchAll(regexp)];
            let filtro = categoryId;
            if (aux.length > 0) {
                filtro = filtro.replace(regexp, ' ');
            }
            const item = itemCollection.where('seccion', '==',`${filtro}` );
            item.get()
                .then(response => {
                    if (response.docs.length===0) {
                        console.log('Archivo no encontrado.');
                        return;
                    }
                    setRes(response.docs);
                    setBandera(true);
                })
                .catch(error => console.log(error))
            } else {
                itemCollection.get()
                .then(response => {
                    if (response.size === 0) {
                        console.log('Archivo no encontrado.');
                        return;
                    }
                    setRes(response.docs);
                    setBandera(true);
                })
                .catch(error => console.log(error))
        }
    }, [categoryId]);

    return (
        <>
            {bandera ? <ItemList items={res} /> : <div className="loader__container">Juan Isa programador
                <div className="loader"></div>
            </div>
            }
        </>

    );
}
export default ItemListContainer;
