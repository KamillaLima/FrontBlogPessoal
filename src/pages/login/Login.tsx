import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import Imagem from '../../assets/imagem_login.png'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../contexts/AuthContext';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';

function Login() {
  let navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const { usuario, handleLogin } = useContext(AuthContext);

  const { isLoading } = useContext(AuthContext)

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home')
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    handleLogin(usuarioLogin)
  }




  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center">
        <form className="flex justify-center items-center gap-9 flex-col w-full px-24 h-full bg-purple " onSubmit={login}>

          <div className='relative top-14 w-1/2 text-center right-2 bg-purple'>
            <h2 className="text-6xl text-white font-semibold ">Login</h2>
          </div>

          <hr className=' w-full border-white mb-4'>
          </hr>

          <div className=' w-full flex flex-col  '>

            <label htmlFor="usuario" className="font-semibold text-white" >  E-mail</label>

            <div className='-mt-4'>
              <FontAwesomeIcon icon={faEnvelope} size='lg' style={{ color: '#8e86bd' }} className=' relative top-9 left-3' />
            </div><input

              type="email"
              id="usuario"
              name="usuario"
              placeholder="email@email.com"
              className="border-2 border-violet rounded-lg p-2 w-full  mb-8 pl-10  shadow-sm shadow-black"
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}

            />

            <label htmlFor="senha" className="font-semibold text-white" >Senha</label>
            <div className='-mt-4'>
              <FontAwesomeIcon icon={faLock} size='lg' style={{ color: '#8e86bd' }} className=' relative top-9 left-3' />
            </div>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="********"
              minLength={8}
              className="border-2 border-violet rounded-lg p-2 w-full  pl-10  shadow-sm shadow-black "
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />

          </div>
          <p className='text-end text-white w-full underline  hover:cursor-pointer hover:text-black -mt-4 '>Esqueceu a senha? </p>
          <button
            type='submit'
            className="rounded bg-white text-violet hover:text-bold hover:shadow-2xl hover:shadow-black w-1/2 py-2 shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            {isLoading ? <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            /> :
              <span className=' text-2xl '>Entrar</span>}
          </button>


          <p className='text-white text-1xl '>
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" className="text-indigo-800 hover:underline hover:text-black ">
              Cadastre-se
            </Link>
          </p>
        </form>
        <div className="w-full ">

          <img src={Imagem} className='w-screen p-10' />
        </div>
      </div>
    </>
  );
}

export default Login;