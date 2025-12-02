let peso = 78;
let altura = 1.67;
let imc = peso / (altura ** 2);

let result = {
    peso: peso,
    altura: altura,
    imc: imc,
};

if (imc < 18.5) {
    console.log("Abaixo do peso");
} else if (imc < 25) {
    console.log("Peso normal");
} else if (imc < 30) {
    console.log("Sobrepeso");
} else if (imc < 35) {
    console.log("Obesidade grau I");
} else if (imc < 40) {
    console.log("Obesidade grau II");
} else {
    console.log("Obesidade grau III");
}

console.log(result);
