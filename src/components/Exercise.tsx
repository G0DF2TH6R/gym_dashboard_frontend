import { useWorkoutStore, type ExerciseDO, type WorkoutSet } from "@/useWorkoutStore";

type ExerciseProps = {
    exercise: ExerciseDO;
    index: number;
};

export function ExerciseComponent({ exercise, index}: ExerciseProps) {
    const addExerciseSet = useWorkoutStore((state) => state.addExerciseSet);
    const removeExercise = useWorkoutStore((state) => state.removeExercise);
    const changeExerciseName = useWorkoutStore((state) => state.changeExerciseName);
    const exerciseIndex = index;

    return (
        <div className='flex flex-col w-[90%] mx-[5%] divide-y-1'>
          <div className='h-[8vh] text-[20px] text-center bg-[#8A817C] rounded-t-full justify-between flex items-center px-4'>
            <button className='ml-4 hover:cursor-pointer'>
              Edit
            </button>
            <input onChange={(e) => changeExerciseName(exerciseIndex, e.target.value)} defaultValue={exercise.name} className='font-semibold text-center'>
            </input>
            <button onClick={() => removeExercise(exerciseIndex)} className='mr-4 hover:cursor-pointer'>
              Delete
            </button>
          </div>
          <div className='h-[5vh] text-[18px] text-center bg-[#8A817C] flex justify-between px-[4vw]'>
            <p className="w-1/10">Set</p>
            <p className="w-3/10">Reps</p>
            <p className="w-3/10">Weight (kg)</p>
            <p className="w-2/10">RPE</p>
            <p className="w-1/10"></p>
          </div>
          {exercise.sets.map((set, index) => (
            <ExerciseRow key={index} values={set} index={index} exerciseIndex={exerciseIndex}  />
          ))}
          <button onClick={() => addExerciseSet(exerciseIndex, {reps: 0, weight: 0, rpe: 0})} className='h-[5vh] text-[18px] font-semibold bg-[#8A817C] flex justify-center px-[4vw] hover:cursor-pointer rounded-b-full'>
            Add new set
          </button>


        </div>
    );
}

type ExerciseRowProps = {
    values: WorkoutSet;
    index: number;
    exerciseIndex: number;
};

function ExerciseRow({ values, index, exerciseIndex }: ExerciseRowProps) {
    const removeExerciseSet = useWorkoutStore((state) => state.removeExerciseSet);
    const changeExerciseSet = useWorkoutStore((state) => state.changeExerciseSet);

    const handleRepsChange = (e: string) => {
      const newSet = values;
      newSet.reps = parseInt(e);
      changeExerciseSet(exerciseIndex, index, newSet);
    }

    const handleWeightChange = (e: string) => {
      const newSet = values;
      newSet.weight = parseInt(e);
      changeExerciseSet(exerciseIndex, index, newSet);
    }

    const handleRpeChange = (e: string) => {
      const newSet = values;
      newSet.rpe = parseInt(e);
      changeExerciseSet(exerciseIndex, index, newSet);
    }

    return (
        <div className='h-[5vh] text-[18px] text-center bg-[#8A817C] flex justify-between px-[4vw] items-center'>
            <p className="w-1/10">{index + 1}</p>
            <input type="number" onChange={(e) => handleRepsChange(e.target.value)} defaultValue={values.reps} className="w-3/10 text-center focus:outline-none focus:bg-gray-400 hover:cursor-default"></input>
            <input type="number" onChange={(e) => handleWeightChange(e.target.value)} defaultValue={values.weight} className="w-3/10 text-center focus:outline-none focus:bg-gray-400 hover:cursor-default"></input>
            <input type="number" onChange={(e) => handleRpeChange(e.target.value)} defaultValue={values.rpe} className="w-2/10 text-center focus:outline-none focus:bg-gray-400 hover:cursor-default"></input>
            <button onClick={() => removeExerciseSet(exerciseIndex, index)} className="w-1/10 text-center hover:cursor-pointer">Delete</button>
        </div>
    );
}
