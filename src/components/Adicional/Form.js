import './Form.css';

const Form = ({ setFlagForm, terminarCompra }) => {
    function handlerSubmit(e) {
        const nombre = document.getElementById('name');
        const telefono = document.getElementById('phoneNumber');
        let correo = document.getElementById('email');
        e.preventDefault();
        if (nombre.value === '' || telefono.value === '' || correo.value === '') {
            alert('Para continuar con la compra todos los campos deben estar completos.');            
        } else {
            let dataUser={
                name: nombre.value,
                phone: telefono.value,
                email:correo.value
            }
            setFlagForm(false);
            terminarCompra(dataUser);
        }
    }
    return (
        <div id='fullScreen'>
            <div id='formContainer'>
                <form>
                    <label htmlFor='name'>Ingrese su nombre:</label>
                    <input type='text' id='name' placeholder='Ingrese nombre completo'/>
                    <label htmlFor='phoneNumber'>Ingrese su número telefónico:</label>
                    <input type='text' id='phoneNumber' placeholder='Ingrese su número telefónico'/>
                    <label htmlFor='email'>Ingrese su email:</label>
                    <input type='email' id='email' placeholder='Ingrese su E-mail' />
                    <input type='submit' id='sendDataUser'onClick={handlerSubmit}/>
                </form>
            </div>
        </div>
    );
}

export default Form;
