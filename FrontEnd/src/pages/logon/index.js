import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'
import './styles.css'; 

import logoImg from '../../assets/logo.svg';
import heroImg from '../../assets/heroes.png';

export default function logon(){

    return(
        <div className="logon-container">

            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form>
                    <h1> Faça Seu Logon </h1>

                    <input placeholder="Sua ID"/>
                    <button className="button" type="submit"> Entrar </button>
                    <Link to="/Register">
                        <FiLogIn size={16} color="#e02041" />
                        Não Tenho Cadastro
                    </Link>
                </form>
            </section>

            <img src={heroImg} alt="Hero"/>
        </div>

    );
}