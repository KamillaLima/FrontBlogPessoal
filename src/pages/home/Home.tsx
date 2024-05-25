import React from 'react';
import homeLogo from '../../assets/gif_home.gif'
import './Home.css';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';



function Home() {
  return (
    <>
      <div className=" flex justify-center">
        <div className='container grid grid-cols-2 mt-3'>
          <div className="flex flex-col gap-8 items-center justify-center ">
            <h2 className='text-5xl font-bold text-pink'>Bem-vinde ao meu Blog!</h2>
            <p className='text-2xl text-purple italic'>Compartilhe suas ideias e opiniões aqui!</p>
            <p className='text-justify text-1xl' >Junte-se à nossa comunidade e descubra um espaço onde suas histórias, pensamentos e experiências são valorizados. Navegue pelas postagens, participe das discussões e encontre pessoas que compartilham dos mesmos interesses. Este blog é um lugar para aprender, inspirar e ser inspirado. Vamos começar essa jornada juntos!</p>
            <div className="flex justify-around gap-4">
              <ModalPostagem />
              <button className='rounded bg-purple text-white py-2 px-4 hover:bg-greenS hover:text-pink'>Ver postagens</button>
            </div>
          </div>

          <div className="flex justify-center ">
            <img src={homeLogo} alt="" className='w-11/12' />

          </div>
        </div>
      </div>
    </>
  );
}

export default Home;