import React, { useState } from "react";

function Registrar({ produtos, setProdutos }) {
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: "",
    imagem: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagemURL = URL.createObjectURL(file);
      setNovoProduto((prev) => ({ ...prev, imagem: imagemURL }));
    }
  };

  const handleRegistrar = () => {
    if (!novoProduto.nome || !novoProduto.preco || !novoProduto.imagem) {
      alert("Preencha todos os campos antes de registrar!");
      return;
    }

    const produto = {
      id: produtos.length + 1,
      nome: novoProduto.nome,
      preco: parseFloat(novoProduto.preco),
      imagem: novoProduto.imagem,
    };

    setProdutos([...produtos, produto]);
    setNovoProduto({ nome: "", preco: "", imagem: null });
    alert("Produto cadastrado com sucesso!");
  };

  return (
    <div className="registrar">
      <h2>Registrar Novo Produto</h2>

      <div className="formulario">
        <input
          type="text"
          name="nome"
          placeholder="Nome do produto"
          value={novoProduto.nome}
          onChange={handleChange}
        />

        <input
          type="number"
          name="preco"
          placeholder="Preço (R$)"
          value={novoProduto.preco}
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleImagemChange} />

        <button onClick={handleRegistrar}>Registrar Produto</button>
      </div>

      {novoProduto.imagem && (
        <div className="preview-imagem">
          <p>Pré-visualização:</p>
          <img src={novoProduto.imagem} alt="Prévia do produto" />
        </div>
      )}
    </div>
  );
}

export default Registrar;
