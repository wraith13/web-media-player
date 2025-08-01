import { FlounderStyle } from "flounder.style.js";
import { phiColors } from "phi-colors"
import { Library } from "@library";
import { Tools } from "@tools";
import control from "@resource/control.json";
import config from "@resource/config.json";
export namespace Animation
{
    export const black = { r:0, g:0, b:0, } as const satisfies phiColors.Rgb;
    export const white = { r:1, g:1, b:1, } as const satisfies phiColors.Rgb;
    export class PhiColoring
    {
        public static regulateH = (h: number) => Tools.Math.scale(phiColors.HslHMin, phiColors.HslHMax)(h);
        public static regulateS = (s: number) => Tools.Math.scale(phiColors.HslSMin, phiColors.HslSMax)(s);
        public static regulateL = (l: number) => Tools.Math.scale(phiColors.HslLMin, phiColors.HslLMax)(l);
        constructor
        (
            public hue = Math.random(),
            saturation :number = config.colors.phiColors.saturation,
            lightness :number = config.colors.phiColors.lightness,
            public PhiHueUnit = 1 / phiColors.phi,
            public RgbHueUnit = 1 / 3,
        )
        {
            //this.h = rate(phiColors.HslHMin, phiColors.HslHMax)((hue);
            this.s = PhiColoring.regulateS(saturation);
            this.l = PhiColoring.regulateL(lightness);
        }
        //h: number;
        s: number;
        l: number;
        makeRgb = (step: number) => phiColors.clipRgb
        (
            phiColors.hslToRgb
            ({
                h: PhiColoring.regulateH(((this.RgbHueUnit *step)) %1),
                s: this.s,
                l: this.l,
            })
        );
        makePhiRgb = (step: number) => phiColors.clipRgb
        (
            phiColors.hslToRgb
            ({
                h: PhiColoring.regulateH((this.hue +(this.PhiHueUnit *step)) %1),
                s: this.s,
                l: this.l,
            })
        );
        makeSrgbColor = (rgb: phiColors.Rgb) =>
            <FlounderStyle.Type.HexColor>phiColors.rgbForStyle(rgb);
        makeColor = (colorspace: string, rgb: phiColors.Rgb) =>
            <FlounderStyle.Type.Color>phiColors.rgbForCssColor(colorspace, rgb);
    }
    namespace Pattern
    {
        export type IntervalSize = Exclude<FlounderStyle.Type.Arguments["intervalSize"], undefined>;
        const makeRandomSpotArguments = (type: FlounderStyle.Type.SpotArguments["type"], intervalSize: IntervalSize): FlounderStyle.Type.SpotArguments =>
        ({
            type,
            layoutAngle: Tools.Random.select([ "regular", "alternative", ]),
            foregroundColor: "forestgreen",
            backgroundColor: "blanchedalmond",
            intervalSize,
            depth: 0.0,
            maxPatternSize: Tools.Random.select([ undefined, intervalSize /4, ]),
            reverseRate: Tools.Random.select([ undefined, 0.0, ]),
            maximumFractionDigits: config.maximumFractionDigits,
        });
        const makeRandomTrispotArguments = (intervalSize: IntervalSize): FlounderStyle.Type.Arguments =>
            makeRandomSpotArguments("trispot", intervalSize);
        const makeRandomTetraspotArguments = (intervalSize: IntervalSize): FlounderStyle.Type.Arguments =>
            makeRandomSpotArguments("tetraspot", intervalSize);
        const makeRandomLineArguments = (type: FlounderStyle.Type.LineArguments["type"], intervalSize: IntervalSize): FlounderStyle.Type.LineArguments =>
        ({
            type,
            layoutAngle: Math.random(),
            foregroundColor: "forestgreen",
            backgroundColor: "blanchedalmond",
            intervalSize,
            depth: 0.0,
            maxPatternSize: Tools.Random.select([ undefined, intervalSize /(2 +Tools.Random.makeInteger(9)), ]),
            reverseRate: Tools.Random.select([ undefined, 0.0, ]),
            anglePerDepth: Tools.Random.select([ undefined, "auto", "-auto", 1,0, -1.0, ]),
            maximumFractionDigits: config.maximumFractionDigits,
        });
        const makeRandomStripeArguments = (intervalSize: IntervalSize): FlounderStyle.Type.Arguments =>
            makeRandomLineArguments("stripe", intervalSize);
        const makeRandomDilineArguments = (intervalSize: IntervalSize): FlounderStyle.Type.Arguments =>
            makeRandomLineArguments("diline", intervalSize);
        const makeRandomTrilineArguments = (intervalSize: IntervalSize): FlounderStyle.Type.Arguments =>
            makeRandomLineArguments("triline", intervalSize);
        const getList = (pattern: typeof control.pattern.enum[number]): ((intervalSize: IntervalSize) => FlounderStyle.Type.Arguments)[] =>
        {
            switch(pattern)
            {
            case "triline": // for benchmark only
                return [
                    makeRandomTrilineArguments,
                ];
            case "trispot": // for benchmark only
                return [
                    makeRandomTrispotArguments,
                ];
            case "lines":
                return [
                    makeRandomStripeArguments,
                    makeRandomDilineArguments,
                    makeRandomTrilineArguments,
                ];
            case "spots":
                return [
                    makeRandomTrispotArguments,
                    makeRandomTetraspotArguments,
                ];
            case "both":
            default:
                return [
                    makeRandomStripeArguments,
                    makeRandomDilineArguments,
                    makeRandomTrilineArguments,
                    makeRandomTrispotArguments,
                    makeRandomTetraspotArguments,
                ];
            }
        };
        export const make = (pattern: typeof control.pattern.enum[number], intervalSize: IntervalSize, random: Tools.Random.Function = Math.random, index?: number, prime?: number) =>
            Tools.Random.select(getList(pattern), random, index, prime)(intervalSize);
        export const getTypeCategory = (type: FlounderStyle.Type.FlounderType): "lines" | "spots" =>
        {
            switch(type)
            {
            case "stripe":
            case "diline":
            case "triline":
                return "lines";
            case "trispot":
            case "tetraspot":
                return "spots";
            }
        };
    }
    interface Layer
    {
        layer: HTMLDivElement;
        mile: number;
        offset: number;
        arguments: FlounderStyle.Type.Arguments | undefined;
    }
    export class Animator
    {
        layers: Layer[] = [];
        spotsLayersRate = 1.0;
        pattern: typeof control.pattern.enum[number] = control.pattern.default;
        startAt = 0;
        offsetAt = 0;
        universalStep = 0;
        currentLayerIndex = 0;
        cycleSpan = control.cycleSpan.default;
        diagonalSize = 0;
        constructor(public canvas: HTMLDivElement, public random: Tools.Random.Function = new Tools.Random.IndexedRandom().getFunction(), public phiColoring: PhiColoring = new PhiColoring())
            { };
        getDiagonalSize = () => Math.sqrt(Math.pow(this.canvas.clientWidth ?? 0, 2) +Math.pow(this.canvas.clientHeight ?? 0, 2));
        makeColor: (rgb: phiColors.Rgb) => FlounderStyle.Type.Color = this.phiColoring.makeSrgbColor;
        easing: (t: number) => number = t => t;
        argumentHistory: FlounderStyle.Type.Arguments[] = [];
        public startStep = (now: number) =>
            this.startAt = now -this.offsetAt;
        makeRandomArguments = (mile: number): FlounderStyle.Type.Arguments =>
        {
            const result = Pattern.make
            (
                this.pattern,
                Tools.Math.scale
                (
                    this.diagonalSize *config.intervalSize.minRate,
                    this.diagonalSize *config.intervalSize.maxRate
                )
                (this.random(mile, 17)),
                this.random, mile, 23
            );
            this.argumentHistory.push(result);
            if (3 <= this.argumentHistory.length)
            {
                this.argumentHistory.shift();
            }
            return result;
        };
        getNextColorMaker = (coloring: typeof control.coloring.enum[number]):
            (mile: number, offset: number, _ix: number) => phiColors.Rgb =>
        {
            switch(coloring)
            {
            case "monochrome":
                return (mile: number, _offset: number, _ix: number): phiColors.Rgb =>
                    //Tools.Array.cycleSelect(<FlounderStyle.Type.Color[]>config.colors.monochrome, mile +1.0);
                    Tools.Array.cycleSelect([ black, white ] as const, mile +1.0);
            case "primary-colors":
                // return (mile: number, _offset: number, ix: number) =>
                //     Tools.Array.cycleSelect(<FlounderStyle.Type.Color[]>config.colors.primaryColors, ix +mile +1.0);
                return (mile: number, offset: number, _ix: number) =>
                    this.phiColoring.makeRgb(mile +offset +1.0);
            case "phi-colors":
            default:
                return (mile: number, offset: number, _ix: number) =>
                    this.phiColoring.makePhiRgb(mile +offset +1.0);
            }
        };
        makeForegroundRgb: (mile: number, offset: number, ix: number) => phiColors.Rgb =
            this.getNextColorMaker("phi-colors");
        makeBackgroundRgb = (mile: number, offset: number, ix: number): phiColors.Rgb =>
        {
            switch(true)
            {
            case 0 < mile:
                return this.makeForegroundRgb(mile -1, offset, ix);
            case ix <= 0:
                return this.phiColoring.makePhiRgb(0.0);
            default:
                return black;
            }
        };
        makeForegroundColor = (mile: number, offset: number, ix: number): FlounderStyle.Type.Color =>
            this.makeColor(this.makeForegroundRgb(mile, offset, ix));
        makeBackgroundColor = (mile: number, offset: number, ix: number): FlounderStyle.Type.Color =>
            this.makeColor(this.makeBackgroundRgb(mile, offset, ix));
        isStarted = () =>
            0 !== this.startAt || 0 !== this.offsetAt;
        getStep = (layer: Layer) => this.universalStep -(layer.mile +layer.offset);
        getSpotsIndex = (ix: number) =>
            Math.floor(ix *this.spotsLayersRate);
        isValidSpotLayer = (ix: number) =>
            this.getSpotsIndex(ix -1) < this.getSpotsIndex(ix);
        isValidLayer = (ix: number) =>
            "lines" === Pattern.getTypeCategory(this.layers[ix].arguments?.type ?? "stripe") ||
            this.isValidSpotLayer(ix);
        stepLayer = (i: Layer, ix: number) =>
        {
            let step = this.getStep(i);
            if (0 <= step)
            {
                if (1.0 <= step || undefined === i.arguments)
                {
                    while(1.0 <= step)
                    {
                        ++i.mile;
                        step = this.getStep(i);
                    }
                    i.arguments = Object.assign
                    (
                        { },
                        this.layers[ix -1]?.arguments ?? this.makeRandomArguments(i.mile),
                        {
                            foregroundColor: this.makeForegroundColor(i.mile, i.offset, ix),
                            backgroundColor: i.arguments?.foregroundColor ?? this.makeBackgroundColor(i.mile, i.offset, ix),
                        }
                    );
                    if ( ! this.isValidLayer(ix))
                    {
                        i.arguments.foregroundColor = i.arguments.backgroundColor ?? "black";
                        FlounderStyle.setStyle
                        (
                            i.layer,
                            {
                                "background-color": i.arguments.foregroundColor,
                                "background-image": undefined,
                                "background-size":undefined,
                                "background-position": undefined,
                            }
                        );
                    }
                }
                if (this.isValidLayer(ix))
                {
                    i.arguments.depth = this.easing(step);
                    FlounderStyle.setStyle(i.layer, i.arguments);
                }
            }
        };
        step = (now: number) =>
        {
            this.offsetAt = now -this.startAt;
            this.universalStep = this.offsetAt /this.cycleSpan;
            this.layers.forEach((i, ix) => this.stepLayer(i, ix));
        };
        getStepDifference = (now: number) =>
            ((now -this.startAt) /this.cycleSpan) -this.universalStep;
        getNowDifference = (now: number) =>
            (now -this.startAt) -this.offsetAt;
        update = () =>
        {
            if (this.isStarted())
            {
                this.step(this.startAt +this.offsetAt);
            }
        };
        setColorspace = (colorspace: typeof control.colorspace.enum[number]) =>
        {
            switch(colorspace)
            {
            case "Display P3":
                this.makeColor = (rgb: phiColors.Rgb) => this.phiColoring.makeColor("display-p3", rgb);
                break;
            case "Rec. 2020":
                this.makeColor = (rgb: phiColors.Rgb) => this.phiColoring.makeColor("rec2020", rgb);
                break;
            case "sRGB":
            default:
                //this.makeColor = (rgb: phiColors.Rgb) => this.phiColoring.makeColor("srgb", rgb);
                this.makeColor = this.phiColoring.makeSrgbColor;
                break;
            }
            if ( ! this.isStarted())
            {
                Library.UI.getElementsByClassName("div", "layer", this.canvas)[0].style.setProperty
                (
                    "background-color",
                    this.makeColor(this.phiColoring.makePhiRgb(0.0))
                );
                //console.log(colorspace, this.makeColor(this.phiColoring.makePhiRgb(0.0)));
            }
        };
        setColoring = (coloring: typeof control.coloring.enum[number]) =>
            this.makeForegroundRgb = this.getNextColorMaker(coloring);
        setPattern = (newPattern: typeof control.pattern.enum[number]) =>
            this.pattern = newPattern;
        setDiagonalSize = (newDiagonalSize: number) =>
        {
            const fixRate = newDiagonalSize /this.diagonalSize;
            this.diagonalSize = newDiagonalSize;
            const list = this.layers
                .map(i => i.arguments)
                .concat(this.argumentHistory);
            list.filter(Tools.TypeGuards.has("intervalSize")).forEach(i => i.intervalSize *= fixRate);
            list.filter(Tools.TypeGuards.has("maxPatternSize")).forEach(i => i.maxPatternSize *= fixRate);
        };
        updateDiagonalSize = () =>
            this.setDiagonalSize(this.getDiagonalSize());
        setCycleSpan = (newCycleSpan: number) =>
        {
            if (this.isStarted())
            {
                const fixRate = newCycleSpan /this.cycleSpan;
                const now = performance.now();
                this.offsetAt = this.offsetAt *fixRate;
                this.startStep(now);
            }
            this.cycleSpan = newCycleSpan;
        };
        setLayers = (newLayers: number) =>
        {
            Library.UI.cullOrBreed(this.canvas, { tag: "div", attributes: { class: "layer", }, }, newLayers);
            const layerList = Library.UI.getElementsByClassName("div", "layer", this.canvas);
            const newArguments = this.layers[0]?.arguments;
            const oldArguments = this.argumentHistory[this.argumentHistory.length -2];
            const newMile = this.layers[0]?.mile ?? 0;
            const oldMile = Math.max(newMile -1, 0);
            const restoreArgument = (i: FlounderStyle.Type.Arguments, ix: number) =>
            {
                if (undefined !== i)
                {
                    const result = Object.assign({ }, i);
                    const offset = ix /layerList.length;
                    result.foregroundColor = this.makeForegroundColor(oldMile, offset, ix);
                    result.backgroundColor = this.makeBackgroundColor(oldMile, offset, ix);
                    return result;
                }
                return undefined;
            };
            this.layers = layerList.map
            (
                (layer, ix) =>
                (
                    <Layer>
                    {
                        layer,
                        mile: 0 === ix ? newMile: oldMile,
                        offset: ix /layerList.length,
                        arguments: 0 === ix ? newArguments: restoreArgument(oldArguments, ix),
                    }
                )
            );
        };
        setSpotsLayers = (spotsLayersRate: number) =>
        {
            this.spotsLayersRate = spotsLayersRate;
        };
        setEasing = (enabled: boolean) =>
        {
            this.easing = enabled ?
                (t: number) => t <= 0.5 ?
                    2 *Math.pow(t, 2):
                    1 -(2 *Math.pow(1 -t, 2)):
                (t: number) => t;
        };
        resetStep = () =>
        {
            this.startAt = 0;
            this.offsetAt = 0;
            this.universalStep = 0;
            this.currentLayerIndex = 0;
            this.layers.forEach
            (
                i =>
                {
                    i.mile = 0;
                    i.arguments = undefined;
                }
            );
        }
        shuffleStep = () =>
        {
            // Fill layers with the new first pattern ( WHY: If you don't update() with this offsetAt once, only the second pattern will be displayed. )
            this.offsetAt = this.cycleSpan *(Math.ceil(this.offsetAt /this.cycleSpan) +0.999999);
            this.startStep(performance.now());
            this.update();
            // new second pattern + random step ( offsetAt )
            this.offsetAt = this.cycleSpan *(Math.ceil(this.offsetAt /this.cycleSpan) +Math.random());
            this.startStep(performance.now());
            this.update();
        }
    }
}
