import { useContext, useState } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";

function App() {
  const { audioref, track, songsData } = useContext(PlayerContext);
  return songsData ? (
    <div className="h-screen bg-black">
      {songsData.length !== 0 ? (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}
      <audio
        ref={audioref}
        src={track ? track.file : ""}
        preload="auto"
      ></audio>
    </div>
  ) : (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  );
}

export default App;
