// Lista de produtos 
const produtosArray = [
    { id: 1, nome: "Notebook", preco: 3500.00, estoque: 10 },
    { id: 2, nome: "Mouse Gamer", preco: 120.00, estoque: 45 },
    { id: 3, nome: "Teclado Mecânico", preco: 250.00, estoque: 20 },
    { id: 4, nome: "Monitor 24", preco: 890.00, estoque: 8 },
    { id: 5, nome: "Headset Bluetooth", preco: 199.90, estoque: 30 },
    { id: 6, nome: "Cadeira Gamer", preco: 999.00, estoque: 5 },
    { id: 7, nome: "Pendrive 64GB", preco: 55.00, estoque: 60 },
    { id: 8, nome: "HD Externo 1TB", preco: 320.00, estoque: 12 },
    { id: 9, nome: "Webcam Full HD", preco: 150.00, estoque: 18 },
    { id: 10, nome: "Carregador USB-C", preco: 70.00, estoque: 40 }
];

// Criação do Map
const mapaProdutos = new Map(produtosArray.map(p => [p.id, p]));

// Catálogo de produtos
const catalogo = {

    listar() {
        if (mapaProdutos.size === 0) {
            console.log("Nenhum produto encontrado.");
            return [];
        }
        return Array.from(mapaProdutos.values());
    },

    buscarPorNome(nome) {
        const produto = Array.from(mapaProdutos.values())
            .find(p => p.nome.toLowerCase() === nome.toLowerCase());

        if (!produto) {
            console.error(`Produto '${nome}' não foi encontrado.`);
            return null;
        }

        return produto;
    },

    buscarPorId(id) {
        const produto = mapaProdutos.get(id);

        if (!produto) {
            console.error(`Produto com ID ${id} não encontrado.`);
            return null;
        }

        return produto;
    },

    filtrarPorPreco(min, max) {
        const resultado = Array.from(mapaProdutos.values())
            .filter(p => p.preco >= min && p.preco <= max);

        if (resultado.length === 0) {
            console.error("Nenhum produto encontrado na faixa de preço.");
        }

        return resultado;
    },

    atualizarEstoque(id, delta) {
        const produto = this.buscarPorId(id);

        if (!produto) return null;

        const novoEstoque = produto.estoque + delta;

        if (novoEstoque < 0) {
            console.error("Estoque não pode ficar negativo.");
            return null;
        }

        produto.estoque = novoEstoque;
        return produto;
    }
};

// Carrinho
const carrinho = [];

// Adicionar item ao carrinho
const adicionar = (carrinho, produtoId, qtd) => {
    const produto = catalogo.buscarPorId(produtoId);

    if (!produto) return;

    if (qtd <= 0) {
        console.error("Quantidade deve ser maior que zero.");
        return;
    }

    if (qtd > produto.estoque) {
        console.error("Quantidade maior que o estoque!");
        return;
    }

    const item = carrinho.find(i => i.produtoId === produtoId);

    if (item) {
        const novaQtd = item.quantidade + qtd;

        if (novaQtd > produto.estoque) {
            console.error("Quantidade total ultrapassa o estoque!");
            return;
        }

        item.quantidade = novaQtd;
    } else {
        carrinho.push({ produtoId, quantidade: qtd });
    }

    console.log("Item adicionado!");
};

// Remover item
const remover = (carrinho, produtoId) => {
    const index = carrinho.findIndex(i => i.produtoId === produtoId);

    if (index === -1) {
        console.error("Item não encontrado no carrinho.");
        return;
    }

    carrinho.splice(index, 1);
    console.log("Item removido!");
};

// Alterar quantidade
const alterarQuantidade = (carrinho, produtoId, novaQtd) => {
    const produto = catalogo.buscarPorId(produtoId);
    if (!produto) return;

    const item = carrinho.find(i => i.produtoId === produtoId);

    if (!item) {
        console.error("Item não está no carrinho.");
        return;
    }

    if (novaQtd < 0) {
        console.error("Quantidade não pode ser negativa!");
        return;
    }

    if (novaQtd === 0) {
        remover(carrinho, produtoId);
        return;
    }

    if (novaQtd > produto.estoque) {
        console.error("Quantidade maior que o estoque!");
        return;
    }

    item.quantidade = novaQtd;
    console.log("Quantidade atualizada!");
};

// Calcular total
const calcularTotal = (carrinho) =>
    carrinho.reduce((total, item) => {
        const produto = catalogo.buscarPorId(item.produtoId);
        if (!produto) return total;
        return total + produto.preco * item.quantidade;
    }, 0);

// Cupons de desconto
const cupons = new Map([
    ["DESCONTO10", 10],
    ["PROMO5", 5],
    ["BLACK20", 20]
]);

// Aplicar cupom
function aplicarCupom(total, codigoCupom) {
    const percentual = cupons.get(codigoCupom);

    if (!percentual) {
        console.log("Cupom inválido ou não cadastrado.");
        return total;
    }

    const desconto = total * (percentual / 100);
    const totalComDesconto = total - desconto;

    console.log(`Cupom aplicado: ${codigoCupom} (${percentual}% de desconto)`);

    return totalComDesconto;
}



// =================== TESTES ===================

console.log("==============Listando produtos==============");
console.log(catalogo.listar());

console.log("==============Buscando por nome==============");
console.log(catalogo.buscarPorNome("Notebook"));
console.log(catalogo.buscarPorId(5));

console.log("==============Filtrando por faixa de preço==============");
console.log(catalogo.filtrarPorPreco(100, 500));

console.log("==============Atualizando estoque==============");
console.log(catalogo.atualizarEstoque(10, 100));

console.log("==============Estoque atualizado==============");
console.log(catalogo.listar());

console.log("==============Testando carrinho==============");
adicionar(carrinho, 5, 2);
adicionar(carrinho, 7, 3);
adicionar(carrinho, 3, 10);
adicionar(carrinho, 3, 10);
adicionar(carrinho, 4, 2);
remover(carrinho, 7)
alterarQuantidade(carrinho, 5, 15);

console.log("==============Detalhes do pedido==============");
console.log("Carrinho:", carrinho);
console.log("Total: R$", calcularTotal(carrinho));

console.log("==============Pedido com desconto==============");
const total = calcularTotal(carrinho);
console.log("Total sem desconto:", total);
console.log("Total com desconto:", aplicarCupom(total, "DESCONTO10"));
