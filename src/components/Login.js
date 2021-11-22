
import React, {useState} from 'react';
import { Container, Form, Stack, Button } from 'react-bootstrap';

// Importar Firebase
import firebaseApp from '../credenciales';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    // Para iniciar sesión con Google
    signInWithRedirect,
    GoogleAuthProvider
    
    } from 'firebase/auth';

//Asignando metodo de autenticación a una constante auth
const auth = getAuth(firebaseApp);

// Constante que obtendra los datos de google
const googleProvider = new GoogleAuthProvider();


const Login = () => {

const [estaRegistrandose, setEstaRegistrandose] = useState(false);

async function submitHandler(e){
    e.preventDefault();
    const correo = e.target.formBasicEmail.value;
    const contra = e.target.formBasicPassword.value;
    
    //Mandamos los datos a Firebase para la autenticación
    if(estaRegistrandose){
        const usuario = await createUserWithEmailAndPassword(auth, correo, contra);
        console.log(usuario);
    } else {
        const sesion = signInWithEmailAndPassword(auth, correo, contra);
        console.log(sesion);
    }
    

    
}




    return ( 
    <Container>
        <Stack gap={3}>
            <h1>{estaRegistrandose ? "Registrate" : "Inicia Sesión"}</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" style={{ width: "300px" }} />
            <Form.Text className="text-muted">
            
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" style={{ width: "300px" }}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Desea recordar credenciales?" />
        </Form.Group>
        <Button variant="primary" type="submit">
            {estaRegistrandose ? "Registrate" : "Inicia Sesión"}
        </Button>
        </Form>


        <Button 
            variant="primary"
            type="submit"
            style={{ width: "300px" }}
            onClick={() => signInWithRedirect(auth, googleProvider)}
        >
            Acceder con Google
        </Button>


        <Button 
            variant="primary"
            style={{ width: "300px" }} 
            onClick={ () => setEstaRegistrandose(!estaRegistrandose)}>
            {estaRegistrandose ? "¿Ya tienes cuenta? Inicia Sesión" : "¿No tienes cuenta? Registrate" }
        </Button>


        </Stack>
    </Container>
    
    
    
    );
}
 
export default Login;