//lista de produtos 
const produtos = [
    { id: 1, nome: "Notebook", preco: 3500.00, estoque: 10 },
    { id: 2, nome: "Mouse Gamer", preco: 120.00, estoque: 45 },
    { id: 3, nome: "Teclado Mecânico", preco: 250.00, estoque: 20 },
    { id: 4, nome: "Monitor 24\"", preco: 890.00, estoque: 8 },
    { id: 5, nome: "Headset Bluetooth", preco: 199.90, estoque: 30 },
    { id: 6, nome: "Cadeira Gamer", preco: 999.00, estoque: 5 },
    { id: 7, nome: "Pendrive 64GB", preco: 55.00, estoque: 60 },
    { id: 8, nome: "HD Externo 1TB", preco: 320.00, estoque: 12 },
    { id: 9, nome: "Webcam Full HD", preco: 150.00, estoque: 18 },
    { id: 10, nome: "Carregador USB-C", preco: 70.00, estoque: 40 }
];

// catalogo de produtos
const catalogo= {
    listar(){
        return produtos;
    },
    buscarPorNome(nome){
    return produtos.find(p => p.nome === nome)
    },
    buscarPorId(id){
        return produtos.find(p => p.id === id)
    },
    filtrarPorPreco(min, max){
        return produtos.filter(p => p.preco >= min && p.preco <= max);
    },
    atualizarEstoque(id, delta){
        const produto = this.buscarPorId(id);

        if (produto) {
            produto.estoque = Math.max(0, produto.estoque + delta);
            return produto
        }
        return null
    }
}

// carrinho de compras
const carrinho = []

// adicionar(carrinho, produtoId, qtd) — adiciona verificando estoque; se já existe, soma quantidade.
const adicionar = (carrinho, produtoId, qtd) => {
    const produto = catalogo.buscarPorId(productoId=produtoId);
    if (!produto) return console.log("Produto não encontrado!");

    if (qtd > produto.estoque)
        return console.log("Quantidade maior que o estoque!");

    const item = carrinho.find(i => i.produtoId === produtoId);

    item
        ? item.quantidade = Math.min(item.quantidade + qtd, produto.estoque)
        : carrinho.push({ produtoId, quantidade: qtd });

    console.log("Item adicionado!");
};

// remover(carrinho, produtoId) — remove o item do carrinho.
const remover = (carrinho, produtoId) => {
    const index = carrinho.findIndex(i => i.produtoId === produtoId);

    index !== -1
        ? carrinho.splice(index, 1)
        : console.log("Item não encontrado no carrinho.");
};

// alterarQuantidade(carrinho, produtoId, novaQtd) — ajusta quantidade, validando estoque; se novaQtd for 0, remove.
const alterarQuantidade = (carrinho, produtoId, novaQtd) => {
    const produto = catalogo.buscarPorId(produtoId);
    if (!produto) return console.log("Produto não encontrado!");

    const item = carrinho.find(i => i.produtoId === produtoId);
    if (!item) return console.log("Item não está no carrinho.");

    if (novaQtd === 0) return remover(carrinho, produtoId);

    if (novaQtd > produto.estoque)
        return console.log("Quantidade maior que o estoque!");

    item.quantidade = novaQtd;
    console.log("Quantidade atualizada!");
};

// calcularTotal(carrinho) — soma preços * quantidades (use catalogo para obter preço).
const calcularTotal = (carrinho) =>
    carrinho.reduce((total, item) => {
        const produto = catalogo.buscarPorId(item.produtoId);
        return total + (produto.preco * item.quantidade);
    }, 0);

// testando os métodos do catálogo
console.log("==============Listando produtos==============")
console.log(catalogo.listar());

console.log("==============Buscando por nome==============")
console.log(catalogo.buscarPorNome("Mouse Gamer"));

console.log("==============Filtrando por faixa de preço==============")
console.log(catalogo.filtrarPorPreco(0, 100));

console.log("==============Atualizando estoque==============")
console.log(catalogo.atualizarEstoque(2, 100));

console.log("==============Estoque atualizado==============")
console.log(catalogo.listar())

// testando os métodos do carrinho
console.log("==============Testando os métodos do carrinho==============")
adicionar(carrinho, 1, 2);
adicionar(carrinho, 7, 3);
adicionar(carrinho, 3, 10)
alterarQuantidade(carrinho, 7, 1);
remover(carrinho, 1);

// detalhes do pedido
console.log("==============Detalhes do pedido==============")
console.log("Carrinho:", carrinho);
console.log("Total: R$", calcularTotal(carrinho));
