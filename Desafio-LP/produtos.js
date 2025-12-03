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
        if (produtos.length === 0) {
            console.log("Nenhum produto encontrado.");
            return [];
        }
        return produtos;
    },

    buscarPorNome(nome){
        try {
            const produto = produtos.find(p => p.nome === nome);
            
            if (!produto) {
                throw new Error(`Produto '${nome}' não foi encontrado.`);
            }
            return produto;
            
        } catch (error) {
            console.error("Erro ao buscar produto por nome:", error.message);
            return [];
        }
        
    },

    buscarPorId(id){
            return produtos.find(p => p.id === id);
    },

    filtrarPorPreco(min, max){
        try {
            const resultado = produtos.filter(p => p.preco >= min && p.preco <= max);

            if (resultado.length === 0) {
                throw new Error("Nenhum produto encontrado");
            }
        } catch (error) {
            console.error("Erro ao filtrar produtos:", error.message);
            return [];
        }
        
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
    try {
        const produto = catalogo.buscarPorId(produtoId);
        
        if (!produto) {
            throw new Error("Produto não encontrado!");
        }

        if (qtd > produto.estoque) {
            throw new Error("Quantidade maior que o estoque!");
        }

        const item = carrinho.find(i => i.produtoId === produtoId);

        item
            ? item.quantidade = Math.min(item.quantidade + qtd, produto.estoque)
            : carrinho.push({ produtoId, quantidade: qtd });

        console.log("Item adicionado!");
        
    } catch (erro) {
        console.error(erro.message);
    }
};

// remover(carrinho, produtoId) — remove o item do carrinho.
const remover = (carrinho, produtoId) => {
    try {
        const index = carrinho.findIndex(i => i.produtoId === produtoId);

        if (index === -1) {
            throw new Error("Item não encontrado no carrinho.");
        }

        carrinho.splice(index, 1);
        console.log("Item removido!");
        
    } catch (erro) {
        console.error(erro.message);
    }
};

// alterarQuantidade(carrinho, produtoId, novaQtd) — ajusta quantidade, validando estoque; se novaQtd for 0, remove.
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
        
    } catch (erro) {
        console.error(erro.message);
    }
};

// calcularTotal(carrinho) — soma preços * quantidades (use catalogo para obter preço).
const calcularTotal = (carrinho) =>
    carrinho.reduce((total, item) => {
        const produto = catalogo.buscarPorId(item.produtoId);
        return total + (produto.preco * item.quantidade);
    }, 0);

// código do cupom + percentual de desconto
const cupons = new Map([
    ["DESCONTO10", 10], // 10% de desconto
    ["PROMO5", 5],      // 5% de desconto
    ["BLACK20", 20]     // 20% de desconto
]);

// recebe o total e o código do cupom
function aplicarCupom(total, codigoCupom) {
    const percentual = cupons.get(codigoCupom); // busca no Map

    // se não encontrou, percentual será undefined
    if (!percentual) {
        console.log("Cupom inválido ou não cadastrado.");
        return total; // retorna o total original
    }

    const desconto = total * (percentual / 100);
    const totalComDesconto = total - desconto;

    console.log(
        `Cupom aplicado: ${codigoCupom} (${percentual}% de desconto)`
    );

    return totalComDesconto;
}

// testando os métodos do catálogo
console.log("==============Listando produtos==============")
console.log(catalogo.listar());

console.log("==============Buscando por nome==============")
console.log(catalogo.buscarPorNome("fio"));
console.log(catalogo.buscarPorId(10))

console.log("==============Filtrando por faixa de preço==============")
console.log(catalogo.filtrarPorPreco(0, 5));

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

// teste de cupom 
const total = calcularTotal(carrinho);
console.log("Total sem desconto:", total);

// aplicar um cupom de exemplo
const totalComDesconto = aplicarCupom(total, "BLACK20");

// mostrar total com desconto 
console.log("Total com desconto:", totalComDesconto);
