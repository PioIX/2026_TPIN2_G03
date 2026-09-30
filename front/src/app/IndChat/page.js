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

    },[socket])

    return(
        <>
        <h1>Hola soy el chat</h1>
        <p>{chat}</p>
        </>
    )
}