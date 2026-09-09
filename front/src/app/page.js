"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {getUsuarios} from "@/hooks/fetch.js"
export default function HomePage() {
const [us,setUs]=useState()
const [loading, setLoading] = useState(true);

useEffect(()=>{
  getUsuarios()
  .then((data)=>{
    setUs(data)
    setLoading(false)
  })
},[])

  return (
    <>
    <p>AAAA</p>
    <p></p>
    {(loading)?(<p>cargando..</p>):(<p>{}</p>)}
    </>
  );
}
