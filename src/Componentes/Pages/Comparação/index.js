import axios from "axios";
import { useState, useEffect } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/style.css";

import BootstrapSelect from "react-bootstrap-select-dropdown";

function Comparacao() {
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [escola1, setEscola1] = useState("");
  const [escola2, setEscola2] = useState("");
  const [escolas, setEscolas] = useState([]);
  // const [aux, setAux] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    if (escola1 === "" || escola2 === "") {
      alert("Informe duas escolas");
    } else {
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
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  // let data = [];
  // let options = [];

  // useEffect(() => {
  // const listagemEscola = async () => {
  //   const url = "http://localhost:3000/app/escolasComboComparacao";
  //   try {
  //     const todasEscolas = await axios.post(url);
  //     setEscolas(todasEscolas.data);

  //     for (let i = 0; i < todasEscolas.data.length; i++) {
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //       data = [
  //         {
  //           value: todasEscolas.data[i].nome_escola,
  //           label: todasEscolas.data[i].nome_escola,
  //         },
  //       ];
  //       options.push(...data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  //   listagemEscola();
  // }, [aux]);

  // setAux(true)

  // const selectEscola = (escola) => {
  //   setEscola1(escola.selectedValue);
  // };

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

      {result1 && result2 ? (
        <div className="escolas">
          <div className="escolaComparacao">
            {result1 !== "" ? (
              <div>
                <div>
                  <label>{result1.data.escola[0].nome_escola}</label>
                </div>
                <div>
                  <label>{result1.data.escola[0].uf}</label>
                </div>
                <div>
                  <label>{result1.data.escola[0].municipio}</label>
                </div>
                <div>
                  <label>{result1.data.escola[0].endereco}</label>
                </div>
                <div>
                  <label>{result1.data.escola[0].funcionamento}</label>
                </div>
                <div>
                  <label>
                    {result1.data.escola[0].localizacao === 1
                      ? "Urbana"
                      : "Rural"}
                  </label>
                </div>
                <div>
                  <label>
                    {result1.data.escola[0].ensino_fund_ai === "1"
                      ? "Ensino Fundamental 1"
                      : "Não possui Ensino Fundamental 1"}
                  </label>
                </div>
                <div>
                  <label>
                    {result1.data.escola[0].ensino_fund_af === "1"
                      ? "Ensino Fundamental 2"
                      : "Não possui Ensino Fundamental 2"}
                  </label>
                </div>
                {result1.data.notas.map((element) => (
                  <div>
                    <div>
                      <label>Notas</label>
                    </div>
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

          <div className="escolaComparacao">
            {result2 !== "" ? (
              <div>
                <div>
                  <label>{result2.data.escola[0].nome_escola}</label>
                </div>
                <div>
                  <label>{result2.data.escola[0].uf}</label>
                </div>
                <label>{result2.data.escola[0].municipio}</label>
                <div>
                  <label>{result2.data.escola[0].endereco}</label>
                </div>
                <div>
                  <label>{result2.data.escola[0].funcionamento}</label>
                </div>
                <div>
                  <label>
                    {result2.data.escola[0].localizacao === 1
                      ? "Urbana"
                      : "Rural"}
                  </label>
                </div>
                <div>
                  <label>
                    {result2.data.escola[0].fund_ai === 1
                      ? "Ensino Fundamental 1"
                      : "Não possui Ensino Fundamental 1"}
                  </label>
                </div>
                <div>
                  <label>
                    {result2.data.escola[0].fund_af === 1
                      ? "Ensino Fundamental 2"
                      : "Não possui Ensino Fundamental 2"}
                  </label>
                </div>
                {result2.data.notas.map((element) => (
                  <div>
                    <div>
                      <label>Notas</label>
                    </div>
                    <div>
                      <label>Ano do Saeb: {element.id_saeb}</label>
                    </div>
                    <div>
                      <label>Nota de Português 5º ano:{element.pt_5ano}</label>
                    </div>
                    <div>
                      <label>Nota de Matemática 5º ano:{element.pt_9ano}</label>
                    </div>
                    <div>
                      <label>Nota de Português 9º ano:{element.mt_5ano}</label>
                    </div>
                    <div>
                      <label>Nota de Matemática 9º ano:{element.mt_9ano}</label>
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
    </div>
  );
}

export default Comparacao;
