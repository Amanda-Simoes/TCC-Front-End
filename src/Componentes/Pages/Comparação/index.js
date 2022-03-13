import axios from "axios";
import { useState } from "react";
import { Card, ListGroup, Button } from 'react-bootstrap'

function Comparacao() {
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [escola1, setEscola1] = useState("");
  const [escola2, setEscola2] = useState("");

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

  return (
    <div>
    
      <label class="titulo">Comparação de Escolas</label>

      <div class="form">
        <form onSubmit={enviar}>
        <label> Escola: </label>
          <input
            type="text"
            value={escola1}
            onChange={(e) => setEscola1(e.target.value)}
          />
        <label> Escola: </label>
          <input
            type="text"
            value={escola2}
            onChange={(e) => setEscola2(e.target.value)}
          />
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </form>
      </div>

      <div>
        {result1 !== "" ? (
          <div>
            <h4>{result1.data.escola[0].nome_escola}</h4>
            <h5>{result1.data.escola[0].uf}</h5>
            <h5>{result1.data.escola[0].municipio}</h5>
            <h5>{result1.data.escola[0].endereco}</h5>
            <h5>{result1.data.escola[0].funcionamento}</h5>
            <h5>
              {result1.data.escola[0].localizacao === 1 ? "Urbana" : "Rural"}
            </h5>
            <h5>
              {result1.data.escola[0].ensino_fund_ai === "1"
                ? "Ensino Fundamental 1"
                : "Não possui Ensino Fundamental 1"}
            </h5>
            <h5>
              {result1.data.escola[0].ensino_fund_af === "1"
                ? "Ensino Fundamental 2"
                : "Não possui Ensino Fundamental 2"}
            </h5>
            {result1.data.notas.map((element) => (
              <div>
                <h4>Notas</h4>
                <h5>Ano do Saeb: {element.id_saeb}</h5>
                <h5>Nota de Português 5º ano:{element.pt_5ano}</h5>
                <h5>Nota de Matemática 5º ano:{element.pt_9ano}</h5>
                <h5>Nota de Português 9º ano:{element.mt_5ano}</h5>
                <h5>Nota de Matemática 9º ano:{element.mt_9ano}</h5>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        {result2 !== "" ? (
          <div>
            <h4>{result2.data.escola[0].nome_escola}</h4>
            <h5>{result2.data.escola[0].uf}</h5>
            <h5>{result2.data.escola[0].municipio}</h5>
            <h5>{result2.data.escola[0].endereco}</h5>
            <h5>{result2.data.escola[0].funcionamento}</h5>
            <h5>
              {result2.data.escola[0].localizacao === 1 ? "Urbana" : "Rural"}
            </h5>
            <h5>
              {result2.data.escola[0].fund_ai === 1
                ? "Ensino Fundamental 1"
                : "Não possui Ensino Fundamental 1"}
            </h5>
            <h5>
              {result2.data.escola[0].fund_af === 1
                ? "Ensino Fundamental 2"
                : "Não possui Ensino Fundamental 2"}
            </h5>
            {result2.data.notas.map((element) => (
              <div>
                <h4>Notas</h4>
                <h5>Ano do Saeb: {element.id_saeb}</h5>
                <h5>Nota de Português 5º ano:{element.pt_5ano}</h5>
                <h5>Nota de Matemática 5º ano:{element.pt_9ano}</h5>
                <h5>Nota de Português 9º ano:{element.mt_5ano}</h5>
                <h5>Nota de Matemática 9º ano:{element.mt_9ano}</h5>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Comparacao;
