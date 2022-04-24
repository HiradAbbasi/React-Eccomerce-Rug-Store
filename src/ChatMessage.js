// import React, { useState, useEffect } from "react";
// import { db, auth, firebase } from "./firebase";

// const ChatMessage = (props) => {
//   return (
//     <div className={`chat-message-container ${!props.type && 'chat-message-container-reverse'}`}>
//       <div className="chat-message-middle">
//         {props.value.map((msg, index) => 
//           <div className={`chat-message ${!props.type && 'chat-message-reverse'}`}>
//             <div className="chat-message-left">
//               <i className="bi bi-three-dots-vertical" style={{ color: "#757476"}}></i>
//             </div>
//             <h5 className={`chat-message-content ${!props.type && 'chat-message-content-reverse'}`}>{msg.message}</h5>
//           </div>)}
//         <div className={`chat-message-time ${!props.type && 'chat-message-time-reverse'}`}>
//           <h5 className="time-fix">{props.value[0].timePosted}</h5>
//         </div>
//       </div>
//       <div className="chat-message-right">
//         <div className="chat-message-profile-img">
//           {`${props.value[0].firstName} ${props.value[0].lastName}`.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatMessage;

