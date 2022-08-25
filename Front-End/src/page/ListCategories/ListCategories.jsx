import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import api from "../../services/api";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./table.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  TrashSimple,
  PencilSimple,
  ListPlus,
  ListNumbers,
} from "phosphor-react";
import(
  "https://fonts.googleapis.com/css2?family=Josefin+Sans&family=Libre+Franklin:wght@200;500&family=Merriweather:wght@300&display=swap"
);

export const ListCategories = () => {
  const history = useHistory();

  const [data, setData] = useState([]);
  const [page, setPage] = useState("");
  const [lastPage, setLastPage] = useState("");

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const confirmDelete = (Categories) => {
    confirmAlert({
      title: "ATENÇÃO !!!!",
      message:
        "Você deseja excluir a categoria com o id:" + Categories.id + "?",
      buttons: [
        {
          label: "Sim",
          onClick: () => handleDelete(Categories.id),
        },
        {
          label: "Não",
          onClick: () => history.push("/listacategorias"),
        },
      ],
    });
  };

  const handleDelete = async (idCategories) => {
    const valueToken = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: "Bearer " + valueToken,
      },
    };
    await api
      .delete("/categories/delete/" + idCategories, headers)
      .then((response) => {
        setStatus({
          type: "success",
          mensagem: response.data.mensagem,
        });
        getCategories();
      })
      .catch((err) => {
        if (err.response) {
          setStatus({
            type: "error",
            mensagem: err.response.data.mensagem,
          });
        } else {
          setStatus({
            type: "error",
            mensagem: "Erro tente mais tarde!!",
          });
        }
      });
  };

  const getCategories = async (page) => {
    if (page === undefined) {
      page = 1;
    }
    setPage(page);

    const valueToken = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: "Bearer " + valueToken,
      },
    };
    await api
      .get("/categories/all/pages/" + page, headers)
      .then((response) => {
        setData(response.data.Categories);
        setStatus({ loading: false });
        setLastPage(response.data.lastPage);
      })
      .catch((err) => {
        if (err.response) {
          setStatus({
            type: "error",
            mensagem: err.response.mensagem,
          });
        } else {
          setStatus({
            type: "error",
            mensagem: "Erro: Tente mais tarde!",
          });
        }
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="tabela">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Consulta Categorias</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="aling-text" href="/categorias">
              Categorias
            </Nav.Link>
            <Nav.Link href="/listacategorias">Lista de Categorias</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="bg-ListCategories">
        <h1 className="h1-ListCategories">Lista de Categorias</h1>
        <div className="aling-buttons">
          <Button className="button-width" variant="success">
            <Link className="btnLinkList " to="/categories/create">
              Nova Categoria
              <ListPlus size={32} weight="light" />
            </Link>
          </Button>

          <Button className="button-width" variant="dark">
            <Link className="btnLinkList" to="/categorias">
              Categorias
              <ListNumbers size={32} weight="light" />
            </Link>
          </Button>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Descrição</th>
              <th>Funções</th>
            </tr>
          </thead>
          <tbody>
            {data.map((Categories) => (
              <tr key={Categories.id}>
                <td>{Categories.id}</td>
                <td>{Categories.name}</td>
                <td>{Categories.description}</td>
                <td>
                  <Button variant="light" className = "btn-edit">
                    <Link
                      className="noLink "
                      to={"categories/update/" + Categories.id}
                    >
                      Editar
                      <PencilSimple size={32} weight="light" />
                    </Link>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => confirmDelete(Categories)}
                  >
                    Deletar
                    <TrashSimple size={32} weight="light" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* pagina atual */}
        {page !== 1 ? (
          <Button type="button" onClick={() => getCategories(1)}>
            Primeira
          </Button>
        ) : (
          <Button type="button" disabled>
            Primeira
          </Button>
        )}{" "}
        {/* antes da pagina que o usuario está */}
        {page !== 1 ? (
          <Button type="button" onClick={() => getCategories(page - 1)}>
            {page - 1}
          </Button>
        ) : (
          ""
        )}{" "}
        {/* Página Atual */}
        <Button type="button" disabled>
          {page}
        </Button>{" "}
        {/* página depois da atual */}
        {page !== lastPage ? (
          <Button type="button" onClick={() => getCategories(page + 1)}>
            {page + 1}
          </Button>
        ) : (
          ""
        )}{" "}
        {/* Ultima Página */}
        {page !== lastPage ? (
          <Button type="button" onClick={() => getCategories(lastPage)}>
            Ultima
          </Button>
        ) : (
          <Button type="button" disabled>
            Ultima
          </Button>
        )}
      </Container>
    </div>
  );
};
