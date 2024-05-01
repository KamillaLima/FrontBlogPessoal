import axios from "axios";

const api = axios.create({
  baseURL: "https://projetoblogpessoal-1uqi.onrender.com/"
})


                   
export const login = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados)
                //await pro login ficar travado até que seja retornado a informação
                        // A gente usa origatoriamente o post porque estamos enviando uma informacao,por mais que ela 
                        //não vá ser salva no banco de dados
  setDados(resposta.data)
}


// nosso endpoint,os dados que precisam (no caso o email e a senha) e o retorno do metodo 
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}

/*
  Vamos pensar em uma agencia dos correios : eu vou buscar a encomenda,vou pedir pro atendente a 
  encomenda,ele vai pedir pro estoquista ir la pegar ,o estoquista vai pegar e entregar pro atendente e ele irá me entregar
  a encomenda. O estoquista é a nossa controller no java ; O atendente são as nossas pages no React

*/

/*O useContext é como se fosse um H2,então quando recarregamos a página os dados são perdidos,entre eles o token */