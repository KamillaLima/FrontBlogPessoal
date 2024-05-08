import React from 'react';
import './App.css';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/home/Home';
import { AuthProvider } from './contexts/AuthContext';
import ListaTemas from './components/temas/listaTemas/listaTemas';
import FormularioTema from './components/temas/formularioTema/FormularioTema';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import ListaPostagens from './components/postagens/listaPostagem/ListaPostagens';
import FormularioPostagem from './components/postagens/formularioPostagem/FormularioPostagem';
import DeletarPostagem from './components/postagens/deletarPostagem/deletarPostagem';


function App() {
  return (
    <>
    <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/temas" element={<ListaTemas />} />
              <Route path="/cadastroTema" element={<FormularioTema />} />
              <Route path="/editarTema/:id" element={<FormularioTema />} />
              <Route path="/deletarTema/:id" element={<DeletarTema />} />
              <Route path="/postagens" element={<ListaPostagens />} />
              <Route path="/cadastroPostagem" element={<FormularioPostagem />} />
              <Route path="/editarPostagem/:id" element={<FormularioPostagem />} />
              <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
    </>
  );
}
export default App;
//As classes em Tailwind são compostas por uma ou mais palavras-chave separadas por hífens. 
//Cada palavra-chave representa uma propriedade CSS específica que pode ser aplicada a um elemento,
//como cor de fundo, tamanho de fonte, altura, margem, preenchimento, entre outras.


/*<BrowserRouter> - O componente BrowserRouter é importado da biblioteca React Router DOM e é usado para envolver todo o conteúdo que precisa de roteamento.
<Routes> - O componente Routes é importado da biblioteca React Router DOM e é usado para definir as rotas do aplicativo.
<Route path="/" element={<Home />} /> - Uma rota que é definida usando o componente Route. O caminho da rota é definido como '/' (que representa a página inicial do aplicativo) e o elemento a ser renderizado é definido como <Home /> (o componente que representa a página inicial).
<Route path="/login" element={<Login />} /> - Uma rota que é definida usando o componente Route. O caminho da rota é definido como '/login' e o elemento a ser renderizado é definido como <Login /> (o componente que representa a página de login).
<Route path="/home" element={<Home />} /> - Uma rota que é definida usando o componente Route. O caminho da rota é definido como '/home' e o elemento a ser renderizado é definido como <Home /> (o componente que representa a página inicial).**/ 