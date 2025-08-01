import { Features } from "@features";
import { Library } from "@library";
import { Base } from "./base";
import { UI } from "../ui";
import config from "@resource/config.json";
export namespace Benchmark
{
    export const benchmark = new Features.Benchmark.Measurement(UI.benchmarkCanvas);
    export const loopBenchmark = (now: number) =>
    {
        if (isInBenchmark())
        {
            Features.Fps.step(now);
            UI.showFps.get();
            benchmark.step(now);
            if (benchmark.isEnd())
            {
                benchmark.end();
                setTimeout
                (
                    () =>
                    {
                        stopBenchmark();
                        showResult();
                    },
                    config.benchmark.endWait
                );
            }
            else
            {
                window.requestAnimationFrame(loopBenchmark);
            }
        }
    };
    export const isInBenchmark = () =>
        Base.isInMode("benchmark");
    export const isInBenchmarkResult = () =>
        document.body.classList.contains("benchmark-result");
    export const isInBenchmarkOrResult = () =>
        isInBenchmark() || isInBenchmarkResult();
    export const runBenchmark = () =>
    {
        Base.intoMode("benchmark");
        benchmark.start();
        if (Library.UI.fullscreenEnabled)
        {
            Library.UI.requestFullscreen(document.body);
        }
        setTimeout
        (
            () =>
            window.requestAnimationFrame
            (
                now =>
                {
                    loopBenchmark(now);
                }
            ),
            config.benchmark.startWait
        );
    };
    export const stopBenchmark = () =>
    {
        if (isInBenchmark())
        {
            console.log
            (
                "📈 fps",
                {
                    count: Features.Fps.standardDeviation.count,
                    mean: Features.Fps.standardDeviation.mean,
                    standardDeviation: Features.Fps.standardDeviation.getStandardDeviation(),
                }
            );
        }
        Base.exitMode("benchmark");
        document.body.classList.toggle("benchmark-rendering", false);
    };
    const numberResultToText = (i: number) =>
        i.toFixed(config.benchmark.decimalDigits);
    const showMeasurementScore = <T>(element: HTMLElement, score: Features.Benchmark.MeasurementScore<T>, formatter: (i: T) => string) =>
        Library.UI.setTextContent(element, Features.Benchmark.measurementScoreToText(score, formatter));
    const showNumberMeasurementScore = (element: HTMLElement, score: Features.Benchmark.MeasurementScore<number>) =>
        showMeasurementScore(element, score, numberResultToText);
    export const showResult = () =>
    {
        document.body.classList.toggle("immersive", true);
        document.body.classList.toggle("benchmark-result", true);
        showNumberMeasurementScore(UI.benchmarkTotalScore, benchmark.result.totalScore);
        showNumberMeasurementScore(UI.benchmarkScorePerFullHD, benchmark.result.totalRenderingScore);
        showNumberMeasurementScore(UI.benchmarkCalculationScore, benchmark.result.totalCalculationScore);
        showNumberMeasurementScore(UI.benchmarkLinesCalculationScore, benchmark.result.linesCalculationScore);
        showNumberMeasurementScore(UI.benchmarkSpotsCalculationScore, benchmark.result.spotsCalculationScore);
        showNumberMeasurementScore(UI.benchmarkLinesRenderingScore, benchmark.result.linesRenderingScorePerFullHd);
        showNumberMeasurementScore(UI.benchmarkSpotsRenderingScore, benchmark.result.spotsRenderingScorePerFullHd);
        showNumberMeasurementScore(UI.benchmarkDisplayScore, benchmark.result.displayScore);
        showNumberMeasurementScore(UI.benchmarkFpsScore, benchmark.result.fps);
        showNumberMeasurementScore(UI.benchmarkScreenResolutionScore, benchmark.result.screenResolutionScore);
        showMeasurementScore(UI.benchmarkScreenWidth, benchmark.result.screenResolution, i => numberResultToText(i.width));
        showMeasurementScore(UI.benchmarkScreenHeight, benchmark.result.screenResolution, i => numberResultToText(i.height));
        showMeasurementScore(UI.benchmarkDevicePixelRatio, benchmark.result.screenResolution, i => numberResultToText(i.devicePixelRatio));
        showMeasurementScore(UI.benchmarkScreenColorDepth, benchmark.result.screenResolution, i => numberResultToText(i.colorDepth));
    }
    export const abortBenchmark = () =>
    {
        if (isInBenchmark() && ! benchmark.isEnd())
        {
            benchmark.end();
            stopBenchmark();
            showResult();
        }
    }
}