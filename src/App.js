import React from 'react'; 
import Header from '../src/components/header/header'; 
import Routes from './routes';  
import "./components/FontAwesomeIcons";

function App() { 
  return ( 
    <div className="App"> 
      <Header /> 
      <Routes /> 
    </div> 
  ); 
} 
 
export default App; 