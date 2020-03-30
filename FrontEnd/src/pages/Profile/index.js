import React, {useState, useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiPower , FiTrash2 } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(resp =>{
            setIncidents(resp.data); 
        })
    } ,[ongId]);
    
  async  function handlerDeleteIncidents(id){

        try{
           await api.delete(`incidents/${id}`, { 
                headers: {
                Authorization: ongId
            } 
        });
        setIncidents(incidents.filter(incidents => incidents.id !== id));

        }catch(err){
            alert('Falha ao tentar excluir, Tente novamente.');
        }

    }

    function handlerLogout(){
        localStorage.clear();

        history.push('/');
    }
    
    return (
       <div className="profile-container">
           <header>
                <img src={logoImg}   alt="Be the Hero"/>
                <span>Bem Vindo, {ongName} </span>
                
                <Link className="button" to="/incidents/new"> Cadastrar Novo Caso </Link>
                
                <button onClick={handlerLogout} type="button">
                    <FiPower size ={18} color="#E02041" />
                </button>
           </header>

           <h1> Casos Cadastrados  </h1>
               <ul key={incidents.id}>
                  {incidents.map(incidents => (

                <li>
                    <strong>CASO:</strong>
                    <p>{incidents.title}</p>
                    
                    <strong>DESCRIÇÃO:</strong>
                    <p>{incidents.description}</p>
                    
                    <strong>Valor:</strong>
                    <p> {Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incidents.value)} </p>

                    <button onClick={ () => handlerDeleteIncidents(incidents.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>

                </li>
                  ))}
            
               </ul>
          
       </div>
    );

}