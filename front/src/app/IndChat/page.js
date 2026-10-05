"use client"
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSearchParams } from "next/navigation"
import * as fetch from "@/hooks/fetch.js"
import useSocket from '@/hooks/useSocket';
import { useFormState } from 'react-dom';

export default function IndChatPage(){
    const { socket, isConnected } = useSocket();
    const searchParams = useSearchParams()
    const chat = searchParams.get("chat");
    const [inRoom,setInRoom]=useState(false)
    const [newMsg,setNewMsg]=useState("")
    const [msgHistory,setMsgHistory]=useState([])
    const [usuario,setUsuario]=useState({})
    const [loading,setLoading]=useState(true)
    const [msgJSX,setMsgJSX]=useState([])
    const userE = searchParams.get("usuario")



    useEffect(()=>{
            console.log(usuario)
            setNewMsg("")
            if(!usuario.length || !usuario){
                console.log(userE)
                fetch.getUsuarioporEmail(userE)
                .then((data)=>{
                console.log(data[0])
                setUsuario(data[0])
                getMsg()
                })
            }
    },[loading])

    useEffect(()=>{
    if (!socket) return;
    console.log("Web socket conectado")
    if (!inRoom){
        socket.emit("joinRoom",{room:chat})
        setInRoom(true)
        console.log("Room: "+chat)
    }
    

     socket.on("pingAll", (data) => {
            console.log(data);
            
        });

        socket.on("inf",(data)=>{
            console.log(data)
        
          
        });
        socket.on("newMessage",(data)=>{
            setMsgHistory((prev)=>{
                [...prev,{contenido:data.message,email:userE,grupo_id:chat}]
            })
            console.log({contenido:data.message,email:userE,grupo_id:chat})
            console.log(data)
            console.log(data.message)
            console.log(usuario)
            
        });
    },[socket])


    useEffect(()=>{
        console.log("msguf")
        loadMessages()
    },[msgHistory])
    function getMsg(){
        fetch.getMensajesPorGrupo(chat)
        .then((data)=>{
            setMsgHistory(data)
        })
        .then(setLoading(false))
    }

    function loadMessages(){
        if(!msgHistory){return}
        console.log(msgHistory)
        setMsgJSX(msgHistory.map((m,i)=>(
            <p key={i} className="message">{m.email}<br></br>{m.contenido}</p>
        )))
    }
    return(
        <>
        {(loading)?(
            <h1>Cargando...</h1>
        ):(
        <>
        
        <h1>Hola soy el chat</h1>
        <p>{chat}</p>
        {(isConnected)?
        (<>
        <div>
            <h2>Historial del chat:</h2>
            {msgJSX}
        </div>
        <input onChange={(e)=>{setNewMsg(e.target.value)}} value={newMsg}></input>    
        <button onClick={()=>{socket.emit("sendMessage", { message: newMsg });fetch.crearMensaje({grupo_id:chat,email:userE,contenido:newMsg}).then((data)=>{setLoading(true)});}}>Enviar mensaje</button>
        </>
        ):
        (<p>Socket desconectado</p>)
        
        }
        </>

        )}
        </>
    )
}