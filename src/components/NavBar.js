import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
//-------------------------------------
import CartWidget from './CartWidget'
import {  Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
let estilosLink = {
    margin: '7px',
    textDecoration: 'none',
    color: 'black'
}
const NavBar = () => {
    return (
        <header>
            {['xxl'].map((expand) => (
                <Navbar key={expand} bg="light" expand={expand} className="mb-1">
                    <Container fluid>
                        <Navbar.Brand ><Link to='/' style={estilosLink}>JTS SHOP</Link></Navbar.Brand>
                        <Link to='/cart'>
                            <CartWidget/>
                        </Link>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} >
                                    JTS SHOP
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Link to="/category/Almacenamiento" style={estilosLink}>Almacenamiento</Link>
                                    <Link to='/category/Gabinetes' style={estilosLink}>Gabinetes</Link>
                                    <Link to='/category/Memorias' style={estilosLink}>Memorias</Link>
                                    <Link to='/category/Motherboards' style={estilosLink}>Motherboards</Link>
                                    <Link to='/category/Microprocesadores' style={estilosLink}>Microprocesadores</Link>
                                    <Link to='/category/Unidades_ópticas' style={estilosLink}>Unidades ópticas</Link>
                                    <Link to='/category/Placas_de_video' style={estilosLink}>Placas de video</Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </header>
    );
}

export default NavBar;
