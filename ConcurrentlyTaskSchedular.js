async function simulateTask(taskId, time) {
  return new Promise((resolve) => {
    console.log(`Task ${taskId} started`);
    setTimeout(() => {
      console.log(`Task ${taskId} completed`);
      resolve(taskId);
    }, time);
  });
}

async function processTasks(tasks, concurrency) {
  const taskQueue = [...tasks];
  const runningTasks = new Set();

  async function runTask() {
    if (taskQueue.length === 0 && runningTasks.size === 0) {
      return;
    }

    while (runningTasks.size < concurrency && taskQueue.length > 0) {
      const [taskId, time] = taskQueue.shift();
      const taskPromise = simulateTask(taskId, time).then(() => {
        runningTasks.delete(taskPromise);
        runTask(); // Try to run another task
      });
      runningTasks.add(taskPromise);
    }
  }

  await runTask();
}

// Example usage
const tasks = [
  [123, 2000],
  [234, 3000],
  [231, 1000],
  [345, 1500],
  [456, 2500],
];

processTasks(tasks, 2);
