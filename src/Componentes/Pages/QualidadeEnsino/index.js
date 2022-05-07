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
  const dataNordeste = [];
  const dataSul = [];
  const dataSudeste = [];
  const dataNorte = [];
  const dataCentroOeste = [];

  if (result1) {
    for (let i = 0; i < result1.regiao.length; i++) {
      let regiaoLinha = result1.regiao[i].regiao;
      let notaLinha = Math.round(result1.regiao[i].media);
      data.push({
        regiao: regiaoLinha,
        nota: notaLinha,
      });
    }
    for (let i = 0; i < result1.nordeste.length; i++) {
      let ufLinha = result1.nordeste[i].uf;
      let notaLinha = Math.round(result1.nordeste[i].media);
      dataNordeste.push({
        uf: ufLinha,
        nota: notaLinha,
      });
    }
    for (let i = 0; i < result1.sul.length; i++) {
      let ufLinha = result1.sul[i].uf;
      let notaLinha = Math.round(result1.sul[i].media);
      dataSul.push({
        uf: ufLinha,
        nota: notaLinha,
      });
    }
    for (let i = 0; i < result1.sudeste.length; i++) {
      let ufLinha = result1.sudeste[i].uf;
      let notaLinha = Math.round(result1.sudeste[i].media);
      dataSudeste.push({
        uf: ufLinha,
        nota: notaLinha,
      });
    }
    for (let i = 0; i < result1.norte.length; i++) {
      let ufLinha = result1.norte[i].uf;
      let notaLinha = Math.round(result1.norte[i].media);
      dataNorte.push({
        uf: ufLinha,
        nota: notaLinha,
      });
    }
    for (let i = 0; i < result1.centroOeste.length; i++) {
      let ufLinha = result1.centroOeste[i].uf;
      let notaLinha = Math.round(result1.centroOeste[i].media);
      dataCentroOeste.push({
        uf: ufLinha,
        nota: notaLinha,
      });
    }
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

  const columnsNordeste = [
    {
      name: "UF",
      selector: (row) => row.uf,
    },
    {
      name: "Nota",
      selector: (row) => row.nota,
      sortable: true,
    },
  ];

  const columnsNorte = [
    {
      name: "UF",
      selector: (row) => row.uf,
    },
    {
      name: "Nota",
      selector: (row) => row.nota,
      sortable: true,
    },
  ];

  const columnsSul = [
    {
      name: "UF",
      selector: (row) => row.uf,
    },
    {
      name: "Nota",
      selector: (row) => row.nota,
      sortable: true,
    },
  ];

  const columnsSudeste = [
    {
      name: "UF",
      selector: (row) => row.uf,
    },
    {
      name: "Nota",
      selector: (row) => row.nota,
      sortable: true,
    },
  ];

  const columnsCentroOeste = [
    {
      name: "UF",
      selector: (row) => row.uf,
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
        // console.log(result1)
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

      {Loading ? (
        <div className="imgLoading">
          <img src={image} />
        </div>
      ) : null}

      {result1 && Loading === false ? (
        <div className="tablesQualidade">
          <br></br>
          <div>
            <label>
              <strong>Notas por Região</strong>
            </label>
            <DataTable columns={columns} data={data} />
          </div>

          <br></br>

          {dataNordeste.length > 0 ? (
            <div>
              <label>
                <strong>Notas da Região Nordeste</strong>
              </label>
              <DataTable columns={columnsNordeste} data={dataNordeste} />
            </div>
          ) : null}

          <br></br>

          {dataNorte.length > 0 ? (
            <div>
              <label>
                <strong>Notas da Região Norte</strong>
              </label>
              <DataTable columns={columnsNorte} data={dataNorte} />
            </div>
          ) : null}

          <br></br>

          {dataSul.length > 0 ? (
            <div>
              <label>
                <strong>Notas da Região Sul</strong>
              </label>
              <DataTable columns={columnsSul} data={dataSul} />
            </div>
          ) : null}

          <br></br>

          {dataSudeste.length > 0 ? (
            <div>
              <label>
                <strong>Notas da Região Sudeste</strong>
              </label>
              <DataTable columns={columnsSudeste} data={dataSudeste} />
            </div>
          ) : null}

          <br></br>

          {dataCentroOeste.length > 0 ? (
            <div>
              <label>
                <strong>Notas da Região Centro Oeste</strong>
              </label>
              <DataTable columns={columnsCentroOeste} data={dataCentroOeste} />
            </div>
          ) : null}
        </div>
      ) : null}
      <br></br>
      <br></br>
    </div>
  );
}

export default QualidadeEnsino;
