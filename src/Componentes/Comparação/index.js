import axios from "axios";
import { useState } from "react";

function Comparacao() {
  const [result, setResult] = useState([]);
  const [escola1, setEscola1] = useState([]);
  const [escola2, setEscola2] = useState([]);

  const enviar = async (e) => {
    e.preventDefault();
    try {
      const reqResult = await axios.post("http://localhost:3000/app/comparacao", {
        escola1: escola1,
        escola2: escola2
      });
      console.log(reqResult);
      setResult(reqResult.data);
    } catch (err) {
      setResult(err.response.data);
      console.log(err.response);
    }
  };

  return (
    <div>
      <h3>Escolas</h3>

      <form onSubmit={enviar}>
        <input
          type="text"
          value={escola1}
          onChange={(e) => setEscola1(e.target.value)}
        />
        <input
          type="text"
          value={escola2}
          onChange={(e) => setEscola2(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>

      {typeof result === "string"
        ? result
        : result.map((element) => 
        <div>
          <div>Escola: {element.nome_escola}</div>
          <div>Uf: {element.uf} </div>
          <div>Endereço: {element.endereco}</div>
          <br />
        </div>)}
    </div>
  );
}

export default Comparacao;
