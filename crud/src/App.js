import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Books from './pages/Books';
import Add from './pages/Add';
import Edit from './pages/Edit';


function App() {
  return (
   <Router>
     <Routes>
       <Route path='/' element={<Books/>}/>
       <Route path='/Add' element={<Add/>}/>
       <Route path='/Edit/:id' element={<Edit/>}/>
     </Routes>
   </Router>
  );
}

export default App;
