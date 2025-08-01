import { Tools } from "@tools";
import { Library } from "@library";
import { UI } from "../ui";
import { Fps } from "./fps";
import { Animation } from "./animation";
import config from "@resource/config.json";
export namespace Benchmark
{
    export const IndexedRandom = new Tools.Random.IndexedRandom
    (
        Tools.Hash.fnv1a_32,
        "benchmark",
    );
    export const animator = new Animation.Animator
    (
        UI.benchmarkCanvas,
        IndexedRandom.getFunction()
    );
    export type MeasurementScore<T> = "Unmeasured" | "UnmeasurablePoor" | T | "UnmeasurableRich";
    export const calculateMeasurementScore = <A, B, R>(a: MeasurementScore<A>, b: MeasurementScore<B>, calculate: (a: A, b: B) => R): MeasurementScore<R> =>
    {
        for(const i of [ "Unmeasured", "UnmeasurablePoor", "UnmeasurableRich", ])
        {
            if (a === i || b === i)
            {
                return i;
            }
        }
        return calculate(a as A, b as B);
    };
    export const isMeasuredScore = <T>(score: MeasurementScore<T>): score is T =>
        ! [ "Unmeasured", "UnmeasurablePoor", "UnmeasurableRich", ].includes(score as string);
    export const getMeasurementScoreValue = <T>(score: MeasurementScore<T>): T | undefined =>
        isMeasuredScore(score) ? score: undefined;
    export const measurementScoreToText = <T>(score: MeasurementScore<T>, toText: (score:T) => string): string =>
        isMeasuredScore(score) ? toText(score): Library.Locale.map(score as Library.Locale.Label);
    export interface Result
    {
        screenResolution: MeasurementScore<{ width: number; height: number; devicePixelRatio: number; colorDepth: number; }>;
        screenResolutionScore: MeasurementScore<number>;
        fps: MeasurementScore<number>;
        displayScore: MeasurementScore<number>;
        linesCalculationScore: MeasurementScore<number>; // 非表示状態で１秒間に計算可能なレイヤーの総数( Triline )
        spotsCalculationScore: MeasurementScore<number>; // 非表示状態で１秒間に計算可能なレイヤーの総数( Tetraspot )
        totalCalculationScore: MeasurementScore<number>; // (linesCalculationScore + spotsCalculationScore) /2
        linesRenderingScorePerFullHd: MeasurementScore<number>; // Full HD (1920x1080) のピクセル数で１秒間に描画可能なレイヤーの総数( Triline )
        spotsRenderingScorePerFullHd: MeasurementScore<number>; // Full HD (1920x1080) のピクセル数で１秒間に描画可能なレイヤーの総数( Tetraspot )
        totalRenderingScore: MeasurementScore<number>; // (linesRenderingScorePerPixel + spotsRenderingScorePerPixel) /2
        totalScore: MeasurementScore<number>; // totalRenderingScore * screenResolution.width * screenResolution.height / (1920 *1080)
    }
    export const getUnmeasuredReslult = (): Result =>
    ({
        screenResolution: "Unmeasured",
        screenResolutionScore: "Unmeasured",
        fps: "Unmeasured",
        displayScore: "Unmeasured",
        linesCalculationScore: "Unmeasured",
        spotsCalculationScore: "Unmeasured",
        totalCalculationScore: "Unmeasured",
        linesRenderingScorePerFullHd: "Unmeasured",
        spotsRenderingScorePerFullHd: "Unmeasured",
        totalRenderingScore: "Unmeasured",
        totalScore: "Unmeasured",
    });
    export const measureScreenResolution = () =>
    ({
        // The area obtained with screen.width x screen.height may not be usable if full-screen mode cannot be achieved, so screen.width x screen.height is not used.
        // width: screen.width,
        // height: screen.height,
        width: UI.screenBody.clientWidth,
        height: UI.screenBody.clientHeight,
        devicePixelRatio: window.devicePixelRatio ?? 1.0,
        colorDepth: window.screen.colorDepth,
    });
    const measureScreenResolutionScore = () =>
        (
            (UI.screenBody.clientWidth *(window.devicePixelRatio ?? 1.0))
            *(UI.screenBody.clientHeight *(window.devicePixelRatio ?? 1.0))
            *window.screen.colorDepth
        )
        /(config.benchmark.pixelUnit *config.benchmark.colorDepthUnit);
    const setProgressBarSize = (size: number) =>
        Library.UI.cullOrBreed(UI.benchmarkProgressBar, { tag: "div", className: "progress-block", }, size);
    const setProgressBarProgress = (progress: number) =>
        Array.from(UI.benchmarkProgressBar.children).forEach
        (
            (i, ix) =>
            {
                i.classList.toggle("on", ix < progress);
                i.classList.toggle("now", ix === progress);
            }
        );
    export interface MeasurementPhaseBase
    {
        start: (measure: Measurement, now: number) => void;
        step: (measure: Measurement, now: number) => void;
    }
    export class ScreenResolutionMeasurementPhase implements MeasurementPhaseBase
    {
        start = (_measure: Measurement, now: number) =>
        {
            this.startAt = now;
            const i = measureScreenResolution();
            Library.UI.setTextContent(UI.benchmarkPopupLabel, `${Library.Locale.map("benchmark-phase-screen-resolution")}:`);
            Library.UI.setTextContent(UI.benchmarkPopupValue, `${i.width}x${i.height} ${i.devicePixelRatio}x ${i.colorDepth}bit`);
        };
        step = (measure: Measurement, now: number) =>
        {
            if (this.startAt +config.benchmark.screenResolutionWait <= now)
            {
                measure.result.screenResolution = measureScreenResolution();
                measure.result.screenResolutionScore = measureScreenResolutionScore();
                measure.next();
            }
        };
        startAt = 0;
    }
    export class FpsMeasurementPhase implements MeasurementPhaseBase
    {
        start = (_measure: Measurement, now: number) =>
        {
            this.startAt = now;
            Library.UI.setTextContent(UI.benchmarkPopupLabel, `FPS:`);
        };
        step = (measure: Measurement, now: number) =>
        {
            Library.UI.setTextContent(UI.benchmarkPopupValue, `${Fps.currentNowFps.fps.toFixed(2)}`);
            if (this.startAt + config.benchmark.refreshRateWait <= now)
            {
                measure.result.fps = Fps.averageFps;
                measure.next();
            }
        };
        startAt = 0;
        fpsTotal: number = 0;
        fpsCount: number = 0;
    }
    export class ScoreMeasurementPhaseBase
    {
        layers = 1;
        halfRefreshRate = 30;
        constructor
        (
            public calculateOnly: boolean,
            public pattern: "triline" | "trispot",
            public scoreLabel: Library.Locale.Label,
            public calculateScore: (measure: Measurement) => unknown,
        )
        {
        }
        start = (measure: Measurement, now: number) =>
        {
            this.halfRefreshRate = getMeasurementScoreValue(measure.result.fps) ?? 30;
            document.body.classList.toggle("benchmark-rendering", ! this.calculateOnly);
            animator.setColorspace("Rec. 2020");
            animator.setColoring("phi-colors");
            animator.setDiagonalSize(Math.sqrt(config.benchmark.pixelUnit));
            animator.setCycleSpan(config.benchmark.adjustLayersWait);
            animator.setEasing(true);
            this.startPattern(measure, now);
            Library.UI.setTextContent(UI.benchmarkPopupLabel, `${Library.Locale.map(this.scoreLabel)}:`);
        };
        startPattern = (_measure: Measurement, now: number) =>
        {
            this.patternStartAt = now;
            animator.setPattern(this.pattern);
            this.startLayers(now, 1);
            IndexedRandom.resetIndex();
            animator.resetStep();
            animator.startStep(now);
            Fps.reset();
        };
        startLayers = (now: number, layers: number) =>
        {
            this.laysersStartAt = now;
            this.layers = layers;
            animator.setLayers(this.layers);
        }
        step = (measure: Measurement, now: number) =>
        {
            Library.UI.setTextContent(UI.benchmarkPopupValue, `${(Fps.currentNowFps.fps *this.layers).toFixed(2)}`);
            if (this.isNeedAdjustingLayers(now))
            {
                const layers = Math.max
                (
                    Math.floor((this.layers *Fps.currentMinFps.fps) /this.halfRefreshRate),
                    this.layers +1
                );
                this.startLayers(now, layers);
            }
            if (this.isEnd(now))
            {
                this.calculateScore(measure);
                measure.next();
            }
            else
            {
                animator.step(now);
            }
        };
        laysersStartAt = 0;
        patternStartAt = 0;
        isStable = (now: number) =>
            Fps.isValid &&
            this.patternStartAt +config.benchmark.stableWait < now;
        isNeedAdjustingLayers = (now: number) =>
            this.isStable(now) &&
            this.laysersStartAt +config.benchmark.adjustLayersWait < now &&
            30 <= Fps.averageFps;
        isEnd = (now: number) =>
            this.isStable(now) &&
            this.laysersStartAt +config.benchmark.nextPatternWait < now;
        calculationScore = () =>
            Fps.averageFps *this.layers;
    }
    export class LinesCalculationScoreMeasurementPhase extends ScoreMeasurementPhaseBase implements MeasurementPhaseBase
    {
        constructor()
        {
            super
            (
                true,
                "triline",
                "benchmark-lines-calculation-score",
                measure => measure.result.linesCalculationScore = this.calculationScore(),
            );
        }
    }
    export class SpotsCalculationScoreMeasurementPhase extends ScoreMeasurementPhaseBase implements MeasurementPhaseBase
    {
        constructor()
        {
            super
            (
                true,
                "trispot",
                "benchmark-spots-calculation-score",
                measure => measure.result.spotsCalculationScore = this.calculationScore(),
            );
        }
    }
    export class LinesRenderingScoreMeasurementPhase extends ScoreMeasurementPhaseBase implements MeasurementPhaseBase
    {
        constructor()
        {
            super
            (
                false,
                "triline",
                "benchmark-lines-rendering-score",
                measure => measure.result.linesRenderingScorePerFullHd = this.calculationScore() *measureScreenResolutionScore()
            );
        }
    }
    export class SpotsRenderingScoreMeasurementPhase extends ScoreMeasurementPhaseBase implements MeasurementPhaseBase
    {
        constructor()
        {
            super
            (
                false,
                "trispot",
                "benchmark-spots-rendering-score",
                measure => measure.result.spotsRenderingScorePerFullHd = this.calculationScore() *measureScreenResolutionScore(),
            );
        }
    }
    const phases: MeasurementPhaseBase[] =
    [
        new ScreenResolutionMeasurementPhase(),
        new FpsMeasurementPhase(),
        new LinesCalculationScoreMeasurementPhase(),
        new SpotsCalculationScoreMeasurementPhase(),
        new LinesRenderingScoreMeasurementPhase(),
        new SpotsRenderingScoreMeasurementPhase(),
    ];
    export class Measurement
    {
        result: Result = getUnmeasuredReslult();
        phase: number = 0;
        currentPhase: MeasurementPhaseBase | null = null;
        constructor(public canvas: HTMLDivElement)
            { };
        start = () =>
        {
            setProgressBarSize(phases.length);
            setProgressBarProgress(this.phase = -1);
            Library.UI.setTextContent(UI.benchmarkPopupLabel, `${Library.Locale.map("benchmarking-in-progress")}:`);
            Library.UI.setTextContent(UI.benchmarkPopupValue, `${Library.Locale.map("benchmark-phase-preparation")}`);
            this.currentPhase = null;
            this.result = getUnmeasuredReslult();
        };
        step = (now: number) =>
        {
            if (this.phase < 0)
            {
                this.next();
            }
            if (this.currentPhase !== phases[this.phase])
            {
                this.currentPhase = phases[this.phase];
                this.currentPhase?.start(this, now);
            }
            phases[this.phase].step(this, now);
        };
        next = () =>
        {
            setProgressBarProgress(++this.phase);
        };
        isEnd = () =>
            phases.length <= this.phase;
        end = () =>
        {
            this.result.displayScore = calculateMeasurementScore
            (
                this.result.screenResolutionScore,
                this.result.fps,
                (a, b) => (a *b) /config.benchmark.fpsUnit
            );
            this.result.totalCalculationScore = calculateMeasurementScore
            (
                this.result.linesCalculationScore,
                this.result.spotsCalculationScore,
                (a, b) => (a +b) /2
            );
            this.result.totalRenderingScore = calculateMeasurementScore
            (
                this.result.linesRenderingScorePerFullHd,
                this.result.spotsRenderingScorePerFullHd,
                (a, b) => (a +b) /2
            );
            this.result.totalScore = isMeasuredScore(this.result.totalRenderingScore) ?
                (this.result.totalRenderingScore /measureScreenResolutionScore()):
                this.result.totalRenderingScore;
            console.log("📈 benchmark", this.result);
        }
    }
}
