import { UI } from "./ui";
export namespace Progress
{
    let totalTasks: number = 0;
    let completedTasks: number = 0;
    export const incrementTask = (progress: number = 1): void =>
    {
        totalTasks += progress;
        updateProgress();
    }
    export const completeTask = (progress: number = 1): void =>
    {
        completedTasks += progress;
        updateProgress();
    }
    export const updateProgress = (): void =>
    {
        document.body.classList.toggle("progress-circle", 0 < totalTasks && completedTasks < totalTasks);
        UI.progressCircle.style.setProperty("--progress", `${completedTasks / totalTasks}`);
        if (totalTasks <= completedTasks)
        {
            totalTasks = 0;
            completedTasks = 0
        }
    }
}
