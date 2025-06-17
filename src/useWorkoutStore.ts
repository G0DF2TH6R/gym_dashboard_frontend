import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type WorkoutSet = {
  reps: number;
  weight: number;
  rpe: number;
}

export type ExerciseDO = {
  name: string;
  sets: WorkoutSet[];
};

type WorkoutState = {
    date: string;
    duration: number;
    exercises: ExerciseDO[];

    changeDate: (date: string) => void;
    changeDuration: (duration: number) => void;
    changeExerciseName: (exerciseIndex: number, newName: string) => void;
    changeExercises: (exercises: ExerciseDO[]) => void;
    changeExerciseSet: (exerciseIndex: number, setIndex: number, newSet: WorkoutSet) => void;
    addExerciseSet: (exerciseIndex: number, newSet: WorkoutSet) => void;
    addExercise: (exercise: ExerciseDO) => void;
    removeExercise: (exerciseIndex: number) => void;
    removeExerciseSet: (exerciseIndex: number, setIndex: number) => void;
    resetWorkout: () => void;
};

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set) => ({
      date: "",
      duration: 0,
      exercises: [],

      changeDate: (newDate) => set(() => ({ date: newDate })),
      changeDuration: (newDuration) => set(() => ({ duration: newDuration })),
      changeExerciseName: (exerciseIndex, newName) => set((state) => {
        const updatedExercises = [...state.exercises];
        if (updatedExercises[exerciseIndex]) {
          updatedExercises[exerciseIndex].name = newName;
        }
        return { exercises: updatedExercises };
      }),
      changeExercises: (newExercises) => set(() => ({ exercises: newExercises })),
      changeExerciseSet: (exerciseIndex, setIndex, newSet) => set((state) => {
        const updatedExercises = [...state.exercises];
        if (updatedExercises[exerciseIndex] && updatedExercises[exerciseIndex].sets[setIndex]) {
          updatedExercises[exerciseIndex].sets[setIndex] = newSet;
        }
        return { exercises: updatedExercises };
      }),
      addExerciseSet: (exerciseIndex, newSet) => set((state) => {
        const updatedExercises = [...state.exercises];
        if (updatedExercises[exerciseIndex]) {
          updatedExercises[exerciseIndex].sets.push(newSet);
        }
        return { exercises: updatedExercises };
      }),
      addExercise: (newExercise) => set((state) => ({
        exercises: [...state.exercises, newExercise]
      })),
      removeExercise: (exerciseIndex) => set((state) => ({
        exercises: state.exercises.filter((_, index) => index !== exerciseIndex)
      })),
      removeExerciseSet: (exerciseIndex, setIndex) => set((state) => {
        const updatedExercises = [...state.exercises];
        if (updatedExercises[exerciseIndex]) {
          updatedExercises[exerciseIndex].sets = updatedExercises[exerciseIndex].sets.filter((_, index) => index !== setIndex);
        }
        return { exercises: updatedExercises };
      }),
      resetWorkout: () => set(() => ({
        date: "",
        duration: 0,
        exercises: []
      })),
    }),
    {
      name: 'workout-storage',
    }
  )
);


export type Workout = {
  id?: number;
  date: string;
  lengthInSeconds: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Exercise = {
  id?: number;
  name: string;
  equipmentType: string;
  dataType: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ExerciseWorkout = {
  exerciseName: string;
  setNo: number;
  reps: number;
  weight: number;
  timeInSeconds?: number | null;
};

export type WorkoutDO = {
  workout: Workout;
  exercises: Exercise[];
  exerciseWorkouts: ExerciseWorkout[];
};
