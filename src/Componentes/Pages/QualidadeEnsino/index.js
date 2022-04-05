import axios from "axios";
import { Alert } from "bootstrap";
import { useState, useEffect } from "react";
import { Card, Row, Col, ListGroup, Button, Container } from "reactstrap";
import api from "../../../service/api";
import "../../Style/style.css";

function QualidadeEnsino() {
  const [result, setResult] = useState("");
  const [uf, setUf] = useState("");
  const [cities, setCities] = useState([]);
  const [municipio, setMunicipio] = useState("");

  const enviar = async (e) => {
    e.preventDefault();
    if (uf === "") {
      alert("Selecione a UF");
    } else if (municipio === "") {
      alert("Selecione o Municipio");
    } else {
      try {
        const reqResultEscola = await axios.post(
          "http://localhost:3000/app/qualidade-ensino",
          {
            uf: uf,
            municipio: municipio,
          }
        );
        setResult(reqResultEscola);
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  const getCities = async () => {
    // setLoading(true);
    await api
      .get(`localidades/estados/${uf}/municipios`)
      .then((response) => {
        if (response) {
          console.log("cidades", response.data);
          setCities(response.data);
          // setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
      });
  };

  useEffect(() => {
    getCities();
  }, [uf]);

  return (
    <div className="geral">
      <label className="titulo">Qualidade de Ensino</label>

      <form onSubmit={enviar}>
        <div>
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
            Municipios:
            <select onChange={(e) => setMunicipio(e.target.value)}>
              <option value="">Selecione</option>
              {cities.length >= 0
                ? cities.map((city) => (
                    <option key={city.id} value={city.nome}>
                      {city.nome}
                    </option>
                  ))
                : null}
            </select>
          </label>

          <Button id="button" type="submit">
            Enviar
          </Button>
        </div>
      </form>

      <div className="notasQualidade">
        {result !== "" ? (
          <div className="notas">
            <div className="notasGeral">
              <label className="subtitulo">Média da UF:</label>
              <div>
                <label>
                  Média Geral de Português - 5° Ano:{" "}
                  {result.data.uf[0].pt_5ano <= 0 ? "Sem Nota" : Math.round(result.data.uf[0].pt_5ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Matemática - 5° Ano:{" "}
                  {result.data.uf[0].mt_5ano <= 0 ? "Sem Nota" : Math.round(result.data.uf[0].mt_5ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Português - 9° Ano:{" "}
                  {result.data.uf[0].pt_9ano <= 0 ? "Sem Nota" : Math.round(result.data.uf[0].pt_9ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Matemática - 9° Ano:{" "}
                  {result.data.uf[0].mt_9ano <= 0 ? "Sem Nota" : Math.round(result.data.uf[0].mt_9ano)}
                </label>
              </div>
            </div>

            <div className="notasGeral">
              <br />
              <label className="subtitulo">Média do Municipio:</label>
              <div>
                <label>
                  Média Geral de Português - 5° Ano:{" "}
                  {result.data.municipio[0].pt_5ano <= 0 ? "Sem Nota" : Math.round(result.data.municipio[0].pt_5ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Matemática - 5° Ano:{" "}
                  {result.data.municipio[0].mt_5ano <= 0 ? "Sem Nota" : Math.round(result.data.municipio[0].mt_5ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Português - 9° Ano:{" "}
                  {result.data.municipio[0].pt_9ano <= 0 ? "Sem Nota" : Math.round(result.data.municipio[0].pt_9ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Matemática - 9° Ano:{" "}
                  {result.data.municipio[0].mt_9ano <= 0 ? "Sem Nota" : Math.round(result.data.municipio[0].mt_9ano)}
                </label>
              </div>
            </div>

            <div className="notasGeral">
              <br />
              <label className="subtitulo">Média da Localidade Urbana:</label>
              <div>
                <label>
                  Média Geral de Português - 5° Ano:{" "}
                  {result.data.urbana[0].pt_5ano <= 0 ? "Sem Nota" : Math.round(result.data.urbana[0].pt_5ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Matemática - 5° Ano:{" "}
                  {result.data.urbana[0].mt_5ano <= 0 ? "Sem Nota" : Math.round(result.data.urbana[0].mt_5ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Português - 9° Ano:{" "}
                  {result.data.urbana[0].pt_9ano <= 0 ? "Sem Nota" : Math.round(result.data.urbana[0].pt_9ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Matemática - 9° Ano:{" "}
                  {result.data.urbana[0].mt_9ano <= 0 ? "Sem Nota" : Math.round(result.data.urbana[0].mt_9ano)}
                </label>
              </div>
            </div>

            <div className="notasGeral">
              <br />
              <label className="subtitulo">Média da Localidade Rural:</label>
              <div>
                <label>
                  Média Geral de Português - 5° Ano:{" "}
                  {result.data.rural[0].pt_5ano <= 0 ? "Sem Nota" : Math.round(result.data.rural[0].pt_5ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Matemática - 5° Ano:{" "}
                  {result.data.rural[0].mt_5ano <= 0 ? "Sem Nota" : Math.round(result.data.rural[0].mt_5ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Português - 9° Ano:{" "}
                  {result.data.rural[0].pt_9ano <= 0 ? "Sem Nota" : Math.round(result.data.rural[0].pt_9ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Matemática - 9° Ano:{" "}
                  {result.data.rural[0].mt_9ano <= 0 ? "Sem Nota" : Math.round(result.data.rural[0].mt_9ano)}
                </label>
              </div>
            </div>

            <div className="notasGeral">
              <br />
              <label className="subtitulo">
                Média Geral das Escolas Estaduais:
              </label>
              <div>
                <label>
                  Média Geral de Português - 5° Ano:{" "}
                  {result.data.estadual[0].pt_5ano <= 0 ? "Sem Nota" : Math.round(result.data.estadual[0].pt_5ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Matemática - 5° Ano:{" "}
                  {result.data.estadual[0].mt_5ano <= 0 ? "Sem Nota" : Math.round(result.data.estadual[0].mt_5ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Português - 9° Ano:{" "}
                  {result.data.estadual[0].pt_9ano <= 0 ? "Sem Nota" : Math.round(result.data.estadual[0].pt_9ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Matemática - 9° Ano:{" "}
                  {result.data.estadual[0].mt_9ano <= 0 ? "Sem Nota" : Math.round(result.data.estadual[0].mt_9ano)}
                </label>
              </div>
            </div>

            <div className="notasGeral">
              <br />
              <label className="subtitulo">
                Média Geral das Escolas Municipais:
              </label>
              <div>
                <label>
                  Média Geral de Português - 5° Ano:{" "}
                  {result.data.municipal[0].pt_5ano <= 0 ? "Sem Nota" : Math.round(result.data.municipal[0].pt_5ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Matemática - 5° Ano:{" "}
                  {result.data.municipal[0].mt_5ano <= 0 ? "Sem Nota" : Math.round(result.data.municipal[0].mt_5ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Português - 9° Ano:{" "}
                  {result.data.municipal[0].pt_9ano <= 0 ? "Sem Nota" : Math.round(result.data.municipal[0].pt_9ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Matemática - 9° Ano:{" "}
                  {result.data.municipal[0].mt_9ano <= 0 ? "Sem Nota" : Math.round(result.data.municipal[0].mt_9ano)}
                </label>
              </div>
            </div>

            <div className="notasGeral">
              <br />
              <label className="subtitulo">
                Média Geral das Escolas Privadas:
              </label>
              <div>
                <label>
                  Média Geral de Português - 5° Ano:{" "}
                  {result.data.privada[0].pt_5ano <= 0 ? "Sem Nota" : Math.round(result.data.privada[0].pt_5ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Matemática - 5° Ano:{" "}
                  {result.data.privada[0].mt_5ano <= 0 ? "Sem Nota" : Math.round(result.data.privada[0].mt_5ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Português - 9° Ano:{" "}
                  {result.data.privada[0].pt_9ano <= 0 ? "Sem Nota" : Math.round(result.data.privada[0].pt_9ano)}
                </label>
              </div>
              <div>
                <label>
                  Média Geral de Matemática - 9° Ano:{" "}
                  {result.data.privada[0].mt_9ano <= 0 ? "Sem Nota" : Math.round(result.data.privada[0].mt_9ano)}
                </label>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default QualidadeEnsino;
