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

    useEffect(()=>{

    },[])

    useEffect(()=>{
    if (!socket) return;
    console.log("Web socket conectado")

     socket.on("pingAll", (data) => {
            console.log(data);
            setMensajes(prev => [...prev,data])
        });

        socket.on("emitcontador",(data)=>{
            console.log(data)
            setContador(data.contador)
        });
    },[socket])

    return(
        <>
        <h1>Hola soy el chat</h1>
        <p>{chat}</p>
        {(isConnected)?
        (<p>Socket conectado</p>):
        (<p>Socket desconectado</p>)
        }
         <button onClick={()=>{socket.emit("pingAll", { msg: "Hola desde mi compu" })}}>Enviar ping a todos</button>
        </>
    )
}