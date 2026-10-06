"use client"
import { useState, useEffect } from 'react';
import { Suspense } from 'react'
import io from 'socket.io-client';
import { useSearchParams } from "next/navigation"
import * as fetch from "@/hooks/fetch.js"
import useSocket from '@/hooks/useSocket';
import { useFormState } from 'react-dom';
import Messages from '@/components/Messages';

export default function IndChatPage() {
    const { socket, isConnected } = useSocket();
    const searchParams = useSearchParams()
    const chat = searchParams.get("chat");
    const [inRoom, setInRoom] = useState(false)
    const [newMsg, setNewMsg] = useState("")
    const [msgHistory, setMsgHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [miembrosJSX, setMiembrosJSX] = useState([])
    const userE = searchParams.get("usuario")



    useEffect(() => {
        fetch.getMensajesPorGrupo(chat)
            .then((data) => {
                setMsgHistory(data)
            })
            .then(
                fetch.getMiembrosDeGrupo(chat)
                .then((data)=>{
                    console.log("aaaaaaaaaaa")
                    console.log(data)
                    let aux= data.map((miembro,i)=>(
                            <p key={i}>{miembro.email}</p>
                        ))
                    console.log(aux)
                    setMiembrosJSX(aux)
                })
                .then(
                setLoading(false)
                )
            )
        
    }, [])

    useEffect(() => {
        if (!socket) return;
        console.log("Web socket conectado")
        if (!inRoom) {
            socket.emit("joinRoom", { room: chat })
            setInRoom(true)
            console.log("Room: " + chat)
        }


        socket.on("pingAll", (data) => {
            console.log(data);

        });

        socket.on("inf", (data) => {
            console.log(data)


        });
        socket.on("newMessage", (data) => {
            console.log(data)
            console.log(msgHistory)
            setMsgHistory((prev) => { return [...prev, { contenido: data.message, email: data.email, grupo_id: data.room }] })
            setNewMsg("")
            console.log({ contenido: data.message, email: data.email, grupo_id: data.room })


        });
    }, [socket])

   
    return (
        <>
            {(loading) ? (
                <h1>Cargando...</h1>
            ) : (
                <>

                    <h2>Usuarios en el chat:</h2>
                    {miembrosJSX}
                    {(isConnected) ?
                        (<>

                            <h2>Historial del chat:</h2>
                            <Suspense fallback={<div>Cargando mensajes...</div>}>
                                <Messages msgArray={msgHistory} />
                            </Suspense>

                            <input onChange={(e) => { setNewMsg(e.target.value) }} value={newMsg}></input>
                            <button onClick={() => { socket.emit("sendMessage", { message: newMsg, email: userE }); fetch.crearMensaje({ grupo_id: chat, email: userE, contenido: newMsg }); }}>Enviar mensaje</button>
                        </>
                        ) :
                        (<p>Socket desconectado</p>)

                    }
                </>

            )}
        </>
    )
}