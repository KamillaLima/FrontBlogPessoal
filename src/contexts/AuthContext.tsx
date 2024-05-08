import { createContext, ReactNode, useState } from "react"

import UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"


interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
              // usuario : UsuarioLogin
              // nome da variavel : tipo da variavel
    handleLogin(usuario: UsuarioLogin): Promise<void>
                                    //tipagem das funções assincronas
                                    //Promise : funções que fazem requisicoes q podem levar um tempo (funcoes assincronas)
                                    //void : a funcao não retorna nada
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}


// Construção inicial do Contexto de armazenamento 
export const AuthContext = createContext({} as AuthContextProps)
        //O nome deve ser igual ao nome do arquivo
        //Criamos um objeto vazio {}  
        // {} as AuthContextProps : dentro do nosso contexto sera armazenado as informacoes q podem ser encontradas no AuthContextProps
        //É só pra eu não ter que fazer dessa forma :
        /*
            usuario : usuarioLogin{
                id:"1",
                usuario:"kamilla 1234"
            }
        
        Usando o AuthContextProps eu não preciso instanciar de fato cada uma das informações, eu só aviso que elas 
        existem

            */ 
export function AuthProvider({ children }: AuthProviderProps) {
//função vai acessar o meu contexto e distribuir as informações para o restante da minha aplicação

    //Criando um estado pra armazenar infos de quando o usuario estiver logado usando o hooks useState
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        //variaveis de estado
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    //pra ver se o usuário esta logado ou não / tb posso colocar useState<boolean>(false)
    //Isso ai eh só pra colocar um carregamento,igual qnd vc vai fazer login;
    //é mais pra ser algo visual
    const [isLoading, setIsLoading] = useState(false)

    //Aqui nós chamamos as função que criamos láá no nosso Service
    async function handleLogin(userLogin: UsuarioLogin) {
                                        //Eu vou passar um objeto com id,usuario,senha,foto , porém só o campo
                                        //usuario e senha vai estar preenchido,o restante vai estar ""
                                        //Na nossa API ele vai aceitar,mesmo que eu tenha colocado que só preciso do email
                                        //e da senha,porque os outros campos vão ser enviados "" então serão ignorados
        setIsLoading(true)
        //indica que está havendo algum processamento
        try {
            await login(`/usuarios/logar`, userLogin, setUsuario)
                //função que criamos lá no service

            alert("Usuário logado com sucesso")
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            alert("Dados do usuário inconsistentes")
            setIsLoading(false)
        }
    }

    //função pra deslogar o usuario,então eu vou reiniciar o estado de usuario logado
    //as variaveis serão limpas 
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    //Retornamos  : usuario , handleLogin,handleLogout,isLoading
    //Sendo assim QUALQUER OUTRO COMPONENTE VAI TER ACESSO A ELES;

    return (                      //esse usuario vai ter todas as informações que foram tragas graças ao useContext
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
        //children é os elementos que vão estar dentro do authContext lá no App.tsx
    )
}