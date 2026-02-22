import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const data = [
  { time: "00:00", predicted: 5, actual: 4 },
  { time: "04:00", predicted: 8, actual: 7 },
  { time: "08:00", predicted: 15, actual: 14 },
  { time: "12:00", predicted: 25, actual: 23 },
  { time: "16:00", predicted: 18, actual: 19 },
  { time: "20:00", predicted: 12, actual: 11 },
  { time: "24:00", predicted: 6, actual: null },
];

export function DelayPredictionChart() {
  return (
    <Card className="bg-black/50 border-white/10 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Delay Prediction Model</h3>
        <p className="text-sm text-muted-foreground">24-hour forecast with confidence intervals</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis dataKey="time" stroke="#888" />
          <YAxis stroke="#888" label={{ value: 'Delays (min)', angle: -90, position: 'insideLeft', fill: '#888' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a1a', 
              border: '1px solid #333',
              borderRadius: '8px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="predicted" 
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorPredicted)" 
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-muted-foreground">Predicted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-muted-foreground">Actual</span>
        </div>
      </div>
    </Card>
  );
}
