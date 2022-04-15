import axios from "axios";
import { useState } from "react";
import "../../Style/style.css";
import { Button } from "react-bootstrap";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import image from "../../../assets/loading.gif";
import DataTable from "react-data-table-component";

function QualidadeEnsino() {
  const [result1, setResult1] = useState("");
  const [nivelEscolaridade1, setNivelEscolaridade1] = useState("");
  const [disciplina1, setDisciplina1] = useState("");
  const [dependencia1, setDependencia1] = useState("");
  const [localizacao1, setLocalizacao1] = useState("");
  const [Loading, setLoading] = useState(false);

  const data = [];

  if (result1) {
    for (let i = 0; i < result1.length; i++) {
      let regiaoLinha = result1[i].regiao;
      let notaLinha = Math.round(result1[i].media);
      data.push({
        regiao: regiaoLinha,
        nota: notaLinha,
      });
    }
    console.log(result1);
    console.log(data);
  }

  const columns = [
    {
      name: "Região",
      selector: (row) => row.regiao,
    },
    {
      name: "Nota",
      selector: (row) => row.nota,
      sortable: true,
    },
  ];

  const enviar1 = async (e) => {
    e.preventDefault();
    if (nivelEscolaridade1 === "undefined") {
      alert("Selecione um Nivel de Escolaridade!");
    } else if (disciplina1 === "undefined") {
      alert("Selecione uma Disciplina");
    } else {
      setLoading(true);
      try {
        const reqResultEscola1 = await axios.post(
          "http://localhost:3000/app/qualidade-ensino",
          {
            nivelEscolaridade: nivelEscolaridade1,
            disciplina: disciplina1,
            dependencia: dependencia1,
            localizacao: localizacao1,
          }
        );
        setResult1(reqResultEscola1.data);
        setLoading(false);
      } catch (err) {
        setResult1(err.response.data);
        console.log(err.response);
        setLoading(false);
      }
    }
    setLoading(false);
  };

  return (
    <div className="geral">
      <label className="titulo">Qualidade de Ensino</label>

      <form onSubmit={enviar1}>
        <div>
          <label>
            Nivel Escolar
            <select
              value={nivelEscolaridade1}
              onChange={(e) => setNivelEscolaridade1(e.target.value)}
            >
              <option value="undefined">Selecione</option>
              <option value="fund_ai">Fundamental 1</option>
              <option value="fund_af">Fundamental 2</option>
            </select>
          </label>

          <label>
            Disciplina
            <select
              value={disciplina1}
              onChange={(e) => setDisciplina1(e.target.value)}
            >
              <option value="undefined">Selecione</option>
              <option value="PT">Português</option>
              <option value="MT">Matemática</option>
            </select>
          </label>
          <label>
            Dependência
            <select
              value={dependencia1}
              onChange={(e) => setDependencia1(e.target.value)}
            >
              <option value="undefined">Selecione</option>
              <option value="Privada">Privada</option>
              <option value="Estadual">Estadual</option>
              <option value="Municipal">Municipal</option>
            </select>
          </label>
          <label>
            Localização
            <select
              value={localizacao1}
              onChange={(e) => setLocalizacao1(e.target.value)}
            >
              <option value="undefined">Selecione</option>
              <option value="Urbana">Urbana</option>
              <option value="Rural">Rural</option>
            </select>
          </label>

          <Button id="button" type="submit">
            Enviar
          </Button>
        </div>
      </form>

      {result1 ? (
        <div>
          <label><strong>Notas por Região</strong></label>
          <DataTable columns={columns} data={data} />
          {/* <BarChart
            width={600}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 80,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="regiao"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="nota" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart> */}
        </div>
      ) : null}

      {/* {result2 ? (
        <div>
          <Table>
            <thead>
              <tr>
                <th>Região</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{result2[0].regiao}</td>
                <td>{result2[0].media}</td>
              </tr>
              <tr>
                <td>{result2[1].regiao}</td>
                <td>{result2[1].media}</td>
              </tr>
              <tr>
                <td>{result2[2].regiao}</td>
                <td>{result2[2].media}</td>
              </tr>
              <tr>
                <td>{result2[3].regiao}</td>
                <td>{result2[3].media}</td>
              </tr>
              <tr>
                <td>{result2[4].regiao}</td>
                <td>{result2[4].media}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : null} */}
    </div>
  );
}

export default QualidadeEnsino;
