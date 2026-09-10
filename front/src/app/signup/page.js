'use client'

import { useState } from 'react';

export default function SignupPage() {

    const [mensajeCorreo, setMensajeCorreo] = useState("")
    const [mensajeContrasena, setMensajeContrasena] = useState("")
    const [mensajeUsuario, setMensajeUsuario] = useState("")
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [usuario, setUsuario] = useState("")
    const [pfp, setPfp] = useState("no ha cargado imagenes")

    function enviarSign(event) {
        if (contrasena == "") {
            setMensajeContrasena("no valido")
        } else {
            setMensajeContrasena("valido")
        }
        if (correo == "" /*|| llamar a la funcion para que corrobore que no esta repetido el mail*/) {
            setMensajeCorreo("no valido")
        } else {
            setMensajeCorreo("valido")
        }
        if (usuario == "") {
            setMensajeUsuario("no valido")
        } else {
            setMensajeUsuario("valido")
        }
        if (pfp !== "" && usuario !== "" && contrasena !== "" && correo !== "" /*&& llamar a la funcion para que corrobore que no esta repetido el mail*/){
            //aca con post a la BDD
        }
    }

    return (
        <>
            <input placeholder="Establezca un correo electronico" value={correo} onChange={(event)=>{setCorreo(event.target.value)}}></input>
            <p>{mensajeCorreo}</p>
            <input placeholder="Establezca una contraseña" value={contrasena} onChange={(event)=>{setContrasena(event.target.value)}}></input>
            <p>{mensajeContrasena}</p>
            <input placeholder="Establezca un nombre de usuario" value={usuario} onChange={(event)=>{setUsuario(event.target.value)}}></input>
            <p>{mensajeUsuario}</p>
            <input type="file" placeholder="Establezca una foto de perfil" value={pfp} onChange={(event)=>{setPfp(event.target.value)}}></input>
            <p>{pfp}</p>

            <button onClick={enviarSign}>REGISTRAR</button>
        </>
    )
}