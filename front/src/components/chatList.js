import clsx from "clsx";
import styles from "./chatItem.module.css";
import chatItem from "./chatItem";
export default function chatList({chats}) {
    const chatJSX=chats.map((chat, ind)=>(
        <chatItem foto={chat.foto} nombre={chat.nombre} key={ind}></chatItem>

    ))
  return (
    <>
    {
        (chats.length!=0) ? (
            {chatJSX}
        ):(
            <p>No hay chats</p>
        ) 

    }
    </>
  );
}
