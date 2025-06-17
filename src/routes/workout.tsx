import { postNewWorkout } from '@/api';
import { ExerciseComponent } from '@/components/Exercise'
import SideBar from '@/components/SideBar'
import { useWorkoutStore, type Exercise, type ExerciseDO, type ExerciseWorkout, type Workout, type WorkoutDO, type WorkoutSet } from '@/useWorkoutStore';
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/workout')({
  component: WorkoutPage,
})

function WorkoutPage() {
  const router = useRouter();

  const exercises: ExerciseDO[] = useWorkoutStore((state) => state.exercises);
  const date: string = useWorkoutStore((state) => state.date);
  const duration: number = useWorkoutStore((state) => state.duration);

  const setDate = useWorkoutStore((state) => state.changeDate);
  const setDuration = useWorkoutStore((state) => state.changeDuration);
  const addExercise = useWorkoutStore((state) => state.addExercise);

  const getCurrentDate = (): string => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const yyyy = today.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = event.target.value;
    if (inputDate) {
      const [year, month, day] = inputDate.split('-');
      const formattedDate = `${day}/${month}/${year}`;

      event.target.type = 'text';
      event.target.value = formattedDate;

      setDate(formattedDate);
    }
  }; 

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const inputDate = event.target.value;
    if (inputDate) {
      handleDateChange(event);
    } else {
      event.target.type = 'text';
      event.target.value = date;
    }
  };

  const submitWorkout = async () => {
    const [day, month, year] = date.split("/").map(Number);

    const formattedDate = new Date(Date.UTC(year, month - 1, day));

    const workoutObject: Workout = {
      date: formattedDate.toISOString(), // Convert to ISO string
      lengthInSeconds: duration * 60, // Convert minutes to seconds
    };

    const exercisesObject: Exercise[] = exercises.map((exercise) => {
      return {
        name: exercise.name,
        equipmentType: "barbell", //TODO - make this dynamic
        dataType: "reps", //TODO - make this dynamic
      }
    });

    const exerciseWorkoutObject: ExerciseWorkout[] = [];

    exercises.forEach((exercise) => {
      const sets: WorkoutSet[] = exercise.sets;

      sets.forEach((set, index) => {
        exerciseWorkoutObject.push({
          exerciseName: exercise.name,
          setNo: index + 1, // Assuming setNo is a property of WorkoutSet
          reps: set.reps,
          weight: set.weight,
        });
      });
    });

    const workoutData: WorkoutDO = {
      workout: workoutObject,
      exercises: exercisesObject,
      exerciseWorkouts: exerciseWorkoutObject,
    };

    const response = await postNewWorkout(workoutData);
    if (response) {
      console.log('Workout submitted successfully:', response);
    }
    useWorkoutStore.getState().resetWorkout(); // Reset the workout store after submission

  };

  return (
    <div className='flex min-h-screen bg-gradient-to-b from-[#862121] to-[#17132F] text-white'>
      <SideBar activeMenu={2}/>

      <div className='bg-white/30 w-[70vw] mx-[5vw] h-min-[70vh] mt-[10vh] pb-[5vh]'>
        <div className='flex items-center justify-center mb-[5vh]'>
          <input type='text' defaultValue={getCurrentDate()} placeholder='Select a date' onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => handleOnBlur(e)} className='p-[4px] rounded-full bg-[#8A817C] w-[15vw] text-center'></input>
          <h3 className='px-[40px] text-[30px] font-semibold underline'>New Workout</h3>
          <input onChange={(e) => setDuration(parseInt(e.target.value))} placeholder='Enter workout duration' type='number' className='p-[4px] rounded-full bg-[#8A817C] text-center w-[15vw]'></input>
        </div>

        <div className='flex flex-col space-y-8'>
          {exercises.map((exercise, index) => (
            <ExerciseComponent 
              key={index}
              exercise={exercise}
              index={index}
            />
          ))}
        </div>

        <div className='w-[100%] flex justify-center mt-[4vh] space-x-8'>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addExercise({ name: 'Bench press', sets: [] });
            }} 
            className='text-[24px] bg-[#2B3A67] hover:cursor-pointer hover:bg-white hover:text-black font-semibold px-12 py-2 rounded-full'>
            Add exercise
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              submitWorkout();
              router.navigate({ to: '/' })
            }} 
            className='text-[24px] bg-[#2B3A67] hover:cursor-pointer hover:bg-white hover:text-black font-semibold px-12 py-2 rounded-full'>
            Finish workout
          </button>
        </div>
      </div>
    </div>
  )
}
