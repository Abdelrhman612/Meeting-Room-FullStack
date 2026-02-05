import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSignalR } from "../contexts/SignalRContext";
import { api } from "../services/api";

interface Participant {
  id: string;
  name: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
}

const MeetingRoom: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const { user } = useAuth();
  const { connection } = useSignalR();
  const navigate = useNavigate();

  const [room, setRoom] = useState<any>(null);
  const [participants] = useState<Participant[]>([]);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    Array<{ user: string; message: string; time: string }>
  >([]);
  const [newMessage, setNewMessage] = useState("");

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (code) {
      fetchRoom();
      joinRoom();
      setupMedia();
    }

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [code]);

  const fetchRoom = async () => {
    try {
      const response = await api.get(`/api/Rooms/${code}`);
      setRoom(response.data);
    } catch (error) {
      console.error("Failed to fetch room:", error);
      navigate("/dashboard");
    }
  };

  const joinRoom = async () => {
    if (connection && code) {
      try {
        await connection.invoke("JoinRoom", code);
      } catch (error) {
        console.error("Failed to join room:", error);
      }
    }
  };

  const setupMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Failed to get media devices:", error);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
      }
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }

        screenStream.getVideoTracks()[0].onended = () => {
          if (localVideoRef.current && localStreamRef.current) {
            localVideoRef.current.srcObject = localStreamRef.current;
          }
          setIsScreenSharing(false);
        };

        setIsScreenSharing(true);
      } else {
        if (localVideoRef.current && localStreamRef.current) {
          localVideoRef.current.srcObject = localStreamRef.current;
        }
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error("Failed to share screen:", error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && connection) {
      const message = {
        user: user?.name || "Anonymous",
        message: newMessage,
        time: new Date().toLocaleTimeString(),
      };

      setChatMessages([...chatMessages, message]);
      setNewMessage("");

      // TODO: Send message via SignalR
      // connection.invoke('SendMessage', code, message);
    }
  };

  const copyRoomCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
    }
  };

  const leaveMeeting = () => {
    navigate("/dashboard");
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{room?.name || "Meeting Room"}</h1>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm text-gray-300">Room Code: {code}</span>
            <button
              onClick={copyRoomCode}
              className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
            >
              Copy
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">{participants.length} participants</span>
          <button
            onClick={leaveMeeting}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
          >
            Leave Meeting
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
            {/* Local Video */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                You {isVideoOn ? "" : "(Video Off)"}
              </div>
            </div>

            {/* Remote Videos */}
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="relative bg-black rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">
                      {participant.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm">{participant.name}</div>
                    {!participant.isVideoOn && (
                      <div className="text-xs text-gray-400 mt-1">
                        Video Off
                      </div>
                    )}
                  </div>
                </div>
                {participant.isVideoOn && (
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  {participant.name}
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="bg-gray-800 p-4 flex justify-center space-x-4">
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full ${isAudioOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"}`}
            >
              {isAudioOn ? "🎤" : "🔇"}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${isVideoOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"}`}
            >
              {isVideoOn ? "📹" : "📷❌"}
            </button>
            <button
              onClick={toggleScreenShare}
              className={`p-3 rounded-full ${isScreenSharing ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-600"}`}
            >
              🖥️
            </button>
            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
              💬
            </button>
            <button className="p-3 rounded-full bg-red-600 hover:bg-red-700">
              📞
            </button>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-white font-medium">Chat</h2>
          </div>

          <div className="flex-1 p-4 overflow-auto">
            {chatMessages.map((msg, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-medium">{msg.user}</span>
                  <span className="text-gray-400 text-xs">{msg.time}</span>
                </div>
                <p className="text-gray-300 text-sm">{msg.message}</p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
