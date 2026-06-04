const prompt = require('prompt-sync')();
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

console.log('conectado ao supabase');

async function inserirAutor() { 
    let nome = prompt('Digite o nome do autor: ');
    let nacionalidade = prompt('Digite a nacionalidade do autor: ');

    let novoAutor = {
        nome,
        nacionalidade:nacionalidade
    };

    const { data, error } = await supabase
        .from('biblioteca_autor')
        .insert(novoAutor)
        .select();

console.log(data);
console.log(error);
}

inserirAutor();