import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const tipo = localStorage.getItem('tipo')
        if (token && tipo) {
            navigate(tipo === 'funcionario' ? '/funcionario' : '/cliente')
        }
    }, [navigate])

    async function fazerLogin(e) {
        e.preventDefault()
        setErro('')
        setLoading(true)

        const body = JSON.stringify({ cpf, senha })

        try {
            const resposta = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            })

            const dados = await resposta.json()

            if (!resposta.ok) {
                setErro(dados.erro || dados.mensagem || 'Falha no login. Verifique suas credenciais.')
                return
            }

            localStorage.setItem('token', dados.token)
            localStorage.setItem('id', dados.usuario.id)
            localStorage.setItem('nome', dados.usuario.nome)
            localStorage.setItem('tipo', dados.usuario.tipo)

            if (dados.usuario.tipo === 'funcionario') {
                navigate('/funcionario')
            } else {
                navigate('/cliente')
            }
        } catch (error) {
            setErro('Erro ao conectar com o servidor. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className='text-center'>Sistema Biblioteca</h1>

            <div className='row justify-content-center'>
                <div className='col-6'>
                    <h3>Login</h3>
                    <form className='' onSubmit={fazerLogin}>
                        <div className='mb-3'>
                            <label htmlFor='cpf' className='form-label'>CPF</label>
                            <input
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                type='text'
                                className='form-control'
                                id='cpf'
                                name='cpf'
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='senha' className='form-label'>Senha</label>
                            <input
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                type='password'
                                className='form-control'
                                id='senha'
                                name='senha'
                            />
                        </div>
                        {erro && <div className='alert alert-danger'>{erro}</div>}
                        <button type='submit' className='btn btn-primary' disabled={loading}>
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
