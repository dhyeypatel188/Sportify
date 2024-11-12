import {
  createContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import axios from "axios";
export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioref = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = "https://sportify-ccel.onrender.com";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);

  const [track, setTrack] = useState(songsData[1]);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioref.current.play();
    setPlayerStatus(true);
  };

  const pause = () => {
    audioref.current.pause();
    setPlayerStatus(false);
  };

  const playwithId = async (id) => {
    await songsData.map((item) => {
      if (id === item._id) {
        setTrack(item);
      }
    });
    await audioref.current.play();
    setPlayerStatus(true);
  };

  const previous = async () => {
    songsData.map(async (item, index) => {
      if (track._id === item._id && index > 0) {
        await setTrack(songsData[index - 1]);
        await audioref.current.play();
        setPlayerStatus(true);
      }
    });
  };
  const next = async () => {
    songsData.map(async (item, index) => {
      if (track._id === item._id && index < songsData.length) {
        await setTrack(songsData[index + 1]);
        await audioref.current.play();
        setPlayerStatus(true);
      }
    });
  };

  const seekSong = async (e) => {
    audioref.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioref.current.duration;
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]);
    } catch (error) {}
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => {
      audioref.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioref.current.currentTime / audioref.current.duration) * 100
          ) + "%";

        setTime({
          currentTime: {
            second: Math.floor(audioref.current.currentTime % 60),
            minute: Math.floor(audioref.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioref.current.duration % 60),
            minute: Math.floor(audioref.current.duration / 60),
          },
        });
      };
    });
  }, [1000]);

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);
  const contextValue = {
    audioref,
    seekBg,
    seekBar,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    playwithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
