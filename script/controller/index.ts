import * as ImportedBase from "./base";
import * as ImportedAnimation from "./animation";
import * as ImportedBenchmark from "./benchmark";
export namespace Controller
{
    export import Base = ImportedBase.Base;
    export import Animation = ImportedAnimation.Animation;
    export import Benchmark = ImportedBenchmark.Benchmark;
    export const toggleAnimation = () =>
    {
        switch(true)
        {
        case Animation.isInAnimation():
            Animation.pauseAnimation();
            break;
        case Benchmark.isInBenchmark():
            Benchmark.stopBenchmark();
            break;
        default:
            Animation.playAnimation();
            break;
        }
    }
    export const initialize = (params: Record<string, string>) =>
    {
        Animation.initialize(params);
    };
}
