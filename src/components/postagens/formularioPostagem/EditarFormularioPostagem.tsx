import React, { useState, useEffect, ChangeEvent, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../models/Postagem';
import Tema from '../../../models/Tema';
import { buscar, atualizar } from '../../../services/Service';
import { toastAlerta } from '../../../utils/toastAlerta';
import { RotatingLines } from 'react-loader-spinner';

function EditarFormularioPostagem() {
  const inputs = 'border-2 border-violet rounded-lg p-2 w-full  shadow-sm shadow-black'
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const [tema, setTema] = useState<Tema>({} as Tema);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);
  const [meuEstado, setMeuEstado] = useState<{ id: number; descricao: string }>({ id: 0, descricao: "ola und" });
  const { isLoading } = useContext(AuthContext)

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

  async function buscarPostagemId(postId: string) {
    try {
      const resposta = await buscar(`/postagens/id/${postId}`, setPostagem, {
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
    setPostagem((prevPostagem) => ({
      ...prevPostagem,
      tema: { ...prevPostagem.tema, descricao: e.target.value, id: prevPostagem.tema.id },
    }));
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id) {
      const novoEstado = { id: tema.id, descricao: tema.descricao };
      setMeuEstado(novoEstado);
      await handleUpdatePostagem();
      await handleUpdateTema(novoEstado);
    } else {
      console.log('erro')
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

  async function handleUpdateTema(novoEstado: { id: number; descricao: string }) {
    try {
      await atualizar(`/temas`, novoEstado, setMeuEstado, {
        headers: {
          Authorization: token,
        },
      });
      toastAlerta('Tema atualizado com sucesso', 'sucesso');
    } catch (error: any) {
      handleRequestError(error, 'Erro ao atualizar o tema');
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

  function retornar() {
    navigate(-1);
  }

  return (
    <div className="container flex flex-col mx-auto items-center w-full h-full ">
      <h1 className="text-5xl text-center my-8">Editar Postagem</h1>

      <form onSubmit={gerarNovaPostagem} className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo:</label>
          <input
            value={postagem.titulo || ''}
            onChange={atualizarEstado}
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className={inputs}
          />
        </div>

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
          />
        </div>


        <div className="flex flex-col gap-2">
          <label htmlFor="texto">Texto:</label>
          <textarea className={inputs} cols={4} rows={4} value={postagem.texto || ''}
            onChange={atualizarEstadoTextArea}
            placeholder="Texto"
            name="texto"
            required>

          </textarea>
          <p className='text-sm mb-1'>O texto da postagem deve possuir mais de 100 caracteres!</p>

        </div>


        <button type="submit" className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2">
        {isLoading ? <RotatingLines
              strokeColor="black"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            /> :
              <span className=' text-2xl '>Editar</span>}
        </button>
      </form>
    </div>
  );
}

export default EditarFormularioPostagem;
