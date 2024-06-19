import React from "react";
import { useState, useEffect } from "react";

import { useFetch } from "../hooks/useFetch";

const CadastroProdutos = () => {
  const [products, setProducts] = useState([]);

  const url = "http://localhost:3000/products";

  const [searchTerm, setSearchTerm] = useState("");

  // 4 - custom Hoook

  const { data: items, httpConfig, loading, error } = useFetch(url);

  //  2º adicionando produtos

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (product) => {
    setSelectedItem(product);
    setName(product.name);
    setPrice(product.price);
    setId(product.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e)
    // Identificar qual botão foi clicado
    const clickedButton = e.nativeEvent.submitter;
    const buttonName = clickedButton.name;

    console.log(buttonName)

    

    if (buttonName === "incluir") {
      const product = {
        name: name,
        price: price,
      };

      httpConfig(product, "POST");
    } else if (buttonName === "alterar") {
      const product = {
        id: id,
        name: name,
        price: price,
      };
      httpConfig(product, "PUT");
    } else if (buttonName === "excluir") {
      const product = {
        id: id,
        name: name,
        price: price,
      };
      console.log("excluir")
      httpConfig(product, "DELETE");
    }
    setName("");
    setPrice("");
    setId("");
  };

  return (
    <div className="container">
      <h1 className="text-center">Lista de Produtos 2 </h1>
      <div className="filter-products mb-3">
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div style={{ height: "200px", overflowY: "auto" }}>
        <table className="table table-hover responsive">
          <thead style={{ position: "sticky", top: 0, background: "white" }}>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items
                .filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .sort((a, b) => b.id - a.id)
                .map((product) => (
                  <tr
                    className={selectedItem === product ? "table-active" : ""}
                    key={product.id}
                    onClick={() => handleItemClick(product)}
                  >
                    <td>{product.name}</td>
                    <td>R$ {product.price}</td>
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
      <div className="add-products mt-3">
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
            <label htmlFor="price" className="form-label">
              Preço :{" "}
            </label>
            <input
              className="form-control"
              type="number"
              step="0.01"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
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
  );
};

export default CadastroProdutos;
