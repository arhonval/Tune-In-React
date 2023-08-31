import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  NavigateFunction,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ChatItem.css";
import { useAppDispatch } from "../../../redux/hooks";
import { getMessages, getNewMessage } from "../../../redux/Thunk/getChatList";

export default function ChatItem({ socket }) {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const userFirst = useSelector((state) => state.auth.user?.data);
  const messages = useSelector((state) => state.chatSlice?.messages);
  const userDialogs = useSelector((state) => state.chatSlice?.dialog);


  console.log(userDialogs);

  useEffect(() => {
    dispatch(getMessages(id));
  }, []);
  useEffect(() => {
    setAllMessages(() => [...messages]);
  }, [messages]);

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socket.on("response", (data) => {
      console.log("data========>", data);
      setAllMessages((pre) => [...pre, data]);
    });
    return () => {
      socket.off("response");
    };
  }, [allMessages]);
  console.log("message:", message);

  const inputHandler = (e) => {
    setMessage(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log({ id, body: message });
      dispatch(getNewMessage({ id, body: message }));
      socket.emit("message", {
        text: message,
        id: userFirst?.id,
        time: new Date(),
        // socketID: socket.id,
      });
      // socket.on("response", (data) => {
      //   console.log("data========>", data);
      //   setAllMessages((pre) => [...pre, data]);
      // });
    }
    setMessage("");
  };

  // new Date(el.createdAt).toLocaleTimeString("ru-RU")}
  // new Date(el.createdAt).toLocaleDateString("ru-RU")}
  console.log("------------", userDialogs);

  return (
    <div>
      {/* PHOTO */}
      <section className="section section--convo-heads">
        <div className="contain padding-vert-l">
          <div className="convo-heads">
            <Link
              className="convo-heads__item"
              to={`/profiles/${userDialogs?.user_1?.login}`}
            >
              <img
                src={userDialogs?.user_1?.photo ? userDialogs.user_1.photo : "/user.png"}
                alt={userDialogs?.user_1?.name}
              />
            </Link>
            <Link
              className="convo-heads__item"
              to={`/profiles/${userDialogs?.user_2?.login}`}
            >
              <img
               src={userDialogs?.user_2?.photo ? userDialogs.user_2.photo : "/user.png"}
               alt={userDialogs?.user_2?.name}
              />
            </Link>
          </div>
          <h1>Chat box</h1>
        </div>
      </section>
      {/* chat ------ */}
      <section className="section section--profile">
        <div className="contain">
          <div className="limit limit--s">
            <div className="convo-scroller js-convo-scroller">
              <ul className="conversation js-convo-append">
                {allMessages?.map((el) => (
                  <li key={`${el.id}-${Math.random()}`}>
                    <div className="timestamp">
                      {new Date(el.time).toLocaleDateString("ru-RU")}{" "}
                      {new Date(el.time).toLocaleTimeString("ru-RU")}
                      <div
                        className={
                          userFirst?.id == el.id
                            ? "message yours"
                            : "message theirs"
                        }
                      >
                        {el.text}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="form convo-form">
              <form
                className="new_message"
                id="new_message"
                action="/messages"
                acceptCharset="UTF-8"
                method="post"
              >
                <div className="form__row">
                  <div className="form__col">
                    <textarea
                      placeholder="Write your message here..."
                      className="js-convo-textarea"
                      name="message[body]"
                      id="message_body"
                      value={message}
                      onChange={inputHandler}
                    />
                  </div>
                  <div className="form__col">
                    <input
                      type="submit"
                      name="commit"
                      defaultValue="Send"
                      className="btn"
                      data-disable-with="Send"
                      onClick={submitHandler}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
