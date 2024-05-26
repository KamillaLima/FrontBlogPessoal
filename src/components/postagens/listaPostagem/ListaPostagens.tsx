import React, { useContext, useEffect, useState } from 'react';
import { Dna, Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../models/Postagem';
import { buscar } from '../../../services/Service';
import CardPostagem from '../cardPostagem/CardPostagem';
import { toastAlerta } from '../../../utils/toastAlerta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
function ListaPostagens() {

  const [postagens, setPostagens] = useState<Postagem[]>([]);

  let navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);

  async function buscarPostagens() {
    try {
      await buscar('/postagens', setPostagens, {
        headers: {
          Authorization: token,
        },
      });
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
    <div>
      {postagens.length === 0 && (
        <h1>vazio</h1>
      )}
      <button className='fixed bottom-2 right-12 bg-purple w-14 h-14 rounded-full hover:bg-greenS  hover:text-pink cp:right-4 sm:right-7  ' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><FontAwesomeIcon icon={faArrowUp} /></button>
      <div className=' justify-center items-center flex flex-col w-full gap-12 my-12'>
        {postagens.map((postagem) => (
          <CardPostagem key={postagem.id} post={postagem} />
        ))}

      </div>

    </div>
  );
}

export default ListaPostagens;