import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const NeuralBackground = () => {
  const containerRef = useRef();
  const animationRef = useRef();
  const scene = useRef(new THREE.Scene());
  const camera = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const nodes = useRef([]);
  const connections = useRef([]);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: false,
      powerPreference: "low-power"
    });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Reduce number of nodes
    const nodeCount = Math.min(30, Math.floor(window.innerWidth / 50));
    
    // Create nodes with optimized geometry
    const geometry = new THREE.SphereGeometry(0.1, 4, 4);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.4
    });

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(geometry, material);
      node.position.set(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
      );
      node.velocity = new THREE.Vector3(
        Math.random() * 0.01 - 0.005,
        Math.random() * 0.01 - 0.005,
        Math.random() * 0.01 - 0.005
      );
      nodes.current.push(node);
      scene.current.add(node);
    }

    camera.current.position.z = 15;

    let lastTime = 0;
    const animate = (currentTime) => {
      // Limit frame rate
      if (currentTime - lastTime < 30) { // ~30fps
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      nodes.current.forEach(node => {
        node.position.add(node.velocity);
        ['x', 'y', 'z'].forEach(axis => {
          if (Math.abs(node.position[axis]) > 10) {
            node.velocity[axis] *= -1;
          }
        });
      });

      // Update connections less frequently
      if (currentTime % 2 === 0) {
        connections.current.forEach(line => scene.current.remove(line));
        connections.current = [];

        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0x3b82f6,
          transparent: true,
          opacity: 0.2
        });

        nodes.current.forEach((node, i) => {
          nodes.current.slice(i + 1).forEach(otherNode => {
            const distance = node.position.distanceTo(otherNode.position);
            if (distance < 5) {
              const geometry = new THREE.BufferGeometry().setFromPoints([
                node.position,
                otherNode.position
              ]);
              const line = new THREE.Line(geometry, lineMaterial);
              connections.current.push(line);
              scene.current.add(line);
            }
          });
        });
      }

      renderer.render(scene.current, camera.current);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    const handleResize = () => {
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 opacity-20"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default React.memo(NeuralBackground);
