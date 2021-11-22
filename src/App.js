import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';

// Revisar si el usuario ha iniciado o no la sesión
import firebaseApp from './credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(firebaseApp);


function App(){

const [usuarioGlobal, setUsuarioGlobal] = useState(null);

onAuthStateChanged(auth,(usuarioFirebase) => {
    if (usuarioFirebase) {
        // Codígo en caso de que haya sesión iniciada
        setUsuarioGlobal(usuarioFirebase);
    } else {
        // Codígo en caso de que no haya sesión iniciada
        setUsuarioGlobal(null);
    }


})

    return <> {usuarioGlobal ? <Home correoUsuario ={usuarioGlobal.email}/> : <Login/>} </>
}
export default App;