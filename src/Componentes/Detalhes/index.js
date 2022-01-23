import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();
  console.log(id);

  const [result, setResult] = useState([]);

  useEffect(() => {
    const infoEscola = async () => {
      const url = "http://localhost:3000/app/detalhe-escolas/" + id;
      try {
        const reqResult = await axios.post(url, id);
        console.log(reqResult);
        setResult(reqResult.data);
      } catch (err) {
        setResult(err.response.data);
        console.log(err.response);
      }
    };
    infoEscola();
  }, [id]);

  return (
    <div>
      {typeof result === "string"
        ? result
        : result.map((element) => <div>{element.nome_escola}</div>)}

      {result.map((element) => 
        <div>
          <h4>Informações básicas</h4>
          <h5>Funcionamento: {element.funcionamento}</h5>
          <h5>Dependência: {element.dependencia}</h5>
          <h5>Localização: {element.localizacao === "1" ? "Urbana" : "Rural"}</h5>
          <h5>Endereço: {element.endereco}</h5>
        </div>)}

        {result.map((element) =>
        <div>
          <h4>Acessibilidade</h4>
          <h5>
          <ul>
            <li>Possui banheiro PNE? {element.banheiro_pne === "1" ? "Sim" : "Não"}</li>
            <li>Possui acessibilidade em corrimãos? {element.acess_corrimao === "1" ? "Sim" : "Não"}</li>
            <li>Possui pisos tateis? {element.acess_pisos_tateis === "1" ? "Sim" : "Não"}</li>
            <li>Possui rampas? {element.acess_rampas === "1" ? "Sim" : "Não"}</li>
            <li>Possui acessibilidade sonora? {element.acess_sonoro === "1" ? "Sim" : "Não"}</li>
            <li>Possui sinalização visual? {element.acess_sinal_visual === "1" ? "Sim" : "Não"}</li>
          </ul></h5>
        </div>)}

        {result.map((element) => 
        <div>
          <h4>Infraestrutura e informação adicionais</h4>
          <h5>Possui auditório? {element.auditorio === "1" ? "Sim" : "Não"}</h5>
          <h5>Possui biblioteca? {element.biblioteca === "1" ? "Sim" : "Não"}</h5>
          <h5>Possui sala de leitura? {element.sala_leitura === "1" ? "Sim" : "Não"}</h5>
          <h5>Possui dormitorio? {element.dormitorio === "1" ? "Sim" : "Não"}</h5>
          <h5>Possui laboratório de ciências? {element.lab_ciencias === "1" ? "Sim" : "Não"}</h5>
          <h5>Possui laboratório de informática? {element.lab_informatica === "1" ? "Sim" : "Não"}</h5>
          <h5>Possui parque infantil? {element.parque_infantil === "1" ? "Sim" : "Não"}</h5>
          <h5>Possui quadra de esporte: {element.quadra_esporte === "1" ? "Sim" : "Não"}</h5>
          <h5>Possui sala de arte? {element.sala_artes === "1" ? "Sim" : "Não"}</h5>
          <h5>Possui sala de música? {element.sala_musica === "1" ? "Sim" : "Não"}</h5>
          <h5>Possui sala de dança? {element.sala_danca === "1" ? "Sim" : "Não"}</h5>
          <h5>Possui educação indigena? {element.educacao_indigena === "1" ? "Sim" : "Não"}</h5>
          <h5>Possui exame de seleção? {element.exame_selecao === "1" ? "Sim" : "Não"}</h5>
          <h5>Possui grêmio estudantil? {element.gremio_estudantil === "1" ? "Sim" : "Não"}</h5>
          <h5>Possui atendimento educacional especializado (aee)? {element.aee === "1" ? "Sim" : "Não"}</h5>
        </div>)}
    </div>
  );
}

export default Details;
