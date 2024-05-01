import Postagem from "./Postagem";

export default interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    postagem?: Postagem | null;
    // ?  Tá dizendo que postagem é um campo opcional,
    //entao n precisa ser inicializado
}

/*
    const usuario: Usuario = {
        id: 0,
        nome: ""
        usuario: ""
        foto: ""
        //A gente n precisa colocar ? no campo foto,mesmo que
        ele seja um campo opcional,pois se refere apenas a um
        unico campo,entao nao tem problema de enviar ele vazio
        senha: ""
        postagem: null
        //Posso passar ele como null ou não passar o campo postagem,graças
        ao ? .
        Eu deixei que a postagem pode ser passada como null pois na hora
        de um cadastro por exemplo,eu não preciso passar uma postagem,não
        faz sentido,então vale mais a pena enviar o objeto como null
        pq senao eu ia mandar 
        Postagem : {
                "id": 0,
                "titulo": "stringstri",
                "texto": "stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstri",
                "data": "2024-04-30T14:20:16.558Z",
                "tema": {
                    "id": 0,
                    "descricao": "string"
                }
                }
    }*/