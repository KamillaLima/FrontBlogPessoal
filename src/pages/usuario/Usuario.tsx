import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import Postagem from "../../models/Postagem"
import { buscar } from "../../services/Service"
import { toastAlerta } from "../../utils/toastAlerta"
import CardPostagemUsuario from '../../components/postagens/cardPostagem/cardPostagemUsuario'
import { Oval } from 'react-loader-spinner'

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
    <div className=' '>
      <p className='mb-12 text-4xl font-light text-center text-purple'>Minhas publicações : </p>
      <div>
        {postagens.length === 0 && (
          <div className='justify-center items-center flex ' >
            <Oval
              color='#8e86bd'
              secondaryColor='#8e86bd'
              visible={true}
              height="200"
              width="200"
            />
          </div>
        )}


        <div className='flex flex-col w-full gap-12 my-12 justify-center items-center '>

          {resultado.map((postagem) => (
            <CardPostagemUsuario key={postagem.id} post={postagem} />

          ))}

        </div>
      </div>

    </div>
  )
}


export default Usuario;