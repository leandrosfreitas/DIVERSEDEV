# Desafio Prático — Mini Loja (projeto)

Objetivo: aplicar os conceitos vistos em aula construindo um pequeno gerenciador de catálogo e carrinho de compras em JavaScript. O projeto integra uso de tipos, coerções, arrays, matrizes, funções, `Math`, buscas e transformações.

---

Escopo mínimo
- Um catálogo de produtos representado por um array de objetos: cada produto tem `id`, `nome`, `preco` (number) e `estoque` (number).
- Funções para listar produtos, buscar produto por nome/id (`find`/`findIndex`), e filtrar por faixa de preço (`filter`).
- Um carrinho (array) que permite: adicionar produto (verificando estoque), remover produto, alterar quantidade, e calcular total.
- Aplicar desconto percentual por cupom (função `aplicarDesconto(total, percentual)`). Use `Math.round`/`toFixed` conforme apropriado para formato de preço.
- Persistência em memória (objetos/arrays) — não é necessário salvar em disco.

Exemplo de produtos iniciais:

```js
const produtos = [
  { id: 1, nome: 'Sabonete', preco: 3.5, estoque: 10 },
  { id: 2, nome: 'Xampu', preco: 12.0, estoque: 5 },
  { id: 3, nome: 'Máscara', preco: 25.0, estoque: 2 }
];
```

---

Requisitos detalhados
1) `catalogo`:
   - `listar()` → retorna o array de produtos.
   - `buscarPorNome(nome)` → retorna produto (use `find`).
   - `filtrarPorPreco(min, max)` → retorna array de produtos no intervalo.
   - `atualizarEstoque(id, delta)` → altera `estoque` somando `delta` (positivo ou negativo).

2) `carrinho`:
   - Estrutura do carrinho: array de itens `{ produtoId, quantidade }`.
   - `adicionar(carrinho, produtoId, qtd)` — adiciona verificando estoque; se já existe, soma quantidade.
   - `remover(carrinho, produtoId)` — remove o item do carrinho.
   - `alterarQuantidade(carrinho, produtoId, novaQtd)` — ajusta quantidade, validando estoque; se `novaQtd` for 0, remove.
   - `calcularTotal(carrinho)` — soma preços * quantidades (use `catalogo` para obter preço).

3) `dicas`:
   - Monte um catálogo inicial.
   - Crie um carrinho vazio, adicione items, altere quantidades, aplique cupom de desconto e imprima o total final formatado.
   - Demonstre buscas (por nome) e filtragens.

Extras:
- Implementar ordenação de produtos por preço (uso de `sort`).
- Implementar histórico de pedidos (matriz: cada pedido é uma linha com itens e total).
- Implementar função `sorteioPromo(listaProdutos)` que retorna um produto aleatório em promoção (use `Math.random`).


# Extensão do Desafio — Mini Loja (JS)  

## Uso de `try/catch` e `Map`

Continuaremos evoluindo o projeto da Mini Loja.  
Agora você deverá adicionar:

- Tratamento de erros com **try/catch**
- Uso de **Map()** como estrutura de dados no projeto

Esses novos requisitos devem ser integrados ao código já desenvolvido.

---

# Novos Requisitos

## 1) Tratamento de Erros (`try…catch`)

Adicione tratamento de exceções nas operações que podem falhar. Sempre que houver risco de erro, utilize:

```js
try {
  // operação arriscada
} catch (erro) {
  console.error("Mensagem clara");
}
````

**Pontos onde usar**
- Ao adicionar itens ao carrinho (ex.: quantidade maior que estoque)
- Ao alterar quantidade (nova quantidade negativa, zero ou acima do estoque)
- Ao buscar produtos por nome ou id (produto não encontrado)
- Ao aplicar desconto (percentual inválido)

Você pode criar erros personalizados:

```js
throw new Error("Produto não encontrado");
```

## 2) Uso de `Map()`

Você deverá utilizar `Map()` para armazenar ou organizar alguma parte do projeto de maneira mais eficiente.
Use `Map()` em pelo menos uma destas formas:

**Opção A — Map para índice rápido de produtos por ID**

Isso facilita buscas sem percorrer arrays:

```js
const mapaProdutos = new Map();
produtos.forEach(p => mapaProdutos.set(p.id, p));
```

Uso:

```js
const produto = mapaProdutos.get(2);
```

**Opção B — Map para cupons de desconto**

```js
const cupons = new Map([
  ["DESCONTO10", 0.10],
  ["BLACKFRIDAY", 0.30]
]);
```

Uso:

```js
const percentual = cupons.get(codigoDigitado);
```

Aplique try/catch caso o cupom não exista:

```js
if (!cupons.has(codigoDigitado)) {
  throw new Error("Cupom inválido");
}
```

**Opção C — Map para histórico de operações**

```js
const historico = new Map();
historico.set("ultimaCompra", { total: 89.90, itens: 3 });
```

Ou:

```js
historico.set(Date.now(), carrinhoAtual);
