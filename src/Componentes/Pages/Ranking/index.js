import axios from "axios";
import { useState, useEffect } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import api from "../../../service/api";
import image from "../../../assets/loading.gif";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

function Ranking() {
  const [result, setResult] = useState();
  const [ensino, setEnsino] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [uf, setUf] = useState();
  const [dependencia, setDependencia] = useState();
  const [localizacao, setLocalizacao] = useState();
  const [cities, setCities] = useState([]);
  const [municipio, setMunicipio] = useState("");
  const [Loading, setLoading] = useState(false);
  let posicao = 0;

  const data = [];

  if (result) {
    let posicaoLinha = 0;
    for (let i = 0; i < result.length; i++) {
      posicaoLinha = posicaoLinha + 1;
      let nomeLinha = result[i].nome_escola;
      let cod_escola = result[i].cod_escola;
      let municipioLinha = result[i].municipio;
      let ufLinha = result[i].uf;
      let notaLinha = Math.round(result[i].media);
      data.push({
        posicao: posicaoLinha,
        nome: nomeLinha,
        cod: cod_escola,
        municipio: municipioLinha,
        uf: ufLinha,
        nota: notaLinha,
      });
    }
  }

  const columns = [
    {
      name: "Posição",
      selector: (row) => row.posicao,
      width: "10%",
      sortable: true,
    },
    {
      name: "Escola",
      selector: (row) => <Link to={"/detalhe/" + row.cod}>{row.nome}</Link>,
      width: "50%",
    },
    {
      name: "Municipio",
      selector: (row) => row.municipio,
    },
    {
      name: "UF",
      selector: (row) => row.uf,
    },
    {
      name: "Nota",
      selector: (row) => row.nota,
      sortable: true,
    },
  ];

  const enviar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reqResult = await axios.post(
        "http://localhost:3000/app/ranking-escolas",
        {
          ensino: ensino,
          disciplina: disciplina,
          uf: uf,
          municipio: municipio,
          dependencia: dependencia,
          localizacao: localizacao,
        }
      );
      setResult(reqResult.data);
      setLoading(false);
    } catch (err) {
      setResult(err.response.data);
      console.log(err.response);
      setLoading(false);
    }
    console.log(result);
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
      <label className="titulo">Ranking das Escolas</label>

      <form onSubmit={enviar}>
        <div className="rankingResultados">
          <label>
            Ensino:
            <select value={ensino} onChange={(e) => setEnsino(e.target.value)}>
              <option value="undefined">Selecione</option>
              <option value="fundai">Fundamental 1</option>
              <option value="fundaf">Fundamental 2</option>
            </select>
          </label>
          <label>
            Disciplina:
            <select
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
            >
              <option value="undefined">Selecione</option>
              <option value="pt">Português</option>
              <option value="mt">Matemática</option>
              <option value="media">Português e Matemática</option>
            </select>
          </label>
          <label>
            UF:
            <select value={uf} onChange={(e) => setUf(e.target.value)}>
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
            Municipios:
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
            Dependencia
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
            Localidade
            <select
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
            >
              <option value="undefined">Selecione</option>
              <option value="Rural">Rural</option>
              <option value="Urbana">Urbana</option>
            </select>
          </label>
          <div className="buttonRanking">
            <Button id="button" type="submit">
              Enviar
            </Button>
          </div>
        </div>
      </form>

      {Loading ? (
        <div className="imgLoading">
          <img src={image} />
        </div>
      ) : null}

      {result ? (
        <DataTable columns={columns} data={data} pagination="true" />
      ) : null}
    </div>
  );
}

export default Ranking;
