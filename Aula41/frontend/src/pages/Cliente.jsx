import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Cliente = () => {
  const [mensagem, setMensagem] = useState('Carregando...')
  const [nome, setNome] = useState(localStorage.getItem('nome') || '')
  const navigate = useNavigate()

  useEffect(() => {
    async function carregarCliente() {
      const token = localStorage.getItem('token')
      if (!token) return

      const resposta = await fetch('http://localhost:3000/cliente', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const dados = await resposta.json()

      if (!resposta.ok) {
        setMensagem(dados.erro || 'Erro ao carregar dados do cliente.')
        return
      }

      setMensagem(dados.mensagem)
      setNome(dados.usuario?.nome || nome)
    }

    carregarCliente()
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
      <h1>Página do cliente</h1>
      <p>{mensagem}</p>
      <p>Usuário: {nome}</p>
      <button onClick={fazerLogout}>Sair</button>
    </>
  )
}

export default Cliente
