// import React, { useState, useEffect } from "react";
// import api from '../../services/api';
// import { useHistory } from 'react-router-dom';
// import { Form, Button, Container, Alert } from 'react-bootstrap';
// import { NavBar } from '../../components/UI/NavBar/NavBar'

// const initialValue = {
//     name: '',
//     email: '',
//     password: ''
// }

// export const CategoryForm = (props) => {

//     const history = useHistory();

//     const [id] = useState(props.match.params.id);

//     const [values, setValues] = useState(initialValue);
//     const [acao, setAcao] = useState('Novo');
//     const [status, setStatus] = useState({
//         type: '',
//         mensagem: '',
//         loading: false
//     })


//     const valorInput = e => setValues({
//         ...values,
//         [e.target.name]: e.target.value
//     })

//     useEffect(() => {
//         const getUser = async () => {
//             const headers = {
//                 'headers': {
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer ' + localStorage.getItem('token')
//                 },
//             }

//             await api.get("/user/" + id, headers)
//                 .then((response) => {
//                     if (response.data.users) {
//                         setValues(response.data.users);
//                         setAcao('Editar');
//                     } else {
//                         setStatus({
//                             type: 'warning',
//                             mensagem: 'Usuário não encontrado!!!',
//                         })
//                     }
//                 }).catch((err) => {
//                     if (err.response) {
//                         setStatus({
//                             type: 'error',
//                             mensagem: err.response.data.mensagem
//                         })
//                     } else {
//                         setStatus({
//                             type: 'error',
//                             mensagem: 'Erro: Tente mais tarde!'
//                         })
//                     }
//                 })
//         }
//         if (id) getUser();

//     }, [id])

//     const formSubmit = async e => {
//         e.preventDefault();
//         setStatus({ loading: true });

//         const headers = {
//             'headers': {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + localStorage.getItem('token')
//             },
//         }

//         if(!id){
//             await api.post("/user", values, headers)
//                 .then((response) => {
//                     setStatus({ loading: false })
//                     return history.push('/usuarios')
//                 }).catch((err) => {
//                     if (err.response) {
//                         setStatus({
//                             type: 'error',
//                             mensagem: err.response.data.mensagem,
//                             loading: false
//                         })
//                     } else {
//                         setStatus({
//                             type: 'error',
//                             mensagem: 'Erro: tente mais tarde',
//                             loading: false
//                         })
//                     }

//                 })
//         } else {
//             await api.put("/user", values, headers)
//                 .then((response) => {
//                     setStatus({ loading: false })
//                     return history.push('/usuarios')
//                 }).catch((err) => {
//                     if (err.response) {
//                         setStatus({
//                             type: 'error',
//                             mensagem: err.response.data.mensagem,
//                             loading: false
//                         })
//                     } else {
//                         setStatus({
//                             type: 'error',
//                             mensagem: 'Erro: tente mais tarde',
//                             loading: false
//                         })
//                     }

//                 })
//         }    

//     }

//     return (
//         <>
//             <NavBar />
//             <Container className="box">
//                 <Form onSubmit={formSubmit} className="borderForm">
//                     <h2>{acao} Usuário</h2>

//                     {status.type == 'error'
//                         ? <Alert variant="danger">{status.mensagem}</Alert>
//                         : ""}
//                     {status.type == 'success'
//                         ? <Alert variant="success">{status.mensagem}</Alert>
//                         : ""}

//                     {status.loading ? <Alert variant="warning">Enviando...</Alert> : ""}

//                     <Form.Group className="mb-3" controlId="formBasicName">
//                         <Form.Label>Name</Form.Label>
//                         <Form.Control type="name" name="name" value={values.name} onChange={valorInput} placeholder="Entre com seu Nome" />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formBasicEmail">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control type="email" name="email" value={values.email} onChange={valorInput} placeholder="Entre com seu email" />
//                         <Form.Text className="text-muted">
//                             Nunca compartilharemos seu e-mail com mais ninguém.
//                         </Form.Text>
//                     </Form.Group>
//                     {!id &&
//                         <Form.Group className="mb-3" controlId="formBasicPassword">
//                             <Form.Label>Senha</Form.Label>
//                             <Form.Control type="password" name="password" onChange={valorInput} placeholder="Digite sua senha" />
//                         </Form.Group>
//                     }
//                     <Form.Group className="mb-3" controlId="formBasicCheckbox">
//                         {/* <Form.Check type="checkbox" label="Check me out" /> */}
//                     </Form.Group>
//                     {status.loading
//                         ? <Button variant="primary" disabled type="submit">Enviando...</Button>
//                         : <Button variant="primary" type="submit">Enviar</Button>
//                     }

