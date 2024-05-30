import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../models/Postagem';
import Tema from '../../../models/Tema';
import { buscar, atualizar, cadastrar } from '../../../services/Service';
import { toastAlerta } from '../../../utils/toastAlerta';

function FormularioPostagem() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const [tema, setTema] = useState<Tema>({} as Tema);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  useEffect(() => {
    if (!token) {
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPostagemId(id);
    }
  }, [id]);

  useEffect(() => {
    if (postagem.tema && postagem.tema.id) {
      buscarTemaId(postagem.tema.id);
    }
  }, [postagem.tema?.id]);

  async function buscarPostagemId(id: string) {
    try {
      const resposta = await buscar(`/postagens/id/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
      setPostagem(resposta);
    } catch (error: any) {
      toastAlerta('Erro ao carregar informações da postagem', 'erro');
    }
  }

  async function buscarTemaId(id: number) {
    try {
      const resposta = await buscar(`/temas/${id}`, setTema, {
        headers: {
          Authorization: token,
        },
      });
      setTema(resposta);
    } catch (error: any) {
      toastAlerta('Erro ao carregar informações do tema', 'erro');
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
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

    setPostagem((prevPostagem) => ({
      ...prevPostagem,
      tema: novoTema,
    }));
  }

  function retornar() {
    navigate(-1);
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id) {
      await handleUpdatePostagem();
      await handleUpdateTema();
    } else {
      await handleCreatePostagem();
    }
  }

  async function handleUpdatePostagem() {
    try {
      await atualizar(`/postagens`, postagem, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
      toastAlerta('Postagem atualizada com sucesso', 'sucesso');
      retornar();
    } catch (error: any) {
      handleRequestError(error, 'Erro ao atualizar a Postagem');
    }
  }

  async function handleUpdateTema() {
    try {
      await atualizar(`/temas`, tema, setTema, {
        headers: {
          Authorization: token,
        },
      });
      toastAlerta('tema atualizada com sucesso', 'sucesso');
      retornar();
    } catch (error: any) {
      handleRequestError(error, 'Erro ao atualizar o tema');
    }
  }

  async function handleCreatePostagem() {
    try {
      const temaResponse = await cadastrarTema();
      await cadastrarPostagem(temaResponse.id);
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
      return response;
    } catch (error) {
      throw new Error('Erro ao cadastrar tema');
    }
  }

  async function cadastrarPostagem(temaId: number) {
    try {
      const novaPostagem = { ...postagem, tema: { id: temaId } };
      await cadastrar(`/postagens`, novaPostagem, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      throw new Error('Erro ao cadastrar postagem');
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

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">{id ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>

      <form onSubmit={gerarNovaPostagem} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo da postagem</label>
          <input
            value={postagem.titulo || ''}
            onChange={atualizarEstado}
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="texto">Texto da postagem</label>
          <input
            value={postagem.texto || ''}
            onChange={atualizarEstado}
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tema">Tema da postagem:</label>
          <input
            type="text"
            required
            id="tema"
            name="descricao"
            placeholder="Tema"
            value={tema.descricao || ''}
            onChange={atualizarEstadoTema}
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <button type="submit" className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2">
          {id ? 'Editar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default FormularioPostagem;
