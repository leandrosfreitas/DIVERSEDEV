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

// catálogo de produtos
const catalogo = {

    listar() {
        if (produtos.length === 0) {
            console.log("Nenhum produto encontrado.");
            return [];
        }
        return produtos;
    },

    buscarPorNome(nome) {
        try {
            const produto = produtos.find(
                p => p.nome.toLowerCase() === nome.toLowerCase()
            );

            if (!produto) {
                throw new Error(`Produto '${nome}' não foi encontrado.`);
            }

            return produto;

        } catch (error) {
            console.error("Erro ao buscar produto por nome:", error.message);
            return null;
        }
    },

    buscarPorId(id) {
        try {
            const produto = produtos.find(p => p.id === id);

            if (!produto) {
                throw new Error(`Produto com ID ${id} não encontrado.`);
            }

            return produto;

        } catch (error) {
            console.error("Erro ao buscar produto por ID:", error.message);
            return null;
        }
    },

    filtrarPorPreco(min, max) {
        try {
            const resultado = produtos.filter(
                p => p.preco >= min && p.preco <= max
            );

            if (resultado.length === 0) {
                throw new Error("Nenhum produto encontrado.");
            }

            return resultado;

        } catch (error) {
            console.error("Erro ao filtrar produtos:", error.message);
            return [];
        }
    },

    atualizarEstoque(id, delta) {
        try {
            const produto = this.buscarPorId(id);

            if (!produto) {
                throw new Error("Produto não encontrado.");
            }

            produto.estoque = Math.max(0, produto.estoque + delta);

            return produto;

        } catch (error) {
            console.error("Erro ao atualizar estoque:", error.message);
            return null;
        }
    }
};

// carrinho de compras
const carrinho = [];

// adicionar itens ao carrinho
const adicionar = (carrinho, produtoId, qtd) => {
    try {
        const produto = catalogo.buscarPorId(produtoId);

        if (!produto) {
            throw new Error("Produto não encontrado!");
        }

        if (qtd > produto.estoque) {
            throw new Error("Quantidade maior que o estoque!");
        }

        const item = carrinho.find(i => i.produtoId === produtoId);

        if (item) {
            item.quantidade = Math.min(item.quantidade + qtd, produto.estoque);
        } else {
            carrinho.push({ produtoId, quantidade: qtd });
        }

        console.log("Item adicionado!");

    } catch (error) {
        console.error(error.message);
    }
};

// remover itens
const remover = (carrinho, produtoId) => {
    try {
        const index = carrinho.findIndex(i => i.produtoId === produtoId);

        if (index === -1) {
            throw new Error("Item não encontrado no carrinho.");
        }

        carrinho.splice(index, 1);
        console.log("Item removido!");

    } catch (error) {
        console.error(error.message);
    }
};

// alterar quantidade
const alterarQuantidade = (carrinho, produtoId, novaQtd) => {
    try {
        const produto = catalogo.buscarPorId(produtoId);

        if (!produto) {
            throw new Error("Produto não encontrado!");
        }

        const item = carrinho.find(i => i.produtoId === produtoId);

        if (!item) {
            throw new Error("Item não está no carrinho.");
        }

        if (novaQtd === 0) {
            return remover(carrinho, produtoId);
        }

        if (novaQtd < 0) {
            throw new Error("Quantidade não pode ser negativa!");
        }

        if (novaQtd > produto.estoque) {
            throw new Error("Quantidade maior que o estoque!");
        }

        item.quantidade = novaQtd;
        console.log("Quantidade atualizada!");

    } catch (error) {
        console.error(error.message);
    }
};

// calcular total do carrinho
const calcularTotal = (carrinho) =>
    carrinho.reduce((total, item) => {
        const produto = catalogo.buscarPorId(item.produtoId);
        return total + produto.preco * item.quantidade;
    }, 0);

// cupons de desconto
const cupons = new Map([
    ["DESCONTO10", 10],
    ["PROMO5", 5],
    ["BLACK20", 20]
]);

// aplicar cupom
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
console.log(catalogo.buscarPorNome("Notebook")); // deve dar erro
console.log(catalogo.buscarPorId(5));      // válido

console.log("==============Filtrando por faixa de preço==============");
console.log(catalogo.filtrarPorPreco(100, 500)); // nenhum produto

console.log("==============Atualizando estoque==============");
console.log(catalogo.atualizarEstoque(2, 100));

console.log("==============Estoque atualizado==============");
console.log(catalogo.listar());

// carrinho
console.log("==============Testando carrinho==============");
adicionar(carrinho, 5, 2);
adicionar(carrinho, 7, 3);
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
console.log("Total com desconto:", aplicarCupom(total, "BLACK20"));
