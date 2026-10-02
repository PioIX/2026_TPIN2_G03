"use client"
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSearchParams } from "next/navigation"
import * as fetch from "@/hooks/fetch.js"
import useSocket from '@/hooks/useSocket';

export default function IndChatPage(){
    const { socket, isConnected } = useSocket();
    const searchParams = useSearchParams()
    const chat = searchParams.get("chat");
    const [inRoom,setInRoom]=useState(false)
    const [newMsg,setNewMsg]=useState("")
    const [msgHistory,setMsgHistory]=useState([])
    const [usuario,setUsuario]=useState({})

    const userE = searchParams.get("usuario")



    useEffect(()=>{
            console.log(usuario)
            if(!usuario.length || !usuario){
                console.log(userE)
                fetch.getUsuarioporEmail(userE)
                .then((data)=>{
                console.log(data[0])
                setUsuario(data[0])
                })
            }
    },[])

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
            let name=""
            if (!usuario || !usuario.length){
                fetch.getUsuarioporEmail(userE)
                    .then((user)=>{
                    console.log(user[0])
                    setUsuario(user[0])
                    name=user[0].nombre
                    setMsgHistory((prev)=>{[...prev,{message:data.message,user:name.nombre,timestamp:new Date()}]})
                    console.log({message:data.message,user:name,timestamp:new Date().getTime()})
                    })

            }else{
                name=usuario.nombre
                setMsgHistory((prev)=>{[...prev,{message:data.message,user:name.nombre,timestamp:new Date()}]})
                console.log({message:data.message,user:name,timestamp: new Date().getTime()})
            }
            console.log(data)
            console.log(data.message)
            console.log(usuario)
            
        });
    },[socket])

    return(
        <>
        <h1>Hola soy el chat</h1>
        <p>{chat}</p>
        {(isConnected)?
        (<>
        
        <p>Socket conectado</p>
        <input onChange={(e)=>{setNewMsg(e.target.value)}} value={newMsg}></input>    
        <button onClick={()=>{socket.emit("sendMessage", { message: newMsg }); setNewMsg("")}}>Enviar mensaje</button>

        </>
        ):
        (<p>Socket desconectado</p>)
        
        }
        </>
    )
}