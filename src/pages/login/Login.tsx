import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import Imagem from '../../assets/imagem_login.png'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../contexts/AuthContext';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';

function Login() {
  let navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  let [outraLogo, setOutraLogo] = useState(false);
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

  function mostrarSenha() {
    setOutraLogo((prevState) => !prevState);
    /*Esta linha usa a função de atualização baseada no estado anterior (prevState). A função passada para setOutraLogo recebe o valor atual do estado (prevState) e retorna o novo valor do estado. No caso específico de setOutraLogo((prevState) => !prevState);, ele alterna o valor atual de outraLogo para o seu oposto. Se outraLogo for true, ele será definido como false, e vice-versa.
   
   Isso é importante em React porque setState não atualiza o estado imediatamente. Ele programa uma atualização do estado, e o valor atualizado do estado só estará disponível na próxima renderização. Ao usar uma função de atualização baseada no estado anterior, você garante que está trabalhando com o valor mais recente do estado.**/
  }


  return (
    <>
      <div className="grid cp:grid-cols-1 grid-cols-2  h-screen place-items-center">
        <form className="flex justify-center bg-purple items-center gap-9 flex-col w-full  h-full cp:px-4 cp:pb-10   md:px-10 2xl:px-28  sm:px-8 lg:px-10 xl:px-14" onSubmit={login}>

          <div className='relative top-14 w-1/2 text-center right-2 bg-purple sm:w-40 sm:right-1 '>
            <h2 className="text-6xl text-white font-semibold  ">Login</h2>
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
              required
              placeholder="email@email.com"
              className="border-2 border-violet rounded-lg p-2 w-full  mb-8 pl-10  shadow-sm shadow-black"
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}

            />

            <label htmlFor="senha" className="font-semibold text-white" >Senha</label>
            <div className='-mt-4'>
              <FontAwesomeIcon icon={faLock} size='lg' style={{ color: '#8e86bd' }} className=' relative top-9 left-3' />
            </div>
            {
              outraLogo ? (<input
                type="password"
                id="senha"
                required
                name="senha"
                placeholder="********"
                minLength={8}
                className="border-2 border-violet rounded-lg p-2 w-full  pl-10  shadow-sm shadow-black "
                value={usuarioLogin.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />) : (<input
              type="text"
              id="senha"
              required
              name="senha"
              placeholder="********"
              minLength={8}
              className="border-2 border-violet rounded-lg p-2 w-full  pl-10  shadow-sm shadow-black "
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />)

            }
            
            <div className='-mt-4  text-end'>
              <button onClick={mostrarSenha} type='button'>

                {outraLogo ? (<FontAwesomeIcon icon={faEyeSlash} size='lg' style={{ color: '#8e86bd' }} className=' relative bottom-4 right-4 ' />)
                  :
                  (<FontAwesomeIcon icon={faEye} size='lg' style={{ color: '#8e86bd' }} className=' relative bottom-4 right-4 ' />)
                }
              </button>

            </div>
          </div>
          <p className='text-end text-white w-full underline  hover:cursor-pointer hover:text-black -mt-4 '>Esqueceu a senha? </p>
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
              <span className=' text-2xl '>Entrar</span>}
          </button>


          <p className='text-white text-1xl sm:text-sm '>
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" className="text-indigo-800 hover:underline hover:text-black ">
              Cadastre-se
            </Link>
          </p>
        </form>
        <div className="w-full cp:hidden ">

          <img src={Imagem} className='w-screen p-10' />
        </div>
      </div>
    </>
  );
}

export default Login;