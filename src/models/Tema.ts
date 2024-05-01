//Model tem extensão .ts e não .tsx , pois nela só vai ter
//lógica e não componentes visuais

//Interface pois eu não quero instanciar nenhum objeto
export default interface Tema {
    id : number;
    descricao : string ;
}

//Precisa estar com o mesmo nome que ta no swagger /classes no backend