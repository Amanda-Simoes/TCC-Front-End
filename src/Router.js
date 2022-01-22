import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Escolas from './Componentes/Escolas'
import Details from './Componentes/Detalhes'
import Comparacao from './Componentes/Comparação'
import Ranking from './Componentes/Ranking'

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/escolas' element={ <Escolas /> } />
                <Route path='/detalhe/:id' element={ <Details /> } />
                <Route path='/comparacao' element={ <Comparacao /> } />
                <Route path='/ranking-escolas' element={ <Ranking /> } />
            </Routes>
        </BrowserRouter>
    )
  }
  
  export default Router