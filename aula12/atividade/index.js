// Verificação de acesso ao cinema
//crie um programa que receba a idade e se a pessoa tem ingresso.
// Ela só pode entrar se a idade for maior que 16 anos e tiver ingresso

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Qual é a sua idade? ", (idadeInput) => {
  let idade = parseInt(idadeInput);
  rl.question("Você tem ingresso? (sim/não) ", (ingressoInput) => {
    let temIngresso = ingressoInput.toLowerCase() === 'sim';
    if (idade > 16 && temIngresso) {
      console.log("Você pode entrar no cinema");
    } else {
      console.log("Desculpe, você não pode entrar no cinema.");
    }
    rl.close();
  });
});
