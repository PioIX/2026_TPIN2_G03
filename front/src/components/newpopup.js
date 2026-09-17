import styles from "@/components/newpopup.module.css";
import clsx from "clsx";
import Popup from 'reactjs-popup';

export default function PopupExample({triggertext,children}){
    return(
  <Popup trigger={<button>{triggertext}</button>} position="top left">
    {close => (
      <div>
        {children}
        <a className="close" onClick={close}>
         Cerrar
        </a>
      </div>
    )}
  </Popup>

    )
};