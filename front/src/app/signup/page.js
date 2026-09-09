'use client'

import { useState } from 'react';

export default function SignupPage() {

    const [mensaje, setMensaje] = useState("")
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    function enviarSign(event) {
        //aca con post a la BDD
        //comrpobar info
        if (contrasena == "" && correo == "" || contrasena == "" /*&& llamar a la funcion para que corrobore que no esta repetido el mail*/){
            setMensaje("no valido")
            console.log("el mensaje esta vacio")
        } else {
            setMensaje("valido")
            /*post de correo*/
        }
    }

    function mailSign() {
    }

    return (
        <>
            <input placeholder="Establezca un correo electronico" value={correo} onChange={(event)=>{setCorreo(event.target.value)}}></input>
            <p>{mensaje}</p>
            <input placeholder="Establezca una contraseña" value={contrasena} onChange={(event)=>{setCorreo(event.target.value)}}></input>
            <p>{mensaje}</p>

            <button onClick={enviarSign}>REGISTRAR</button>
        </>
    )
}