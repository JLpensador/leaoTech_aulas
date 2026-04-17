function calcularNumeros(operacao, num1, num2) {
    switch (operacao) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 === 0) {
                return "Erro: Divisão por zero";
            }
            return num1 / num2;
        default:
            return "Operação inválida";
    }
}

const resultado = calcularNumeros("+", 5, 3);
console.log(resultado);

// função expressão

let somar = function (a, b) {
    return a + b;
}

console.log(somar(10, 20));

// função arrow

let multiplicar = (a, b) => a * b;
console.log(multiplicar(4, 5));

let msgError = (error) => {
    console.error("Erro: " + error);
}

msgError("Algo deu errado!");

//função com parâmetros default
function saudacao(nome = "Visitante") {
    console.log("Olá, " + nome + "!");

}
saudacao(); // Olá, Visitante!
saudacao("Maria"); // Olá, Maria!

// função recursiva
function fatorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * fatorial(n - 1);
}

console.log(fatorial(5)); // 120

//função de callback

function processar(funcaoCallback) {
    console.log("Processando...");
    funcaoCallback();
}

processar(() => {
    console.log("Lista de usuários do Sistema");
});

setTimeout(() => {
    console.log("Executando após 2 segundos");
}, 2000);

// forEach

let usuarios = ['João', 'Maria', 'Pedro', 'Tiago'];

usuarios.forEach((usuario) => {
    console.log(`Nome: ${usuario}`);
});

// map

let precos = [10, 20, 30, 100, 99, 50, 350, 650];

let precosDesconto = precos.map((precos) => {
    let desconto = 0.9 * precos;
    return desconto;
});

console.log(precosDesconto);

// filter

let maisBaratos = precos.filter((preco) => {
    return preco < 100;
});
console.log(maisBaratos);

usuarios = [
    { nome: 'João', ativo: true, nivel: 'admin' },
    { nome: 'Maria', ativo: false, nivel: 'cliente' },
    { nome: 'Gerald', ativo: true, nivel: 'visitante' },
    { nome: 'Tiago', ativo: false, nivel: 'cliente' }
]

let usuariosAtivos = usuarios.filter((usuario) => {
    return usuario.ativo;
})

console.log(usuariosAtivos);

let usuarioInativo = usuarios.filter((usuario) => {
    return !usuario.ativo;
})

console.log(usuarioInativo);

let usuarioAtivoAdmin = usuarios.filter((usuario) => {
    return usuario.ativo && usuario.nivel === 'admin';
})

console.log(usuarioAtivoAdmin);

// reduce

// let precos = [10, 20, 30, 100, 99, 50, 350, 650];
let total = precos.reduce((acumulador, preco) => {
    return acumulador + preco;
}, 0);

console.log(total); // 1309 (soma de todos os preços)