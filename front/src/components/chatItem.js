import clsx from "clsx";
import styles from "@/components/chatItem.module.css";
//arreglar module not found
export default function chatItem({foto,nombre,selectChat}) {

  return (
    <>
    {
        (foto) ? (

           <a onClick={selectChat}><img src={foto} className={styles.pfp}></img></a>

        ):(
            <a onClick={selectChat}><img src="@/public/default.png" className={styles.pfp}></img></a>
  
        ) 

    }
    <h3>{nombre}</h3>
    </>
  );
}
