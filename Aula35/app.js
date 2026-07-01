const prompt = require('prompt-sync')()
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
const bcrypt = require('bcrypt')


async function inserirAutor() {
    let nome = prompt('Digite o nome do autor: ')
    let nacionalidade = prompt('Digite a nacionalidade: ')
    let novoAutor = { nome, nacionalidade }
    const { data, error } = await supabase.from('biblioteca_autor').insert(novoAutor).select()
    error ? console.log('Erro:', error.message) : console.log('Autor inserido com sucesso!', data)
}

async function atualizarAutor(id) {
    let nome = prompt('Digite o novo nome: ')
    let nacionalidade = prompt('Digite a nova nacionalidade: ')
    let atualizacao = { nome, nacionalidade }
    const { error } = await supabase.from('biblioteca_autor').update(atualizacao).eq('id', id).select()
    error ? console.log('Erro:', error.message) : console.log('Autor atualizado com sucesso!')
}

async function deletarAutor(id) {
    const { data, error } = await supabase.from('biblioteca_autor').delete().eq('id', id).select()
    error ? console.log('Erro:', error.message) : console.log('Autor deletado:', data)
}

async function listarLivros() {
    const { data, error } = await supabase
        .from('biblioteca_livro')
        .select('titulo, genero, biblioteca_autor(nome, nacionalidade)')
    if (error) { console.log('Erro:', error.message); return }
    console.log('\n====== LIVROS CADASTRADOS ======')
    data.forEach(livro => {
        console.log(`📖 ${livro.titulo} | Autor: ${livro.biblioteca_autor?.nome ?? 'N/A'} | Gênero: ${livro.genero}`)
    })
}

async function buscarLivro() {
    let titulo = prompt('Digite o título do livro: ')
    const { data, error } = await supabase
        .from('biblioteca_livro')
        .select('titulo, genero, quantidade')
        .ilike('titulo', `%${titulo}%`)
    if (error) { console.log('Erro:', error.message); return }
    if (data.length === 0) { console.log('Nenhum livro encontrado.'); return }
    console.log('\n====== RESULTADO DA BUSCA ======')
    data.forEach(livro => {
        console.log(`📖 ${livro.titulo} | Gênero: ${livro.genero} | Quantidade: ${livro.quantidade}`)
    })
}

async function inserirUsuario() {
    let nome = prompt('Insira o nome: ')
    let cpf = prompt('Insira o CPF: ')
    let telefone = prompt('Insira o telefone: ')
    let endereco = prompt('Insira o endereço: ')
    let senha = prompt('Insira a senha: ')
    let tipo = prompt('Insira o tipo: ')
    const saltRounds = 10
    const senhaCrip = await bcrypt.hash(senha, saltRounds)
    let novoUsuario = { nome, cpf, telefone, endereco, senha: senhaCrip, tipo }
    const { error } = await supabase.from('biblioteca_usuarios').insert(novoUsuario).select()
    error ? console.log(error) : console.log('Usuário cadastrado com sucesso!')
}

async function logarSistema() {
    console.log('\n====== Login ======')
    const cpf = prompt('Digite o seu CPF: ')
    const senha = prompt('Digite sua senha: ')
    const { data, error } = await supabase.from('biblioteca_usuarios').select('*').eq('cpf', cpf)
    if (error) { console.log('Erro ao buscar usuário.'); return false }
    if (data.length === 0) { console.log('CPF não encontrado.'); return false }
    const senhaCorreta = await bcrypt.compare(senha, data[0].senha)
    if (senhaCorreta) return data[0]
    console.log('Senha incorreta.')
    return false
}

// ─── EMPRÉSTIMOS ────────────────────────────────────────────────────────────

async function realizarEmprestimo(usuario) {
    let titulo = prompt('Digite o título do livro para empréstimo: ')
    const { data: livros, error: errLivro } = await supabase
        .from('biblioteca_livro')
        .select('id, titulo, quantidade')
        .ilike('titulo', `%${titulo}%`)

    if (errLivro || livros.length === 0) { console.log('Livro não encontrado.'); return }

    const livro = livros[0]
    if (livro.quantidade <= 0) { console.log('Livro sem estoque disponível.'); return }

    const hoje = new Date().toISOString().split('T')[0]
    const devolucao = new Date()
    devolucao.setDate(devolucao.getDate() + 14)
    const dataDevolucao = devolucao.toISOString().split('T')[0]

    const novoEmprestimo = {
        usuario_id: usuario.id,
        livro_id: livro.id,
        data_emprestimo: hoje,
        data_devolucao: dataDevolucao,
        status: 'ativo'
    }

    const { error: errEmp } = await supabase.from('biblioteca_emprestimos').insert(novoEmprestimo)
    if (errEmp) { console.log('Erro ao registrar empréstimo:', errEmp.message); return }

    await supabase.from('biblioteca_livro').update({ quantidade: livro.quantidade - 1 }).eq('id', livro.id)
    console.log(`✅ Empréstimo realizado! Devolução prevista: ${dataDevolucao}`)
}

