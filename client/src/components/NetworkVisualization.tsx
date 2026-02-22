import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

export function NetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const nodes = [
      { id: "JFK", x: 150, y: 200, status: "normal", label: "JFK" },
      { id: "LAX", x: 450, y: 250, status: "warning", label: "LAX" },
      { id: "ORD", x: 300, y: 150, status: "critical", label: "ORD" },
      { id: "ATL", x: 250, y: 300, status: "normal", label: "ATL" },
      { id: "DFW", x: 400, y: 350, status: "normal", label: "DFW" },
      { id: "DEN", x: 350, y: 100, status: "warning", label: "DEN" },
    ];

    const edges = [
      { from: "JFK", to: "LAX", status: "normal" },
      { from: "JFK", to: "ORD", status: "delayed" },
      { from: "ORD", to: "LAX", status: "delayed" },
      { from: "ORD", to: "DEN", status: "normal" },
      { from: "ATL", to: "DFW", status: "normal" },
      { from: "LAX", to: "DFW", status: "normal" },
    ];

    let animationFrame = 0;

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      edges.forEach((edge) => {
        const fromNode = nodes.find((n) => n.id === edge.from);
        const toNode = nodes.find((n) => n.id === edge.to);
        if (!fromNode || !toNode) return;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = edge.status === "delayed" ? "rgba(239, 68, 68, 0.4)" : "rgba(100, 116, 139, 0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();

        if (edge.status === "delayed") {
          const progress = (animationFrame % 60) / 60;
          const x = fromNode.x + (toNode.x - fromNode.x) * progress;
          const y = fromNode.y + (toNode.y - fromNode.y) * progress;
          
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(239, 68, 68, 0.8)";
          ctx.fill();
        }
      });

      nodes.forEach((node) => {
        const colors = {
          normal: "#10b981",
          warning: "#f59e0b",
          critical: "#ef4444",
        };

        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = colors[node.status] + "40";
        ctx.fill();
        ctx.strokeStyle = colors[node.status];
        ctx.lineWidth = 3;
        ctx.stroke();

        if (node.status === "critical") {
          const pulse = Math.sin(animationFrame * 0.1) * 5 + 25;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulse, 0, Math.PI * 2);
          ctx.strokeStyle = colors[node.status] + "20";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.fillStyle = "#fff";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y - 30);
      });

      animationFrame++;
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <Card className="bg-black/50 border-white/10 p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Live Network Status</h3>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-muted-foreground">Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-muted-foreground">Critical</span>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="w-full h-[400px] rounded-lg" />
    </Card>
  );
}
