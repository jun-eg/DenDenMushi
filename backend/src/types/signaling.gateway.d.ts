export type SignalingMessage = {
  type: string;
  target: string;
  payload: RTCSessionDescriptionInit | RTCIceCandidateInit;
};
