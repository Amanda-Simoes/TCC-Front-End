import axios from "axios";
import { useState } from "react";

function Ranking() {
  const [result, setResult] = useState([]);
  const [order, setOrder] = useState("undefined");

  const enviar = async (e) => {
    e.preventDefault();
    console.log(order)
    if (order === "undefined"){
      alert("Preencha o filtro ANO ESCOLA")
    }else {
      try {
        const reqResult = await axios.post("http://localhost:3000/app/ranking-escolas", {
          order: order,
        });
        console.log(order)
        console.log(reqResult);
        setResult(reqResult.data);
      } catch (err) {
        setResult(err.response.data);
        console.log(err.response);
      }
    }
  };

  return (
    <div>
      <h3>Ranking das Escolas</h3>

      <form onSubmit={enviar}>

        <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="undefined">--</option>
            <option value="pt5">5° ano de Português</option>
            <option value="pt9">9° ano de Português</option>
            <option value="pt9">5° ano de Matemática</option>
            <option value="pt9">9° ano de Matemática</option>
            <option value="media">Média Geral</option>
          </select>

          <button type="submit">Enviar</button>
      </form>

      {typeof result === "string"
        ? result
        : result.map((element) => 
        <div>
          <div>Escola: {element.nome_escola}</div>


          {/* <div>Uf: {element.uf} </div>
          <div>Endereço: {element.endereco}</div> */}
          {order === "pt5" ? <div>Nota do 5° ano de Português: {element.nota}</div> : <div></div>}


          <br />
        </div>)}
    </div>
  );
}

export default Ranking;
