const SpeechRecognition =
  (window as any)?.SpeechRecognition ??
  (window as any)?.webkitSpeechRecognition;

export default SpeechRecognition;
