// 1- cadastrar usuário | 2- listar usuarios | 3- deletar cadastro | 4- sair

// let usuarios = [];

// function validarDados(nome, email, idade) {
//     if (nome === "" || email === "" || idade === "") {
//         return false;
//     }
//     return true;
// }

// function cadastrarUsuario(nome, email, idade) {
//     if (validarDados(nome, email, idade)) {
//         usuarios.push({ nome, email, idade });
//         console.log(`${nome} cadastrado com sucesso!`);
//     } else {
//         console.log("Dados inválidos!");
//     }
// }

// function listarUsuarios() {
//     console.log("=== Usuários ===");
//     usuarios.forEach((u, i) => {
//         console.log(`${i + 1}. ${u.nome} - ${u.email} - ${u.idade}`);
//     });
// }

// function deletarCadastro(indice) {
//     if (indice >= 0 && indice < usuarios.length) {
//         const deletado = usuarios.splice(indice, 1);
//         console.log(`${deletado[0].nome} deletado!`);
//     } else {
//         console.log("Usuário não encontrado!");
//     }
// }

// function menu(opcao) {
//     switch (opcao) {
//         case 1:
//             cadastrarUsuario("João", "joao@email.com", 25);
//             break;
//         case 2:
//             listarUsuarios();
//             break;
//         case 3:
//             deletarCadastro(0);
//             break;
//         case 4:
//             console.log("Até logo!");
//             break;
//         default:
//             console.log("Opção inválida!");
//     }
// }

// // Exemplos de uso:
// menu(1);  // Cadastrar
// menu(2);  // Listar
// menu(3);  // Deletar
// menu(4);  // Sair

// crie uma função que receba como parâmetro a altura e o peso e retorne o IMC

function calcularIMC(peso, altura) {
    if (altura <= 0) {
        return "Altura deve ser maior que zero.";
    }
    return peso / (altura * altura);
}

console.log(calcularIMC(70, 1.75));

// 2. crie uma função que receba como parâmetro um nome e uma lista, se esse nome tiver até 15 letras adcione ele na lista

function adicionarNome(nome, lista) {
    if (nome.length <= 15) {
        lista.push(nome);
        return "Nome adicionado!";
    } else {
        return "Nome muito longo!";
    }
}

let nomes = [];
console.log(adicionarNome("Maria", nomes));

// 3.  Crie uma função de validação que receba como parâmetro um array de objetos, o nome de usuário e senha.0 array de objetos deve ser desse tipo:
// usuarios = [
//     { user: 'maria', senha: 1234, tipo: cliente },
//     { user: 'joao', senha: 4567, tipo: visitante },
//     { user: 'jade', senha: 3216, tipo: admin }
// ]
//         Se a pessoa acertar o usuário e a senha, a função deve retornar um aviso dizendo o tipo de acesso que o usuário tem.

//     admin -> acesso total
// cliente -> acesso limitado
// visitante -> acesso básico

function validarAcesso(usuarios, user, senha) {
    const usuarioEncontrado = usuarios.find(u => u.user === user && u.senha === senha);
    if (usuarioEncontrado) {
        switch (usuarioEncontrado.tipo) {
            case 'admin':
                return "Acesso total";
            case 'cliente':
                return "Acesso limitado";
            case 'visitante':
                return "Acesso básico";
            default:
                return "Tipo de acesso desconhecido";
        }
    } else {
        return "Usuário ou senha incorretos!";
    }
}

// 4. Sistema de Pedidos
//         Crie uma função que receba um array de pedidos:
// [
//     { produto: "Mouse", preco: 50, quantidade: 2 },
//     { produto: "Teclado", preco: 100, quantidade: 1 }
// ]
//         A função deve:

//         Calcular o total de cada item(preco * quantidade)
//         Somar tudo
//         Se o total for maior que 150 → aplicar 10 % de desconto
//         Retornar o valor final

function calcularTotal(pedidos) {
    let total = 0;
    pedidos.forEach(pedido => {
        total += pedido.preco * pedido.quantidade;
    });
    if (total > 150) {
        total *= 0.9; // Aplica desconto de 10%
    }
    return total;
}

const pedidos = [
    { produto: "Mouse", preco: 50, quantidade: 2 },
    { produto: "Teclado", preco: 100, quantidade: 1 }
];

console.log(calcularTotal(pedidos));