import React, { useEffect } from "react";
import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChatList } from "../../redux/Thunk/getChatList";
import "./Chat.css";

export default function Chat() {
  const dispatch = useDispatch();
  const userLoggined = useSelector((state) => state.auth.user?.data?.id);
  const chatArr = useSelector((state) => state.chatSlice?.chatList);

  useEffect(() => {
    (() => {
      dispatch(getChatList());
    })();
  }, []);
  console.log(chatArr);
  console.log(userLoggined);

  return (
    <div>
      <section className="section hero-text chat-container ">
        <div className="contain padding-vert-xl">
          <div className="limit limit--m">
            <h1>Сообщения</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="contain">
          <div className="limit limit--s">
            {/* list */}
            {chatArr.map((el) => (
              <>
              {el.Messages?.length > 0  && 
                <div className="conversation-list" key={el.id}>
                <Link to={`${el.id}`} className="conversation-list__item">
                  <div className="conversation-list__body">
                    <div className="conversation-list__image">
                      {userLoggined === el.user1_id ? (
                        <img
                          src={
                            el.user_2?.photo ? el.user_2?.photo : "/user.png"
                          }
                          alt="user"
                        />
                      ) : (
                        <img
                          src={
                            el.user_1?.photo ? el.user_1?.photo : "/user.png"
                          }
                          alt="user"
                        />
                      )}
                    </div>
                    <div className="conversation-list__info">
                      <div className="conversation-list__name">
                        {userLoggined === el.user1_id
                          ? el.user_2?.name
                          : el.user_1?.name}
                      </div>
                      <div className="conversation-list__preview">
                        {el.Messages[el.Messages?.length - 1]?.body}
                      </div>
                    </div>
                      <div className="conversation-list__date">
                      {new Date(
                          el.Messages[el.Messages?.length - 1]?.createdAt
                        ).toLocaleDateString("ru-RU")}
                        {'  /  '}
                        {new Date(
                          el.Messages[el.Messages?.length - 1]?.createdAt
                        ).toLocaleTimeString("ru-RU")}
                      </div>
                  </div>
                </Link>
              </div>
               }
               </>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
