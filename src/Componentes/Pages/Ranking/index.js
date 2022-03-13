import axios from "axios";
import { useState } from "react";
import { Card, ListGroup, Button } from 'react-bootstrap'

function Ranking() {
  const [result, setResult] = useState([]);
  const [order, setOrder] = useState("undefined");
  const [uf, setUf] = useState();
  const [fund_ai, setFund_ai] = useState(true );
  const [fund_af, setFund_af] = useState(true);
  const [dependencia, setDependencia] = useState();
  const [localizacao, setLocalizacao] = useState();

  const enviar = async (e) => {
    e.preventDefault();
    if (order === "undefined"){
      alert("Preencha o filtro ANO ESCOLA")
    }
    else if (fund_ai == false && fund_af == false){
      alert("Selecione o nivel de ensino!")
    }
      else {
      try {
        const reqResult = await axios.post("http://localhost:3000/app/ranking-escolas", {
          order : order,
          uf : uf,
          fund_ai : fund_ai,
          fund_af : fund_af,
          dependencia : dependencia,
          localizacao : localizacao
        });
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
            <option value="mt5">5° ano de Matemática</option>
            <option value="mt9">9° ano de Matemática</option>
            <option value="media">Média Geral</option>
          </select>

          UF:
        <select value={uf} onChange={(e) => setUf(e.target.value)}>
          <option value="undefined">--</option>
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

        <input type="checkbox" checked={fund_ai} onChange={(e) => setFund_ai(e.target.checked)} />{" "}
        Fundamental 1

        <input type="checkbox" checked={fund_af} onChange={(e) => setFund_af(e.target.checked)} />{" "}
        Fundamental 2

        <select
          value={dependencia}
          onChange={(e) => setDependencia(e.target.value)}
        >
          <option value="undefined">--</option>
          <option value="Municipal">Municipal</option>
          <option value="Estadual">Estadual</option>
          <option value="Privada">Privada</option>
        </select>
        Dependencia

        <select
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
        >
          <option value="undefined">--</option>
          <option value="Rural">Rural</option>
          <option value="Urbana">Urbana</option>
        </select>
        Localização

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </form>

      {result.map((element) => 
        <div>
          <div>Escola: {element.nome_escola}
        </div>
          {order === "pt5" ? <div>Nota do 5° ano de Português: {element.media}</div> : <div></div>}
          {order === "mt5" ? <div>Nota do 5° ano de Matemática: {element.media}</div> : <div></div>}
          {order === "pt9" ? <div>Nota do 9° ano de Português: {element.media}</div> : <div></div>}
          {order === "mt9" ? <div>Nota do 9° ano de Matemática: {element.media}</div> : <div></div>}

          <br />
        </div>)}
    </div>
  );
}

export default Ranking;
