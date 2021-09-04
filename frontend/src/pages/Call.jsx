import React, { useState, useEffect, useReducer } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import CallPageFooter from '../components/CallPageFooter';
import CallPageHeader from '../components/CallPageHeader';
import MeetingInfo from '../components/MeetingInfo';
import Messanger from '../components/Messanger';
import MessageListReducer from '../reducers/messageListReducer';
import { postRequest, getRequest } from '../http';
import Alert from '../components/Alert';

const initialState = [];
let peer = null;
const socket = io.connect(process.env.REACT_APP_BASE_URL);

const Call = () => {
  const { id } = useParams();
  const history = useHistory();
  const [messageList, messageListReducer] = useReducer(
    MessageListReducer,
    initialState
  );

  const [meetingInfo, setMeetingInfo] = useState(false);
  const [streamObj, setStreamObj] = useState({});
  const [screenCastStream, setScreenCastStream] = useState();
  const [isPresenting, setIsPresenting] = useState(false);
  const [isMessanger, setIsMessanger] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [isAudio, setIsAudio] = useState(true);
  const [isVideo, setIsVideo] = useState(true);

  const isAdmin = window.location.hash === '#init' ? true : false;
  const url = `${window.location.origin}${window.location.pathname}`;

  const getRecieverCode = async () => {
    const data = await getRequest(`/call-id/${id}`);

    if (data?.code) {
      peer?.signal(data.code);
    }
  };

  const initWebRTC = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        // set own video
        setStreamObj(stream);
        const video = document.querySelector('video');
        video.srcObject = stream;
        video.play();

        // Initiat Peer
        peer = new Peer({
          initiator: isAdmin,
          trickle: false,
          stream,
        });

        if (!isAdmin) {
          getRecieverCode();
        }

        // Listen signal event
        peer?.on('signal', async (signalData) => {
          if (isAdmin) {
            const payload = {
              id,
              signalData,
            };
            await postRequest('/call-id', payload);
          } else {
            // Emit code event
            socket?.emit('code', signalData, (cbData) => {
              console.log('code sent');
            });
          }
        });

        // Listen connect event
        peer?.on('connect', () => {});

        // Listen data event for message
        peer?.on('data', (data) => {
          messageListReducer({
            type: 'addMessage',
            payload: {
              user: 'Other',
              message: data?.toString(),
              time: Date.now(),
            },
          });

          setMessageAlert({
            alert: true,
            isPopup: true,
            payload: {
              user: 'Other',
              message: data?.toString(),
            },
          });
        });

        // Listen stream event
        peer?.on('stream', (stream) => {
          const video = document.querySelector('video');

          if ('srcObject' in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream);
          }

          video.play();
        });
      })
      .catch((err) => console.log(err));
  };

  const screenShare = () => {
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        peer?.replaceTrack(
          streamObj?.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          streamObj
        );
        setScreenCastStream(screenStream);
        screenStream.getTracks()[0].onended = () => {
          peer?.replaceTrack(
            streamObj?.getVideoTracks()[0],
            screenStream.getVideoTracks()[0],
            streamObj
          );
        };
        setIsPresenting(true);
      });
  };

  const stopScreenShare = () => {
    screenCastStream.getVideoTracks().forEach(function (track) {
      track.stop();
    });
    peer?.replaceTrack(
      screenCastStream.getVideoTracks()[0],
      streamObj.getVideoTracks()[0],
      streamObj
    );
    setIsPresenting(false);
  };

  const toggleAudio = (value) => {
    streamObj.getAudioTracks()[0].enabled = value;
    setIsAudio(value);
  };

  const toggleVideo = (value) => {
    streamObj.getVideoTracks()[0].enabled = value;
    setIsVideo(value);
  };

  const disconnectCall = () => {
    peer?.destroy();
    history.push('/');
    window.location.reload();
  };

  const sendMessage = (message) => {
    peer?.send(message);
    messageListReducer({
      type: 'addMessage',
      payload: {
        user: 'Me',
        message,
        time: Date.now(),
      },
    });
  };

  useEffect(() => {
    if (isAdmin) {
      setMeetingInfo(true);
    }
    initWebRTC();
    socket?.on('code', (data) => {
      peer?.signal(data);
    });
    //eslint-disable-next-line
  }, []);

  return (
    <div className="call">
      <video className="call__video" src="" />
      <CallPageHeader
        isMessanger={isMessanger}
        setIsMessanger={setIsMessanger}
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
      />
      {isAdmin && meetingInfo && (
        <MeetingInfo setMeetingInfo={setMeetingInfo} url={url} />
      )}
      <CallPageFooter
        isPresenting={isPresenting}
        stopScreenShare={stopScreenShare}
        screenShare={screenShare}
        isAudio={isAudio}
        toggleAudio={toggleAudio}
        disconnectCall={disconnectCall}
        isVideo={isVideo}
        toggleVideo={toggleVideo}
      />
      {isMessanger ? (
        <Messanger
          setIsMessanger={setIsMessanger}
          sendMessage={sendMessage}
          messageList={messageList}
        />
      ) : (
        messageAlert.isPopup && <Alert messageAlert={messageAlert} />
      )}
    </div>
  );
};

export default Call;
