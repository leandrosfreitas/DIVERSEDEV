let opcao;

function soma() {
    const num1 = Number(prompt("Digite o primeiro número:"));
    const num2 = Number(prompt("Digite o segundo número:"));
    return num1 + num2
}

do {
    opcao = Number(prompt(
        "Menu\n\n" +
        "1 - Dizer oi\n" +
        "2 - Somar 2 números\n" +
        "3 - Mostrar data atual\n" +
        "4 - Sair"
    ))

    switch (opcao) {
        case 1:
            alert("Oi")
            break;
        case 2:
            alert(soma())
            break
        case 3:
            alert("Data atual: " + new Date().toLocaleDateString())
            break
        case 4:
            alert("Saindo")
            break;
        default:
            alert('Opção inválida!')
    }
} while (opcao !== 4);
