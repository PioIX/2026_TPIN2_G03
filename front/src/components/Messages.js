import { useEffect } from "react"

export default function Messages({ msgArray }) {



    useEffect(()=>{

        console.log("msgArray en comp:", msgArray)

    },[msgArray])

  return (
    <div className="messagediv">

      {msgArray && msgArray.length > 0 && msgArray.map((m,i)=>(
            <span key={i} className="message">
            <p key={i} className="text">{m.email}</p>
              <br></br>
              <p>{m.contenido}</p>
            </span>
        ))}
    </div>
  )
}