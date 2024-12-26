import { useCallback, useRef, memo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const SkillTree = memo(function SkillTree() {
  const fgRef = useRef();

  const skillsData = {
    nodes: [
      // Reduce number of nodes and organize them better
      { id: 'Core', group: 1, level: 95, size: 20 },
      { id: 'AI/ML', group: 1, level: 90, size: 15 },
      { id: 'Web Dev', group: 2, level: 88, size: 15 },
      { id: 'Python', group: 1, level: 95, size: 12 },
      { id: 'React', group: 2, level: 88, size: 12 },
      { id: 'Node.js', group: 2, level: 85, size: 12 }
    ],
    links: [
      // Simplified connections
      { source: 'Core', target: 'AI/ML', value: 1 },
      { source: 'Core', target: 'Web Dev', value: 1 },
      { source: 'AI/ML', target: 'Python', value: 0.5 },
      { source: 'Web Dev', target: 'React', value: 0.5 },
      { source: 'Web Dev', target: 'Node.js', value: 0.5 }
    ]
  };

  const handleNodeClick = useCallback(node => {
    if (!fgRef.current) return;
    fgRef.current.centerAt(node.x, node.y, 1000);
    fgRef.current.zoom(1.5, 1000);
  }, []);

  return (
    <div className="w-full h-[500px] bg-gray-900/50 rounded-xl backdrop-blur-sm overflow-hidden">
      <ForceGraph2D
        ref={fgRef}
        graphData={skillsData}
        nodeRelSize={node => node.size}
        nodeColor={node => {
          const colors = ['#3b82f6', '#10b981', '#8b5cf6'];
          return colors[node.group - 1];
        }}
        nodeLabel={node => `${node.id}: ${node.level}%`}
        linkColor={() => '#ffffff10'}
        linkWidth={link => link.value * 2}
        onNodeClick={handleNodeClick}
        cooldownTicks={50}
        d3VelocityDecay={0.3}
        enableNodeDrag={false}
        enableZoomInteraction={true}
        enablePanInteraction={true}
        minZoom={0.5}
        maxZoom={2}
        nodeCanvasObjectMode={() => 'after'}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const size = node.size || 8;
          const fontSize = (size * 1.2) / globalScale;
          
          ctx.font = `${fontSize}px Inter`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#fff';
          ctx.fillText(node.id, node.x, node.y);

          // Draw progress circle
          const radius = size / 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
          ctx.strokeStyle = '#ffffff30';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw progress
          const progress = (node.level / 100) * 2 * Math.PI;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, -Math.PI / 2, progress - Math.PI / 2);
          ctx.strokeStyle = '#3b82f6';
          ctx.stroke();
        }}
      />
    </div>
  );
});

export default SkillTree;
