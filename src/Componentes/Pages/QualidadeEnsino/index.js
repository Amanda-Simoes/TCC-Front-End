import axios from "axios";
import { useState } from "react";
import "../../Style/style.css";

function QualidadeEnsino() {
    const [result, setResult] = useState("");
    const [uf, setUf] = useState("");
    const [municipio, setMunicipio] = useState("");

    const enviar = async (e) => {
        e.preventDefault();
        // if (uf === "" || escola2 === "") {
        //   alert("Informe duas escolas");
        // } else {
          try {
            const reqResultEscola = await axios.post(
              "http://localhost:3000/app/qualidade-ensino",
              {
                uf: uf,
                municipio: "Belém do Brejo do Cruz"
              }
            );
            setResult(reqResultEscola);
            } catch (err) {
            console.log(err.response);
          }
        // }
      };

      return (
          <div>
              <h3 class="titulo">Qualidade de Ensino</h3>

              <div class="form">
                <form onSubmit={enviar}>
                  <div class="form-base-primary">
                    <label>UF: </label>
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
                  </div>
                  <div class="button-enviar">
                    <button class="button" type="submit">
                      Enviar
                    </button>
                  </div>
                </form>
              </div>

              <div class="resultado">
                {result !== "" ? (
                  <div>
                    <div>
                      <h3>Média da UF:</h3>
                      <h4>Média Geral de Português - 5° Ano: {Math.round(result.data.uf[0].pt_5ano)}</h4>
                      <h4>Média Geral de Matemática - 5° Ano: {Math.round(result.data.uf[0].mt_5ano)}</h4>
                      <h4>Média Geral de Português - 9° Ano: {Math.round(result.data.uf[0].pt_9ano)}</h4>
                      <h4>Média Geral de Matemática - 9° Ano: {Math.round(result.data.uf[0].mt_9ano)}</h4>
                    </div>

                    <div>
                      <br />
                      <h3>Média do Municipio:</h3>
                      <h4>Média Geral de Português - 5° Ano: {Math.round(result.data.municipio[0].pt_5ano)}</h4>
                      <h4>Média Geral de Matemática - 5° Ano: {Math.round(result.data.municipio[0].mt_5ano)}</h4>
                      <h4>Média Geral de Português - 9° Ano: {Math.round(result.data.municipio[0].pt_9ano)}</h4>
                      <h4>Média Geral de Matemática - 9° Ano: {Math.round(result.data.municipio[0].mt_9ano)}</h4>
                    </div>

                    <div>
                      <br />
                      <h3>Média da Localidade Urbana:</h3>
                      <h4>Média Geral de Português - 5° Ano: {Math.round(result.data.urbana[0].pt_5ano)}</h4>
                      <h4>Média Geral de Matemática - 5° Ano: {Math.round(result.data.urbana[0].mt_5ano)}</h4>
                      <h4>Média Geral de Português - 9° Ano: {Math.round(result.data.urbana[0].pt_9ano)}</h4>
                      <h4>Média Geral de Matemática - 9° Ano: {Math.round(result.data.urbana[0].mt_9ano)}</h4>
                    </div>

                    <div>
                      <br />
                      <h3>Média da Localidade Rural:</h3>
                      <h4>Média Geral de Português - 5° Ano: {Math.round(result.data.rural[0].pt_5ano)}</h4>
                      <h4>Média Geral de Matemática - 5° Ano: {Math.round(result.data.rural[0].mt_5ano)}</h4>
                      <h4>Média Geral de Português - 9° Ano: {Math.round(result.data.rural[0].pt_9ano)}</h4>
                      <h4>Média Geral de Matemática - 9° Ano: {Math.round(result.data.rural[0].mt_9ano)}</h4>
                    </div>

                    <div>
                      <br />
                      <h3>Média Geral das Escolas Estaduais:</h3>
                      <h4>Média Geral de Português - 5° Ano: {Math.round(result.data.estadual[0].pt_5ano)}</h4>
                      <h4>Média Geral de Matemática - 5° Ano: {Math.round(result.data.estadual[0].mt_5ano)}</h4>
                      <h4>Média Geral de Português - 9° Ano: {Math.round(result.data.estadual[0].pt_9ano)}</h4>
                      <h4>Média Geral de Matemática - 9° Ano: {Math.round(result.data.estadual[0].mt_9ano)}</h4>
                    </div>

                    <div>
                      <br />
                      <h3>Média Geral das Escolas Municipais:</h3>
                      <h4>Média Geral de Português - 5° Ano: {Math.round(result.data.municipal[0].pt_5ano)}</h4>
                      <h4>Média Geral de Matemática - 5° Ano: {Math.round(result.data.municipal[0].mt_5ano)}</h4>
                      <h4>Média Geral de Português - 9° Ano: {Math.round(result.data.municipal[0].pt_9ano)}</h4>
                      <h4>Média Geral de Matemática - 9° Ano: {Math.round(result.data.municipal[0].mt_9ano)}</h4>
                    </div>

                    <div>
                      <br />
                      <h3>Média Geral das Escolas Privadas:</h3>
                      <h4>Média Geral de Português - 5° Ano: {Math.round(result.data.privada[0].pt_5ano)}</h4>
                      <h4>Média Geral de Matemática - 5° Ano: {Math.round(result.data.privada[0].mt_5ano)}</h4>
                      <h4>Média Geral de Português - 9° Ano: {Math.round(result.data.privada[0].pt_9ano)}</h4>
                      <h4>Média Geral de Matemática - 9° Ano: {Math.round(result.data.privada[0].mt_9ano)}</h4>
                    </div>
                  </div>
                  
              ) : ( "" ) }
              </div>

          </div>
      )

}

export default QualidadeEnsino;