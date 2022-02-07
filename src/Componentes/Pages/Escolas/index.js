import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Escolas() {
  const [result, setResult] = useState([]);
  const [escola, setEscola] = useState("");
  const [uf, setUf] = useState();
  const [fund_ai, setFund_ai] = useState(true);
  const [fund_af, setFund_af] = useState(true);
  const [dependencia, setDependencia] = useState();
  const [localizacao, setLocalizacao] = useState();
  const [acessibilidade, setAcessibilidade] = useState(false);
  const [aee, setAee] = useState(false);
  const [edu_indigena, setEduIndigena] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    try {
      const reqResult = await axios.post("http://localhost:3000/app/escolas", {
        escola: escola,
        uf: uf,
        fund_ai: fund_ai,
        fund_af: fund_af,
        dependencia: dependencia,
        localizacao: localizacao,
        acessibilidade: acessibilidade,
        aee: aee,
        edu_indigena: edu_indigena,
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
      <h3 class="titulo">Listagem de Escolas</h3>

      <div class="form">
        <form onSubmit={enviar}>
          <div class="form-base-primary">
            <label> Escola: </label>
            <input
              class="escola"
              placeholder="Informe uma escola"
              type="text"
              value={escola}
              onChange={(e) => setEscola(e.target.value)}
            />
            <label> UF: </label>
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
            <label> Dependencias: </label>
            <select
              value={dependencia}
              onChange={(e) => setDependencia(e.target.value)}
            >
              <option value="undefined">--</option>
              <option value="Municipal">Municipal</option>
              <option value="Estadual">Estadual</option>
              <option value="Privada">Privada</option>
            </select>
            <label> Localização: </label>
            <select
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
            >
              <option value="undefined">--</option>
              <option value="Rural">Rural</option>
              <option value="Urbana">Urbana</option>
            </select>
          </div>
          <div class="form-filter">
            <label> Educação Indigina: </label>
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
            <label> AEE: </label>
            <input
              type="checkbox"
              onChange={(e) => setAee(e.target.checked)}
            />{" "}
          </div>
          <div class="button-enviar">
            <button class="button" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>

      <div class="resultado">
        {typeof result === "string"
          ? result
          : result.map((element) => (
              <div>
                <table>
                  <tr>
                    <th>Escola</th>
                    <th>UF</th>
                    <th>Endereço</th>
                  </tr>
                  <tr>
                    <td>
                      <Link to={"/detalhe/" + element.cod_escola}>
                        {element.nome_escola}
                      </Link>
                    </td>
                    <td>
                      <div>Uf: {element.uf} </div>
                    </td>
                    <td>
                      <div>Endereço: {element.endereco}</div>
                    </td>
                  </tr>
                </table>

                <br />
              </div>
            ))}
      </div>
    </div>
  );
}

export default Escolas;
