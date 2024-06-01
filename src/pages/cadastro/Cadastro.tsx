import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faCamera, faUser, faUnlock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import foto from '../../assets/foto_cadastro.gif'
import { toastAlerta } from '../../utils/toastAlerta'
import { AuthContext } from '../../contexts/AuthContext'
import { RotatingLines } from 'react-loader-spinner'

function Cadastro() {

  const inputs = 'border-2 border-violet rounded-lg p-2 w-full pl-10  shadow-sm shadow-black'
  const nomeInput = 'text-white font-semibold'
  let navigate = useNavigate()
  let [outraLogo, setOutraLogo] = useState(false);
  const { isLoading } = useContext(AuthContext)
  const [confirmaSenha, setConfirmaSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (usuarioResposta.id !== 0) {
      back()
    }
  }, [usuarioResposta])

  function back() {
    navigate('/login')
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log('1')
    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {

      try {
        console.log('22')
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResposta)
        toastAlerta('Usuário cadastrado com sucesso', 'sucesso')

      } catch (error) {
        console.log(error)
        toastAlerta('Erro ao cadastrar usuário', 'erro')
      }

    } else {
      toastAlerta('Dados inconsistentes. Verifique as informações de cadastro.', 'erro')
      setUsuario({ ...usuario, senha: "" }) // Reinicia o campo de Senha
      setConfirmaSenha("")                  // Reinicia o campo de Confirmar Senha
    }
  }


  function mostrarSenha() {
    setOutraLogo((prevState) => !prevState);
  }

  return (
    <>
      <div className="grid grid-cols-2 cp:grid-cols-1 sm:grid-cols-1 h-screen w-full  items-center justify-center ">
        <div className=" w-full cp:hidden sm:hidden items-center justify-center">
          <img src={foto} className=' items-center justify-center w-[80%] ml-12'></img>
        </div>
        <form className='flex  flex-col w-full h-full  bg-purple px-14 pb-11 md:px-10 2xl:pb-52 items-center 2xl:pt-24  ' onSubmit={cadastrarNovoUsuario}>
          <div className='relative top-6 w-1/2 text-center  bg-purple items-center cp:w-full md:w-52  lg:w-[60%] '>
            <h2 className="text-6xl text-white font-semibold cp:text-5xl md:text-5xl ">Cadastro</h2>
          </div>
          <hr className=' w-full border-white mb-4 cp:hidden'></hr>
          <div className='w-full flex flex-col mt-8 gap-2.5  2xl:h-full 2xl:gap-4'>
            <label htmlFor="nome" className={nomeInput}>Nome completo</label>
            <div className='-mt-8'>
              <FontAwesomeIcon icon={faUser} size='lg' style={{ color: '#8e86bd' }} className=' relative top-11 2xl:top-12 left-3' />
            </div>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              placeholder="Nome"
              className={inputs}
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />


            <label htmlFor="usuario" className={nomeInput}> Email</label>
            <div className='-mt-8'>
              <FontAwesomeIcon icon={faEnvelope} size='lg' style={{ color: '#8e86bd' }} className=' relative top-11 2xl:top-12 left-3' />
            </div>

            <input
              type="email"
              required
              id="usuario"
              name="usuario"
              placeholder="email@email.com"
              className={inputs}
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />

            <label htmlFor="foto" className={nomeInput}>Foto</label>
            <div className='-mt-8'>
              <FontAwesomeIcon icon={faCamera} size='lg' style={{ color: '#8e86bd' }} className=' relative top-11 2xl:top-12 left-3' />
            </div>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className={inputs}
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />

            <label htmlFor="senha" className={nomeInput} >Senha</label>
            <div className='-mt-8'>
              <FontAwesomeIcon icon={faLock} size='lg' style={{ color: '#8e86bd' }} className=' relative 2xl:top-12 top-11 left-3' />
            </div>
            {
              outraLogo ? (<input
                type="password"
                id="senha"
                name="senha"
                placeholder="********"
                minLength={8}
                required
                className={inputs}
                value={usuario.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />) : (<input
                type="text"
                id="senha"
                name="senha"
                placeholder="********"
                minLength={8}
                className={inputs}
                value={usuario.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />)

            }

            <div className='-mb-8 text-end   '>
              <button onClick={mostrarSenha} type='button'>

                {outraLogo ? (<FontAwesomeIcon icon={faEyeSlash} size='lg' style={{ color: '#8e86bd' }} className=' relative bottom-11 2xl:bottom-12 right-4 ' />)
                  :
                  (<FontAwesomeIcon icon={faEye} size='lg' style={{ color: '#8e86bd' }} className=' relative bottom-11 2xl:bottom-12 right-4 ' />)
                }
              </button>

            </div>

            <label htmlFor="confirmarSenha " className={nomeInput}>Confirmar Senha</label>
            <div className='-mt-8'>
              <FontAwesomeIcon icon={faUnlock} size='lg' style={{ color: '#8e86bd' }} className=' relative top-11 2xl:top-12 left-3' />
            </div>

            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              required
              placeholder="Confirmar Senha"
              className={inputs}
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />

          </div>
          <div className="flex justify-around w-full gap-8  pt-4 2xl:pt-14">
            <button
              type='submit'
              className="rounded bg-white flex justify-center text-violet hover:text-bold hover:shadow-2xl hover:shadow-black w-1/2 py-2 shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
              {isLoading ? <RotatingLines
                strokeColor="black"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              /> :
                <span className='cp:text-lg text-2xl '>Cadastrar</span>}
            </button>
            <button className=' cp:text-lg rounded text-white text-2xl bg-red-400 hover:bg-red-600 hover:text-bold hover:shadow-2xl hover:shadow-black shadow-lg transition duration-200 ease-in-out transform hover:scale-105  w-1/2 py-2' onClick={back}>
              Cancelar
            </button>

          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro