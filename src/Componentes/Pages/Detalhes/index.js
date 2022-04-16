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
import { Table } from "reactstrap";

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
    };
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
      {typeof result === "string"
        ? result
        : result.map((element) => (
            <div className="titulo">{element.nome_escola}</div>
          ))}

      {result.map((element) => (
        <div>
          <label className="subtitulo">Informações básicas:</label>
          <div>
            <label>
              <strong>Funcionamento: </strong>
              {element.funcionamento}
            </label>
          </div>
          <div>
            <label>
              <strong>Dependência: </strong>
              {element.dependencia}
            </label>
          </div>
          <div>
            <label>
              <strong>Localização: </strong>
              {element.localizacao === "1" ? "Urbana" : "Rural"}
            </label>
          </div>
          {element.endereco ? (
            <div>
              <label>
                <strong>Endereço: </strong>
                {element.endereco}
              </label>
            </div>
          ) : null}
        </div>
      ))}

      <div ref={mapDivRef} style={{ height: "500px", width: "500px" }} />

      <br />

      {/* <label className="subtitulo">Notas</label> */}

      {notas.map((element) => (
        <div>
          <div>
            <label>
              <strong>Notas do Saeb de {element.id_saeb}</strong>
            </label>
          </div>
          <div id="tableDetalhe">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Série</th>
                  <th>Disciplina</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>5º ano</td>
                  <td>Português</td>
                  <td>
                    {element.pt_5ano > 0
                      ? Math.round(element.pt_5ano)
                      : "Sem Nota"}
                  </td>
                </tr>
                <tr>
                  <td>5º ano</td>
                  <td>Matemática</td>
                  <td>
                    {element.mt_5ano > 0
                      ? Math.round(element.mt_5ano)
                      : "Sem Nota"}
                  </td>
                </tr>
                <tr>
                  <td>9º ano</td>
                  <td>Português</td>
                  <td>
                    {element.pt_9ano > 0
                      ? Math.round(element.pt_9ano)
                      : "Sem Nota"}
                  </td>
                </tr>
                <tr>
                  <td>9º ano</td>
                  <td>Matemática</td>
                  <td>
                    {element.mt_9ano > 0
                      ? Math.round(element.mt_9ano)
                      : "Sem Nota"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      ))}

      {result.map((element) => (
        <div>
          <label className="subtitulo">Acessibilidade</label>
          <div>
            <label>
              <ul>
                <li>
                  <strong>Banheiro PNE: </strong>
                  {element.banheiro_pne === "1" ? "Possui" : "Não possui"}
                </li>
                <li>
                  <strong>Acessibilidade em corrimãos: </strong>
                  {element.acess_corrimao === "1" ? "Possui" : "Não possui"}
                </li>
                <li>
                  <strong>Pisos tateis: </strong>
                  {element.acess_pisos_tateis === "1" ? "Possui" : "Não possui"}
                </li>
                <li>
                  <strong>Rampas: </strong>
                  {element.acess_rampas === "1" ? "Possui" : "Não possui"}
                </li>
                <li>
                  <strong>Acessibilidade sonora: </strong>
                  {element.acess_sonoro === "1" ? "Possui" : "Não possui"}
                </li>
                <li>
                  <strong>Sinalização visual: </strong>
                  {element.acess_sinal_visual === "1" ? "Possui" : "Não possui"}
                </li>
              </ul>
              {console.log(element)}
            </label>
          </div>
        </div>
      ))}

      {result.map((element) => (
        <div>
          <label className="subtitulo">
            Infraestrutura e informação adicionais
          </label>
          <div>
            <label>
              <strong>Auditório: </strong>
              {element.auditorio === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
          <div>
            <label>
              <strong>Biblioteca: </strong>
              {element.biblioteca === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
          <div>
            <label>
              <strong>Sala de leitura: </strong>
              {element.sala_leitura === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
          <div>
            <label>
              <strong>Possui dormitorio: </strong>
              {element.dormitorio === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
          <div>
            <label>
              <strong>Laboratório de ciências: </strong>
              {element.lab_ciencias === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
          <div>
            <label>
              <strong>Laboratório de informática: </strong>
              {element.lab_informatica === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
          <div>
            <label>
              <strong>Parque infantil: </strong>
              {element.parque_infantil === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
          <div>
            <label>
              <strong>Quadra de esporte: </strong>
              {element.quadra_esporte === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
          <div>
            <label>
              <strong>Sala de arte: </strong>
              {element.sala_artes === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
          <div>
            <label>
              <strong>Sala de música: </strong>
              {element.sala_musica === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
          <div>
            <label>
              <strong>Sala de dança: </strong>
              {element.sala_danca === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
          <div>
            <label>
              <strong>Educação indigena: </strong>
              {element.educacao_indigena === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
          <div>
            <label>
              <strong>Exame de seleção: </strong>
              {element.exame_selecao === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
          <div>
            <label>
              <strong>Grêmio estudantil: </strong>
              {element.gremio_estudantil === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
          <div>
            <label>
              <strong>Atendimento Educacional Especializado (AEE): </strong>
              {element.aee === "1" ? "Possui" : "Não possui"}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Details;
