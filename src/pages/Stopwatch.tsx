import { useRef, useState } from "react";
import { formatTimeInMs } from "../utils/time";
import { TimerControls } from "../components/TimerControls";
import Button from "../atomComponents/Button";
import { Flag, RotateCcw } from "lucide-react";

interface TimerType {
  duration: number; // in seconds
  isRunning: boolean;
}
interface LapType {
  lap: number;
  splitTime: number;
  totalTime: number;
}
function Stopwatch() {
  const [timer, setTimer] = useState<TimerType>({ duration: 0, isRunning: false });
  const [laps, setLaps] = useState<LapType[]>([]);
  const startTime = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleToggle = () => {
    if (timer.isRunning) {
      clearInterval(intervalRef.current!);
      setTimer((prev) => ({ ...prev, isRunning: false }));
    } else {
      const start = Date.now() - timer.duration;
      startTime.current = start;
      intervalRef.current = setInterval(() => {
        setTimer((prev) => ({ ...prev, duration: Date.now() - start }));
      }, 10);
      setTimer((prev) => ({ ...prev, isRunning: true }));
    }
  }

  const handleRestart = () => {
    clearInterval(intervalRef.current!);
    setTimer({ duration: 0, isRunning: false });
    setLaps([]);
  };

  const recordLap = () => {
    if (!timer.isRunning) return;
    const lapTime = timer.duration - (laps[0]?.totalTime || 0);
    setLaps([{ lap: laps.length + 1, splitTime: lapTime, totalTime: timer.duration }, ...laps]);
  };

  return <div>
    <div className="relative w-fit bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-102 overflow-hidden">
      <div className="text-4xl font-mono font-bold text-gray-800 mb-4">
        {formatTimeInMs(timer?.duration)}
      </div>
      <div>
        <TimerControls
          isRunning={timer.isRunning}
          onToggle={handleToggle}
        />
        <Button
          label={<Flag className="w-5 h-5" />}
          onClick={recordLap}
          variant='secondary'
          tooltip="Edit Timer"
          className='p-2 rounded-full'
        />
        <Button
          label={<RotateCcw className="w-5 h-5" />}
          onClick={handleRestart}
          variant='secondary'
          tooltip="Restart Timer"
          className='p-2 rounded-full'
        />
      </div>
      <div className="mt-4 bg-gray-50 p-2 rounded-lg">
        <table className="w-full text-sm text-left">
          <thead>
            <tr>
              <th className="px-2">Lap</th>
              <th className="px-2">Split Time</th>
              <th className="px-2">Total Time</th>
            </tr>
          </thead>
          <tbody>
            {laps.map((lap) => (
              <tr key={lap.lap} className="border-t">
                <td className="px-2">{lap.lap}</td>
                <td className="px-2">{formatTimeInMs(lap.splitTime)}</td>
                <td className="px-2">{formatTimeInMs(lap.totalTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
}

export default Stopwatch;
