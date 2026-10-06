"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import ChatList from "@/components/chatList"
import * as fetch from "@/hooks/fetch.js"
import Newpopup from '@/components/newpopup';

export default function ChatPage() {
const [open1,setOpen1]=useState(false)
const [open2,setOpen2]=useState(false)

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



const router=useRouter()
const searchParams = useSearchParams();
const userE = searchParams.get("usuario")

useEffect(()=>{
    console.log("PRIMER USEFFECT CORRIENDO")

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
  if (!loading) {
    return
  }
  console.log("SEGUNDO USEFFECT CORRIENDO")
  console.log(grupos)
  console.log(chats)
  setset() 
  console.log(chats)

 if (chats.length != grupos.length){
    console.log("true")
    console.log(grupos)
    grupos.map((grupo,i)=>{
      console.log(i)
        fetch.getGrupoPorID(grupo.grupo_id)
        .then((data)=>{ 
              console.log(data[0])

              setChats((prev)=>[...prev,data[0]])
            if (i == grupos.length - 1) {
              setLoading(false)
            }    
        }).then(()=>{
          console.log(chats)
          })
    })
  }
  
},[grupos,loading])


useEffect(()=>{
  console.log("usc")
console.log(groupMembers)
},[groupMembers])



function setset(){setChats([])
}



function creacionChat(single){
  if(single){
    let gruposEX;
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
          .then((data)=>{
            console.log(data)
            gruposEX=data
          })
          .then(()=>{
            fetch.unirAlChat({email:userE,grupo_id:gruposEX})
          })
          .then(()=>{
            fetch.unirAlChat({email:newChat,grupo_id:gruposEX})
              setNewChat("")
              console.log('chat set')
              setOpen1(false)
              setLoading(true)
          
            
            })
  
          
  
        }
      })
    
  }else{
    if(groupName && groupMembers.length!=0){
      let gruposEX;
      let dd;
        dd= {nombre:groupName,foto:"/default.png"}
        console.log("Datos mandados al fetch:")
        console.log(dd)
        fetch.crearChat(dd)
        .then((data)=>{
          gruposEX=data
          console.log('adduser')
          fetch.unirAlChat({email:userE,grupo_id:gruposEX})
          .then(
              console.log('then'),
              groupMembers.map((member,i) =>{
              console.log('map')
              fetch.unirAlChat({email:member,grupo_id:gruposEX})
                if (i==groupMembers.length-1){
                  console.log("creacion terminada")
                  setNewMember(""),
                  setGroupMembers([]),
                  setGroupName("")
                  setOpen2(false)
                  setLoading(true)
                }
              }
            )
            )

        }
        )
        
    }else{
      setMensajeError("Rellene todos los campos")
    }
  }
}



function addNewMember(){
  if (newMember && newMember!=userE && !groupMembers.includes(newMember)){

    fetch.getUsuarioporEmail(newMember)
    .then((data) =>{
     if (!data || data.length===0){
      console.log(data)
              setMensajeError("Error, usuario no existe")
              console.log("Error, usuario no existe")
              return
    }else{
      console.log(newMember)
      console.log(groupMembers)
      setMensajeError("")
      setGroupMembers((prev) => 
        [...prev,newMember]
      )
    }
    }
    )

  }else{
    setMensajeError('Dato inválido')
  }

}

function selectChat(chatind){
  router.push(`/IndChat?chat=${grupos[chatind].grupo_id}&usuario=${userE}`)
}



  return (
    <>

    {(loading)?(<h1>Cargando....</h1>):
    (
        (error)?
        (<h1>Hubo un error</h1>):
        ( <>
          <header>
          <p>Usuario: {usuario.nombre}</p>
          <img src={usuario.foto_perfil}></img>
          </header>
          
           <ChatList chats={chats} selectChat={selectChat}></ChatList>
           
          <Newpopup triggertext={"Nuevo chat"} open={open1} setOpen={setOpen1}>
          <h1>Ingresar el email del usuario</h1>
          <input placeholder="ejemplo@gmail.com" type="text" onChange={(event)=>{setNewChat(event.target.value)}} value={newChat}></input>
          
          <br></br>
          <p>{mensajeError}</p>
          <button onClick={()=>{creacionChat(true)}}>Crear Chat</button>
           <br></br>
           </Newpopup>

          <Newpopup triggertext={"Nuevo grupo"} open={open2} setOpen={setOpen2}>
          <h2>Nuevo grupo</h2>
          <input placeholder="Nombre del grupo" type="text" onChange={(event)=>{setGroupName(event.target.value)}} value={groupName}></input>
          <p>Ingresar el email de los miembros</p>
          <input placeholder="ejemplo@gmail.com" type="text" onChange={(event)=>{setNewMember(event.target.value)}} value={newMember}></input>
          <br></br>

          {(groupMembers) ? 
          //añadir un mejor render para groupmemeçbers
          (<p>{groupMembers}</p>):
          (<p>No hay miembros añadidos</p>)}
          <p>{mensajeError}</p>

          <button onClick={()=>{addNewMember()}}>Añadir miembro</button>
          <button onClick={()=>{creacionChat(false)}}>Crear Chat</button>

           <br></br>
           </Newpopup>

           </>)
          
         
          
    
    )}
    </>
  );
}
