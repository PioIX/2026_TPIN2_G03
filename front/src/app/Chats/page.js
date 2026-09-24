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
const [newMember,setNewMember]=useState("")
const [groupName,setGroupName]=useState("")
const [mensajeError,setMensajeError]=useState("")


const [groupMembers,setGroupMembers]=useState([])




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

//arreglar useffect corriendo dos veces
useEffect(()=>{
  console.log(grupos)
  console.log(chats)
  setset() 
 if (chats.length != grupos.length){
    console.log("true")
    grupos.map((grupo)=>{
        fetch.getGrupoPorID(grupo.grupo_id)
        .then((data)=>{ 
              console.log(data[0])
              setChats((prev)=>[...prev,data[0]])
        })
    })
  console.log(chats)
  setLoading(false)
  }else{
  console.log(chats)
  setLoading(false)
  }
  
},[grupos,loading])

function setset(){setChats([])
}



function creacionChat(single){
  if(single){
    let gruposEX;
    fetch.getGrupos()
    .then((data)=>{
      console.log(data)
      gruposEX=data.length
    }).then(

      fetch.getUsuarioporEmail(newChat)
      .then((data)=>{
        console.log(data[0])
        if (!data || data.length===0){
          setMensajeError("Error, no hay datos o datos incorrectos")
          console.log("Error, no hay datos o datos incorrectos")
          return
        }else{
          setMensajeError("")
          let dd= {nombre:`${data[0].nombre} y ${usuario.nombre}`,foto:"/default.png"}
          console.log("Datos mandados al fetch:")
          console.log(dd)
          fetch.crearChat(dd)
          .then(
            fetch.unirAlChat({email:userE,grupo_id:gruposEX+1})
            
            .then(
              
            fetch.unirAlChat({email:newChat,grupo_id:gruposEX+1})
  
            ).then(
              setNewChat("")
              //recargar o cerrar popup
            )
            
  
          )
  
        }
      })
    )
  }else{
    let gruposEX;
    let dd;
    fetch.getGrupos()
    .then((data)=>{
      console.log(data)
      gruposEX=data.length
    }).then(
      dd= {nombre:groupName,foto:"/default.png"},
      console.log("Datos mandados al fetch:"),
      console.log(dd),
      fetch.crearChat(dd)
      .then(fetch.unirAlChat({email:userE,grupo_id:gruposEX+1}))
      
    ).then(
        groupMembers.map(member =>{
          fetch.unirAlChat({email:member,grupo_id:gruposEX+1})
        })

      ).then(
        setNewMember(""),
        setGroupMembers([]),
        setGroupName("")
        //cerrar popup o recargar
 
      )
  
  }
}



function addNewMember(){
fetch.getUsuarioporEmail(newMember)
.then((data) =>{
 if (!data || data.length===0){
          setMensajeError("Error, usuario no existe")
            console.log("Error, usuario no existe")
            return
}
}
).then(
  setGroupMembers((prev) => {
    setMensajeError(""),
    [...prev,newMember]
  })
)
}
  return (
    <>
    {(loading)?(<h1>Cargando....</h1>):
    (
        (error)?
        (<h1>Hubo un error</h1>):
        ( <>
           <ChatList chats={chats}></ChatList>
           
          <Newpopup triggertext={"Nuevo chat"}>
          <h1>Ingresar el email del usuario</h1>
          <input placeholder="ejemplo@gmail.com" type="text" onChange={(event)=>{setNewChat(event.target.value)}} value={newChat}></input>
          
          <br></br>
          <p>{mensajeError}</p>
          <button onClick={()=>{creacionChat(true)}}>Crear Chat</button>
           <br></br>
           </Newpopup>

          <Newpopup triggertext={"Nuevo grupo"}>
          <input placeholder="Nombre del grupo" type="text" onChange={(event)=>{setGroupName(event.target.value)}} value={groupName}></input>
          <h1>Ingresar el email de los miembros</h1>
          <input placeholder="ejemplo@gmail.com" type="text" onChange={(event)=>{setNewMember(event.target.value)}} value={newMember}></input>
          <br></br>

          {(groupMembers) ? 
          (<p>groupMembers</p>):
          (<p>No hay miembros añadidos</p>)}
          <p>{mensajeError}</p>

          <button onClick={()=>{addNewMember()}}>Añadir</button>
          <button onClick={()=>{creacionChat(false)}}>Crear Chat</button>

           <br></br>
           </Newpopup>
           
           </>)
          
         
          
    
    )}
    </>
  );
}
