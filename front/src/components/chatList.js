import clsx from "clsx";
import ChatItem from "@/components/chatItem";

export default function chatList({chats}) {
    const chatJSX=chats.map((chat, ind)=>(
        <ChatItem foto={chat.foto} nombre={chat.nombre} key={ind}></ChatItem>

    ))
  return (
    <>
    {
        (chats.length!=0) ? (
            chatJSX
        ):(
            <p>No hay chats</p>
        ) 

    }
    </>
  );
}
