// On-device speech-to-text fallback for browsers without the native
// Web Speech API (Safari/iOS, Firefox). Runs a small Whisper model
// entirely client-side via @xenova/transformers — no server, no API key,
// no per-request cost. First call downloads the model (~75MB) and caches
// it in the browser; later calls reuse the cached pipeline.
let transcriberPromise = null;

function getTranscriber(progressCallback) {
  if (!transcriberPromise) {
    transcriberPromise = import('@xenova/transformers').then(({ pipeline, env }) => {
      env.allowLocalModels = false;
      return pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en', {
        progress_callback: progressCallback,
      });
    });
  }
  return transcriberPromise;
}

async function resampleTo16kMono(arrayBuffer) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const decodeCtx = new AudioCtx();
  const decoded = await decodeCtx.decodeAudioData(arrayBuffer);
  decodeCtx.close().catch(() => {});

  const offlineCtx = new OfflineAudioContext(1, Math.ceil(decoded.duration * 16000), 16000);
  const source = offlineCtx.createBufferSource();
  source.buffer = decoded;
  source.connect(offlineCtx.destination);
  source.start();
  const rendered = await offlineCtx.startRendering();
  return rendered.getChannelData(0);
}

export async function transcribeAudioBlob(blob, progressCallback) {
  const [transcriber, arrayBuffer] = await Promise.all([
    getTranscriber(progressCallback),
    blob.arrayBuffer(),
  ]);
  const audioData = await resampleTo16kMono(arrayBuffer);
  const result = await transcriber(audioData);
  return result?.text?.trim() || '';
}
