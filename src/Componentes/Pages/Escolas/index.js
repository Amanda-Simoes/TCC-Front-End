import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, ListGroup, Button, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/style.css";
import api from "../../../service/api";
import image from "../../../assets/loading.gif";
import DataTable from "react-data-table-component";

function Escolas() {
  const [result, setResult] = useState();
  const [escola, setEscola] = useState("");
  const [uf, setUf] = useState();
  const [fund_ai, setFund_ai] = useState(true);
  const [fund_af, setFund_af] = useState(true);
  const [dependencia, setDependencia] = useState();
  const [localizacao, setLocalizacao] = useState();
  const [acessibilidade, setAcessibilidade] = useState(false);
  const [edu_indigena, setEduIndigena] = useState(false);
  const [cities, setCities] = useState([]);
  const [municipio, setMunicipio] = useState("");
  const [Loading, setLoading] = useState(false);

  const data = [];

  if (result) {
    for (let i = 0; i < result.length; i++) {
      let nomeLinha = result[i].nome_escola;
      let cod_escola = result[i].cod_escola;
      let municipioLinha = result[i].municipio;
      let ufLinha = result[i].uf;
      data.push({
        escola: nomeLinha,
        cod: cod_escola,
        municipio: municipioLinha,
        uf: ufLinha,
      });
    }
  }

  const columns = [
    {
      name: "Escola",
      selector: (row) => <Link to={"/detalhe/" + row.cod}>{row.escola}</Link>,
      sortable: true,
      width: "50%",
    },
    {
      name: "Municipio",
      selector: (row) => row.municipio,
      sortable: true,
    },
    {
      name: "UF",
      selector: (row) => row.uf,
      sortable: true,
    },
  ];

  const enviar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reqResult = await axios.post("http://localhost:3000/app/escolas", {
        escola: escola,
        uf: uf,
        municipio: municipio,
        fund_ai: fund_ai,
        fund_af: fund_af,
        dependencia: dependencia,
        localizacao: localizacao,
        acessibilidade: acessibilidade,
        edu_indigena: edu_indigena,
      });
      setResult(reqResult.data);
      setLoading(false);
    } catch (err) {
      setResult(err.response.data);
      console.log(err.response);
      setLoading(false);
    }
    setLoading(false);
  };

  const getCities = async () => {
    await api
      .get(`localidades/estados/${uf}/municipios`)
      .then((response) => {
        if (response) {
          console.log("cidades", response.data);
          setCities(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCities();
  }, [uf]);

  return (
    <div>
      <label className="titulo">Escolas</label>
      <div id="outIn">
        <form onSubmit={enviar}>
          <div id="first">
            <label for="escola">
              {" "}
              Escola:
              <input
                class="escola"
                id="escola"
                placeholder="Informe uma escola"
                type="text"
                value={escola}
                onChange={(e) => setEscola(e.target.value)}
              />
            </label>
            <label>
              {" "}
              UF:
              <select
                id="uf"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              >
                <option value="undefined">Selecione</option>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AM">AM</option>
                <option value="AP">AP</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MG">MG</option>
                <option value="MS">MS</option>
                <option value="MT">MT</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="PR">PR</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="RS">RS</option>
                <option value="SC">SC</option>
                <option value="SE">SE</option>
                <option value="SP">SP</option>
                <option value="TO">TO</option>
              </select>
            </label>

            <label>
              {" "}
              Municipio:
              <select onChange={(e) => setMunicipio(e.target.value)}>
                <option value="undefined">Selecione</option>
                {cities.length >= 0
                  ? cities.map((city) => (
                      <option key={city.id} value={city.nome}>
                        {city.nome}
                      </option>
                    ))
                  : null}
              </select>
            </label>

            <label>
              {" "}
              Dependencia:
              <select
                value={dependencia}
                onChange={(e) => setDependencia(e.target.value)}
              >
                <option value="undefined">Selecione</option>
                <option value="Municipal">Municipal</option>
                <option value="Estadual">Estadual</option>
                <option value="Privada">Privada</option>
              </select>
            </label>

            <label>
              {" "}
              Localiza????o:
              <select
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
              >
                <option value="undefined">Selecione</option>
                <option value="Rural">Rural</option>
                <option value="Urbana">Urbana</option>
              </select>
            </label>
          </div>
          <div id="second">
            <label> Fundamental 1 </label>
            <input
              type="checkbox"
              checked={fund_ai}
              onChange={(e) => setFund_ai(e.target.checked)}
            />{" "}
            <label> Fundamental 2 </label>
            <input
              type="checkbox"
              checked={fund_af}
              onChange={(e) => setFund_af(e.target.checked)}
            />{" "}
            <label> Educa????o Indigina: </label>
            <input
              type="checkbox"
              checked={edu_indigena}
              onChange={(e) => setEduIndigena(e.target.checked)}
            />{" "}
            <label> Acessibilidade: </label>
            <input
              type="checkbox"
              checked={acessibilidade}
              onChange={(e) => setAcessibilidade(e.target.checked)}
            />{" "}
            <Button id="button" type="submit">
              Enviar
            </Button>
          </div>
        </form>
      </div>

      {Loading ? (
        <div className="imgLoading">
          <img src={image} />
        </div>
      ) : null}
      {result && Loading === false ? (
        <DataTable columns={columns} data={data} pagination="true" />
      ) : null}
    </div>
  );
}

export default Escolas;
