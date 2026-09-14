"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as fetch from "@/hooks/fetch.js"
export default function HomePage() {
const [us,setUs]=useState()
const [loading, setLoading] = useState(true);

useEffect(()=>{
  fetch.getMensajes()
  .then((data)=>{
    console.log(data)
    setUs(data)
    setLoading(false)
  })
},[loading])

  return (
    <>
    <p>AAAA</p>
    <p></p>
    {(loading)?(<p>cargando..</p>):(<p>{JSON.stringify(us,null,2)}</p>)}
    <button onClick={()=>{fetch.crearMensaje({contenido: "hola soy del fetch",email:"a@gmail.com",grupo_id:1}).then(()=>(setLoading(true)))}}></button>
    </>
  );
}
