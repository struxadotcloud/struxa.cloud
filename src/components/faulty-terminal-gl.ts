// Shared between the main-thread fallback and the worker path in
// faulty-terminal.tsx / faulty-terminal-worker.ts — kept dependency-free
// (no DOM APIs beyond canvas/gl/rAF, all of which exist in a dedicated
// worker scope too) so the exact same render code runs on either thread.

export type Vec2 = [number, number];
export type Vec3 = [number, number, number];

export const vertexShader = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const fragmentShader = `
precision mediump float;

varying vec2 vUv;

uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;

uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uChromaticAberration;
uniform float uDither;
uniform float uCurvature;
uniform vec3  uTint;
uniform vec2  uMouse;
uniform float uMouseStrength;
uniform float uUseMouse;
uniform float uBrightness;

float time;

float hash21(vec2 p){
  p = fract(p * 234.56);
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p)
{
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2;
}

mat2 rotate(float angle)
{
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p)
{
  p *= 1.1;
  float f = 0.0;
  float amp = 0.5 * uNoiseAmp;

  mat2 modify0 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify0 * p * 2.0;
  amp *= 0.454545;

  mat2 modify1 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify1 * p * 2.0;
  amp *= 0.454545;

  mat2 modify2 = rotate(time * 0.08);
  f += amp * noise(p);

  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r) {
  vec2 offset1 = vec2(1.0);
  vec2 offset0 = vec2(0.0);
  mat2 rot01 = rotate(0.1 * time);
  mat2 rot1 = rotate(0.1);

  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
  return fbm(p + r);
}

float digit(vec2 p){
    vec2 grid = uGridMul * 15.0;
    vec2 s = floor(p * grid) / grid;
    p = p * grid;
    vec2 q, r;
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;

    if(uUseMouse > 0.5){
        vec2 mouseWorld = uMouse * uScale;
        float distToMouse = distance(s, mouseWorld);
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;
        intensity += mouseInfluence;

        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;
        intensity += ripple;
    }

    p = fract(p);
    p *= uDigitSize;

    float px5 = p.x * 5.0;
    float py5 = (1.0 - p.y) * 5.0;
    float x = fract(px5);
    float y = fract(py5);

    float i = floor(py5) - 2.0;
    float j = floor(px5) - 2.0;
    float n = i * i + j * j;
    float f = n * 0.0625;

    float isOn = step(0.1, intensity - f);
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);

    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
}

float onOff(float a, float b, float c)
{
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;
}

float displace(vec2 look)
{
    float y = look.y - mod(iTime * 0.25, 1.0);
    float window = 1.0 / (1.0 + 50.0 * y * y);
    return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;
}

vec3 getColor(vec2 p){

    float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;
    bar *= uScanlineIntensity;

    float displacement = displace(p);
    p.x += displacement;

    if (uGlitchAmount != 1.0) {
      float extra = displacement * (uGlitchAmount - 1.0);
      p.x += extra;
    }

    float middle = digit(p);

    // ponytail: was a 3x3 supersample box (9 extra digit() calls) for AA
    // softening on a background that sits at 15% opacity — a cross sample
    // (4 taps) is indistinguishable at that opacity and halves the fragment
    // shader's cost, which is what actually drives per-frame GPU/driver time.
    const float off = 0.002;
    float sum = middle + digit(p + vec2(-off, 0.0)) + digit(p + vec2(off, 0.0)) +
                digit(p + vec2(0.0, -off)) + digit(p + vec2(0.0, off));

    vec3 baseColor = vec3(0.9) * middle + sum * 0.18 * vec3(1.0) * bar;
    return baseColor;
}

vec2 barrel(vec2 uv){
  vec2 c = uv * 2.0 - 1.0;
  float r2 = dot(c, c);
  c *= 1.0 + uCurvature * r2;
  return c * 0.5 + 0.5;
}

void main() {
    time = iTime * 0.333333;
    vec2 uv = vUv;

    if(uCurvature != 0.0){
      uv = barrel(uv);
    }

    vec2 p = uv * uScale;
    vec3 col = getColor(p);

    if(uChromaticAberration != 0.0){
      vec2 ca = vec2(uChromaticAberration) / iResolution.xy;
      col.r = getColor(p + ca).r;
      col.b = getColor(p - ca).b;
    }

    col *= uTint;
    col *= uBrightness;

    if(uDither > 0.0){
      float rnd = hash21(gl_FragCoord.xy);
      col += (rnd - 0.5) * (uDither * 0.003922);
    }

    gl_FragColor = vec4(col, 1.0);
}
`;

export function hexToRgb(hex: string): Vec3 {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const num = parseInt(h, 16);
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

// Compiles + links without ever forcing a synchronous driver stall on the
// happy path: shaderSource/compileShader/attachShader/linkProgram calls
// return immediately (the driver is free to compile async), and we only
// query status once KHR_parallel_shader_compile reports it's actually done.
export function linkProgramAsync(
  gl: WebGLRenderingContext,
  onReady: (program: WebGLProgram) => void,
): () => void {
  let cancelled = false;

  const vs = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vs, vertexShader);
  gl.compileShader(vs);

  const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fs, fragmentShader);
  gl.compileShader(fs);

  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  const finalize = () => {
    if (cancelled) return;
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
    }
    onReady(program);
  };

  const parallelExt = gl.getExtension('KHR_parallel_shader_compile') as {
    COMPLETION_STATUS_KHR: number;
  } | null;

  let rafId = 0;
  if (parallelExt) {
    const poll = () => {
      if (cancelled) return;
      if (gl.getProgramParameter(program, parallelExt.COMPLETION_STATUS_KHR)) {
        finalize();
      } else {
        rafId = requestAnimationFrame(poll);
      }
    };
    poll();
  } else {
    // ponytail: no parallel-compile support — this status query is a
    // genuine synchronous stall. Callers should prefer running this whole
    // module inside a worker (see faulty-terminal-worker.ts) when possible,
    // so that even this fallback stall never touches the main thread.
    finalize();
  }

  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
  };
}

