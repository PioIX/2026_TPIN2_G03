'use client'

import { useEffect, useState } from 'react';
import * as fetch from "@/hooks/fetch.js"

export default function SignupPage() {
    const [mensajeCorreo, setMensajeCorreo] = useState("")
    const [mensajeContrasena, setMensajeContrasena] = useState("")
    const [mensajeUsuario, setMensajeUsuario] = useState("")
    const [mensajeTelefono, setMensajeTelefono] = useState("")
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [usuario, setUsuario] = useState("")
    const [pfp, setPfp] = useState("")
    const [telefono, setTelefono] = useState("")
    const [arrayUsuarios, setArrayUsuarios] = useState([])

    let i = 0

    useEffect(()=>{
        fetch.getUsuarios()
        .then((data)=>{
            setArrayUsuarios(data)
        })
    }, [])

    useEffect(()=>{
        console.log(arrayUsuarios)
    }, [arrayUsuarios])

    function IncluyeCorreo() {
        for (i=0;i<arrayUsuarios.length;i++) {
            if (arrayUsuarios[i].email.includes(correo) == true) {
                console.log("Hay un mail igual")
                return(true)
            } else{
                console.log("No hay un mail igual")
                return(false)
            }
        }
    }

    function IncluyeTelefono() {
        for (i=0;i<arrayUsuarios.length;i++) {
            if (Array(String(arrayUsuarios[i].numero)).includes(String(telefono)) == true) {
                console.log("Hay un numero igual")
                return(true)
            } else{
                console.log("No hay un numero igual")
                return(false)
            }
        }
    }

    function enviarSign(event) {
        /* mensajes*/
        if (contrasena == "") {
            setMensajeContrasena("no valido")
        } else {
            setMensajeContrasena("valido")
        }
        if (correo == "" || IncluyeCorreo() == true) {
            setMensajeCorreo("no valido")
        } else {
            setMensajeCorreo("valido")
        }
        if (telefono == "" || IncluyeTelefono() == true) {
            setMensajeTelefono("no valido")
        } else {
            setMensajeTelefono("valido")
        }
        if (usuario == "") {
            setMensajeUsuario("no valido")
        } else {
            setMensajeUsuario("valido")
        }
        /* pfp*/
        if (pfp == ""){
            setPfp("default.png")
        } else if (pfp == "1") {
            setPfp("pfp1.png")
        } else if (pfp == "2") {
            setPfp("pfp2.png")
        } else if (pfp == "3") {
            setPfp("pfp3.png")
        } else if (pfp == "4") {
            setPfp("pfp4.png")
        }
        /* comprobacion para el post*/
        if (telefono !== "" && IncluyeTelefono() == false && usuario !== "" && contrasena !== "" && correo !== "" && IncluyeCorreo() == false){
            //aca con post a la BDD
        }
    }

    return (
        <>
            <input placeholder="Establezca un correo electronico" value={correo} onChange={(event)=>{setCorreo(event.target.value)}}></input>
            <p>{mensajeCorreo}</p>
            <input placeholder="Establezca una contraseña" value={contrasena} onChange={(event)=>{setContrasena(event.target.value)}}></input>
            <p>{mensajeContrasena}</p>
            <input placeholder='Establezca un numero telefonico' value={telefono} onChange={(event)=>{setTelefono(event.target.value)}}></input>
            <p>{mensajeTelefono}</p>
            <input placeholder="Establezca un nombre de usuario" value={usuario} onChange={(event)=>{setUsuario(event.target.value)}}></input>
            <p>{mensajeUsuario}</p>
            <input placeholder="Establezca una foto de perfil segun su numero" value={pfp} onChange={(event)=>{setPfp(event.target.value)}}></input>

            <div>
                <div>
                    <img src='pfp1.png'></img>
                    <p>1</p>
                </div>
                <div>
                    <img src='pfp2.png'></img>
                    <p>2</p>
                </div>
                <div>
                    <img src='pfp3.png'></img>
                    <p>3</p>
                </div>
                <div>
                    <img src='pfp4.png'></img>
                    <p>4</p>
                </div>
            </div>

            <button onClick={enviarSign}>REGISTRAR</button>
        </>
    )
}