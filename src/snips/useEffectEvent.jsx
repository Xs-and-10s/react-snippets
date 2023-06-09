import { useEffect, useEffectEvent } from 'react';

export const ChatRoom = ({ url, loggingOptions }) => {
  const onConnected = useEffectEvent((url) => {
    logConnection(`connected to ${url}`, loggingOptions);
  });

  useEffect(() => {
    const room = connectToRoom(url);

    room.onConnected(() => {
      onConnected(url);
    });

    return () => {
      room.disconnect();
    };
  }, [url]);
};

function logConnection(message, options) {}

function connectToRoom(url) {}
