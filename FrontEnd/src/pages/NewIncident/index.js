import React, {useState } from 'react';
import { Link , useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();


    async function handlerNewIncident(e) {
      e.preventDefault();

      const data = {
        title,
        description,
        value,
      };

      try{
          await api.post('incidents' , data, {
            headers:{
              Authorization: ongId,
            }
          })

      history.push('/profile');
        
      }catch(err){
        alert('Erro ao cadastrar caso, Tente novamente.');
  
      }

    }
    return (
       <div className="new-incident-container">
           <div className="content">
              <section>
                <img src={logoImg} alt="Be the Hero"/>

                <h1>Cadastrar novo caso</h1>
                <p> Descreva seu Caso Detalhadamente para achar um Heroi para sua Causa. </p>

                <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                            Voltar para Home.
                    </Link>
              </section>

              <form onSubmit = {handlerNewIncident}>
                <input 
                required
                placeholder="Titulo do Caso" 
                value={title}
                onChange = {e => setTitle(e.target.value)}
                
                />
                <textarea 
                required
                placeholder="Descrição"
                
                value={description}
                onChange = {e => setDescription(e.target.value)}
                />
               
                <input 
                required
                placeholder="Valor em Reais" 
                value={value}
                onChange = {e => setValue(e.target.value)}
                />

                <button className="button" type="submit"> Cadastrar </button>
              </form>
          </div>

        </div>
    );

}