import Item from "./Item";
let estilos = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '80%',
    margin: 'auto',
    marginTop:'30px'
}
const ItemList = ({ items }) => {
    return (
        <div style={estilos}>
            {items.map((value) => {
                return (
                    <Item item={value} key={value.id} />
                );
            })}
        </div>
    );
}
export default ItemList;