const UNIFORM_NAMES = [
  'iTime',
  'iResolution',
  'uScale',
  'uGridMul',
  'uDigitSize',
  'uScanlineIntensity',
  'uGlitchAmount',
  'uFlickerAmount',
  'uNoiseAmp',
  'uChromaticAberration',
  'uDither',
  'uCurvature',
  'uTint',
  'uMouse',
  'uMouseStrength',
  'uUseMouse',
  'uBrightness',
] as const;

type UniformLocations = Record<(typeof UNIFORM_NAMES)[number], WebGLUniformLocation | null>;

export interface FaultyTerminalConfig {
  scale: number;
  gridMul: Vec2;
  digitSize: number;
  timeScale: number;
  scanlineIntensity: number;
  glitchAmount: number;
  flickerAmount: number;
  noiseAmp: number;
  chromaticAberration: number;
  dither: number;
  curvature: number;
  tint: Vec3;
  mouseReact: boolean;
  mouseStrength: number;
  brightness: number;
}

export interface FaultyTerminalController {
  resize: (w: number, h: number) => void;
  setMouse: (x: number, y: number) => void;
  dispose: () => void;
}

// Runs identically whether `gl` came from an on-page <canvas> or a
// worker-owned OffscreenCanvas — no DOM access beyond the gl context itself.
export function runFaultyTerminal(
  gl: WebGLRenderingContext,
  canvas: { width: number; height: number },
  config: FaultyTerminalConfig,
): FaultyTerminalController {
  let disposed = false;
  let rafId = 0;
  let pendingSize: { w: number; h: number } | null = null;
  const mouse = { x: 0.5, y: 0.5 };
  let applyPendingSize: () => void = () => {};
  let disposeExtra: (() => void) | undefined;

  const cancelLink = linkProgramAsync(gl, (program) => {
    if (disposed) return;

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, 'position');

    const uniforms = Object.fromEntries(
      UNIFORM_NAMES.map((name) => [name, gl.getUniformLocation(program, name)]),
    ) as UniformLocations;

    gl.useProgram(program);
    gl.enableVertexAttribArray(posLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.uniform1f(uniforms.uScale, config.scale);
    gl.uniform2fv(uniforms.uGridMul, config.gridMul);
    gl.uniform1f(uniforms.uDigitSize, config.digitSize);
    gl.uniform1f(uniforms.uScanlineIntensity, config.scanlineIntensity);
    gl.uniform1f(uniforms.uGlitchAmount, config.glitchAmount);
    gl.uniform1f(uniforms.uFlickerAmount, config.flickerAmount);
    gl.uniform1f(uniforms.uNoiseAmp, config.noiseAmp);
    gl.uniform1f(uniforms.uChromaticAberration, config.chromaticAberration);
    gl.uniform1f(uniforms.uDither, config.dither);
    gl.uniform1f(uniforms.uCurvature, config.curvature);
    gl.uniform3fv(uniforms.uTint, config.tint);
    gl.uniform1f(uniforms.uMouseStrength, config.mouseStrength);
    gl.uniform1f(uniforms.uUseMouse, config.mouseReact ? 1 : 0);
    gl.uniform1f(uniforms.uBrightness, config.brightness);

    applyPendingSize = () => {
      if (!pendingSize) return;
      const { w, h } = pendingSize;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform3f(uniforms.iResolution, w, h, w / h);
    };
    applyPendingSize();

    const timeOffset = Math.random() * 100;
    const FRAME_INTERVAL = 1000 / 30;
    let lastFrame = 0;
    const smooth = { x: 0.5, y: 0.5 };

    const update = (t: number) => {
      rafId = requestAnimationFrame(update);
      if (t - lastFrame < FRAME_INTERVAL) return;
      lastFrame = t;

      gl.uniform1f(uniforms.iTime, (t * 0.001 + timeOffset) * config.timeScale);

      if (config.mouseReact) {
        smooth.x += (mouse.x - smooth.x) * 0.08;
        smooth.y += (mouse.y - smooth.y) * 0.08;
        gl.uniform2f(uniforms.uMouse, smooth.x, smooth.y);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    rafId = requestAnimationFrame(update);

    disposeExtra = () => {
      gl.deleteProgram(program);
      gl.deleteBuffer(posBuffer);
    };
  });

  return {
    resize(w, h) {
      pendingSize = { w, h };
      applyPendingSize();
    },
    setMouse(x, y) {
      mouse.x = x;
      mouse.y = y;
    },
    dispose() {
      disposed = true;
      cancelLink();
      cancelAnimationFrame(rafId);
      disposeExtra?.();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
