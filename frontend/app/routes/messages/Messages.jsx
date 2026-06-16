import { useEffect, useState, useRef } from "react";
import { socket, chatDate } from "../../utils/utility";
import * as API from "../../api/messages";
import { useUser } from "../../contexts/UserContexts";
import { LoadingComponent } from "../../components/Loading";
import { Alert } from "../../components/Error";

const API_URL = `${import.meta.env.VITE_API}`;

export async function clientLoader() {
  const data = await API.getMessageHome();
  return data;
}

function Chat({ currentUser, targetUser, messages }) {
  return (
    <div name="messages" id="messages">
      {messages.map((msg, index) => (
        <div key={index}>
          {msg.user.id === currentUser.id ? (
            <Message source={"currentUser"} message={msg} />
          ) : (
            <Message source={"targetUser"} message={msg} />
          )}
        </div>
      ))}
    </div>
  );
}

function Message({ source, message }) {
  if (source === "currentUser") {
    return (
      <div className={"chat chat-end"}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Your own Avatar"
              src={API_URL + message.user.profile.avatar}
            />
          </div>
        </div>
        <div className="chat-header">{message.user.username}</div>
        <div className="chat-bubble">{message.message.message}</div>
        <div className="chat-footer opacity-50">
          {" "}
          <time className="text-xs opacity-50">
            {chatDate(message.message.time)}
          </time>
        </div>
      </div>
    );
  } else {
    return (
      <div className={"chat chat-start"}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Recipients Avatar"
              src={API_URL + message.user.profile.avatar}
            />
          </div>
        </div>
        <div className="chat-header">{message.user.username}</div>
        <div className="chat-bubble">{message.message.message}</div>
        <div className="chat-footer opacity-50">
          {" "}
          <time className="text-xs opacity-50">
            {chatDate(message.message.time)}
          </time>
        </div>
      </div>
    );
  }
}

function recipientFromArray(conversation, currentUserId) {
  return conversation.users.filter((user) => user.id != currentUserId);
}

function FriendsMenu({ friends, setCurrentChat }) {
  const UserPanel = ({ friend }) => {
    return (
      <li
        className="list-row"
        onClick={() => {
          setCurrentChat(friend);
        }}
      >
        <div>
          <img
            className="size-10 rounded-box"
            src={API_URL + friend.profile.avatar}
          />
        </div>
        <div>
          <div>{friend.username}</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            {friend.conversations.length > 0
              ? friend.conversations[0][0]
              : "Start a conversation"}
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="flex flex-col">
      <h1>Friends:</h1>
      {friends.length > 0 ? (
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            <h1>Start a chat with one of your friends below!</h1>
          </li>
          {friends.map((friend) => {
            return <UserPanel friend={friend.follower} />;
          })}
        </ul>
      ) : (
        <h1>Oh dear, maybe you should make some friends first...</h1>
      )}
    </div>
  );
}

function ConversationsMenu({ conversations, currentUserId, setCurrentChat }) {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {conversations.map((conversation) => {
        const targetUser = recipientFromArray(conversation, currentUserId)[0];
        return (
          <li
            className="list-row"
            key={conversation.id}
            onClick={() => {
              setCurrentChat(targetUser);
            }}
          >
            <div>
              <img
                className="size-10 rounded-box"
                src={API_URL + targetUser.profile.avatar}
              />
            </div>
            <div>
              <div>{targetUser.username}</div>
              <div className="text-xs uppercase font-semibold opacity-60"></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ChatBox({ targetUser, currentUser, setError }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientId, setRecipientId] = useState(targetUser.id);

  useEffect(() => {
    socket.auth = { currentUser, targetUser };
    socket.connect();
    socket.emit("start_chat", targetUser.id);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Currently not being used
    // socket.on("users", (data) => {
    //   console.log(data);
    // });

    socket.on("connect_error", (err) => {
      setError("A connection error has occured...");
      console.log(err);
    });

    socket.on("chat_history", (data) => {
      setMessages(data);
    });

    return () => {
      setMessages([]);
      socket.disconnect();
      socket.off("receive_message");
    };
  }, [targetUser]);

  const sendMessage = () => {
    if (message) {
      socket.emit("send_message", { message, currentUser });
      setMessages((prev) => [
        ...prev,
        { message: { message: message, time: Date.now() }, currentUser },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="border-1 flex flex-col h-100">
      <div
        id="chat-container"
        className="flex flex-col justify-between align-center h-full w-full"
      >
        <div id="chat-header" className="flex flex-row border-1 items-center">
          <img
            className="size-10 rounded-box"
            src={API_URL + targetUser.profile.avatar}
          />

          <div className="">
            <h1>{targetUser.username}</h1>
          </div>
        </div>
        <div id="chat-body" className="overflow-y-scroll">
          <Chat user={currentUser} recipient={targetUser} messages={messages} />
          <div name="message-input" id="message-input" className="">
            <input
              type="text"
              className="input"
              name="message"
              placeholder="Enter Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="btn" onClick={sendMessage}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App({ loaderData }) {
  const [showFriends, setShowFriends] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [error, setError] = useState("");
  const { currentUser, isLoading } = useUser();

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex flex-row w-full h-full">
      <div name="side-menu" className="basis-50">
        <h1>Recent Conversations:</h1>
        {loaderData.data.conversations.length > 0 ? (
          <ConversationsMenu
            conversations={loaderData.data.conversations}
            userId={currentUser.id}
            setCurrentChat={setCurrentChat}
          />
        ) : (
          <h1>
            No conversations in your history.. Perhaps message one of your
            friends on the right
          </h1>
        )}
      </div>
      <div name="main-content" className="grow-1 h-100">
        {error ? <Alert message={error} setState={setError} /> : null}
        {currentChat ? (
          <ChatBox
            recipient={currentChat}
            user={currentUser}
            setError={setError}
          />
        ) : (
          <FriendsMenu
            friends={loaderData.data.followers}
            setCurrentChat={setCurrentChat}
          />
        )}
      </div>
    </div>
  );
}
