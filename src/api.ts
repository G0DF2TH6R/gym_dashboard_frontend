import type { WorkoutDO } from "./useWorkoutStore";

export const postNewWorkout = async (workout: WorkoutDO): Promise<WorkoutDO> => {
  console.log("Posting new workout:", workout);

  const response = await fetch("http://192.168.69.192:8080/workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(workout)
  });

  console.log(response)

  if (!response.ok) {
    throw new Error(`Failed to post workout: ${response.statusText}`);
  }

  const data: WorkoutDO = await response.json();
  return data;
};

export const getAllWorkouts = async (): Promise<WorkoutDO[]> => {
  const response = await fetch('http://192.168.69.192:8080/workouts'); // Replace with your API endpoint
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to post workout: ${response.statusText}`);
  }

  return result;
};
  