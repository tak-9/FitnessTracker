const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log("Err",err);
      throw err;
    }
    const json = await res.json();
    if (res.ok) {
      // If HTTP status is 200-299 (Normal case)
      return json[json.length - 1];
    } else {
      // Error case 
      throw json;
    }
  },
  async addExercise(data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    if (res.ok) {
      // If HTTP status is 200-299 (Normal case)
      return json;
     } else {
      // Error case 
      throw json;
    }
  },
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();
    if (res.ok) {
      // If HTTP status is 200-299 (Normal case)
      return json;
     } else {
      // Error case 
      throw json;
    }
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    if (res.ok) {
      // If HTTP status is 200-299 (Normal case)
      return json;
     } else {
      // Error case 
      throw json;
    }

  },
};
