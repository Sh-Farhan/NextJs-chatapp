// import React from 'react'
// import {format} from 'date-fns'
// import { cn } from '@/lib/utils';
// import { Avatar } from '@/components/ui/avatar';

// type Props = {
//     fromCurrentUser: boolean;
//     senderImage: string;
//     senderName: string;
//     lastByUser: boolean;
//     content: string[];
//     createdAt: number;
//     type: string;
// }

// const Message = ({
//     fromCurrentUser,
//     senderImage,
//     senderName,
//     lastByUser,
//     content,
//     createdAt,
//     type
// }: Props) => {
//   const formatTime = (timestamp: number) => {
//     return format(timestamp, "HH:mm")
//   }
//   return (
//     <div className={cn("flex items-end", {
//       "justify-end": fromCurrentUser
//     })}>
//       <div className={cn("flex flex-col w-full mx-2", {
//         "order-1 items-end": fromCurrentUser,
//         "order-2 items-start": !fromCurrentUser
//       })}>
// {/* 
//         <div className={cn("px-4 py-2 rounded-lg max-w-[70%]", {
//           "bg-primary text-primary-foreground": !fromCurrentUser,
//           "rounded-br-none": !lastByUser && fromCurrentUser,
//           "rounded-bl-none": !lastByUser && !fromCurrentUser
//         })}> */}
//               <div
//         className={cn(
//           "flex flex-col max-w-[70%] px-4 py-2 rounded-lg shadow-md",
//           fromCurrentUser
//             ? "bg-green-500 text-white rounded-br-none items-end"
//             : "bg-gray-200 text-gray-800 rounded-bl-none items-start"
//         )}
//       >

//           {type === "text" ? <p className='text-wrap break-words whitespace-pre-wrap'>{content}</p> : null}
//           <p className={cn("text-xs flex w-full my-1",{
//             "text-primary-foreground justify-end": fromCurrentUser,
//             "text-secondary-foreground justify-start": !fromCurrentUser
//           }
//           )}>{formatTime(createdAt)}</p>
//         </div>
//       </div>

//       <Avatar>
//       </Avatar>
//     </div>
//   ) 
// }

// export default Message
import React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';

// Define the prop types for clarity
type MessageProps = {
  fromCurrentUser: boolean;
  senderImage: string;
  senderName: string;
  lastByUser: boolean;
  content: string[];
  createdAt: number;
  seen?: React.ReactNode;
  type: string;
};

// Utility function for time formatting
const formatTime = (timestamp: number) => format(timestamp, "HH:mm");

const Message = ({
  fromCurrentUser,
  senderImage,
  senderName,
  lastByUser,
  content,
  createdAt,
  seen,
  type,
}: MessageProps) => {
  // console.log( fromCurrentUser,seen,lastByUser);
  return (
    <div className={cn("flex items-end", fromCurrentUser ? "justify-end" : "justify-start")}>      
      {/* Avatar */}
      {!fromCurrentUser && (
        <img src={senderImage} alt={senderName} className="w-8 h-8 rounded-full mr-2" />
      )}

      {/* Message bubble */}
      <div
        className={cn(
          "flex flex-col max-w-[70%] px-4 py-2 rounded-lg shadow-md",
          fromCurrentUser
            ? "bg-green-500 text-white rounded-br-none items-end"
            : "bg-gray-200 text-gray-800 rounded-bl-none items-start"
        )}
      >
        {type === "text" &&
          content.map((line, index) => (
            <p key={index} className="break-words whitespace-pre-wrap text-sm break-all">
              {line}
            </p>
          ))}
        
        {/* Timestamp */}
        <p className={cn("text-xs mt-1", fromCurrentUser ? "text-white" : "text-gray-500")}>{formatTime(createdAt)}</p>

          {/* Seen indicator */}
          {fromCurrentUser && lastByUser && seen && (
            <span className="text-xs">{seen}</span>
          )}
      </div>

      {/* Show sender's avatar on the right if it's from the current user */}
      {fromCurrentUser && (
        <img src={senderImage} alt={senderName} className="w-8 h-8 rounded-full ml-2" />
      )}
    </div>
  );
};

export default Message;
