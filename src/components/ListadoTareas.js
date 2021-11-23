import React from 'react';
import { Container, Stack, Row, Button, Col, Image} from 'react-bootstrap';

import firebaseApp from '../credenciales';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
const firestore = getFirestore(firebaseApp);


const ListadoTareas = ({arrayTareas, correoUsuario, setArrayTareas}) => {

    async function eliminarTarea(idTareaAEliminar){
        // Crear nuevo array de tareas excluyendo la tarea que necesitamos eliminar por su id
        const nuevoArrayTareas = arrayTareas.filter(
            (objetoTarea) => objetoTarea.id !== idTareaAEliminar
        );
        // Actualizar la base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, {tareas: [...nuevoArrayTareas]});
        // Actualizar state
        setArrayTareas(nuevoArrayTareas);


    }



    return ( 
    <Container>
        <Stack>
        {arrayTareas.map((objetoTarea)=>{
            return(
                <>
                <Row>
                    <Col>{objetoTarea.descripcion}</Col>
                    <Col>
                    <a href={objetoTarea.url} target="_blank">
                        <Button variant="secondary">Ver Archivo</Button>
                    </a>
                        
                    </Col>

                    <Col>
                        <Button onClick={() => eliminarTarea(objetoTarea.id)} variant="danger">Eliminar Tarea</Button>
                    </Col>
                    
                </Row>
                <hr/>
                </>
            )
        })}

        </Stack>
    </Container>
    
    );
}
 
export default ListadoTareas;