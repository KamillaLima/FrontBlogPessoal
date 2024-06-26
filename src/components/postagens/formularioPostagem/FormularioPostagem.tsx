import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../models/Postagem';
import Tema from '../../../models/Tema';
import { buscar, atualizar, cadastrar } from '../../../services/Service';
import { toastAlerta } from '../../../utils/toastAlerta';
import { RotatingLines } from 'react-loader-spinner';

function FormularioPostagem() {
  const inputs = 'border-2 border-violet rounded-lg p-2 w-full  shadow-sm shadow-black resize-none';
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const [tema, setTema] = useState<Tema>({} as Tema);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);
  const { isLoading } = useContext(AuthContext)
  useEffect(() => {
    if (!token) {
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);


  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function atualizarEstadoTextArea(e: ChangeEvent<HTMLTextAreaElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function atualizarEstadoTema(e: ChangeEvent<HTMLInputElement>) {
    const novoTema = { ...tema, descricao: e.target.value };
    setTema(novoTema);
  }

  function retornar() {
    navigate(-1);
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    await handleCreatePostagem();

  }



  async function handleCreatePostagem() {
    try {
      const temaId = tema.id ? tema.id : await cadastrarTema();
      const novaPostagem = { ...postagem, tema: { id: temaId } };
      await cadastrar(`/postagens`, novaPostagem, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
      toastAlerta('Postagem cadastrada com sucesso', 'sucesso');
      retornar();
    } catch (error: any) {
      handleRequestError(error, 'Erro ao cadastrar a Postagem');
    }
  }

  async function cadastrarTema() {
    try {
      const response = await cadastrar(`/temas`, tema, setTema, {
        headers: {
          Authorization: token,
        },
      });
      return response.id;
    } catch (error) {
      throw new Error('Erro ao cadastrar tema');
    }
  }

  function handleRequestError(error: any, defaultMessage: string) {
    if (error.toString().includes('403')) {
      toastAlerta('O token expirou, favor logar novamente', 'info');
      handleLogout();
    } else {
      console.log(error);
      toastAlerta(defaultMessage, 'erro');
    }
  }

  function verificarTamanho(postagem: Postagem, tema: Tema) {
    return postagem.titulo?.length > 9 && postagem.texto?.length > 99 && tema.descricao?.length > 9;
  }


  return (
    <div className="container flex flex-col mx-auto items-center w-full h-full ">
      <h1 className="text-5xl text-center my-8">{id ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>

      <form onSubmit={gerarNovaPostagem} className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo:</label>
          <input
            value={postagem.titulo || ''}
            onChange={atualizarEstado}
            type="text"
            minLength={10}
            placeholder="Titulo"
            name="titulo"
            required
            className={inputs}
          />

        </div>
        {postagem.titulo?.length <= 9 && <p>Deve ter mais de 9 caracteres</p>}
        <div className="flex flex-col gap-2">
          <label htmlFor="tema">Tema:</label>
          <input
            type="text"
            required
            id="tema"
            name="descricao"
            placeholder="Tema"
            value={tema.descricao || ''}
            onChange={atualizarEstadoTema}
            className={inputs}
            minLength={10}
          />
        </div>
        {tema.descricao?.length <= 9 && <p>Deve ter mais de 9 caracteres</p>}
        <div className="flex flex-col gap-2">
          <label htmlFor="texto">Texto:</label>
          <textarea
            className={inputs}

            cols={4}
            rows={4}
            value={postagem.texto || ''}
            onChange={atualizarEstadoTextArea}
            placeholder="Texto"
            name="texto"
            required
          />
          {postagem.texto?.length <= 99 && <p>Deve ter mais de 100 caracteres</p>}
        </div>

        <button disabled={!verificarTamanho(postagem, tema)} type="submit" className=" disabled:bg-gray-300 rounded  bg-greenS hover:bg-purple text-white font-bold w-1/2 mx-auto block py-2">

          <span className=''>Cadastrar</span>
        </button>
      </form>
    </div>
  );
}

export default FormularioPostagem;
