/// <reference lib="webworker" />
import { runFaultyTerminal, type FaultyTerminalConfig, type FaultyTerminalController } from './faulty-terminal-gl';

// Runs the entire WebGL setup — including the KHR_parallel_shader_compile
// fallback's synchronous status query — off the main thread. On a renderer
// that lacks the parallel-compile extension (software rendering, some
// older/mobile GPUs), that query is a genuine multi-hundred-ms driver stall;
// doing it here means it can never freeze page interaction, regardless of
// renderer capability.

let controller: FaultyTerminalController | null = null;

type InitMessage = {
  type: 'init';
  canvas: OffscreenCanvas;
  config: FaultyTerminalConfig;
  width: number;
  height: number;
};
type ResizeMessage = { type: 'resize'; width: number; height: number };
type MouseMessage = { type: 'mouse'; x: number; y: number };
type DisposeMessage = { type: 'dispose' };
type InMessage = InitMessage | ResizeMessage | MouseMessage | DisposeMessage;

// Software renderers are also slow per-draw-call, not just to compile — drop
// resolution further so per-frame cost stays cheap regardless of hardware.
function renderScaleFor(gl: WebGLRenderingContext) {
  return gl.getExtension('KHR_parallel_shader_compile') ? 0.45 : 0.25;
}

let scale = 0.45;

self.onmessage = (e: MessageEvent<InMessage>) => {
  const msg = e.data;

  if (msg.type === 'init') {
    const gl = msg.canvas.getContext('webgl', {
      antialias: false,
      depth: false,
      stencil: false,
    }) as WebGLRenderingContext | null;
    if (!gl) return;

    scale = renderScaleFor(gl);
    controller = runFaultyTerminal(gl, msg.canvas, msg.config);
    controller.resize(Math.max(1, Math.round(msg.width * scale)), Math.max(1, Math.round(msg.height * scale)));
    return;
  }

  if (msg.type === 'resize') {
    controller?.resize(Math.max(1, Math.round(msg.width * scale)), Math.max(1, Math.round(msg.height * scale)));
    return;
  }

  if (msg.type === 'mouse') {
    controller?.setMouse(msg.x, msg.y);
    return;
  }

  if (msg.type === 'dispose') {
    controller?.dispose();
    controller = null;
  }
};
