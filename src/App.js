import React from "react";
import { useState, useEffect } from "react";
import { FaExchangeAlt, FaPlay, FaStop } from "react-icons/fa";

const data = {
  bankOne: [
    {
      keyCode: 81,
      keyTrigger: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Kick-n'-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ],

  bankTwo: [
    {
      keyCode: 81,
      keyTrigger: "Q",
      id: "Chord-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      id: "Chord-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      id: "Chord-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      id: "Shaker",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Punchy-Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      id: "Side-Stick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      id: "Snare",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    },
  ],
};

const App = () => {
  const [audio, setAudio] = useState([]);
  const [isStopped, setIsStopped] = useState(false);
  const [keyId, setKeyId] = useState("");
  const [bank, setBank] = useState(false);
  const [volume, setVolume] = useState(0.25);

  useEffect(() => {
    if (!bank) {
      setAudio(data.bankOne);
    } else if (bank) {
      setAudio(data.bankTwo);
    }
  }, [bank]);

  return (
    <main className="text-capitalize">
      <section className="container">
        <div className="row">
          <div className="col d-flex align-items-center height ">
            <article className="col-lg-9 mx-auto  p-5 height-50 bg-secondary">
              <h3 className="text-light text-center my-3">drum machine</h3>
              <div className="row d-flex height-100 align-items-center justify-content-around">
                <div className="col-md-6">
                  {audio.map((key) => {
                    const { keyTrigger, id, url } = key;
                    return (
                      <div
                        className="btn btn-primary m-2 rounded col-3"
                        key={id}
                        onClick={() => {
                          setKeyId(id);
                          const beat = document.getElementById(keyTrigger);
                          beat.currentTime = 0;
                          beat.volume = volume;
                          !isStopped && beat.play();
                        }}
                      >
                        <audio src={url} id={keyTrigger} />
                        {keyTrigger}
                      </div>
                    );
                  })}
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-dark btn-block w-100 my-2 mx-auto"
                    onClick={() => {
                      setIsStopped(!isStopped);
                    }}
                  >
                    {isStopped ? <FaPlay /> : <FaStop />}
                  </button>
                  <input
                    type="text"
                    onChange={() => {
                      setKeyId("");
                    }}
                    value={keyId}
                    className="my-2 mx-auto w-100 rounded p-2 text-capitalize text-primary text-center"
                  />
                  <input
                    className="my-2 mx-auto w-100 rounded p-2 text-primary"
                    type="range"
                    value={volume * 100}
                    onChange={(e) => {
                      setVolume(e.target.value / 100);
                    }}
                    onClick={() => {
                      const newVolume = volume;
                      let beats = document.querySelectorAll("audio");
                      beats = Array.from(beats);
                      beats.forEach((beat) => {
                        beat.volume = newVolume;
                      });
                    }}
                  />
                  <button
                    className="btn my-2 mx-auto btn-dark btn-block"
                    onClick={() => {
                      setBank(!bank);
                    }}
                  >
                    <FaExchangeAlt />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
