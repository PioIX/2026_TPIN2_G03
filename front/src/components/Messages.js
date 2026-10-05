import { useEffect } from "react"

export default function Messages({ msgArray }) {



    useEffect(()=>{

        console.log("msgArray en comp:", msgArray)

    },[msgArray])

  return (
    <div>

      {msgArray && msgArray.length > 0 && msgArray.map((m,i)=>(
            <p key={i} className="message">{m.email}<br></br>{m.contenido}</p>
        ))}
    </div>
  )
}