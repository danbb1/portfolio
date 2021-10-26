/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useState } from "react"
import videojs from "video.js"
import "video.js/dist/video-js.css"

import { vjsWrapper, portrait as portraitStyle } from "./videoJSPlayer.module.css"

const useVideoPlayer = ({ source }) => {
  const [player, setPlayer] = useState(null)
  const videoPlayerRef = useRef(null)

  const videoJSOptions = {
    fill: true,
    preload: "auto",
    autoplay: false,
    fluid: true,
    controls: true,
    playbackRates: [1.5, 1.0],
  }

  useEffect(() => {
    const videojsplayer = videojs(videoPlayerRef.current, {
      ...videoJSOptions,
      sources: [source],
    })
    setPlayer(videojsplayer)

    return () => {
      if (player !== null) {
        player.dispose()
      }
    }
  }, [])

  return videoPlayerRef
}

const VideoJSPlayer = ({ portrait, source }) => {
  const playerRef = useVideoPlayer({ source })

  return (
    <div className={`${vjsWrapper} ${portrait ? `${portraitStyle}` : ""}`}>
      <div data-vjs-player>
        <video ref={playerRef} className="video-js" />
      </div>
    </div>
  )
}

export default VideoJSPlayer
