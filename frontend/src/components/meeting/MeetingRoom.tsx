import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signalRService } from "../../services/signalR";
import { meetingService } from "../../services/meeting";
import { useAuth } from "../../hooks/useAuth";
import { useWebRTC } from "../../hooks/useWebRTC";

const MeetingRoom: React.FC = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);

  const { remoteStreams, localVideoRef } = useWebRTC(
    roomCode || "",
    localStream,
  );

  useEffect(() => {
    if (!roomCode || !user) return;

    const initMeeting = async () => {
      try {
        // Get room details
        const room = await meetingService.getRoom(roomCode);

        // Join room
        await meetingService.joinRoom({
          roomId: room.id,
          userId: user.id,
        });

        // Connect to SignalR
        await signalRService.connect(roomCode);

        // Get participants
        const userIds = await meetingService.getRoomUsers(room.id);
        setParticipants(userIds.map((id) => `User ${id}`));

        // Get media stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
      } catch (error) {
        console.error("Meeting initialization error:", error);
        navigate("/dashboard");
      }
    };

    initMeeting();

    return () => {
      if (user && roomCode) {
        meetingService.leaveRoom({
          roomId: 0, // You'll need to get the actual room ID
          userId: user.id,
        });
        signalRService.disconnect();
        if (localStream) {
          localStream.getTracks().forEach((track) => track.stop());
        }
      }
    };
  }, [roomCode, user, navigate]);

  const toggleMute = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const copyRoomCode = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      alert("Room code copied to clipboard!");
    }
  };

  const leaveMeeting = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Meeting Room: {roomCode}</h1>
          <p className="text-gray-400">
            {participants.length + 1} participants
          </p>
        </div>
        <div className="space-x-4">
          <button
            onClick={copyRoomCode}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Copy Code
          </button>
          <button
            onClick={leaveMeeting}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Leave
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Local Video */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-64 object-cover"
          />
          <div className="p-2 bg-black bg-opacity-50">
            <p className="font-medium">{user?.name} (You)</p>
            <div className="flex space-x-2 mt-1">
              {isMuted && <span className="text-red-400 text-sm">Muted</span>}
              {isVideoOff && (
                <span className="text-red-400 text-sm">Video Off</span>
              )}
            </div>
          </div>
        </div>

        {/* Remote Videos */}
        {Object.entries(remoteStreams).map(([id, stream]) => (
          <div key={id} className="bg-gray-800 rounded-lg overflow-hidden">
            <video
              autoPlay
              playsInline
              className="w-full h-64 object-cover"
              ref={(video) => {
                if (video) video.srcObject = stream;
              }}
            />
            <div className="p-2 bg-black bg-opacity-50">
              <p className="font-medium">Participant {id}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-center space-x-8">
        <button
          onClick={toggleMute}
          className={`p-3 rounded-full ${isMuted ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button
          onClick={toggleVideo}
          className={`p-3 rounded-full ${isVideoOff ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          {isVideoOff ? "Turn Video On" : "Turn Video Off"}
        </button>
        <button
          onClick={leaveMeeting}
          className="p-3 rounded-full bg-red-600 hover:bg-red-700"
        >
          Leave Meeting
        </button>
      </div>

      {/* Participants Sidebar */}
      <div className="fixed right-0 top-0 h-full w-64 bg-gray-800 p-4 hidden lg:block">
        <h3 className="font-bold text-lg mb-4">Participants</h3>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>{user?.name} (You)</span>
          </li>
          {participants.map((participant, index) => (
            <li key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>{participant}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MeetingRoom;
