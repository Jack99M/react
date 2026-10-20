import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import type { Mesh } from 'three'
import './App.css'

// 1. ESFERA (Izquierda): Cambia de color con cada clic
function EsferaInteractiva() {
  const meshRef = useRef<Mesh>(null!)
  const [encima, setEncima] = useState(false)
  const colores = ['#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#9b59b6']
  const [indiceColor, setIndiceColor] = useState(0)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[-2.8, 0, 10]}
      scale={encima ? 1.5 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
      onClick={() => setIndiceColor((prev) => (prev + 1) % colores.length)}
    >
      <sphereGeometry args={[0.85, 32, 32]} />
      <meshStandardMaterial color={colores[indiceColor]} roughness={0.3} metalness={0.2} />
    </mesh>
  )
}

// 2. DONA / TOROIDE (Centro): Tiene un contador de clics
function DonaInteractiva() {
  const meshRef = useRef<Mesh>(null!)
  const [encima, setEncima] = useState(false)
  const [contador, setContador] = useState(0)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.8
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[-10, 10, 5]}
      scale={encima ? 1.5 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
      onClick={() => setContador((c) => c + 1)}
    >
      <torusGeometry args={[0.7, 0.28, 16, 64]} />
      <meshStandardMaterial color="#ff7f50" roughness={0.3} metalness={0.1} />

      {/* Etiqueta flotante con el contador de clics */}
      <Html position={[0, 1.3, 0]} center distanceFactor={8}>
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.75)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '25px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            border: '25px solid rgba(255,255,255,0.3)',
          }}
        >
          Clics: {contador}
        </div>
      </Html>
    </mesh>
  )
}

// 3. CONO (Derecha): Alterna entre modo sólido y modo alambre (wireframe)
function ConoInteractivo() {
  const meshRef = useRef<Mesh>(null!)
  const [encima, setEncima] = useState(false)
  const [alambre, setAlambre] = useState(false)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 1.8
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[4, 0, -5]}
      scale={encima ? 1.5 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
      onClick={() => setAlambre((prev) => !prev)}
    >
      <coneGeometry args={[0.8, 1.6, 32]} />
      <meshStandardMaterial color="#00d2d3" wireframe={alambre} roughness={0.3} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
      <Environment files="360.jpg" background />
      <EsferaInteractiva />
      <DonaInteractiva />
      <ConoInteractivo />
    </Canvas>
  )
}

export default App
