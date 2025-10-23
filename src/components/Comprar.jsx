import { useState } from "react";

function Cobrar({ produtos }) {
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  // Agrupar produtos iguais
  const produtosAgrupados = carrinho.reduce((acc, item) => {
    const existente = acc.find((p) => p.id === item.id);
    if (existente) {
      existente.quantidade += 1;
    } else {
      acc.push({ ...item, quantidade: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="comprar">
      {!mostrarCarrinho ? (
        <div className="lista-produtos">
          {produtos.map((produto) => (
            <div className="produto" key={produto.id}>
              <img src={produto.imagem} alt={produto.nome} />
              <h3>{produto.nome}</h3>
              <p>R$ {produto.preco}</p>
              <button onClick={() => adicionarAoCarrinho(produto)}>
                Adicionar ao Carrinho
              </button>
            </div>
          ))}

          <button
            className="botao-carrinho"
            onClick={() => setMostrarCarrinho(true)}
          >
            Ver Carrinho
          </button>
        </div>
      ) : (
        <div className="carrinho">
          <h2>Seu Carrinho</h2>

          {produtosAgrupados.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            produtosAgrupados.map((item, index) => (
              <div className="carrinho-item" key={index}>
                <img src={item.imagem} alt={item.nome} />
                <div className="carrinho-info">
                  <h4>
                    {item.quantidade}x {item.nome}
                  </h4>
                  <p>R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                </div>
              </div>
            ))
          )}

          {produtosAgrupados.length > 0 && (
            <>
              <div className="carrinho-total">Total: R$ {total.toFixed(2)}</div>
              <div className="carrinho-botoes">
                <button onClick={() => alert("Compra finalizada!")}>
                  Finalizar Compra
                </button>
                <button onClick={() => setMostrarCarrinho(false)}>
                  Voltar às Compras
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Cobrar;
