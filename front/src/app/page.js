"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as fetch from "@/hooks/fetch.js"
export default function HomePage() {
const [us,setUs]=useState()
const [loading, setLoading] = useState(true);

  function redirigirLI() {
    window.location.href='/login'
  }
  function redirigirSU() {
    window.location.href='/signup'
  }

  return (
    <>
      <button onClick={redirigirLI}>LOG IN</button>
      <button onClick={redirigirSU}>SIGN UP</button>
    </>
  );
}
