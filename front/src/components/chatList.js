import clsx from "clsx";
import ChatItem from "@/components/chatItem";

export default function chatList({chats ,selectChat}) {
    const chatJSX=chats.map((chat, ind)=>(
        <ChatItem foto={chat.foto} nombre={chat.nombre} key={ind} selectChat={()=>{selectChat(ind)}}></ChatItem>

    ))
  return (
    <>
    {
        (chats.length!=0) ? (
            <section className="chatSec">

                {chatJSX}
            </section>
        ):(
            <p>No hay chats</p>
        ) 

    }
    </>
  );
}
