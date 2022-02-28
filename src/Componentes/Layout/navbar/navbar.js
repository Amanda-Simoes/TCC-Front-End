import { Link } from "react-router-dom";
import Container from "../Container/container";

import logo from './logo.png'

import './style.css'

function Navbar() {
  return (
    <nav class="navbar">
      <Container>
        {/* <Link to='/escolas'>
             <img src={logo} alt="GuiaEduKids" width="150px"/>
        </Link> */}
        <ul class="list">
          <li class="item">
            <Link to="/escolas">Escolas</Link>
          </li>
          <li class="item">
            <Link to="/comparacao">Comparação</Link>
          </li>
          <li class="item"> 
            <Link to="/ranking-escolas">Ranking</Link>
          </li>
          <li class="item"> 
            <Link to="/qualidade-ensino">Qualidade de Ensino</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
