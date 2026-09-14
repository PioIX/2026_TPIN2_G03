import clsx from "clsx";
import styles from "./chatItem.module.css";
//arreglar module not found
export default function chatItem({foto,nombre}) {

  return (
    <>
    {
        (foto) ? (

            <img src={foto} className={styles.pfp}></img>

        ):(
            <img src="@/public/default.png" className={styles.pfp}></img>
  
        ) 

    }
    <h3>{nombre}</h3>
    </>
  );
}
