import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import Postagem from "../../models/Postagem"
import { buscar } from "../../services/Service"
import { toastAlerta } from "../../utils/toastAlerta"
import CardPostagem from '../../components/postagens/cardPostagem/CardPostagem'
import DeletarPostagem from '../../components/postagens/deletarPostagem/deletarPostagem'
import CardPostagemUsuario from '../../components/postagens/cardPostagem/cardPostagemUsuario'

function Usuario() {
  let navigate = useNavigate()
  const { usuario, handleLogout } = useContext(AuthContext)


  const idUser = usuario.id;
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [resultado, setResultados] = useState<Postagem[]>([]);
  async function buscarPostagens() {

    try {
      await buscar('/postagens', setPostagens, {
        headers: {
          Authorization: usuario.token,
        },

      });
      const postagensFiltradas = postagens.filter(postagem => postagem.usuario.id === idUser);

      setResultados(postagensFiltradas);

    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlerta('O token expirou, favor logar novamente', 'info')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    buscarPostagens();
  }, [postagens.length]);
  return (
    <div className=' w-full text-ed items-center flex flex-col'>
      <p className=''>Minhas publicações : </p>

      <div className='flex flex-col w-full gap-12 my-12 justify-center items-center '>
        {resultado.map((postagem) => (
          <CardPostagemUsuario key={postagem.id} post={postagem} />
          
        ))}

      </div>
    </div>
  )
}


export default Usuario;