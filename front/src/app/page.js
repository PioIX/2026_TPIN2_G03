"use client"

import { useSearchParams} from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as fetch from "@/hooks/fetch.js"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [mensajeCorreo, setMensajeCorreo] = useState("")
  const [mensajeClave, setMensajeClave] = useState("")
  const [mensajeUsuario, setMensajeUsuario] = useState("")
  const [mensajeTelefono, setMensajeTelefono] = useState("")
  const [mensajePfp, setMensajePfp] = useState("")
  const [correo, setCorreo] = useState("");
  const [clave, setclave] = useState("");
  const [usuario, setUsuario] = useState("")
  const [pfp, setPfp] = useState("default.png")
  const [telefono, setTelefono] = useState("")
  const [arrayUsuarios, setArrayUsuarios] = useState([])
  const router = useRouter();

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
        return true
      }
    }
    console.log("No hay un mail igual")
    return false
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
  

  function SesionValida() {
    for (i=0;i<arrayUsuarios.length;i++) {
      if (arrayUsuarios[i].email == correo && arrayUsuarios[i].contrasena == clave) {
        console.log("Sesion valida")
        return(true)
      }
    }
    console.log("Sesion invalida")
    return(false)
  }

  const userLogged = () => {
    router.push(`/chats?usuario=${correo}`);
  };

  function enviarSign(event) {
    /* mensajes*/
    if (clave == "") {
      setMensajeClave("no valido")
    } else {
      setMensajeClave("valido")
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
    if (pfp == "pfp1.png" || pfp == "pfp2.png" || pfp == "pfp3.png" || pfp == "pfp4.png" || pfp == "default.png") {
      setMensajePfp("valido")
    } else {
      setMensajePfp("no valido")
    }
    /* comprobacion para el post*/
    if (telefono !== "" && IncluyeTelefono() == false && usuario !== "" && clave !== "" && correo !== "" && IncluyeCorreo() == false && mensajePfp == "valido"){
      fetch.registro({email: correo, nombre: usuario, numero: telefono, contrasena: clave, foto_perfil: pfp})
      userLogged()
    }
  }

  function enviarLogin() {
    if (IncluyeCorreo() == false) {
      setMensajeCorreo("Correo no registrado.")
    } else {
      setMensajeCorreo("Correo encontrado.")
    }
    if (SesionValida() == true) {
      setMensajeClave("Contraseña correcta.")
      userLogged()
    } else {
      setMensajeClave("Contraseña incorrecta.")
    }
  }






  return (
    <>
      <input placeholder="Establezca un correo electronico" value={correo} onChange={(event)=>{setCorreo(event.target.value)}}></input>
      <p>{mensajeCorreo}</p>
      <input placeholder="Establezca una contraseña" value={clave} onChange={(event)=>{setclave(event.target.value)}}></input>
      <p>{mensajeClave}</p>
      <input placeholder='Establezca un numero telefonico' value={telefono} onChange={(event)=>{setTelefono(event.target.value)}}></input>
      <p>{mensajeTelefono}</p>
      <input placeholder="Establezca un nombre de usuario" value={usuario} onChange={(event)=>{setUsuario(event.target.value)}}></input>
      <p>{mensajeUsuario}</p>
      <input placeholder="Establezca una foto de perfil segun su numero" value={pfp} onChange={(event)=>{setPfp(event.target.value)}}></input>
      <p>{mensajePfp}</p>

      <div>
        <div>
          <img src='pfp1.png'></img>
          <p>pfp1.png</p>
        </div>
        <div>
          <img src='pfp2.png'></img>
          <p>pfp2.png</p>
        </div>
        <div>
          <img src='pfp3.png'></img>
          <p>pfp3.png</p>
        </div>
        <div>
          <img src='pfp4.png'></img>
          <p>pfp4.png</p>
        </div>
      </div>

      <button onClick={enviarSign}>REGISTRAR</button>
      <button onClick={enviarLogin}>LOGUEAR</button>
    </>
  );
}
