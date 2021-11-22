import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';



function App(){

const [usuarioGlobal, setUsuarioGlobal] = useState(null);

    return <> {usuarioGlobal ? <Home/> : <Login/>} </>
}
export default App;