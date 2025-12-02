const meta = 1500
let mes = 0

let valor = 0

while (valor < meta) {
    let deposito = Number(prompt("Digite um valor"))
    valor += deposito
    mes++
    console.log(`Mês ${mes} - Valor depositado ${deposito} - Saldo ${valor}`)
    
}

console.log(`Foram necessários ${mes} meses para atingir a meta de ${meta}`)
