import React from 'react';
import FormularioPostagem from '../formularioPostagem/FormularioPostagem';

import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';

import './ModalPostagem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil,faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function ModalPostagem() {
  return (
    <>
      <Popup 
      trigger={              <button className=' rounded-full text-2 hover:bg-purple text-white py-3 px-5 bg-greenS hover:text-white '>
        <FontAwesomeIcon icon={faPenToSquare} className='mr-2' />
        
        
        Nova postagem</button>} modal>
        <div>
          <FormularioPostagem />
        </div>
      </Popup>
    </>
  );
}

export default ModalPostagem;