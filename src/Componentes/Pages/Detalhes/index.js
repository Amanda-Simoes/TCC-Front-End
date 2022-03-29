import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import "ol/ol.css";

function Details() {
  const { id } = useParams();
  console.log(id);

  const [result, setResult] = useState([]);
  const [notas, setNotas] = useState([]);

  const mapDivRef = useRef(null);

  const olView = useRef(
    new View({
      center: [0, 0],
      projection: "EPSG:4326",
      zoom: 2,
    })
  );

  const mapRef = useRef();

  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: olView.current,
    });
    map.setTarget(mapDivRef.current);

    mapRef.current = map;

    return () => {
      map.setTarget(undefined);
    }
  }, []);

  useEffect(() => {
    if (result.length !== 1) {
      return;
    }

    const school = result[0];

    const positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({
            color: "#3399CC",
          }),
          stroke: new Stroke({
            color: "#fff",
            width: 2,
          }),
        }),
      })
    );

    const coordinates = [school.longitude, school.latitude];

    positionFeature.setGeometry(new Point(coordinates));

    const positionLayer = new VectorLayer({
      source: new VectorSource({
        features: [positionFeature],
      }),
    });

    mapRef.current.addLayer(positionLayer);
    olView.current.setZoom(18);
    olView.current.setCenter(coordinates);
  }, [result]);

  useEffect(() => {
    const infoEscola = async () => {
      const url = "http://localhost:3000/app/detalhe-escolas/" + id;
      const notas = "http://localhost:3000/app/nota-escola/" + id;
      try {
        const reqResult = await axios.post(url, id);
        const reqNotas = await axios.post(notas, id);
        console.log(reqResult);
        console.log(setNotas);
        setResult(reqResult.data);
        setNotas(reqNotas.data);
      } catch (err) {
        setResult(err.response.data);
        console.log(err.response);
      }
    };
    infoEscola();
  }, [id]);

  return (
    <div>
      <div ref={mapDivRef} style={{height: '500px', width: '500px'}} />
      {typeof result === "string"
        ? result
        : result.map((element) => <div>{element.nome_escola}</div>
      )}

      {result.map((element) => 
        <div>
          <h4>Informações básicas</h4>
          <h5>Funcionamento: {element.funcionamento}</h5>
          <h5>Dependência: {element.dependencia}</h5>
          <h5>Localização: {element.localizacao === "1" ? "Urbana" : "Rural"}</h5>
          <h5>Endereço: {element.endereco}</h5>
        </div>
        )}

        <h4>Notas</h4>

        {notas.map((element) => 
        <div>
          <h5>Ano do Saeb: {element.id_saeb}</h5>
          <h5>5º ano de Lingua Portuguesa: {element.pt_5ano}</h5>
          <h5>5º ano de Matemática: {element.mt_5ano}</h5>
          <h5>9º ano de Lingua Portuguesa: {element.pt_9ano}</h5>
          <h5>9º ano de Matemática: {element.mt_9ano}</h5>
        </div>
        )}

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
