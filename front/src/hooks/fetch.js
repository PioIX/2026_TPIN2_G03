"use client"
import { useState, useEffect } from 'react';

export function getUsuarios(){
    let res={}
       return fetch('http://localhost:4000/usuarios')
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            res=data.message
           
    });
}

//hace falta arreglar los otros fetch 
export function getUsuarioporEmail(email){
    const [res,setRes]=useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/usuarios?email=${email}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setRes(data.mensaje);
            return res;
    });
    }, []);
}
export function getUsuariosPorNombre(nombre){
    const [res,setRes]=useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/usuarios?nombre=${nombre}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setRes(data.mensaje);
            return res;
    });
    }, []);
}
export function getGrupos(){
const [res,setRes]=useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/grupos`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setRes(data.mensaje);
            return res;
    });
    }, []);
}
export function getGrupoPorID(id){
const [res,setRes]=useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/grupos?id=${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setRes(data.mensaje);
            return res;
    });
    }, []);
}
export function getGruposPorNombre(nombre){
    const [res,setRes]=useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/grupos?nombre=${nombre}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setRes(data.mensaje);
            return res;
    });
    }, []);

}
export function getUsuariosEnGrupo(){
const [res,setRes]=useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/usuariosengrupo`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setRes(data.mensaje);
            return res;
    });
    }, []);
}
export function getMiembrosDeGrupo(grupo_id){
const [res,setRes]=useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/usuariosengrupo?grupo_id=${grupo_id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setRes(data.mensaje);
            return res;
    });
    }, []);
}
export function getGruposDeUsuario(email){
    const [res,setRes]=useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/usuariosengrupo?email=${email}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setRes(data.mensaje);
            return res;
    });
    }, []);

}
export function getMensajes(){
     const [res,setRes]=useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/mensajes`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setRes(data.mensaje);
            return res;
    });
    }, []);
}
export function getMensajesPorID(id){
  const [res,setRes]=useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/mensajes?id=${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setRes(data.mensaje);
            return res;
    });
    }, []);
}
export function getMensajesPorContenido(contenido){
  const [res,setRes]=useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/mensajes?contenido=${contenido}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setRes(data.mensaje);
            return res;
    });
    }, []);
}
export function getMensajesPorUsuario(email){
  const [res,setRes]=useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/mensajes?email=${email}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setRes(data.mensaje);
            return res;
    });
    }, []);
}
export function getMensajesPorGrupo(grupo_id){
  const [res,setRes]=useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/mensajes?grupo_id=${grupo_id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setRes(data.mensaje);
            return res;
    });
    }, []);
}









