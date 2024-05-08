import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import './Login.css';

import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';

function Login() {
  const navigate = useNavigate();

  // o useState<UsuarioLogin> não é obrigatorio,posso passar só useState
  //Essa constante vai ser preenchida com os dados que vão ser informados pelo usuário nos campos do formulário
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);
//chamando 3 funções do AuthContext
  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home')
    }
  }, [usuario])
  /*to falando pro meu useEffect para ele ficar de olho no meu usuario,quando ela mudar de estado ele executa o meu if/else
  Essa variavel usuario só ira mudar na funcao de login (que chama o handleLogin)
  */

  //Vai ser usada em vários inputs.Se conecta ao nossos inputs,pega o que foi digitado e adiciona na variavel
  //usuarioLogin na linha 15
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
                          // ChangeEvent<HTMLInputElements : um evento de mudança vindo de um elemento input no HTML
    // atualizando o nosso setUsuarioLogin 
    setUsuarioLogin({
      ...usuarioLogin, /*SpreadOperator (...) = operador de espalhamento.Vai acessar o objeto login
       e disponibilizar os campos que o usuarioLogin tem*/
       /*    O ...usuarioLogin serve par que eu não tenha que passar o objeto,como na linha abaixo : 

                id: 0,
                nome: "",
                usuario: "root@root.com",
                senha: "",
                foto: "",
                token: ""
            */
       
      // [] = serve para que o campo do nome fique dinamico
      [e.target.name]: e.target.value
      //Acesso o input nome que está disparando essa informação,name : puxar o nome do campo , value : puxar oq esta dentro dele
    })
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
                //tudoooooo isso só pra impedir que a nossa pagina recarregue 
    e.preventDefault() //Impedir que o form recarregue a pagina toda,senão a gente perde a infor e fica travado
   handleLogin(usuarioLogin)
   
    //invogando a função handle login
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
        <form className="flex justify-center items-center flex-col w-1/2 gap-4" onSubmit={login}>
          <h2 className="text-slate-900 text-5xl ">Entrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario" //Obrigatorio informar ele,pois la na funcao atualizar estado nós usamos ele pra puxar o value
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <button type='submit' className="rounded bg-indigo-400 hover:bg-indigo-900 text-white w-1/2 py-2 flex justify-center">
            
            
            {isLoading ? <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            /> :
              <span>Entrar</span>}
          </button>

          <hr className="border-slate-800 w-full" />

          <p>
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" className="text-indigo-800 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
        <div className="fundoLogin hidden lg:block"></div>
      </div>
    </>
  );
}

export default Login;