import React, { useEffect, useRef, useState } from 'react';
import useQuery from '../../../utils/useQuery';
import { getFile } from '../../../actions/file/getFile';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../../reducers/helper';
import './videoView.css';

const AudioView = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const fileId = query.get('file');
    const file = useSelector((state) => state.file.data);
    const loader = useSelector((state) => state.hepler.loader);
    const [video, setVideo] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const videoPlayer = useRef();
    const progressBar = useRef();
    const animationRef = useRef();
    const volumeBar = useRef();

    if (fileId && file == '') {
        dispatch(setLoader(true));
        dispatch(getFile(fileId));
    }

    if (video == '') {
        dispatch(setLoader(true));
        if (file.length != 0) {
            const url = window.URL.createObjectURL(file);
            setVideo(url);
        }
    }
    if (!isNaN(duration)) {
        dispatch(setLoader(false));
    }
    useEffect(() => {
        const seconds = Math.floor(videoPlayer?.current?.duration);
        setDuration(seconds);
        if (progressBar.current) {
            progressBar.current.max = seconds;
        }
    }, [
        videoPlayer?.current?.loadedmetadata,
        videoPlayer?.current?.readyState,
    ]);

    if (loader) {
        return (
            <div className="center">
                <span className="loader"></span>
            </div>
        );
    }

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    };

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            videoPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            videoPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    };

    const whilePlaying = () => {
        progressBar.current.value = videoPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    };

    const changeRange = () => {
        videoPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    };
    const changeVolume = () => {
        videoPlayer.current.volume = volumeBar.current.value / 100;
    };

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty(
            '--seek-before-width',
            `${(progressBar.current.value / duration) * 100}%`,
        );
        setCurrentTime(progressBar.current.value);
    };

    return (
        <div className="videoPlayer">
            <video
                ref={videoPlayer}
                src={video}
                preload="metadata"
                className="video"
            ></video>
            <div className="player">
                <div className="button" onClick={togglePlayPause}>
                    <button className={isPlaying ? 'pause' : 'play'} />
                </div>
                <div className="currentTime">{calculateTime(currentTime)}</div>

                <div>
                    <input
                        type="range"
                        className="progressBar"
                        defaultValue="0"
                        ref={progressBar}
                        onChange={changeRange}
                    />
                </div>

                <div className="duration">
                    {duration ? calculateTime(duration) : ''}
                </div>
                <div className="volume">
                    volume:
                    <input
                        type="range"
                        className="volumeBar"
                        defaultValue="100"
                        ref={volumeBar}
                        onChange={changeVolume}
                    />
                </div>
            </div>
        </div>
    );
};
export default AudioView;
