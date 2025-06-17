import { getAllWorkouts } from '@/api';
import SideBar from '@/components/SideBar';
import type { WorkoutDO } from '@/useWorkoutStore';
import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/history')({
  component: HistoryPage,
})

function HistoryPage() {
  const [data, setData] = useState<WorkoutDO[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      const result = await getAllWorkouts();
      console.log('Fetched data:', result);
      setData(result);
    };
    fetchData();
  }, []);


  return (
    <div className='flex min-h-screen bg-gradient-to-b from-[#862121] to-[#17132F] text-white'>
      <SideBar activeMenu={1} />
      <div>
        {
          data.map((workout) => (
            <div key={workout.workout.id} className='m-8 bg-white/30 p-4 rounded-lg'>
              <h2 className='text-2xl'>{workout.workout.date.split("T")[0]}</h2>
              <p>Duration: {workout.workout.lengthInSeconds / 60} minutes</p>
              <h3 className='font-semibold'>Exercises:</h3>
              <ul>
                {workout.exercises.map((exercise, index) => (
                  <li key={index} className='mb-2'>
                    <strong>{exercise.name}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))

        }
      </div>
    </div>
  )
}
