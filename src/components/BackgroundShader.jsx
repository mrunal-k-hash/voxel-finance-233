import { useEffect, useRef } from 'react';

const BackgroundShader = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
        vec2 uv = v_texCoord;
        float time = u_time * 0.2;
        
        // Create organic flowing movement
        float noise = sin(uv.x * 3.0 + time) * cos(uv.y * 2.0 - time) * 0.5 + 0.5;
        float noise2 = sin(uv.y * 4.0 - time * 0.8) * cos(uv.x * 3.0 + time * 1.2) * 0.5 + 0.5;
        
        // Light clean background
        vec3 color1 = vec3(0.97, 0.98, 1.0);
        // Soft blue accent
        vec3 color2 = vec3(0.14, 0.39, 0.92);
        // Vibrant blue accent
        vec3 color3 = vec3(0.23, 0.51, 0.96);
        
        float mixFactor = smoothstep(0.3, 0.7, noise * noise2 + uv.y * 0.2);
        vec3 finalColor = mix(color1, color2 * 0.12, mixFactor);
        finalColor = mix(finalColor, color3 * 0.08, smoothstep(0.8, 1.0, noise2) * 0.5);
        
        // Add subtle grain/shimmer
        float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
        finalColor += grain * 0.02;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const createShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(s));
      }
      return s;
    };

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');

    const handleResize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(canvas);
    handleResize();

    const render = (t) => {
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-20 w-full h-full opacity-40 pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default BackgroundShader;
