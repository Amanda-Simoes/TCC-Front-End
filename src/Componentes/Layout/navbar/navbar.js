import { Link } from "react-router-dom";
import Container from "../Container/container";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "./logo.png";

import "./style.css";

function NavbarTela() {
  return (
    // <nav class="navbar">
    <Navbar color="primary" dark expand="md">
      <Container>
        <Nav className="mr-auto" navbar>
          {/* <Link to='/escolas'>
             <img src={logo} alt="GuiaEduKids" width="150px"/>
        </Link> */}
          <NavItem>
            <NavLink>
              <Link to="/escolas" class="item">
                Escolas
              </Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink>
              <Link to="/comparacao" class="item">
                Comparação
              </Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink>
              <Link to="/ranking-escolas" class="item">
                Ranking
              </Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink>
              <Link to="/qualidade-ensino" class="item">
                Qualidade de Ensino
              </Link>
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarTela;
