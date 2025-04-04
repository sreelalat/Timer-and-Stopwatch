import { useState } from 'react';
import { Clock } from 'lucide-react';
import { Toaster } from 'sonner';
import Stopwatch from './Stopwatch';
import Timer from './Timer';
import NavigationContent from '../components/NavigationContent';

function Home() {
  const [activeTab, setActiveTab] = useState<'timers' | 'stopwatch'>('timers');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />

      {/* Desktop Side Navigation */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Timer</h1>
          </div>
          <div className="flex flex-col gap-4">
            <NavigationContent activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 h-screen">
        <div className="container mx-auto px-4 py-8 h-full">
          <div className="flex items-center gap-3 lg:hidden">
            <Clock className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Timer</h1>
          </div>
          
          <div className="lg:mb-8 h-[calc(100%-50px)] lg:h-full">
            {activeTab === 'timers' ? <Timer /> : <Stopwatch />}
          </div>
          <div className='lg:hidden flex justify-around h-[50px] absolute bg-white w-full left-0 bottom-0'>
            <NavigationContent activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Home;


