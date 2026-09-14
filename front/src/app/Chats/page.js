"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import chatList from "@/components/chatList";
import { useFormState } from "react-dom";
import * as fetch from "@/hooks/fetch.js"

export default function ChatPage() {
    
const [error,setError]=useState(false)
const [usuario,setUsuario]=useState({})
const [loading,setLoading]=useState(false)

const searchParams = useSearchParams();
const userE = searchParams.get("usuario")

useEffect(()=>{
    if(!searchParams.has("usuario")){setError(true)}
    else{
        fetch.getUsuarioporEmail("userE")
        .then((data)=>{
        console.log(data)
        setUsuario(data)
        setLoading(false)
      })
    }
},[])

  return (
    <>
    {(error)?(<h1>Hubo un error</h1>):
    (
        <chatList></chatList>
    )}
    </>
  );
}
