import React, {useState, useEffect} from 'react';
import ListadoTareas from './ListadoTareas';
import AgregarTareas from './AgregarTareas';

// importando Firebase
import firebaseApp from '../credenciales';
import {getAuth, signOut} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';




import { Container, Button } from 'react-bootstrap';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);



const Home = ({correoUsuario}) => {

    const [arrayTareas, setArrayTareas] = useState(null);

    useEffect(() => {
        async function fetchTareas(){
           const tareasFetchadas = await buscarDocumentoCrearDocumento(correoUsuario);
            setArrayTareas(tareasFetchadas);
        }

        fetchTareas();

    }, []);


    const fakeData = [
        {id: 1, descripcion: "Tarea Falsa 1", url: "https://picsum.photos/420"},
        {id: 2, descripcion: "Tarea Falsa 2", url: "https://picsum.photos/420"},
        {id: 3, descripcion: "Tarea Falsa 3", url: "https://picsum.photos/420"},

    ];

    async function buscarDocumentoCrearDocumento(idDocumento) {
        // Crear una referencia al documento
        const docuRef = doc(firestore, `usuarios/${idDocumento}`);

        // Buscar Documento
        const consulta = await getDoc(docuRef);

        // Revisar si existe
        if(consulta.exists()) {
        // Si existe retorna el documento
            const infoDocu = consulta.data();
            return infoDocu.tareas;
        } else {
        // Si no existe crea un documento
            await setDoc(docuRef, {tareas: [...fakeData]});
        // Una vez creado se realiza la consulta nuevamente
        const consulta = await getDoc(docuRef);
        const infoDocu = consulta.data();
        return infoDocu.tareas;

        }


    }


    return ( 
    <Container>
        <h4>Desde Home</h4>
        <Button
            onClick={() => signOut(auth)}
        >Cerrar sesión</Button>

        <hr/>

        <AgregarTareas
            arrayTareas={arrayTareas}
            setArrayTareas={setArrayTareas}
            correoUsuario={correoUsuario}
        />
        <hr/>

        {arrayTareas ? 
        <ListadoTareas 
            arrayTareas={arrayTareas}
            setArrayTareas={setArrayTareas}
            correoUsuario={correoUsuario}
            
        />: null}
       
    
    
    </Container>
    
    
    );
}
 
export default Home;