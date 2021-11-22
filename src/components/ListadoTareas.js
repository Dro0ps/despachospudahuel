import React from 'react';
import { Container, Stack, Row, Button, Col, Image} from 'react-bootstrap';


const ListadoTareas = ({arrayTareas}) => {
    return ( 
    <Container>
        <Stack>
        {arrayTareas.map((objetoTarea)=>{
            return(
                <>
                <Row>
                    <Col>{objetoTarea.descripcion}</Col>
                    <Col><Button>Ver Archivo</Button></Col>
                    <Col><Button>Eliminar Tarea</Button></Col>
                    <Col>{objetoTarea.url}</Col>
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