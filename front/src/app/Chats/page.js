"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import ChatList from "@/components/chatList"
import { useFormState } from "react-dom";
import * as fetch from "@/hooks/fetch.js"
import Newpopup from '@/components/newpopup';

export default function ChatPage() {
    
const [error,setError]=useState(false)
const [usuario,setUsuario]=useState({})
const [loading,setLoading]=useState(true)
const [chats,setChats]=useState([])
const [grupos,setGrupos]=useState([])
const [newChat,setNewChat]=useState("")


const searchParams = useSearchParams();
const userE = searchParams.get("usuario")

useEffect(()=>{
    if(!searchParams.has("usuario")){setError(true); return}
    
    else{
        console.log(userE)
        fetch.getUsuarioporEmail(userE)
        .then((data)=>{
        console.log(data[0])
        setUsuario(data[0])
      })
        fetch.getGruposDeUsuario(userE)
        .then((data)=>{
        console.log(data)
        setGrupos(data)
        })
    }
},[loading])


useEffect(()=>{
  console.log(grupos)
  grupos.map((grupo)=>{
      fetch.getGrupoPorID(grupo.grupo_id)
      .then((data)=>{
          if (data[0].nombre == userE){
              setChats([...chats,otroMiembro(data[0])])
          }else{
            
            console.log(data[0])
            setChats([...chats,data[0]])
          }
      })
  })
  setLoading(false)
},[grupos,loading])


function creacionChat(single){
  if(single){
    fetch.getUsuarioporEmail(newChat)
    .then((data)=>{
      console.log(data[0])
      if (!data || data.length===0){
        console.log("Error, no hay datos o datos incorrectos")
        return
      }else{
        let dd= {nombre:data[0].nombre,foto:data[0].foto_perfil}
        console.log("Datos mandados al fetch:")
        console.log(dd)
        fetch.crearChat(dd)
        .then(
          fetch.unirAlChat()
        )

      }
    })
  }else{
    //falta poder crear grupo y testear creación de chats + fetch post return id de grupo
  }
}



function otroMiembro(grupo){
  fetch.getMiembrosDeGrupo(grupo.id)
  .then((data)=>{
    let otrous = data.filter(miembro => miembro.email!=userE)
    fetch.getUsuarioporEmail(otrous)
    .then((data)=>{
      console.log("Otro usuario")
      console.log(data)
      return data
    })
    

  })
  
}


  return (
    <>
    {(loading)?(<h1>Cargando....</h1>):
    (
        (error)?
        (<h1>Hubo un error</h1>):
        ( <>
           <ChatList chats={chats}></ChatList>
           
           <Newpopup triggertext={"trigger"}>
          <h1>Ingresar el email del usuario</h1>
          <input placeholder="ejemplo@gmail.com" type="text" onChange={(event)=>{setNewChat(event.target.value)}} value={newChat}></input>
          <br></br>

          <button onClick={()=>{creacionChat(true)}}>Crear Chat</button>
           <br></br>
           </Newpopup>
           </>)
          
         
          
    
    )}
    </>
  );
}
