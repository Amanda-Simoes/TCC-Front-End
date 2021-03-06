import axios from "axios";
import { useState, useEffect } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/style.css";
import image from "../../../assets/loading.gif";

import BootstrapSelect from "react-bootstrap-select-dropdown";

function Comparacao() {
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [escola1, setEscola1] = useState("");
  const [escola2, setEscola2] = useState("");
  const [escolas, setEscolas] = useState([]);
  const [Loading, setLoading] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    if (escola1 === "" || escola2 === "") {
      alert("Informe duas escolas");
    } else {
      setLoading(true);
      try {
        const reqResultEscola1 = await axios.post(
          "http://localhost:3000/app/comparacao",
          {
            escola: escola1,
          }
        );
        setResult1(reqResultEscola1);

        const reqResultEscola2 = await axios.post(
          "http://localhost:3000/app/comparacao",
          {
            escola: escola2,
          }
        );
        setResult2(reqResultEscola2);
        setLoading(false);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
      }
    }
    setLoading(false);
  };

  return (
    <div className="conteudoFiltro">
      <label className="titulo">Comparação de Escolas</label>

      <div className="filtroEscolas">
        <form onSubmit={enviar}>
          <label>
            {" "}
            Escola:
            <input
              type="text"
              value={escola1}
              onChange={(e) => setEscola1(e.target.value)}
              placeholder="Informa uma escola"
            />
          </label>
          <label>
            {" "}
            Escola:
            <input
              type="text"
              value={escola2}
              onChange={(e) => setEscola2(e.target.value)}
              placeholder="Informa uma escola"
            />
          </label>
          <div className="buttonContainer">
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

      {result1 && result2 && Loading === false ? (
        <div className="escolas">
          <div className="escolaComparacao">
            {result1 !== "" ? (
              <div>
                <div>
                  <label><strong>{result1.data.escola[0].nome_escola}</strong></label>
                </div>
                <br></br>
                <div>
                  <label><strong>Endereço: </strong>{result1.data.escola[0].endereco}</label>
                </div>
                <div>
                  <label>
                    <strong>Localização: </strong>
                    {result1.data.escola[0].localizacao === 1
                      ? "Urbana"
                      : "Rural"}
                  </label>
                </div>
                <div>
                  <label><strong>Situação: </strong>{result1.data.escola[0].funcionamento}</label>
                </div>
                <br></br>
                {result1.data.notas ? (
                  <label><strong>Notas</strong></label>
                ) : null}
                {result1.data.notas.map((element) => (
                  <div>
                    <br></br>
                    <div>
                      <label>Ano do Saeb: {element.id_saeb}</label>
                    </div>
                    <div>
                      <label>Nota de Português 5º ano: {element.pt_5ano}</label>
                    </div>
                    <div>
                      <label>
                        Nota de Matemática 5º ano: {element.pt_9ano}
                      </label>
                    </div>
                    <div>
                      <label>Nota de Português 9º ano: {element.mt_5ano}</label>
                    </div>
                    <div>
                      <label>
                        Nota de Matemática 9º ano: {element.mt_9ano}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="escolaComparacao">
            {result2 !== "" ? (
              <div>
                <div>
                  <label><strong>{result2.data.escola[0].nome_escola}</strong></label>
                </div>
                <br></br>
                <div>
                  <label><strong>Endereço: </strong>{result2.data.escola[0].endereco}</label>
                </div>
                <div>
                  <label>
                  <strong>Localização: </strong>{result2.data.escola[0].localizacao === 1
                      ? "Urbana"
                      : "Rural"}
                  </label>
                </div>
                <div>
                  <label><strong>Situação: </strong>{result2.data.escola[0].funcionamento}</label>
                </div>
                <br></br>
                {result2.data.notas ? (
                  <label><strong>Notas</strong></label>
                ) : null}
                {result2.data.notas.map((element) => (
                  <div>
                    <br></br>
                    <div>
                      <label>Ano do Saeb: {element.id_saeb}</label>
                    </div>
                    <div>
                      <label>Nota de Português 5º ano: {element.pt_5ano}</label>
                    </div>
                    <div>
                      <label>Nota de Matemática 5º ano: {element.pt_9ano}</label>
                    </div>
                    <div>
                      <label>Nota de Português 9º ano: {element.mt_5ano}</label>
                    </div>
                    <div>
                      <label>Nota de Matemática 9º ano: {element.mt_9ano}</label>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : null}
      <br></br>
      <br></br>
    </div>
  );
}

export default Comparacao;
