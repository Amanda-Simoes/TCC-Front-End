import { Link } from "react-router-dom";
import Container from "../Container/container";
import { Navbar, Nav, NavItem, NavLink , NavbarBrand} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "./logo.png";

import "./style.css";

function NavbarTela() {
  return (
    // <nav class="navbar">
    <Navbar id="navbar" dark expand="md">
        <NavbarBrand><h4>GuiaEduKids</h4></NavbarBrand>
        <Nav className="navContent" navbar>
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
    </Navbar>
  );
}

export default NavbarTela;
