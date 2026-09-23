import styles from "@/components/newpopup.module.css";
import clsx from "clsx";
import Popup from 'reactjs-popup';

export default function NewPopup({triggertext,children}){
    return(
  <Popup trigger={<button>{triggertext}</button>} position="top left" modal nested className={styles.popup} >
    {close => (
      <div className={styles.cont} >

        {children}
        <button className={styles.cerrar} onClick={close}>
         Cerrar
        </button>
      </div>
    )}
  </Popup>

    )
};