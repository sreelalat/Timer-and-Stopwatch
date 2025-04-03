import { Timer as TimerIcon, Watch } from 'lucide-react';
import Button from '../atomComponents/Button';

interface NavigationContentProps {
  activeTab: 'timers' | 'stopwatch';
  setActiveTab: (tab: 'timers' | 'stopwatch') => void;
}

const NavigationContent = ({ activeTab, setActiveTab }: NavigationContentProps) => (
  <>
    {/* <button
      onClick={() => setActiveTab('timers')}
      className={`flex items-center gap-2 transition-colors ${
        activeTab === 'timers'
          ? 'text-green-600'
          : 'text-gray-600 hover:text-green-600'
      }`}
    >

    </button> */}
    <Button
      label={
        <>
          <TimerIcon className="w-5 h-5" />
          <span className="font-medium">Timers</span>
        </>
      }
      onClick={() => setActiveTab('timers')}
      variant={'outline'}
      className={`flex items-center gap-2 transition-colors ${activeTab === 'timers'
        ? 'text-green-600'
        : 'text-gray-600 hover:text-green-600'
        }`}
    />
    <Button
      label={
        <>
          <Watch className="w-5 h-5" />
          <span className="font-medium">Stopwatch</span>
        </>
      }
      onClick={() => setActiveTab('stopwatch')}
      variant={'outline'}
      className={`flex items-center gap-2 transition-colors 
      ${activeTab === 'stopwatch'
          ? 'text-green-600'
          : 'text-gray-600 hover:text-green-600'
        }`}
    />
  </>
);

export default NavigationContent; 