async function devolverLivro(usuario) {
    const { data: emprestimos, error } = await supabase
        .from('biblioteca_emprestimos')
        .select('id, livro_id, data_devolucao, biblioteca_livro(titulo)')
        .eq('usuario_id', usuario.id)
        .eq('status', 'ativo')

    if (error || emprestimos.length === 0) { console.log('Nenhum empréstimo ativo encontrado.'); return }

    console.log('\n====== SEUS EMPRÉSTIMOS ATIVOS ======')
    emprestimos.forEach((emp, i) => {
        console.log(`${i + 1}. ${emp.biblioteca_livro?.titulo} | Devolução: ${emp.data_devolucao}`)
    })

    let opcao = parseInt(prompt('Escolha o número do livro a devolver: ')) - 1
    if (opcao < 0 || opcao >= emprestimos.length) { console.log('Opção inválida.'); return }

    const emp = emprestimos[opcao]
    const { error: errUpd } = await supabase
        .from('biblioteca_emprestimos')
        .update({ status: 'devolvido' })
        .eq('id', emp.id)

    if (errUpd) { console.log('Erro ao registrar devolução:', errUpd.message); return }

    const { data: livro } = await supabase.from('biblioteca_livro').select('quantidade').eq('id', emp.livro_id).single()
    await supabase.from('biblioteca_livro').update({ quantidade: livro.quantidade + 1 }).eq('id', emp.livro_id)

    console.log('✅ Devolução registrada com sucesso!')
}

async function listarMeusEmprestimos(usuario) {
    const { data, error } = await supabase
        .from('biblioteca_emprestimos')
        .select('status, data_emprestimo, data_devolucao, biblioteca_livro(titulo)')
        .eq('usuario_id', usuario.id)
        .order('data_emprestimo', { ascending: false })

    if (error || data.length === 0) { console.log('Nenhum empréstimo encontrado.'); return }

    console.log('\n====== MEUS EMPRÉSTIMOS ======')
    data.forEach(emp => {
        const status = emp.status === 'ativo' ? '🟡 Ativo' : '✅ Devolvido'
        console.log(`${status} | ${emp.biblioteca_livro?.titulo} | Empréstimo: ${emp.data_emprestimo} | Devolução: ${emp.data_devolucao}`)
    })
}

// ─── MENUS INTERNOS ─────────────────────────────────────────────────────────

async function menuAutores() {
    let opcao = ''
    while (opcao !== '0') {
        console.log('\n====== GERENCIAR AUTORES ======')
        console.log('1 - Inserir autor')
        console.log('2 - Atualizar autor')
        console.log('3 - Deletar autor')
        console.log('0 - Voltar')
        opcao = prompt('Escolha uma opção: ')
        switch (opcao) {
            case '1': await inserirAutor(); break
            case '2':
                let idUpd = prompt('ID do autor a atualizar: ')
                await atualizarAutor(idUpd); break
            case '3':
                let idDel = prompt('ID do autor a deletar: ')
                await deletarAutor(idDel); break
            case '0': break
            default: console.log('Opção inválida.')
        }
    }
}

async function menuLivros() {
    let opcao = ''
    while (opcao !== '0') {
        console.log('\n====== GERENCIAR LIVROS ======')
        console.log('1 - Listar todos os livros')
        console.log('2 - Buscar livro por título')
        console.log('0 - Voltar')
        opcao = prompt('Escolha uma opção: ')
        switch (opcao) {
            case '1': await listarLivros(); break
            case '2': await buscarLivro(); break
            case '0': break
            default: console.log('Opção inválida.')
        }
    }
}

async function menuEmprestimos(usuario) {
    let opcao = ''
    while (opcao !== '0') {
        console.log('\n====== EMPRÉSTIMOS / DEVOLUÇÕES ======')
        console.log('1 - Realizar empréstimo')
        console.log('2 - Devolver livro')
        console.log('3 - Meus empréstimos')
        console.log('0 - Voltar')
        opcao = prompt('Escolha uma opção: ')
        switch (opcao) {
            case '1': await realizarEmprestimo(usuario); break
            case '2': await devolverLivro(usuario); break
            case '3': await listarMeusEmprestimos(usuario); break
            case '0': break
            default: console.log('Opção inválida.')
        }
    }
}

async function menuPosLogin(usuario) {
    let opcao = ''
    while (opcao !== '0') {
        console.log(`\n====== BEM-VINDO, ${usuario.nome.toUpperCase()} ======`)
        console.log('1 - Livros')
        console.log('2 - Autores')
        console.log('3 - Empréstimos / Devoluções')
        console.log('0 - Sair da conta')
        opcao = prompt('Escolha uma opção: ')
        switch (opcao) {
            case '1': await menuLivros(); break
            case '2': await menuAutores(); break
            case '3': await menuEmprestimos(usuario); break
            case '0': console.log('Saindo da conta...'); break
            default: console.log('Opção inválida.')
        }
    }
}

// ─── MENU PRINCIPAL ──────────────────────────────────────────────────────────

async function menu() {
    let opcao = ''
    while (opcao !== '0') {
        console.log('\n====== MENU PRINCIPAL ======')
        console.log('1 - Cadastrar Usuário')
        console.log('2 - Logar no sistema')
        console.log('0 - Sair')
        opcao = prompt('Escolha uma opção: ')
        switch (opcao) {
            case '1':
                await inserirUsuario()
                break
            case '2':
                let usuario = await logarSistema()
                if (usuario) {
                    await menuPosLogin(usuario)
                } else {
                    console.log('Login falhou. Tente novamente.')
                }
                break
            case '0':
                console.log('Encerrando sistema...')
                break
            default:
                console.log('Opção inválida.')
        }
    }
}

menu()