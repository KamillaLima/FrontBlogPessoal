import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';

function App() {
  return (
    <>
    <BrowserRouter>
        <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
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