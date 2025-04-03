import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TimerList } from '../components/TimerList';
import { AddTimerModal } from '../components/AddTimerModal';
import Button from '../atomComponents/Button';

function Timer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (

    <div className="container mx-auto px-4 py-8">
      <Button
        label={<>
          <Plus className="w-5 h-5" />
          Add Timer
        </>}
        onClick={() => setIsModalOpen(true)}
        variant={'primary'}
        className='flex items-center gap-2 shadow-md hover:shadow-lg'
      />

      <TimerList />

      <AddTimerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Timer;


