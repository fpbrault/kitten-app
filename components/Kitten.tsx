import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type KittenProps = {
  id: number;
  name: string;
  litter: {
    name: string;
    id: number;
  } | null;
  content: string;
};

const Kitten: React.FC<{ kitten: KittenProps }> = ({ kitten }) => {
  const litterName = kitten.litter ? kitten.litter.name : "Unknown author";
  return (
    <div className='w-1/2 p-1 mx-auto transition bg-blue-100 border rounded shadow hover:bg-blue-300' onClick={() => Router.push("/k/[id]", `/k/${kitten.id}`)}>
      <div className="text-2xl">{kitten.name}</div>
      <div className="flex">From <div
            onClick={() => Router.push('/l/[id]', `/l/${kitten.litter?.id}`)}
            className='pl-1 font-bold hover:text-blue-600'
          >{litterName}</div>
          </div>
      <ReactMarkdown children={kitten.content} />
      </div>
  );
};

export default Kitten;
