import React from 'react'
import { useState, useEffect } from "react";
import { useFetch } from '../hooks/useFetch';
 
const CadastroUsuario = () => {
    const [users, setUsers] = useState([]);
 
    const url = "http://localhost:3000/users";
 
    const [searchTerm, setSearchTerm] = useState("");
 
    const {data: items, httpConfig, loading, error } = useFetch(url);
 
    const[id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
 
    const [selectedItem, setSelectedItem] = useState(null);
 
    const handleItemClick = (user) => {
        setSelectedItem(user);
        setName(user.name);
        setEmail(user.email);
        setSenha(user.senha);
        setId(user.id);
      };
 
 
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e)
        // Identificar qual botão foi clicado
        const clickedButton = e.nativeEvent.submitter;
        const buttonName = clickedButton.name;
   
        console.log(buttonName)
   
       
   
        if (buttonName === "incluir") {
          const user = {
            name: name,
            email: email,
            senha: senha,
          };
   
          httpConfig(user, "POST");
        } else if (buttonName === "alterar") {
          const user = {
            id: id,
            name: name,
            email: email,
            senha: senha,
          };
          httpConfig(user, "PUT");
        } else if (buttonName === "excluir") {
          const user = {
            id: id,
            name: name,
            email: email,
            senha: senha,
          };
          console.log("excluir")
          httpConfig(user, "DELETE");
        }
        setName("");
        setEmail("");
        setSenha("");
        setId("");
      };
 
 
 
 
 
 
 
 
  return (
    <div className="container">
      <h1 className="text-center">Lista de Usuario  </h1>
      <div className="filter-users mb-3">
        <input
          type="text"
          placeholder="Pesquisar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div style={{ height: "200px", overflowY: "auto" }}>
        <table className="table table-hover responsive">
          <thead style={{ position: "sticky", top: 0, background: "white" }}>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Senha</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items
                .filter((user) =>
                  user.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .sort((a, b) => b.id - a.id)
                .map((user) => (
                  <tr
                    className={selectedItem === user ? "table-active" : ""}
                    key={user.id}
                    onClick={() => handleItemClick(user)}
                  >
                    <td>{user.name}</td>
                    <td> {user.email}</td>
                    <td>{user.senha}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div>
        {loading && <p>Carregando dados ... </p>}
        {error && <p>{error}</p>}
      </div>
      {/* 2º adicionando produto */}
      <div className="add-users mt-3">
        <form onSubmit={handleSubmit} className="form">
 
        <div className="form-group mb-3">
            <label htmlFor="id" className="form-label">
              Id :
            </label>
            <input
              className="form-control"
              type="text" disabled
              value={id}
              name="id"
             
             
            />
          </div>
 
          <div className="form-group mb-3">
            <label htmlFor="name" className="form-label">
              Nome :{" "}
            </label>
            <input
              className="form-control"
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email: :{" "}
            </label>
            <input
              className="form-control"
              type="text"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="senha" className="form-label">
              Senha: :{" "}
            </label>
            <input
              className="form-control"
              type="text"
              value={senha}
              name="senha"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          {/* Tratando DuploClique  */}
          <div className="d-flex justify-content-between">
            {!loading && (
              <button
                type="submit"
                className="btn btn-primary "
                name="incluir"
              >
                Incluir
              </button>
            )}
            {!loading && (
              <button
                type="submit"
                className="btn btn-primary "
                name="alterar"
              >
                Alterar
              </button>
            )}
            {!loading && (
              <button type="submit" className="btn btn-primary" name="excluir">
                Excluir
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
 
export default CadastroUsuario