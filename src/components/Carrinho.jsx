{produtos.map(produto => {
  const itemCarrinho = carrinho.find(item => item.id === produto.id);
  const quantidade = itemCarrinho ? itemCarrinho.quantidade : 0;

  return (
    <div className="produto" key={produto.id}>
      <img src={produto.imagem} alt={produto.nome} />
      <h3>{produto.nome}</h3>
      <p>R$ {produto.preco}</p>

      {quantidade === 0 ? (
        <button onClick={() => adicionarAoCarrinho(produto)}>Adicionar ao Carrinho</button>
      ) : (
        <div className="contador-produto">
          <button onClick={() => removerDoCarrinho(produto)}>-</button>
          <span>{quantidade}x</span>
          <button onClick={() => adicionarAoCarrinho(produto)}>+</button>
        </div>
      )}
    </div>
  );
})}
