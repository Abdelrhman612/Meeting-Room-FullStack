import { useState, useRef, useEffect } from 'react';
import { signalRService } from '../services/signalR';

interface PeerConnection {
  [key: string]: RTCPeerConnection;
}

export const useWebRTC = (roomCode: string, localStream: MediaStream | null) => {
  const [remoteStreams, setRemoteStreams] = useState<{ [key: string]: MediaStream }>({});
  const peerConnections = useRef<PeerConnection>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (!roomCode) return;

    const initWebRTC = async () => {
      // Listen for new users
      signalRService.on('UserJoined', async (connectionId: string) => {
        await createPeerConnection(connectionId);
      });

      // Listen for offers
      signalRService.on('ReceiveOffer', async (connectionId: string, offer: string) => {
        await handleOffer(connectionId, JSON.parse(offer));
      });

      // Listen for answers
      signalRService.on('ReceiveAnswer', async (connectionId: string, answer: string) => {
        await handleAnswer(connectionId, JSON.parse(answer));
      });

      // Listen for ICE candidates
      signalRService.on('ReceiveIce', async (connectionId: string, candidate: string) => {
        await handleIceCandidate(connectionId, JSON.parse(candidate));
      });
    };

    initWebRTC();

    return () => {
      Object.values(peerConnections.current).forEach(pc => pc.close());
      peerConnections.current = {};
    };
  }, [roomCode]);

  const createPeerConnection = async (connectionId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    // Add local stream
    if (localStream) {
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
    }

    // Handle remote stream
    pc.ontrack = (event) => {
      setRemoteStreams(prev => ({
        ...prev,
        [connectionId]: event.streams[0]
      }));
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        signalRService.sendIceCandidate(roomCode, event.candidate);
      }
    };

    peerConnections.current[connectionId] = pc;

    // Create offer if we're the initiator
    if (localStream) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      signalRService.sendOffer(roomCode, offer);
    }

    return pc;
  };

  const handleOffer = async (connectionId: string, offer: RTCSessionDescriptionInit) => {
    let pc = peerConnections.current[connectionId];
    if (!pc) {
      pc = await createPeerConnection(connectionId);
    }

    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    signalRService.sendAnswer(roomCode, answer);
  };

  const handleAnswer = async (connectionId: string, answer: RTCSessionDescriptionInit) => {
    const pc = peerConnections.current[connectionId];
    if (pc) {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    }
  };

  const handleIceCandidate = async (connectionId: string, candidate: RTCIceCandidateInit) => {
    const pc = peerConnections.current[connectionId];
    if (pc) {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  return { remoteStreams, localVideoRef };
};