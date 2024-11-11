import React, { useDebugValue, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Displayhome from "./Displayhome";
import DisplayAlbum from "./DisplayAlbum";
import { useCallback } from "react";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

function Display() {
  const { albumsData } = useContext(PlayerContext);

  const displayref = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumid = isAlbum ? location.pathname.split("/").pop() : "";
  const bgcolor =
    isAlbum && albumsData.length > 0
      ? albumsData.find((x) => x._id == albumid).bgColor
      : "";

  useEffect(() => {
    if (isAlbum) {
      displayref.current.style.background = `linear-gradient(${bgcolor},#121212)`;
    } else {
      displayref.current.style.background = `#121212`;
    }
  });
  return (
    <div
      ref={displayref}
      className="w-[100%] m-2 px-6 pt-4  rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      {albumsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<Displayhome />} />
          <Route
            path="/album/:id"
            element={
              <DisplayAlbum album={albumsData.find((x) => x._id == albumid)} />
            }
          />
        </Routes>
      ) : null}
    </div>
  );
}

export default Display;
