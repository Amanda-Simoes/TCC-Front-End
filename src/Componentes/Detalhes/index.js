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
    </div>
  );
}

export default Details;
