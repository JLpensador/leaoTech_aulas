import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Funcionario = () => {
  const [mensagem, setMensagem] = useState('Carregando...')
  const [nome, setNome] = useState(localStorage.getItem('nome') || '')
  const navigate = useNavigate()

  useEffect(() => {
    async function carregarFuncionario() {
      const token = localStorage.getItem('token')
      if (!token) return

      const resposta = await fetch('http://localhost:3000/funcionario', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const dados = await resposta.json()

      if (!resposta.ok) {
        setMensagem(dados.erro || 'Erro ao carregar dados do funcionário.')
        return
      }

      setMensagem(dados.mensagem)
      setNome(dados.usuario?.nome || nome)
    }

    carregarFuncionario()
  }, [])

  function fazerLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('nome')
    localStorage.removeItem('tipo')
    navigate('/login')
  }

  return (
    <>
      <h1>Página do funcionário</h1>
      <p>{mensagem}</p>
      <p>Usuário: {nome}</p>
      <button onClick={fazerLogout}>Sair</button>
    </>
  )
}

export default Funcionario
