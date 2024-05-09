import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
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


export const buscar = async(url: string, setDados: Function, header: Object) => {
                                                          // para passar o toekn da pessoa que ta fazendo a requisição
  const resposta = await api.get(url, header)
  setDados(resposta.data)
}

export const cadastrar = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.post(url, dados, header)
  setDados(resposta.data)
}

export const atualizar = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.put(url, dados, header)
  setDados(resposta.data)
}

  export const deletar = async(url: string, header: Object) => {
    await api.delete(url, header)
  }