//                 </Form>
//             </Container>
//         </>
//     )
// }

import React, { useState,useEffect } from "react";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import { UserCircle } from "phosphor-react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./style.css";

const initialValue = {
  name: "",
  description: ""
};

export const CategoriesForm = (props) => {
    
    const history = useHistory();

  const [id] = useState(props.match.params.id);

  const [values, setValues] = useState(initialValue);
  const [acao, setAcao] = useState("Novo");
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
    loading: false
  });

  const valorInput = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
    useEffect( () => {
      const getUser = async () => {
        const valueToken = localStorage.getItem("token");
        const headers = {
          "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + valueToken
          },
        };
        await api.get("/categories/show/"+id, headers)
          .then((response) => {
            console.log(response);
            if(response.data.Categorie){
              setValues(response.data.Categorie);
              setAcao('Editar');
            } else {
            setStatus({
              type: "warning",
              mensagem: "Usuário não encontrado!!!",
            })
          }
          }).catch((err) => {
            if (err.response) {
              setStatus({
                type: "error",
                mensagem: err.response.data.mensagem,
              });
            } else {
              setStatus({
                type: "error",
                mensagem: "Erro: Tente mais tarde!",
              });
            }
          });
      }
      if(id) getUser();
    }, [id])

  const formSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true });
    const valueToken = localStorage.getItem("token");
    const headers = {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + valueToken
      },
    };
    if(!id){
      await api.post("/categories/create", values, headers)
          .then( (response) => {
                  setStatus({loading: false});
                  return history.push('/categorias')
              }).catch( (err) => {
                  if(err.response){
                      setStatus({
                          type: 'error',
                          mensagem: err.response.data.mensagem,
                          loading: false
                      })
                  } else {
                      setStatus({
                          type: 'error',
                          mensagem: 'Erro: tente mais tarde...',
                          loading: false
                      })
                  }
              })
    } else {
      await api.put("/categories/update", values, headers)
          .then( (response) => {
                  console.log(response);
                  setStatus({loading: false});
                  return history.push('/categorias')
              }).catch( (err) => {
                  if(err.response){
                      setStatus({
                          type: 'error',
                          mensagem: err.response.data.mensagem,
                          loading: false
                      })
                  } else {
                      setStatus({
                          type: 'error',
                          mensagem: 'Erro: tente mais tarde...',
                          loading: false
                      })
                  }
              })
    }
}

  return (
    <div className="box">
      <Form onSubmit={formSubmit} className="borderForm">
        <h1>Cadastre sua categoria</h1>
        
        {status.type == 'error' 
        ? <Alert variant="danger">{status.mensagem}</Alert>
        : ""}
        {status.type == 'success'
        ? <Alert variant="success">{status.mensagem}</Alert>
        : ""}

        {status.loading ? (
          <h3 className="p-alert-validando">Validando...</h3>) : ("")}
        <div className="user">
          <UserCircle size={80} color="#030202" />{" "}
        </div>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="FormLabel">Nome:</Form.Label>
          <Form.Control
            type="name"
            name="name"
            value={values.name}
            onChange={valorInput}
            placeholder="Digite o nome"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Descrição:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={values.description}
            onChange={valorInput}
            placeholder="Digite a descrição"
          />
        </Form.Group>
        {status.loading ? (
          <Button variant="Secondary" disabled type="submit">
            Aguarde...
          </Button>
        ) : (
          <Button variant="dark" type="submit">
            Cadastrar
          </Button>
        )}
      </Form>
    </div>
  );
};