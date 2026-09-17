import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

// Convert Lat, Long to 3D Cartesian Position
function latLongToVector3(lat, lon, radius = 2) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Major destinations with coordinates
const destinationPins = [
  { name: 'Delhi', lat: 28.6139, lon: 77.2090, label: 'HQ Delhi 🇮🇳' },
  { name: 'Maldives', lat: 3.2028, lon: 73.2207, label: 'Maldives 🇲🇻' },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708, label: 'Dubai 🇦🇪' },
  { name: 'Paris', lat: 48.8566, lon: 2.3522, label: 'Paris 🇫🇷' },
  { name: 'Bali', lat: -8.4095, lon: 115.1889, label: 'Bali 🇮🇩' },
  { name: 'Kashmir', lat: 34.0837, lon: 74.7973, label: 'Kashmir 🏔️' }
];

// 3D Flight Arc Line between two points
function FlightArc({ start, end, color = "#38bdf8" }) {
  const curve = useMemo(() => {
    const startVec = latLongToVector3(start.lat, start.lon, 2.02);
    const endVec = latLongToVector3(end.lat, end.lon, 2.02);

    // Calculate mid point pushed outward for high flight arch
    const midVec = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    const distance = startVec.distanceTo(endVec);
    midVec.normalize().multiplyScalar(2.02 + distance * 0.4);

    const cubicCurve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
    return cubicCurve.getPoints(50);
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(curve);
    return geom;
  }, [curve]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} linewidth={2} transparent opacity={0.7} />
    </line>
  );
}

// Earth Sphere Mesh with Atmosphere & Continents Shader
function EarthSphere({ activePin, setActivePin }) {
  const earthRef = useRef();
  const cloudRef = useRef();

  // Slow continuous rotation
  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.08;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={earthRef}>
      {/* Ocean & Base Earth Sphere */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          color="#0f2b48"
          emissive="#041224"
          specular="#38bdf8"
          shininess={25}
        />
      </mesh>

      {/* Outer Atmosphere Glow */}
      <mesh scale={[1.03, 1.03, 1.03]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Floating Atmosphere Clouds Mesh */}
      <mesh ref={cloudRef} scale={[1.015, 1.015, 1.015]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>

      {/* Render Destination Pins */}
      {destinationPins.map((pin) => {
        const pos = latLongToVector3(pin.lat, pin.lon, 2.04);
        return (
          <group key={pin.name} position={[pos.x, pos.y, pos.z]}>
            {/* Glowing Pin Point */}
            <mesh
              onClick={() => setActivePin && setActivePin(pin)}
              onPointerOver={() => (document.body.style.cursor = 'pointer')}
              onPointerOut={() => (document.body.style.cursor = 'auto')}
            >
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshBasicMaterial color={activePin?.name === pin.name ? "#fbbf24" : "#38bdf8"} />
            </mesh>

            {/* Pulsing Pin Ring */}
            <mesh scale={[1.5, 1.5, 1.5]}>
              <ringGeometry args={[0.04, 0.06, 16]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>

            {/* Interactive HTML Label */}
            <Html distanceFactor={8} position={[0, 0.08, 0]} center>
              <div className="bg-slate-900/90 text-cyan-300 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border border-cyan-500/40 shadow-lg whitespace-nowrap select-none hover:scale-110 transition-transform">
                {pin.label}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Flight Arc Trajectories from Delhi */}
      {destinationPins.slice(1).map((dest) => (
        <FlightArc key={dest.name} start={destinationPins[0]} end={dest} />
      ))}
    </group>
  );
}

export default function Globe3D({ activePin, setActivePin }) {
  return (
    <div className="w-full h-full min-h-[380px] lg:min-h-[550px] relative select-none">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#38bdf8" />

        <Stars radius={100} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <EarthSphere activePin={activePin} setActivePin={setActivePin} />
        </Float>

        <OrbitControls
          enableZoom={true}
          minDistance={3.5}
          maxDistance={8}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.6}
        />
      </Canvas>

      {/* Floating Instructions Banner */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-cyan-500/30 text-xs text-cyan-200 pointer-events-none shadow-xl flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        Drag to rotate 3D Earth • Scroll to Zoom • Click pins to inspect
      </div>
    </div>
  );
}
