"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {

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
