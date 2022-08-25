import React, { useContext } from "react";
import { Context } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./styles.css";

export const Categories = () => {
  const token = localStorage.getItem("token");
  const { authenticated, handleLogout } = useContext(Context);
  console.log(`Situação do usuário na página Dashboard: ${authenticated}`);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Consulta Categorias</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="aling-text" href="/categorias">Categorias</Nav.Link>
            <Nav.Link href="/listacategorias">Lista de Categorias</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="aling-body">
        <h3 className="title">
          Acesse aqui a:  <Link className="link-categories" to="/listacategorias">Lista de Categorias</Link>
        </h3>
      </div>
    </div>
  );
};