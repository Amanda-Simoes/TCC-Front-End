import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const getResult = async () => {
      try {
        const reqResult = await axios.post(
          "http://localhost:3000/app/escolas",
          {
            uf: "PB",
            fund_ai: "Sim",
            fund_af: "Não",
            // dependencia: "Estadual",
            // localizacao: "Rural",
            // auditorio: "Sim",
          }
        );
        console.log(reqResult);
        setResult(reqResult.data);
      } catch (err) {
        setResult(err.response.data);
        console.log(err.response);
      }
    };
    getResult();
  }, []);

  return (
    <div>
      {typeof result === "string"
        ? result
        : result.map((element) => <div>{element.nome_escola}</div>)}
    </div>
  );
}

export default App;
