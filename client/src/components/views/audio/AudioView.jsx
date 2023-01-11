import React, { useEffect, useRef, useState } from 'react';
import useQuery from '../../../utils/useQuery';
import { getFile } from '../../../actions/file/getFile';
import { useDispatch, useSelector } from 'react-redux';
import './audioView.css';

const AudioView = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const fileId = query.get('file');
    const file = useSelector((state) => state.file.data);
    const [loader, setLoader] = useState(true);
    const [audio, setAudio] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioPlayer = useRef();
    const progressBar = useRef();
    const animationRef = useRef();
    const volumeBar = useRef();

    if (fileId && file == '') {
        dispatch(getFile(fileId));
    }

    useEffect(() => {
        if (audio == '' && file.length != 0) {
            const url = window.URL.createObjectURL(file);
            setAudio(url);
            setLoader(false);
        }
        const seconds = Math.floor(audioPlayer?.current?.duration);
        setDuration(seconds);
        if (progressBar.current) {
            progressBar.current.max = seconds;
        }
    }, [
        audioPlayer?.current?.loadedmetadata,
        audioPlayer?.current?.readyState,
        file.length,
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
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    };

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    };

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    };
    const changeVolume = () => {
        audioPlayer.current.volume = volumeBar.current.value / 100;
    };

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty(
            '--seek-before-width',
            `${(progressBar.current.value / duration) * 100}%`,
        );
        setCurrentTime(progressBar.current.value);
    };

    return (
        <div className="audioPlayer">
            <div className="player">
                <audio ref={audioPlayer} src={audio} preload="metadata"></audio>
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
    );
};
export default AudioView;
