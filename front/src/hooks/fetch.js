"use client"
import { useState, useEffect } from 'react';

export function getUsuarios(){
        return fetch('http://localhost:4000/usuarios')
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            return data.message
    });
}


export function getUsuarioporEmail(email){
   
        return fetch(`http://localhost:4000/usuarios?email=${email}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            return data.message;
    });
}
export function getUsuariosPorNombre(nombre){
  
        return fetch(`http://localhost:4000/usuarios?nombre=${nombre}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            return data.message;
    });
  
}
export function getGrupos(){
  
        return fetch(`http://localhost:4000/grupos`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            return data.message;
    });
  
}
export function getGrupoPorID(id){
  
        return fetch(`http://localhost:4000/grupos?id=${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            return data.message;
    });
  
}
export function getGruposPorNombre(nombre){
  
        return fetch(`http://localhost:4000/grupos?nombre=${nombre}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            return data.message;
    });
  

}
export function getUsuariosEnGrupo(){
  
        return fetch(`http://localhost:4000/usuariosengrupo`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            return data.message;
    });
  
}
export function getMiembrosDeGrupo(grupo_id){
  
        return fetch(`http://localhost:4000/usuariosengrupo?grupo_id=${grupo_id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            return data.message;
    });
  
}
export function getGruposDeUsuario(email){
  
        return fetch(`http://localhost:4000/usuariosengrupo?email=${email}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            return data.message;
    });
  

}
export function getMensajes(){
  
        return fetch(`http://localhost:4000/mensajes`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            return data.message;
    });
  
}
export function getMensajesPorID(id){
  
        return fetch(`http://localhost:4000/mensajes?id=${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            return data.message;
    });
  
}
export function getMensajesPorContenido(contenido){
  
        return fetch(`http://localhost:4000/mensajes?contenido=${contenido}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            return data.message;
    });
  
}
export function getMensajesPorUsuario(email){
  
        return fetch(`http://localhost:4000/mensajes?email=${email}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            return data.message;
    });
  
}
export function getMensajesPorGrupo(grupo_id){
  
        return fetch(`http://localhost:4000/mensajes?grupo_id=${grupo_id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            return data.message;
    });
  
}


export function registro(usuario){
   try {
     fetch('http://localhost:4000/Registro', {
         method: 'POST',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(usuario)
     })
     .then(response => response.json())
     .then(data => {
     console.log('Usuario creado:', data);
     });
   } catch (error) {
        console.log(error)
   }
};

export function crearChat(datos){
   try {
     fetch('http://localhost:4000/Grupo', {
         method: 'POST',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(datos)
     })
     .then(response => response.json())
     .then(data => {
     console.log('Chat creado:', data);
     });
   } catch (error) {
        console.log(error)
   }
};

export function crearMensaje(mensaje){
   try {
     fetch('http://localhost:4000/Mensaje', {
         method: 'POST',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(mensaje)
     })
     .then(response => response.json())
     .then(data => {
     console.log('Mensaje creado:', data);
     });
   } catch (error) {
        console.log(error)
   }
};


export function unirAlChat(datos){
   try {
     fetch('http://localhost:4000/UnirAlGrupo', {
         method: 'POST',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(datos)
     })
     .then(response => response.json())
     .then(data => {
     console.log('Usuario añadido:', data);
     });
   } catch (error) {
        console.log(error)
   }
};



export function actualizarUsuario(datos){
   try {
     fetch('http://localhost:4000/Usuario', {
         method: 'PUT',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(datos)
     })
     .then(response => response.json())
     .then(data => {
     console.log('Usuario actualizado:', data);
     });
   } catch (error) {
        console.log(error)
   }
};

export function actualizarChat(datos){
   try {
     fetch('http://localhost:4000/Grupo', {
         method: 'PUT',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(datos)
     })
     .then(response => response.json())
     .then(data => {
     console.log('Chat actualizado:', data);
     });
   } catch (error) {
        console.log(error)
   }
};

export function actualizarMensaje(datos){
   try {
     fetch('http://localhost:4000/Mensaje', {
         method: 'PUT',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(datos)
     })
     .then(response => response.json())
     .then(data => {
     console.log('Chat actualizado:', data);
     });
   } catch (error) {
        console.log(error)
   }
};


export function sacarDelGrupo(datos){
   try {
     fetch('http://localhost:4000/UsuarioDeGrupo', {
         method: 'DELETE',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(datos)
     })
     .then(response => response.json())
     .then(data => {
     console.log('Usuario sacado del grupo:', data);
     });
   } catch (error) {
        console.log(error)
   }
};


export function eliminarUsuario(datos){
   try {
     fetch('http://localhost:4000/Usuario', {
         method: 'DELETE',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(datos)
     })
     .then(response => response.json())
     .then(data => {
     console.log('Usuario eliminado:', data);
     });
   } catch (error) {
        console.log(error)
   }
};


export function eliminarGrupo(datos){
   try {
     fetch('http://localhost:4000/Grupo', {
         method: 'DELETE',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(datos)
     })
     .then(response => response.json())
     .then(data => {
     console.log('Usuario sacado del grupo:', data);
     });
   } catch (error) {
        console.log(error)
   }
};

export function eliminarMensaje(datos){
   try {
     fetch('http://localhost:4000/Mensaje', {
         method: 'DELETE',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(datos)
     })
     .then(response => response.json())
     .then(data => {
     console.log('Usuario sacado del grupo:', data);
     });
   } catch (error) {
        console.log(error)
   }
};