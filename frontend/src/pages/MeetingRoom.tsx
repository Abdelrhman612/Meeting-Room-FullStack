import { useEffect, useRef } from "react";
import { startConnection } from "../services/EndPoint/signalR";

const MeetingRoom = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();

    const connection = startConnection();

    connection.on("UserJoined", (id: string) => {
      console.log("User joined:", id);
    });

    connection.onreconnected(() => {
      connection.invoke("JoinRoom", "room1");
    });
  }, []);

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-[400px] rounded-xl border-4 border-blue-500"
      />
    </div>
  );
};

export default MeetingRoom;
