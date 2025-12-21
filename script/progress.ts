import { Library } from "@library";
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
        const isProgressValid = 0 < totalTasks && completedTasks < totalTasks;
        UI.progressCircleVisibilityApplier.show(isProgressValid);
        document.body.classList.toggle("progress-circle", isProgressValid);
        UI.progressCircle.style.setProperty("--progress", `${completedTasks / totalTasks}`);
        UI.progressCircle.setAttribute("aria-volumemin", "0");
        UI.progressCircle.setAttribute("aria-volumemax", totalTasks.toString());
        UI.progressCircle.setAttribute("aria-valuenow", completedTasks.toString());
        Library.UI.setAttribute
        (
            UI.progressCircle,
            "aria-valuetext",
            isProgressValid ?
                `${Library.Locale.map("loading-media")}${Library.Locale.map("lang-colon-suffix")} ${completedTasks.toString()} / ${totalTasks.toString()}`:
                undefined
        );
        if (totalTasks <= completedTasks)
        {
            totalTasks = 0;
            completedTasks = 0
        }
    }
}
