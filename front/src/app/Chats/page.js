"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import ChatList from "@/components/chatList"
import { useFormState } from "react-dom";
import * as fetch from "@/hooks/fetch.js"

export default function ChatPage() {
    
const [error,setError]=useState(false)
const [usuario,setUsuario]=useState({})
const [loading,setLoading]=useState(true)
const [chats,setChats]=useState([])
const [grupos,setGrupos]=useState([])

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
let ch=[]
grupos.map((grupo)=>{
    fetch.getGrupoPorID(grupo.grupo_id)
    .then((data)=>{
        ch.push(data[0])
        console.log(data[0])
    })
})

console.log(ch)
setChats(ch)
setLoading(false)
},[grupos,loading])

  return (
    <>
    {(loading)?(<h1>Cargando....</h1>):
    (
        (error)?
        (<h1>Hubo un error</h1>):
        ( <>
           <ChatList chats={chats}></ChatList>
           <button>Crear nuevo chat</button>
           <button>Crear nuevo grupo</button>
     
           </>)
          
         
          
    
    )}
    </>
  );
}
