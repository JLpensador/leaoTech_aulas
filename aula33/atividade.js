// crie um programa em node.js que peça para o usuario digitar o login e uma senha, se o o usuario digitar a senha errada peça novamente até 5 vezes, se ele errar as 5 vezes mostre: login bloqueado entre em contato com o administrador para recuperar a senha

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const correctPassword = 'senha123';
let attempts = 0;

function askPassword() {
    rl.question('Digite sua senha: ', (password) => {
        if (password === correctPassword) {
            console.log('Login bem-sucedido!');
            rl.close();
        } else {
            attempts++;
            if (attempts < 5) {
                console.log(`Senha incorreta. Você tem ${5 - attempts} tentativas restantes.`);
                askPassword();
            } else {
                console.log('Login bloqueado. Entre em contato com o administrador para recuperar a senha.');
                rl.close();
            }
        }
    }); 
}

rl.question('Digite seu login: ', (login) => {
    askPassword();
});

// 2. Crie um programa que simule uma urna de votação:
// 1 - João
// 2 - Maria
// 3 - Carlos
// A urna deve receber 10 votos e no final mostrar a contagem de votos de cada candidato.

const candidatos = {
    1: 'João',
    2: 'Maria',
    3: 'Carlos'
};

const votos = {
    'João': 0,
    'Maria': 0,
    'Carlos': 0
};

function votar() { 
    rl.question('Digite o número do candidato (1 - João, 2 - Maria, 3 - Carlos): ', (numero) => {
        const candidato = candidatos[numero];
        if (candidato) {
            votos[candidato]++;
            if (votos['João'] + votos['Maria'] + votos['Carlos'] < 10) {
                votar();
            } else {
                console.log('Votação encerrada. Contagem de votos:');
                console.log(`João: ${votos['João']} votos`);
                console.log(`Maria: ${votos['Maria']} votos`);
                console.log(`Carlos: ${votos['Carlos']} votos`);
                rl.close();
            }
        } else {
            console.log('Número de candidato inválido. Tente novamente.');
            votar();
        }
    });
}

// 3. Crie um programa que funcione como um caixa eletronico
// se o usuario digitar:
// 1 - sacar
// 2 - depositar 
// 3 - ver saldo
// 0 - sair
// regras:
// O sistema inicia com saldo de 1000 reais
// se tentar sacar um valor maior que o saldo, mostrar: sado insuficiente
// o programa deve funcionar até a pessoa digitar 0
// ao sari mostrar o saldo final da conta

let saldo = 1000;

function caixaEletronico() { 
    rl.question('Digite a opção (1 - Sacar, 2 - Depositar, 3 - Ver Saldo, 0 - Sair): ', (opcao) => {
        switch (opcao) {
            case '1':
                rl.question('Digite o valor a sacar: ', (valor) => {
                    const valorSaque = parseFloat(valor);
                    if (valorSaque > saldo) {
                        console.log('Saldo insuficiente.');
                    } else {
                        saldo -= valorSaque;
                        console.log(`Saque de R$${valorSaque} realizado. Saldo atual: R$${saldo}`);
                    }
                    caixaEletronico();
                });
                break;
            case '2':
                rl.question('Digite o valor a depositar: ', (valor) => {
                    const valorDeposito = parseFloat(valor);
                    saldo += valorDeposito;
                    console.log(`Depósito de R$${valorDeposito} realizado. Saldo atual: R$${saldo}`);
                    caixaEletronico();
                });
                break;      
            case '3':
                console.log(`Saldo atual: R$${saldo}`);
                caixaEletronico();
                break;
            case '0':
                console.log(`Saldo final: R$${saldo}`);
                rl.close();
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
                caixaEletronico();
        }
    });
}

caixaEletronico();