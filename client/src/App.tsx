import "./App.css";
import io from "socket.io-client";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUser } from "./redux/Thunk/checkUser";
import {
  ChatItem,
  Chat,
  Profile,
  Login,
  BasicLayout,
  Main,
  Register,
  NewUser,
  StepOne,
  StepTwo,
  Ad,
  AdItem,
  AdNew,
  AllProfiles,
  Band,
} from "./components/indexComponents";

const socket = io.connect("http://localhost:3000");
import AllBands from "./components/AllBands/AllBands";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <>
      <Routes>
        <Route element={<BasicLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ads">
            <Route index element={<Ad />} />
            <Route path=":id" element={<AdItem />} />
          </Route>
          <Route path="ads/new" element={<AdNew />} />
          <Route path="/newuser/stepone" element={<StepOne />} />
          <Route path="/newuser/steptwo" element={<StepTwo />}></Route>
          <Route
            path="/profiles/*"
            element={
              <Routes>
                <Route path="/" element={<AllProfiles />} />
                <Route path=":login" element={<Profile />} />
              </Routes>
            }
          ></Route>
          <Route
            path="/bands/*"
            element={
              <Routes>
                <Route path="/" element={<AllBands />} />
                <Route path="/:id" element={<Band />} />
              </Routes>
            }
          ></Route>
          <Route path="/chat">
            <Route index element={<Chat />} />
            <Route path=":id" element={<ChatItem socket={socket} />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
