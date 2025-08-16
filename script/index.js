var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define("script/tools/type-guards", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeGuards = void 0;
    var TypeGuards;
    (function (TypeGuards) {
        TypeGuards.hasValue = function (value) {
            return value !== null && value !== undefined;
        };
        TypeGuards.has = function (keyOrKeys) {
            return function (object) {
                if (Array.isArray(keyOrKeys)) {
                    return keyOrKeys.every(function (key) { return (object === null || object === void 0 ? void 0 : object[key]) !== undefined; });
                }
                else {
                    return (object === null || object === void 0 ? void 0 : object[keyOrKeys]) !== undefined;
                }
            };
        };
    })(TypeGuards || (exports.TypeGuards = TypeGuards = {}));
});
define("script/tools/number", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Number = void 0;
    var Number;
    (function (Number) {
        Number.getIntegralDigits = function (value) {
            return 1 <= value ? Math.floor(Math.log10(value)) + 1 : 0;
        };
        Number.toString = function (value, maximumFractionDigits) {
            return value.toLocaleString("en-US", { useGrouping: false, maximumFractionDigits: maximumFractionDigits, });
        };
    })(Number || (exports.Number = Number = {}));
});
define("script/tools/math", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Math = void 0;
    var Math;
    (function (Math) {
        Math.scale = function (min, max) {
            return function (r) { return min + ((max - min) * r); };
        };
        Math.sum = function (numbers) {
            return numbers.reduce(function (a, v) { return a + v; }, 0);
        };
        Math.mod = function (n, m) {
            return m === 0 ? n : ((n % m) + m) % m;
        };
    })(Math || (exports.Math = Math = {}));
});
define("script/tools/array", ["require", "exports", "script/tools/type-guards", "script/tools/math"], function (require, exports, type_guards_1, math_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Array = void 0;
    var Array;
    (function (Array) {
        Array.cycleSelect = function (list, ix) {
            return (0 < list.length ?
                list[math_1.Math.mod(ix, list.length)] :
                undefined);
        };
        Array.joinable = function (value, condition) {
            return type_guards_1.TypeGuards.hasValue(value) && (condition !== null && condition !== void 0 ? condition : true) ? [value,] : [];
        };
        Array.uniqueFilter = function (i, ix, list) {
            return ix === list.indexOf(i);
        };
        Array.lookupValue = function (list, value) {
            return list.includes(value) ? value : undefined;
        };
    })(Array || (exports.Array = Array = {}));
});
define("locale/generated/master", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.localeMaster = void 0;
    exports.localeMaster = {
        "en": {
            "lang-label": "English",
            "lang-direction": "ltr",
            "Auto": "Auto",
            "description": "Web-based media player that runs in a web browser",
            "media-count-label": "Media Count:",
            "media-length-label": "Media Length:",
            "transition-label": "Transition:",
            "colorspace-label": "Color Space:",
            "coloring-label": "Coloring:",
            "pattern-label": "Pattern:",
            "lines": "Lines",
            "spots": "Spots",
            "both": "Both",
            "canvas-size-label": "Canvas Size:",
            "layers-label": "Layers:",
            "spots-layers-label": "Layers(Spots):",
            "image-span-label": "Image Display Time:",
            "loop-short-media-label": "Loop Short Media:",
            "fuse-fps-label": "Fuse FPS:",
            "frame-delay-label": "Frame Delay:",
            "easing-label": "Easing:",
            "with-fullscreen-label": "FullScreen:",
            "show-fps-label": "Show FPS:",
            "clock-label": "Clock:",
            "brightness-label": "Brightness:",
            "stretch-label": "Stretch:",
            "padding-label": "Padding:",
            "hide": "Hide",
            "blend": "Blend",
            "white": "White",
            "black": "Black",
            "system": "System",
            "alternate": "Alternate",
            "rainbow": "Rainbow",
            "language-label": "Language:",
            "url-label": "Link to this setting",
            "run-benchmark-label": "Run Benchmark",
            "informationFuseFps": "⚠️ Automatically stops if FPS(Max) drops below \"Fuse FPS\" to avoid crashing the web browser or OS.",
            "timeUnitMs": "ms",
            "timeUnitS": "s",
            "timeUnitM": "m",
            "timeUnitH": "h",
            "timeUnitD": "d",
            "ago": "ago",
            "Hide UI": "Hide UI",
            "Play / Pause": "Play / Pause",
            "Switch Pattern": "Switch Pattern",
            "Switch Coloring": "Switch Coloring",
            "Scaling Canvas Size": "Scaling Canvas Size",
            "Increase / Decrease Frame Delay": "Increase / Decrease Frame Delay",
            "Increase / Decrease Layer": "Increase / Decrease Layer",
            "Speed Down / Up": "Speed Down / Up",
            "FullScreen": "FullScreen",
            "Show FPS": "Show FPS",
            "Switch Clock": "Switch Clock",
            "no-media-message": "No media available. Please add media.",
            "noscript-message": "JavaScript is disabled. Please enable JavaScript.",
            "noscript-introduction-title": "Introduction",
            "noscript-introduction-description": "Kaleidoscope Web Screensaver is a web-based screensaver that displays kaleidoscope-like animations. Users can customize patterns and colors to create simple yet visually engaging effects reminiscent of a kaleidoscope. It works on various devices, including PCs, smartphones, and tablets, and supports fullscreen mode.\n\nBy increasing the number of layers, users can create even more beautiful and intricate visuals. However, please note that higher layer counts may also increase the computational load, which could affect performance on less powerful devices.\n\nYou can display a clock on the screen with various styles and options, making it useful as a clock screensaver.\n\nIn addition, Kaleidoscope Web Screensaver　also includes a benchmark feature that measures the overall performance of your device and web browser together."
        },
        "ja": {
            "lang-label": "日本語",
            "lang-direction": "ltr",
            "Auto": "自動",
            "description": "Web ブラウザ上で動作するメディアプレイヤー",
            "media-count-label": "メディア数:",
            "media-length-label": "メディア長:",
            "transition-label": "トランジション:",
            "colorspace-label": "色空間:",
            "coloring-label": "カラーリング:",
            "pattern-label": "パターン:",
            "lines": "ライン",
            "spots": "スポット",
            "both": "両方",
            "canvas-size-label": "キャンバスサイズ:",
            "layers-label": "レイヤー数:",
            "spots-layers-label": "レイヤー数(スポット):",
            "image-span-label": "画像表示時間:",
            "loop-short-media-label": "短いメディアをループ再生:",
            "fuse-fps-label": "フューズ FPS:",
            "frame-delay-label": "フレーム遅延:",
            "easing-label": "イージング:",
            "with-fullscreen-label": "フルスクリーン:",
            "show-fps-label": "FPS を表示:",
            "clock-label": "時計:",
            "brightness-label": "明るさ:",
            "stretch-label": "ストレッチ:",
            "padding-label": "パディング:",
            "hide": "非表示",
            "blend": "ブレンド",
            "white": "ホワイト",
            "black": "ブラック",
            "system": "システム",
            "alternate": "交互",
            "rainbow": "レインボー",
            "language-label": "言語:",
            "url-label": "この設定のリンク",
            "run-benchmark-label": "ベンチマーク実行",
            "informationFuseFps": "⚠️ Web ブラウザや OS がクラッシュする事を避ける為に FPS(Max) が \"フューズ FPS\" を下回ると自動停止します。",
            "timeUnitMs": "ミリ秒",
            "timeUnitS": "秒",
            "timeUnitM": "分",
            "timeUnitH": "時間",
            "timeUnitD": "日",
            "ago": "前",
            "Hide UI": "UI 非表示",
            "Play / Pause": "再生 / 一時停止",
            "Switch Pattern": "パターン切り替え",
            "Switch Coloring": "カラーリング切り替え",
            "Scaling Canvas Size": "キャンバスサイズ拡大縮小",
            "Increase / Decrease Frame Delay": "フレーム遅延増減",
            "Increase / Decrease Layer": "レイヤー増減",
            "Speed Down / Up": "スピード ダウン/アップ",
            "FullScreen": "フルスクリーン",
            "Show FPS": "FPS 表示",
            "Switch Clock": "時計切り替え",
            "no-media-message": "メディアがありません。メディアを追加してください。",
            "noscript-message": "JavaScript が無効になっています。JavaScript を有効にしてください。",
            "noscript-introduction-title": "ご紹介",
            "noscript-introduction-description": "Kaleidoscope Web Screensaver は、万華鏡のようなアニメーションを表示するウェブベースのスクリーンセーバーです。ユーザーはパターンや色をカスタマイズでき、シンプルながらも視覚的に魅力的な万華鏡風の効果を楽しめます。PC、スマートフォン、タブレットなど様々なデバイスで動作し、フルスクリーンモードにも対応しています。\n\nレイヤー数を増やすことで、さらに美しく複雑なビジュアルを作り出すことができます。ただし、レイヤー数が多いほど計算負荷も高くなるため、性能の低いデバイスでは動作が重くなる場合があります。\n\n画面上に様々なスタイルやオプションで時計を表示できるため、時計付きスクリーンセーバーとしても利用できます。\n\nさらに、Kaleidoscope Web Screensaver には、お使いのデバイスとウェブブラウザの総合的なパフォーマンスを計測できるベンチマーク機能も搭載されています。"
        }
    };
});
define("script/library/locale", ["require", "exports", "script/tools/array", "locale/generated/master"], function (require, exports, array_1, localeMaster) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Locale = void 0;
    localeMaster = __importStar(localeMaster);
    var Locale;
    (function (Locale) {
        Locale.master = localeMaster.localeMaster;
        var supportedLangs = Object.keys(Locale.master);
        var getSegments = function (text, separator, segments) {
            return text.split(separator).slice(0, segments).join(separator);
        };
        var getMatchLang = function (lang) {
            var _a;
            return (_a = array_1.Array.lookupValue(supportedLangs, getSegments(lang, "-", 2))) !== null && _a !== void 0 ? _a : array_1.Array.lookupValue(supportedLangs, getSegments(lang, "-", 1));
        };
        var getDefaultLang = function () {
            var _a, _b;
            return (_b = (_a = getMatchLang(navigator.language.toLowerCase())) !== null && _a !== void 0 ? _a : navigator.languages.map(function (i) { return getMatchLang(i.toLowerCase()); }).filter(function (i) { return i !== undefined; })[0]) !== null && _b !== void 0 ? _b : "en";
        };
        var lang = getDefaultLang();
        Locale.getLocale = function () { return lang; };
        Locale.setLocale = function (locale) {
            switch (locale) {
                case undefined:
                case "Auto":
                    lang = getDefaultLang();
                    break;
                default:
                    lang = locale;
                    break;
            }
        };
        Locale.getDirection = function (l) {
            return Locale.master[l !== null && l !== void 0 ? l : lang]["lang-direction"];
        };
        Locale.isRtl = function (l) {
            return "rtl" === Locale.getDirection(l);
        };
        Locale.isLtr = function (l) {
            return "ltr" === Locale.getDirection(l);
        };
        Locale.toRtl = function (text, f) {
            return false === f ? text : "\u202B".concat(text, "\u202C");
        };
        Locale.map = function (key, l) {
            return "" === key ? "" : Locale.master[l !== null && l !== void 0 ? l : lang][key];
        };
        Locale.getLocaleList = function () {
            return __spreadArray(["Auto"], supportedLangs, true);
        };
    })(Locale || (exports.Locale = Locale = {}));
});
define("resource/config", [], {
    "applicationTitle": "Web Media Player",
    "repositoryUrl": "https://github.com/wraith13/web-media-player/",
    "canonicalUrl": "https://wraith13.github.io/web-media-player/",
    "log": {
        "mousemove": false,
        "ToggleClassForWhileTimer.Timeout": false
    },
    "thumbnail": {
        "maxSize": 320,
        "type": "image/jpeg",
        "quality": 0.7
    },
    "colors": {
        "monochrome": [
            "#000000",
            "#FFFFFF"
        ],
        "primaryColors": [
            "#FF0000",
            "#00FF00",
            "#0000FF"
        ],
        "phiColors": {
            "saturation": 0.8,
            "lightness": 0.6
        }
    },
    "intervalSize": {
        "minRate": 0.03,
        "maxRate": 0.6
    },
    "maximumFractionDigits": 2,
    "startWait": 750,
    "fullscreenAdditionalWait": 750,
    "benchmark": {
        "startWait": 1750,
        "stableWait": 1750,
        "adjustLayersWait": 300,
        "nextPatternWait": 1500,
        "screenResolutionWait": 1000,
        "refreshRateWait": 1750,
        "endWait": 1000,
        "pixelUnit": 2073600,
        "colorDepthUnit": 24,
        "fpsUnit": 60,
        "decimalDigits": 2
    },
    "clock": {
        "alternate": {
            "span": 47000
        },
        "dateFormat": {
            "weekday": "long",
            "year": "numeric",
            "month": "long",
            "day": "numeric"
        },
        "timeFormat": {
            "hour": "2-digit",
            "minute": "2-digit",
            "second": "2-digit"
        }
    }
});
define("script/library/ui", ["require", "exports", "resource/config", "script/tools/type-guards"], function (require, exports, config_json_1, type_guards_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UI = void 0;
    config_json_1 = __importDefault(config_json_1);
    var UI;
    (function (UI) {
        UI.showPickerOnLabel = function (label) {
            var selectId = label.getAttribute("for");
            if (selectId) {
                var select_1 = document.getElementById(selectId);
                if (select_1 && "select" === select_1.tagName.toLowerCase()) {
                    label.addEventListener('click', function (e) {
                        e.preventDefault();
                        select_1.focus();
                        if ("showPicker" in select_1) {
                            select_1.showPicker();
                        }
                        else {
                            select_1.click();
                        }
                    });
                }
                else {
                    console.error("🦋 FIXME: UI.showPickerOnLabel.NotFoundSelect", label, select_1);
                }
            }
            else {
                console.error("🦋 FIXME: UI.showPickerOnLabel.NotFoundForAttribute", label);
            }
        };
        var ToggleClassForWhileTimer = /** @class */ (function () {
            function ToggleClassForWhileTimer() {
                var _this = this;
                this.isOn = function () { return undefined !== _this.timer; };
                this.timer = undefined;
            }
            ToggleClassForWhileTimer.prototype.start = function (element, token, span) {
                var _this = this;
                if (this.isOn()) {
                    clearTimeout(this.timer);
                }
                element.classList.toggle(token, true);
                this.timer = setTimeout(function () {
                    if (config_json_1.default.log["ToggleClassForWhileTimer.Timeout"]) {
                        console.log("⌛️ ToggleClassForWhileTimer.Timeout", element, token, span);
                    }
                    _this.timer = undefined;
                    element.classList.toggle(token, false);
                }, span);
            };
            return ToggleClassForWhileTimer;
        }());
        UI.ToggleClassForWhileTimer = ToggleClassForWhileTimer;
        UI.fullscreenEnabled = document.fullscreenEnabled || document.webkitFullscreenEnabled;
        UI.getFullscreenElement = function () { var _a, _b; return (_b = (_a = document.fullscreenElement) !== null && _a !== void 0 ? _a : ("webkitFullscreenElement" in document ? document.webkitFullscreenElement : null)) !== null && _b !== void 0 ? _b : null; };
        UI.requestFullscreen = function (dom) {
            if (dom === void 0) { dom = document.body; }
            if (dom.requestFullscreen) {
                dom.requestFullscreen();
            }
            else if ("webkitRequestFullscreen" in dom) {
                dom.webkitRequestFullscreen();
            }
        };
        UI.exitFullscreen = function () {
            if (null !== UI.getFullscreenElement()) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if ("webkitCancelFullScreen" in document) {
                    document.webkitCancelFullScreen();
                }
            }
        };
        UI.setOptions = function (element, options) {
            if (options === void 0) { options = {}; }
            var className = options.className, text = options.text, _a = options.attributes, attributes = _a === void 0 ? {} : _a, _b = options.children, children = _b === void 0 ? [] : _b, _c = options.styles, styles = _c === void 0 ? {} : _c, _d = options.events, events = _d === void 0 ? {} : _d;
            if ("string" === typeof className) {
                element.className = className;
            }
            if ("string" === typeof text) {
                element.textContent = text;
            }
            Object.entries(attributes).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                return element.setAttribute(key, String(value));
            });
            Object.entries(styles).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                return element.style[key] = value;
            });
            Object.entries(events).forEach(function (_a) {
                var event = _a[0], handler = _a[1];
                return element.addEventListener(event, handler);
            });
            children.forEach(function (child) { return UI.appendChild(element, child); });
            return element;
        };
        UI.createText = function (text) {
            return "string" === typeof text ? document.createTextNode(text) : text;
        };
        UI.createElement = function (element) {
            return element instanceof Node ? element :
                UI.setOptions(document.createElement(element.tag), element);
        };
        UI.createNode = function (element) {
            return "string" === typeof element ? document.createTextNode(element) :
                element instanceof Node ? element :
                    UI.setOptions(document.createElement(element.tag), element);
        };
        UI.removeAllChildren = function (parent) {
            Array.from(parent.children).forEach(function (i) { return parent.removeChild(i); });
            return parent;
        };
        UI.appendChild = function (parent, element) {
            parent.appendChild(UI.createNode(element));
            return parent;
        };
        UI.replaceChild = function (parent, element) {
            UI.removeAllChildren(parent);
            return UI.appendChild(parent, element);
        };
        UI.appendChildren = function (parent, elements) {
            if ("append" in parent) {
                parent.append.apply(parent, elements.map(function (i) { return UI.createNode(i); }));
            }
            else {
                elements.forEach(function (i) { return UI.appendChild(parent, i); });
            }
            return parent;
        };
        UI.replaceChildren = function (parent, elements) {
            UI.removeAllChildren(parent);
            return UI.appendChildren(parent, elements);
        };
        UI.cullOrBreed = function (parent, element, size) {
            while (size < parent.children.length) {
                parent.removeChild(parent.lastChild);
            }
            while (parent.children.length < size) {
                UI.appendChild(parent, element);
            }
            return parent;
        };
        UI.getElementsByClassName = function (tag, className, parent) {
            var result = Array.from((parent !== null && parent !== void 0 ? parent : document).getElementsByClassName(className));
            result.forEach(function (i) {
                if (tag !== i.tagName.toLowerCase()) {
                    console.error("🦋 FIXME: UI.getElementsByClassName.InvalidDom", className, tag, i);
                }
            });
            return result;
        };
        UI.querySelectorAllWithFallback = function (tag, selectorss, parent) {
            var lastError;
            for (var i = 0; i < selectorss.length; ++i) {
                try {
                    var result = Array.from((parent !== null && parent !== void 0 ? parent : document).querySelectorAll(selectorss[i]));
                    result.forEach(function (j) {
                        if (tag !== j.tagName.toLowerCase()) {
                            console.error("🦋 FIXME: UI.querySelectorAllWithFallback.InvalidDom", i, tag, j);
                        }
                    });
                    return result;
                }
                catch (error) {
                    lastError = error;
                }
            }
            console.error("🦋 FIXME: querySelectorAllWithFallback.AllQueryFailed", selectorss, lastError);
            return [];
        };
        UI.getElementById = function (tag, id) {
            var result = document.getElementById(id);
            if (!type_guards_2.TypeGuards.hasValue(result)) {
                console.error("🦋 FIXME: UI.getElementById.NotExistsDom", id);
            }
            else if (tag !== result.tagName.toLowerCase()) {
                console.error("🦋 FIXME: UI.getElementById.InvalidDom", id, tag, result);
            }
            return result;
        };
        UI.querySelector = function (tag, selectors, parent) {
            var result = (parent !== null && parent !== void 0 ? parent : document).querySelector(selectors);
            if (!type_guards_2.TypeGuards.hasValue(result)) {
                console.error("🦋 FIXME: UI.querySelector.NotExistsDom", selectors);
            }
            else if (tag !== result.tagName.toLowerCase()) {
                console.error("🦋 FIXME: UI.querySelector.InvalidDom", selectors, tag, result);
            }
            return result;
        };
        UI.setTextContent = function (element, text) {
            if (element.textContent !== text) {
                element.textContent = text;
            }
        };
        UI.setStyle = function (element, name, value) {
            var _a;
            if (((_a = element.style.getPropertyValue(name)) !== null && _a !== void 0 ? _a : "") !== (value !== null && value !== void 0 ? value : "")) {
                if (undefined === value || null === value || "" === value) {
                    element.style.removeProperty(name);
                }
                else {
                    element.style.setProperty(name, value);
                }
            }
        };
    })(UI || (exports.UI = UI = {}));
});
define("script/library/control", ["require", "exports", "script/tools/array", "script/library/ui"], function (require, exports, array_2, ui_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Control = void 0;
    var Control;
    (function (Control) {
        var makeSelectOption = function (value, text) {
            var option = document.createElement("option");
            option.value = value;
            option.textContent = text;
            return option;
        };
        Control.getDom = function (data) {
            var result = "dom" in data ?
                data.dom :
                document.getElementById(data.id);
            if (null == result || undefined === result) {
                console.error("🦋 FIXME: Contorl.getDom.NotExistsDom", data);
            }
            else if (!(result instanceof HTMLElement)) {
                console.error("🦋 FIXME: Contorl.getDom.InvalidDom", data, result);
            }
            return result;
        };
        Control.getDomId = function (data) {
            return "id" in data ? data.id :
                "dom" in data ? data.dom.id :
                    undefined;
        };
        Control.eventLog = function (data) {
            return console.log.apply(console, __spreadArray([data.message], __spreadArray(__spreadArray(__spreadArray([], array_2.Array.joinable(Control.getDomId(data.control.data)), true), [
                data.event,
                data.control
            ], false), array_2.Array.joinable(data.value), true), false));
        };
        var Button = /** @class */ (function () {
            function Button(data) {
                var _this = this;
                this.data = data;
                this.getId = function () { return Control.getDomId(_this.data); };
                this.setClick = function (click) {
                    return _this.data.click = click;
                };
                this.fire = function () { var _a, _b; return (_b = (_a = _this.data).click) === null || _b === void 0 ? void 0 : _b.call(_a, null, _this); };
                this.dom = Control.getDom(data);
                this.dom.addEventListener("click", function (event) {
                    var _a, _b;
                    Control.eventLog({ control: _this, event: event, message: "👆 Button.Click:" });
                    (_b = (_a = _this.data).click) === null || _b === void 0 ? void 0 : _b.call(_a, event, _this);
                });
            }
            return Button;
        }());
        Control.Button = Button;
        Control.preventOnChange = "preventOnChange";
        var Select = /** @class */ (function () {
            function Select(data, options) {
                var _this = this;
                this.data = data;
                this.options = options;
                this.catchUpRestore = function (params) {
                    var _a, _b, _c, _d;
                    if (((_a = params === null || params === void 0 ? void 0 : params[_this.dom.id]) !== null && _a !== void 0 ? _a : "".concat(_this.data.default)) !== _this.get()) {
                        Control.eventLog({ control: _this, event: "catchUpRestore", message: "👆 Select.Change:", value: _this.get() });
                        (_c = (_b = _this.options) === null || _b === void 0 ? void 0 : _b.change) === null || _c === void 0 ? void 0 : _c.call(_b, null, _this);
                        (_d = _this.saveParameter) === null || _d === void 0 ? void 0 : _d.call(_this, _this.getId(), _this.get());
                    }
                };
                this.getId = function () { return Control.getDomId(_this.data); };
                this.setChange = function (change) {
                    return _this.options = __assign(__assign({}, _this.options), { change: change });
                };
                this.reloadOptions = function (value) {
                    var oldValue = value !== null && value !== void 0 ? value : _this.get();
                    ui_1.UI.replaceChildren(_this.dom, _this.data.enum.map(function (i) { var _a, _b, _c; return makeSelectOption("".concat(i), (_c = (_b = (_a = _this.options) === null || _a === void 0 ? void 0 : _a.makeLabel) === null || _b === void 0 ? void 0 : _b.call(_a, i)) !== null && _c !== void 0 ? _c : "".concat(i)); }));
                    _this.switch(oldValue, Control.preventOnChange);
                };
                this.getNextIndex = function (index, direction) {
                    return index + (direction ? -1 : 1);
                };
                this.getNextIndexClamp = function (length, index, direction) {
                    var next = _this.getNextIndex(index, direction);
                    return 0 <= next && next < length ? next : index;
                };
                this.getNextIndexCycle = function (length, index, direction) {
                    return (_this.getNextIndex(index, direction) + length) % length;
                };
                this.switch = function (valueOrDirection, preventOnChange, getNextIndex) {
                    if (getNextIndex === void 0) { getNextIndex = _this.getNextIndexClamp; }
                    if ("boolean" === typeof valueOrDirection) {
                        var options = Array.from(_this.dom.getElementsByTagName("option"));
                        var optionValues = options.map(function (i) { return i.value; });
                        var index = optionValues.indexOf(_this.dom.value);
                        var nextIndex = getNextIndex(optionValues.length, index, valueOrDirection);
                        var nextValue = optionValues[nextIndex];
                        if (undefined !== nextValue) {
                            _this.dom.value = nextValue;
                        }
                    }
                    else {
                        _this.dom.value = "".concat(valueOrDirection);
                    }
                    if (undefined === preventOnChange) {
                        _this.fire();
                    }
                };
                this.cycle = function (direction, preventOnChange) { return _this.switch(direction, preventOnChange, _this.getNextIndexCycle); };
                this.get = function () { return _this.dom.value; };
                this.fire = function () { var _a, _b; return (_b = (_a = _this.options) === null || _a === void 0 ? void 0 : _a.change) === null || _b === void 0 ? void 0 : _b.call(_a, null, _this); };
                this.loadParameter = function (params, saveParameter) {
                    var value = params[_this.dom.id];
                    if (undefined !== value) {
                        _this.switch(value);
                    }
                    _this.saveParameter = saveParameter;
                    return _this;
                };
                this.dom = Control.getDom(data);
                if (!(this.dom instanceof HTMLSelectElement)) {
                    console.error("🦋 FIXME: Contorl.Select.InvalidDom", data, this.dom);
                }
                this.reloadOptions(this.data.default);
                this.dom.addEventListener("change", function (event) {
                    var _a, _b, _c;
                    Control.eventLog({ control: _this, event: event, message: "👆 Select.Change:", value: _this.get() });
                    (_b = (_a = _this.options) === null || _a === void 0 ? void 0 : _a.change) === null || _b === void 0 ? void 0 : _b.call(_a, event, _this);
                    (_c = _this.saveParameter) === null || _c === void 0 ? void 0 : _c.call(_this, _this.getId(), _this.get());
                });
            }
            return Select;
        }());
        Control.Select = Select;
        var Checkbox = /** @class */ (function () {
            function Checkbox(data, options) {
                var _this = this;
                var _a;
                this.data = data;
                this.options = options;
                this.catchUpRestore = function (params) {
                    var _a, _b, _c, _d;
                    var urlParam = params === null || params === void 0 ? void 0 : params[_this.dom.id];
                    if ((undefined !== urlParam ?
                        "true" === urlParam :
                        ((_a = _this.data.default) !== null && _a !== void 0 ? _a : false)) !== _this.get()) {
                        Control.eventLog({ control: _this, event: "catchUpRestore", message: "👆 Checkbox.Change:", value: _this.get() });
                        (_c = (_b = _this.options) === null || _b === void 0 ? void 0 : _b.change) === null || _c === void 0 ? void 0 : _c.call(_b, null, _this);
                        (_d = _this.saveParameter) === null || _d === void 0 ? void 0 : _d.call(_this, _this.getId(), _this.get() ? "true" : "false");
                    }
                };
                this.getId = function () { return Control.getDomId(_this.data); };
                this.setChange = function (change) {
                    return _this.options = __assign(__assign({}, _this.options), { change: change });
                };
                this.toggle = function (checked, preventOnChange) {
                    var _a, _b;
                    _this.dom.checked = checked !== null && checked !== void 0 ? checked : !_this.get();
                    if (undefined === preventOnChange) {
                        (_b = (_a = _this.options) === null || _a === void 0 ? void 0 : _a.change) === null || _b === void 0 ? void 0 : _b.call(_a, null, _this);
                    }
                };
                this.get = function () { return _this.dom.checked; };
                this.fire = function () { var _a, _b; return (_b = (_a = _this.options) === null || _a === void 0 ? void 0 : _a.change) === null || _b === void 0 ? void 0 : _b.call(_a, null, _this); };
                this.loadParameter = function (params, saveParameter) {
                    var value = params[_this.dom.id];
                    if (undefined !== value) {
                        _this.toggle("true" === value);
                    }
                    _this.saveParameter = saveParameter;
                    return _this;
                };
                this.dom = Control.getDom(data);
                if (!(this.dom instanceof HTMLInputElement) || "checkbox" !== this.dom.type.toLowerCase()) {
                    console.error("🦋 FIXME: Contorl.Checkbox.InvalidDom", data, this.dom);
                }
                if (undefined !== this.data.default) {
                    this.toggle(this.data.default, [Control.preventOnChange][false !== ((_a = this.options) === null || _a === void 0 ? void 0 : _a.preventOnChangeWhenNew) ? 0 : 1]);
                }
                this.dom.addEventListener("change", function (event) {
                    var _a, _b, _c;
                    Control.eventLog({ control: _this, event: event, message: "👆 Checkbox.Change:", value: _this.get() });
                    (_b = (_a = _this.options) === null || _a === void 0 ? void 0 : _a.change) === null || _b === void 0 ? void 0 : _b.call(_a, event, _this);
                    (_c = _this.saveParameter) === null || _c === void 0 ? void 0 : _c.call(_this, _this.getId(), _this.get() ? "true" : "false");
                });
            }
            return Checkbox;
        }());
        Control.Checkbox = Checkbox;
        var Range = /** @class */ (function () {
            function Range(data, options) {
                var _this = this;
                var _a, _b, _c, _d;
                this.data = data;
                this.options = options;
                this.catchUpRestore = function (params) {
                    var _a, _b, _c;
                    var urlParam = params === null || params === void 0 ? void 0 : params[_this.dom.id];
                    if (undefined !== urlParam && urlParam !== "".concat(_this.get())) {
                        Control.eventLog({ control: _this, event: "catchUpRestore", message: "👆 Range.Change:", value: _this.get() });
                        (_b = (_a = _this.options) === null || _a === void 0 ? void 0 : _a.change) === null || _b === void 0 ? void 0 : _b.call(_a, null, _this);
                        (_c = _this.saveParameter) === null || _c === void 0 ? void 0 : _c.call(_this, _this.getId(), "".concat(_this.get()));
                    }
                };
                this.getId = function () { return Control.getDomId(_this.data); };
                this.setChange = function (change) {
                    return _this.options = __assign(__assign({}, _this.options), { change: change });
                };
                this.set = function (value, preventOnChange) {
                    var _a, _b;
                    _this.dom.value = "".concat(value);
                    if (undefined === preventOnChange) {
                        (_b = (_a = _this.options) === null || _a === void 0 ? void 0 : _a.change) === null || _b === void 0 ? void 0 : _b.call(_a, null, _this);
                    }
                };
                this.get = function () { return parseFloat(_this.dom.value); };
                this.fire = function () { var _a, _b; return (_b = (_a = _this.options) === null || _a === void 0 ? void 0 : _a.change) === null || _b === void 0 ? void 0 : _b.call(_a, null, _this); };
                this.loadParameter = function (params, saveParameter) {
                    var value = params[_this.dom.id];
                    if (undefined !== value) {
                        _this.set(parseFloat(value));
                    }
                    _this.saveParameter = saveParameter;
                    return _this;
                };
                this.dom = Control.getDom(data);
                if (!(this.dom instanceof HTMLInputElement) || "range" !== this.dom.type.toLowerCase()) {
                    console.error("🦋 FIXME: Contorl.Range.InvalidDom", data, this.dom);
                }
                this.dom.min = "".concat((_a = this.data.min) !== null && _a !== void 0 ? _a : 0);
                this.dom.max = "".concat((_b = this.data.max) !== null && _b !== void 0 ? _b : 100);
                this.dom.step = "".concat((_c = this.data.step) !== null && _c !== void 0 ? _c : 1);
                if (undefined !== this.data.default) {
                    this.set(this.data.default, [Control.preventOnChange][false !== ((_d = this.options) === null || _d === void 0 ? void 0 : _d.preventOnChangeWhenNew) ? 0 : 1]);
                }
                this.dom.addEventListener("change", function (event) {
                    var _a, _b, _c;
                    Control.eventLog({ control: _this, event: event, message: "👆 Range.Change:", value: _this.get() });
                    (_b = (_a = _this.options) === null || _a === void 0 ? void 0 : _a.change) === null || _b === void 0 ? void 0 : _b.call(_a, event, _this);
                    (_c = _this.saveParameter) === null || _c === void 0 ? void 0 : _c.call(_this, _this.getId(), "".concat(_this.get()));
                });
                this.dom.addEventListener("input", function (event) {
                    var _a, _b, _c;
                    Control.eventLog({ control: _this, event: event, message: "👆 Range.Input:", value: _this.get() });
                    (_b = (_a = _this.options) === null || _a === void 0 ? void 0 : _a.change) === null || _b === void 0 ? void 0 : _b.call(_a, event, _this);
                    (_c = _this.saveParameter) === null || _c === void 0 ? void 0 : _c.call(_this, _this.getId(), "".concat(_this.get()));
                });
            }
            return Range;
        }());
        Control.Range = Range;
    })(Control || (exports.Control = Control = {}));
});
define("resource/images", [], {
    "error-icon": "./image/forbidden.svg",
    "audio-icon": "./image/audio.svg",
    "cross-icon": "./image/cross.svg"
});
define("script/library/svg", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Svg = void 0;
    var Svg;
    (function (Svg) {
        var _this = this;
        Svg.isEmbeddedImage = function (url) {
            return ["SVG:error", "SVG:audio"].includes(url);
        };
        Svg.getSvg = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = url;
                        switch (_a) {
                            case "SVG:error": return [3 /*break*/, 1];
                            case "SVG:audio": return [3 /*break*/, 3];
                            case "SVG:close": return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, Svg.loadSvg("error-icon")];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, Svg.loadSvg("audio-icon")];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [4 /*yield*/, Svg.loadSvg("cross-icon")];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7:
                        console.error("\uD83D\uDEAB Unsupported embedded image URL: ".concat(url));
                        return [4 /*yield*/, Svg.loadSvg("error-icon")];
                    case 8: return [2 /*return*/, _b.sent()];
                }
            });
        }); };
        Svg.loadSvg = function (key) { return __awaiter(_this, void 0, void 0, function () {
            var dom;
            return __generator(this, function (_a) {
                try {
                    dom = document.getElementById(key);
                    if (dom) {
                        return [2 /*return*/, new DOMParser().parseFromString(dom.innerHTML, "image/svg+xml").documentElement];
                    }
                    else {
                        console.error("\uD83D\uDEAB SVG element with id \"".concat(key, "\" not found in the DOM."));
                        return [2 /*return*/, null];
                    }
                }
                catch (error) {
                    console.error("\uD83D\uDEAB Error loading SVG with key \"".concat(key, "\":"), error);
                    throw error;
                }
                return [2 /*return*/];
            });
        }); };
    })(Svg || (exports.Svg = Svg = {}));
});
define("script/library/index", ["require", "exports", "script/library/locale", "script/library/ui", "script/library/control", "script/library/svg"], function (require, exports, ImportedLocale, ImportedUI, ImportedControl, ImportedSvg) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Library = void 0;
    ImportedLocale = __importStar(ImportedLocale);
    ImportedUI = __importStar(ImportedUI);
    ImportedControl = __importStar(ImportedControl);
    ImportedSvg = __importStar(ImportedSvg);
    var Library;
    (function (Library) {
        Library.Locale = ImportedLocale.Locale;
        Library.UI = ImportedUI.UI;
        Library.Control = ImportedControl.Control;
        Library.Svg = ImportedSvg.Svg;
    })(Library || (exports.Library = Library = {}));
});
define("script/tools/timespan", ["require", "exports", "script/library/index", "script/tools/number"], function (require, exports, _library_1, number_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Timespan = void 0;
    var Timespan;
    (function (Timespan) {
        Timespan.toDisplayString = function (value, maximumFractionDigits) {
            return value < 1000 ? "".concat(number_1.Number.toString(value, maximumFractionDigits), " ").concat(_library_1.Library.Locale.map("timeUnitMs")) :
                value < 60 * 1000 ? "".concat(number_1.Number.toString(value / 1000, maximumFractionDigits), " ").concat(_library_1.Library.Locale.map("timeUnitS")) :
                    value < 60 * 60 * 1000 ? "".concat(number_1.Number.toString(value / (60 * 1000), maximumFractionDigits), " ").concat(_library_1.Library.Locale.map("timeUnitM")) :
                        value < 24 * 60 * 60 * 1000 ? "".concat(number_1.Number.toString(value / (60 * 60 * 1000), maximumFractionDigits), " ").concat(_library_1.Library.Locale.map("timeUnitH")) :
                            "".concat(number_1.Number.toString(value / (24 * 60 * 60 * 1000), maximumFractionDigits), " ").concat(_library_1.Library.Locale.map("timeUnitD"));
        };
        Timespan.toMediaTimeString = function (value) {
            var seconds = Math.floor(value / 1000);
            var hours = Math.floor(seconds / 3600);
            var minutes = Math.floor((seconds % 3600) / 60);
            var secs = seconds % 60;
            if (hours === 0) {
                return "".concat(minutes.toString().padStart(2, "0"), ":").concat(secs.toString().padStart(2, "0"));
            }
            {
                return "".concat(hours.toString().padStart(2, "0"), ":").concat(minutes.toString().padStart(2, "0"), ":").concat(secs.toString().padStart(2, "0"));
            }
        };
    })(Timespan || (exports.Timespan = Timespan = {}));
});
define("script/tools/hash", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Hash = void 0;
    var Hash;
    (function (Hash) {
        Hash.fnv1a_32 = function (key) {
            var hash = 2166136261;
            for (var _i = 0, key_1 = key; _i < key_1.length; _i++) {
                var char = key_1[_i];
                hash ^= char.charCodeAt(0);
                hash = (hash * 16777619) >>> 0;
            }
            return hash;
        };
    })(Hash || (exports.Hash = Hash = {}));
});
define("script/tools/random", ["require", "exports", "script/tools/hash"], function (require, exports, hash_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Random = void 0;
    var Random;
    (function (Random) {
        Random.makeInteger = function (size, random, index, prime) {
            if (random === void 0) { random = Math.random; }
            return Math.floor(random(index, prime) * size);
        };
        Random.select = function (list, random, index, prime) {
            if (random === void 0) { random = Math.random; }
            return list[Random.makeInteger(list.length, random, index, prime)];
        };
        var IndexedRandom = /** @class */ (function () {
            function IndexedRandom(hash32, seed, prime) {
                if (hash32 === void 0) { hash32 = hash_1.Hash.fnv1a_32; }
                if (seed === void 0) { seed = Math.random(); }
                if (prime === void 0) { prime = 31; }
                var _this = this;
                this.hash32 = hash32;
                this.seed = seed;
                this.prime = prime;
                this.index = 0;
                this.get = function (index, prime) {
                    return _this.hash32("".concat(_this.seed, ":").concat((prime !== null && prime !== void 0 ? prime : _this.prime) * (index !== null && index !== void 0 ? index : (_this.index++)))) / 0xFFFFFFFF;
                };
                this.getFunction = function () {
                    return _this.get.bind(_this);
                };
                this.setIndex = function (index) {
                    return _this.index = index;
                };
                this.resetIndex = function () {
                    return _this.setIndex(0);
                };
            }
            return IndexedRandom;
        }());
        Random.IndexedRandom = IndexedRandom;
    })(Random || (exports.Random = Random = {}));
});
define("script/tools/byte", ["require", "exports", "script/tools/number"], function (require, exports, number_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Byte = void 0;
    var Byte;
    (function (Byte) {
        var toString = function (value, maximumDigits) {
            return value.toLocaleString(undefined, {
                maximumFractionDigits: undefined === maximumDigits ? undefined :
                    Math.max(0, maximumDigits - number_2.Number.getIntegralDigits(value)),
            });
        };
        Byte.toDisplayString = function (value, maximumDigits) {
            return value < 1024 ? "".concat(toString(value, maximumDigits), " B") :
                value < 1024 * 1024 ? "".concat(toString(value / 1024, maximumDigits), " KiB") :
                    value < 1024 * 1024 * 1024 ? "".concat(toString(value / (1024 * 1024), maximumDigits), " MiB") :
                        value < 1024 * 1024 * 1024 * 1024 ? "".concat(toString(value / (1024 * 1024 * 1024 * 1024), maximumDigits), " GiB") :
                            "".concat(toString(value / (1024 * 1024 * 1024 * 1024 * 1024), maximumDigits), " TiB");
        };
    })(Byte || (exports.Byte = Byte = {}));
});
define("script/tools/index", ["require", "exports", "script/tools/type-guards", "script/tools/number", "script/tools/timespan", "script/tools/math", "script/tools/random", "script/tools/array", "script/tools/hash", "script/tools/byte"], function (require, exports, ImportedTypeGuards, ImportedNumber, ImportedTimespan, ImportedMath, ImportedRandom, ImportedArray, ImportedHash, ImportedByte) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tools = void 0;
    ImportedTypeGuards = __importStar(ImportedTypeGuards);
    ImportedNumber = __importStar(ImportedNumber);
    ImportedTimespan = __importStar(ImportedTimespan);
    ImportedMath = __importStar(ImportedMath);
    ImportedRandom = __importStar(ImportedRandom);
    ImportedArray = __importStar(ImportedArray);
    ImportedHash = __importStar(ImportedHash);
    ImportedByte = __importStar(ImportedByte);
    var Tools;
    (function (Tools) {
        Tools.TypeGuards = ImportedTypeGuards.TypeGuards;
        Tools.Number = ImportedNumber.Number;
        Tools.Timespan = ImportedTimespan.Timespan;
        Tools.Math = ImportedMath.Math;
        Tools.Random = ImportedRandom.Random;
        Tools.Array = ImportedArray.Array;
        Tools.Hash = ImportedHash.Hash;
        Tools.Byte = ImportedByte.Byte;
    })(Tools || (exports.Tools = Tools = {}));
});
define("script/features/fps", ["require", "exports", "script/tools/index"], function (require, exports, _tools_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Fps = void 0;
    var Fps;
    (function (Fps) {
        var OnlineStandardDeviation = /** @class */ (function () {
            function OnlineStandardDeviation() {
                var _this = this;
                this.count = 0;
                this.mean = 0;
                this.m2 = 0;
                this.reset = function () {
                    _this.count = 0;
                    _this.mean = 0;
                    _this.m2 = 0;
                };
                this.update = function (value) {
                    _this.count += 1;
                    var delta = value - _this.mean;
                    _this.mean += delta / _this.count;
                    var delta2 = value - _this.mean;
                    _this.m2 += delta * delta2;
                };
                this.isValid = function () { return 1 < _this.count; };
                this.getVariance = function () {
                    return _this.isValid() ? _this.m2 / (_this.count - 1) : 0;
                };
                this.getStandardDeviation = function () {
                    return Math.sqrt(_this.getVariance());
                };
            }
            return OnlineStandardDeviation;
        }());
        Fps.OnlineStandardDeviation = OnlineStandardDeviation;
        Fps.standardDeviation = new OnlineStandardDeviation();
        var fpsWindow = 1000; // ms
        var frameTimings = [];
        var fpsHistory = [];
        Fps.averageFps = NaN; // 直近1秒間の平均FPSを格納する変数
        var makeInvalidFpsHistoryEntry = function () {
            return ({
                fps: NaN,
                now: NaN,
                text: "N/A FPS",
            });
        };
        Fps.reset = function () {
            Fps.isValid = false;
            frameTimings = [];
            fpsHistory = [];
            Fps.currentMaxFps = Fps.currentNowFps = Fps.currentMinFps =
                makeInvalidFpsHistoryEntry();
            Fps.standardDeviation.reset();
            Fps.averageFps = NaN; // リセット時に初期化
        };
        Fps.step = function (now) {
            frameTimings.push(now);
            Fps.isValid = 2 <= frameTimings.length;
            if (Fps.isValid) {
                while (2 < frameTimings.length && fpsWindow < now - frameTimings[0]) {
                    frameTimings.shift();
                }
                var timeSpan = Math.max(now - frameTimings[0], 0.001); // max for avoid 0 div
                var frameCount = frameTimings.length - 1;
                var fps = (frameCount * 1000) / timeSpan;
                Fps.standardDeviation.update(fps);
                Fps.currentNowFps =
                    {
                        fps: fps,
                        now: now,
                        text: makeFpsText(fps),
                    };
                var expiredAt = now - fpsWindow;
                while (0 < fpsHistory.length && fpsHistory[0].now < expiredAt) {
                    fpsHistory.shift();
                }
                fpsHistory.push(Fps.currentNowFps);
                Fps.currentMaxFps = Fps.currentNowFps;
                Fps.currentMinFps = Fps.currentNowFps;
                fpsHistory.forEach(function (i) {
                    if (Fps.currentMaxFps.fps < i.fps) {
                        Fps.currentMaxFps = i;
                    }
                    if (i.fps < Fps.currentMinFps.fps) {
                        Fps.currentMinFps = i;
                    }
                });
                var totalFps = _tools_1.Tools.Math.sum(fpsHistory.map(function (i) { return i.fps; }));
                Fps.averageFps = totalFps / fpsHistory.length;
                if (Fps.isUnderFuseFps()) {
                    console.error("❌ UnderFuseFps:", {
                        fuseFps: Fps.fuseFps,
                        maxFps: Fps.currentMaxFps.fps,
                        nowFps: Fps.currentMaxFps.fps,
                        minFps: Fps.currentMinFps.fps,
                        averageFps: Fps.averageFps,
                    });
                }
            }
        };
        var makeFpsText = function (fps) {
            return "".concat(fps.toLocaleString("en-US", { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2, }), " FPS");
        };
        Fps.getText = function () {
            return Fps.currentMaxFps.text + " (Max)\n"
                + "".concat(Fps.averageFps.toFixed(2), " FPS (Avg)\n")
                //+currentNowFps.text + " (Now)\n"
                + Fps.currentMinFps.text + " (Min)";
        };
        Fps.isUnderFuseFps = function () { return Fps.isValid && Fps.currentMaxFps.fps < Fps.fuseFps; };
    })(Fps || (exports.Fps = Fps = {}));
});
define("resource/control", [], {
    "volume": {
        "id": "volume",
        "min": 0,
        "max": 100,
        "step": 1,
        "default": 100
    },
    "transition": {
        "id": "transition",
        "default": false
    },
    "imageSpan": {
        "id": "image-span",
        "enum": [
            3600000,
            1800000,
            900000,
            750000,
            600000,
            450000,
            300000,
            180000,
            90000,
            60000,
            45000,
            30000,
            18000,
            12500,
            10000,
            7500,
            5000,
            4000,
            3000,
            2500,
            2000,
            1500,
            1000
        ],
        "default": 7500
    },
    "loopShortMedia": {
        "id": "loop-short-media",
        "default": false
    },
    "withFullscreen": {
        "id": "with-fullscreen",
        "default": false
    },
    "showFps": {
        "id": "show-fps",
        "default": false
    },
    "clock": {
        "id": "clock",
        "enum": [
            "hide",
            "blend",
            "white",
            "black",
            "system",
            "alternate",
            "rainbow"
        ],
        "default": "hide"
    },
    "brightness": {
        "id": "brightness",
        "min": 0,
        "max": 100,
        "step": 1,
        "default": 100
    },
    "stretch": {
        "id": "stretch",
        "min": 0,
        "max": 100,
        "step": 1,
        "default": 70
    },
    "padding": {
        "id": "padding",
        "default": false
    },
    "language": {
        "id": "language",
        "enum": [
            "Auto"
        ],
        "default": "Auto"
    }
});
define("resource/powered-by", [], {
    "build.js": "https://github.com/wraith13/build.js",
    "evil-commonjs": "https://github.com/wraith13/evil-commonjs",
    "evil-timer.js": "https://github.com/wraith13/evil-timer.js"
});
define("script/ui", ["require", "exports", "script/tools/index", "script/library/index", "resource/control", "resource/powered-by"], function (require, exports, _tools_2, _library_2, control_json_1, powered_by_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UI = void 0;
    control_json_1 = __importDefault(control_json_1);
    powered_by_json_1 = __importDefault(powered_by_json_1);
    var UI;
    (function (UI) {
        UI.manifest = _library_2.Library.UI.getElementById("link", "manifest");
        UI.noscript = _library_2.Library.UI.getElementById("div", "noscript");
        UI.screenBody = _library_2.Library.UI.getElementById("div", "screen-body");
        UI.mediaScreen = _library_2.Library.UI.getElementById("div", "media-screen");
        UI.playButton = new _library_2.Library.Control.Button({ id: "play-button", });
        UI.nextButton = new _library_2.Library.Control.Button({ id: "next-button", });
        UI.backBUtton = new _library_2.Library.Control.Button({ id: "back-button", });
        UI.shuffleButton = new _library_2.Library.Control.Button({ id: "shuffle-button", });
        UI.repeatButton = new _library_2.Library.Control.Button({ id: "repeat-button", });
        UI.volumeButton = new _library_2.Library.Control.Button({ id: "volume-button", });
        UI.volumeRange = new _library_2.Library.Control.Range(control_json_1.default.volume);
        UI.settingButton = new _library_2.Library.Control.Button({ id: "setting-button", });
        UI.mediaList = _library_2.Library.UI.getElementById("div", "media-list");
        UI.addMediaButton = new _library_2.Library.Control.Button({ id: "add-media", });
        UI.inputFile = _library_2.Library.UI.getElementById("input", "add-file");
        UI.mediaCount = _library_2.Library.UI.getElementById("span", "media-count");
        UI.mediaLength = _library_2.Library.UI.getElementById("span", "media-length");
        UI.transitionCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.transition);
        UI.imageSpanSelect = new _library_2.Library.Control.Select(control_json_1.default.imageSpan, { makeLabel: _tools_2.Tools.Timespan.toDisplayString });
        UI.loopShortMediaCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.loopShortMedia);
        UI.withFullscreenCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.withFullscreen);
        UI.showFpsCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.showFps);
        UI.clockSelect = new _library_2.Library.Control.Select(control_json_1.default.clock, { makeLabel: function (i) { return _library_2.Library.Locale.map(i); }, });
        UI.brightnessRange = new _library_2.Library.Control.Range(control_json_1.default.brightness);
        UI.stretchRange = new _library_2.Library.Control.Range(control_json_1.default.stretch);
        UI.paddingCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.padding);
        UI.languageSelect = new _library_2.Library.Control.Select({
            id: control_json_1.default.language.id,
            enum: _library_2.Library.Locale.getLocaleList(),
            default: control_json_1.default.language.default,
        }, {
            makeLabel: function (i) { return "Auto" === i ?
                _library_2.Library.Locale.map("Auto") :
                ("".concat(i, ": ")
                    + _library_2.Library.Locale.toRtl(_library_2.Library.Locale.map("lang-label", i), _library_2.Library.Locale.isRtl() && _library_2.Library.Locale.isLtr(i))); },
        });
        UI.urlAnchor = _library_2.Library.UI.getElementById("a", "url");
        UI.introductionPanel = _library_2.Library.UI.getElementById("div", "popup-introduction-panel");
        UI.fpsDisplay = _library_2.Library.UI.getElementById("div", "fps");
        UI.clockDisplay = _library_2.Library.UI.getElementById("div", "clock-panel");
        UI.date = _library_2.Library.UI.getElementById("span", "date");
        UI.time = _library_2.Library.UI.getElementById("span", "time");
        UI.keyboardShortcut = _library_2.Library.UI.getElementById("div", "keyboard-shortcut");
        UI.updateLanguage = function () {
            _library_2.Library.Locale.setLocale(UI.languageSelect.get());
            var lang = _library_2.Library.Locale.getLocale();
            document.documentElement.setAttribute("lang", lang);
            document.documentElement.setAttribute("dir", _library_2.Library.Locale.getDirection(lang));
            UI.manifest.setAttribute("href", "web.manifest/generated/".concat(lang, ".json"));
            UI.clockSelect.reloadOptions();
            UI.languageSelect.reloadOptions();
            _library_2.Library.UI.querySelectorAllWithFallback("span", ["[data-lang-key]"])
                .forEach(function (i) { return UI.updateLabel(i); });
        };
        UI.initialize = function () {
            UI.noscript.style.setProperty("display", "none");
            if (!_library_2.Library.UI.fullscreenEnabled && UI.withFullscreenCheckbox.dom.parentElement) {
                UI.withFullscreenCheckbox.dom.parentElement.style.setProperty("display", "none");
            }
            _library_2.Library.UI.setTextContent(_library_2.Library.UI.querySelector("span", "#powered-by .title"), "powered by");
            _library_2.Library.UI.replaceChildren(_library_2.Library.UI.querySelector("ul", "#powered-by ul"), Object.entries(powered_by_json_1.default).map(function (_a) {
                var text = _a[0], href = _a[1];
                return ({ tag: "li", children: [_library_2.Library.UI.createElement({ tag: "a", text: text, attributes: { href: href, } }),], });
            }));
        };
        UI.getDataLangKey = function (element) {
            return element.getAttribute("data-lang-key");
        };
        UI.updateLabel = function (element) {
            return _library_2.Library.UI.setTextContent(element, _library_2.Library.Locale.map(UI.getDataLangKey(element)));
        };
        UI.setLabel = function (element, label) {
            return element.setAttribute("data-lang-key", label);
        };
        UI.setAndUpdateLabel = function (element, label) {
            UI.setLabel(element, label);
            UI.updateLabel(element);
        };
    })(UI || (exports.UI = UI = {}));
});
define("script/features/clock", ["require", "exports", "phi-colors", "script/library/index", "script/tools/index", "script/ui", "resource/config"], function (require, exports, phi_colors_1, library_1, _tools_3, ui_2, config_json_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Clock = void 0;
    config_json_2 = __importDefault(config_json_2);
    var Clock;
    (function (Clock) {
        Clock.makeDate = function (local) {
            return new Date().toLocaleDateString(local, config_json_2.default.clock.dateFormat);
        };
        Clock.makeTime = function (local) {
            return new Date().toLocaleTimeString(local, config_json_2.default.clock.timeFormat);
        };
        Clock.updateText = function (local) {
            library_1.Library.UI.setTextContent(ui_2.UI.date, Clock.makeDate(local));
            library_1.Library.UI.setTextContent(ui_2.UI.time, Clock.makeTime(local));
        };
        Clock.setColor = function (color) {
            library_1.Library.UI.setStyle(ui_2.UI.date, "color", color);
            library_1.Library.UI.setStyle(ui_2.UI.time, "color", color);
        };
        Clock.cloclLocale = undefined;
        var regulateH = function (h) { return _tools_3.Tools.Math.scale(phi_colors_1.phiColors.HslHMin, phi_colors_1.phiColors.HslHMax)(h); };
        var regulateS = function (s) { return _tools_3.Tools.Math.scale(phi_colors_1.phiColors.HslSMin, phi_colors_1.phiColors.HslSMax)(s); };
        var regulateL = function (l) { return _tools_3.Tools.Math.scale(phi_colors_1.phiColors.HslLMin, phi_colors_1.phiColors.HslLMax)(l); };
        var RgbHueUnit = 1 / 3;
        var makeRgb = function (step) { return phi_colors_1.phiColors.clipRgb(phi_colors_1.phiColors.hslToRgb({
            h: regulateH(((RgbHueUnit * step)) % 1),
            s: regulateS(config_json_2.default.colors.phiColors.saturation),
            l: regulateL(config_json_2.default.colors.phiColors.lightness),
        })); };
        Clock.update = function (now) {
            var clockOption = ui_2.UI.clockSelect.get();
            if ("hide" !== clockOption) {
                Clock.updateText(Clock.cloclLocale);
                switch (clockOption) {
                    case "alternate":
                        var isWhite = (new Date().getTime() / config_json_2.default.clock.alternate.span) % 2 < 1.0;
                        ui_2.UI.clockDisplay.classList.toggle("white", isWhite);
                        ui_2.UI.clockDisplay.classList.toggle("black", !isWhite);
                        Clock.setColor(undefined);
                        break;
                    case "rainbow":
                        Clock.setColor(phi_colors_1.phiColors.rgbForStyle(makeRgb((now / 7500) / phi_colors_1.phiColors.phi)));
                        break;
                    default:
                        Clock.setColor(undefined);
                        break;
                }
            }
        };
    })(Clock || (exports.Clock = Clock = {}));
});
define("script/features/media", ["require", "exports", "script/ui", "script/library/index", "script/tools/index", "resource/config"], function (require, exports, ui_3, _library_3, tools_1, Config) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Media = void 0;
    Config = __importStar(Config);
    var Media;
    (function (Media) {
        var _this = this;
        ;
        Media.mediaList = [];
        Media.getMediaCategory = function (file) {
            if (file && file.type) {
                switch (true) {
                    case file.type.startsWith("image/"):
                        return "image";
                    case file.type.startsWith("audio/"):
                        return "audio";
                    case file.type.startsWith("video/"):
                        return "video";
                    default:
                        console.warn("🚫 Unsupported media type:", file.type);
                        return null;
                }
            }
            else {
                console.warn("🚫 Invalid file or file type:", file);
                return null;
            }
        };
        Media.isMediaFile = function (file) {
            return null !== Media.getMediaCategory(file);
        };
        Media.getUrl = function (file) {
            return URL.createObjectURL(file);
        };
        Media.getName = function (file) {
            return file.name || "Unknown File";
        };
        var canvasImageSourceToDataUrl = function (canvasImageSource, width, height) {
            var maxSize = Config.thumbnail.maxSize;
            if (width > maxSize || height > maxSize) {
                var scale = Math.min(maxSize / width, maxSize / height);
                width = Math.round(width * scale);
                height = Math.round(height * scale);
            }
            else {
                if (canvasImageSource instanceof HTMLImageElement) {
                    return canvasImageSource.src;
                }
            }
            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(canvasImageSource, 0, 0, width, height);
                return canvas.toDataURL(Config.thumbnail.type, Config.thumbnail.quality);
            }
            else {
                return "SVG:error";
            }
        };
        Media.imageToEntry = function (category, file) {
            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                var img, url;
                return __generator(this, function (_a) {
                    img = new Image();
                    url = Media.getUrl(file);
                    img.onload = function () { return resolve({
                        file: file,
                        url: url,
                        type: file.type,
                        category: category,
                        name: Media.getName(file),
                        thumbnail: canvasImageSourceToDataUrl(img, img.width, img.height),
                        size: file.size,
                        duration: null,
                        area: { width: img.width, height: img.height },
                    }); };
                    img.onerror = function () { return resolve(null); };
                    img.src = url;
                    return [2 /*return*/];
                });
            }); });
        };
        Media.audioToEntry = function (category, file) {
            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                var url, audio;
                return __generator(this, function (_a) {
                    url = Media.getUrl(file);
                    audio = document.createElement("audio");
                    audio.src = url;
                    audio.addEventListener("loadedmetadata", function () { return resolve({
                        file: file,
                        url: url,
                        type: file.type,
                        category: category,
                        name: Media.getName(file),
                        thumbnail: "SVG:audio",
                        size: file.size,
                        duration: audio.duration * 1000,
                        area: null,
                    }); });
                    audio.addEventListener("error", function () { return resolve(null); });
                    return [2 /*return*/];
                });
            }); });
        };
        Media.videoToEntry = function (category, file) {
            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                var url, video, finish, loadedmetadataCalled, loadeddataCalled, tryFinish;
                return __generator(this, function (_a) {
                    url = Media.getUrl(file);
                    video = document.createElement("video");
                    video.currentTime = 0.1;
                    video.muted = true;
                    video.playsInline = true;
                    video.src = url;
                    finish = function () { return resolve({
                        file: file,
                        url: url,
                        type: file.type,
                        category: category,
                        name: Media.getName(file),
                        thumbnail: canvasImageSourceToDataUrl(video, video.videoWidth, video.videoHeight),
                        size: file.size,
                        duration: video.duration * 1000,
                        area: { width: video.videoWidth, height: video.videoHeight },
                    }); };
                    loadedmetadataCalled = false;
                    loadeddataCalled = false;
                    tryFinish = function () {
                        if (loadedmetadataCalled && loadeddataCalled) {
                            finish();
                        }
                    };
                    video.addEventListener("loadedmetadata", function () {
                        loadedmetadataCalled = true;
                        tryFinish();
                    });
                    video.addEventListener("loadeddata", function () {
                        loadeddataCalled = true;
                        tryFinish();
                    });
                    video.addEventListener("error", function () { return resolve(null); });
                    return [2 /*return*/];
                });
            }); });
        };
        Media.fileToEntry = function (file) { return __awaiter(_this, void 0, void 0, function () {
            var category, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        category = Media.getMediaCategory(file);
                        _a = category;
                        switch (_a) {
                            case "image": return [3 /*break*/, 1];
                            case "audio": return [3 /*break*/, 3];
                            case "video": return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, Media.imageToEntry(category, file)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, Media.audioToEntry(category, file)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [4 /*yield*/, Media.videoToEntry(category, file)];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7:
                        console.warn("🚫 Unsupported media type:", file.type, file);
                        return [2 /*return*/, null];
                }
            });
        }); };
        Media.addMedia = function (file) { return __awaiter(_this, void 0, void 0, function () {
            var entry, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("📂 Adding media:", file);
                        return [4 /*yield*/, Media.fileToEntry(file)];
                    case 1:
                        entry = _c.sent();
                        if (!(null !== entry)) return [3 /*break*/, 3];
                        console.log("✅ Valid media file:", file);
                        Media.mediaList.push(entry);
                        Media.updateInformationDisplay();
                        _b = (_a = ui_3.UI.mediaList).insertBefore;
                        return [4 /*yield*/, Media.makeMediaEntryDom(entry)];
                    case 2:
                        _b.apply(_a, [_c.sent(), ui_3.UI.addMediaButton.dom.parentElement]);
                        console.log("📂 Media added:", Media.mediaList[Media.mediaList.length - 1]);
                        return [3 /*break*/, 4];
                    case 3:
                        console.warn("🚫 Invalid media file:", file);
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        var addMediaQueue = Promise.resolve();
        Media.addMediaSerial = function (file) {
            addMediaQueue = addMediaQueue.then(function () { return Media.addMedia(file); });
        };
        Media.isPixelatedImage = function (entry) {
            return ["image/png", "image/gif"].includes(entry.type);
        };
        Media.isThumbnailPixelatedImage = function (entry) {
            return Media.isPixelatedImage(entry) && entry.url === entry.thumbnail;
        };
        Media.makeThumbnailElement = function (entry) { return __awaiter(_this, void 0, void 0, function () {
            var svg, img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_library_3.Library.Svg.isEmbeddedImage(entry.thumbnail)) return [3 /*break*/, 2];
                        return [4 /*yield*/, _library_3.Library.Svg.getSvg(entry.thumbnail)];
                    case 1:
                        svg = _a.sent();
                        svg.classList.add("thumbnail");
                        svg.setAttribute("alt", entry.name);
                        return [2 /*return*/, svg];
                    case 2:
                        img = {
                            tag: "img",
                            className: "thumbnail" + (Media.isThumbnailPixelatedImage(entry) ? " pixelated" : ""),
                            attributes: {
                                src: entry.thumbnail,
                                alt: entry.name,
                            },
                        };
                        return [2 /*return*/, img];
                }
            });
        }); };
        Media.removeButton = function (entry) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {
                            tag: "button",
                            className: "remove-button"
                        };
                        return [4 /*yield*/, _library_3.Library.Svg.getSvg("SVG:close")];
                    case 1: return [2 /*return*/, (_a.children = [
                            _b.sent()
                        ],
                            _a.events = {
                                "click": function (event) { return __awaiter(_this, void 0, void 0, function () {
                                    var index;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                event.stopPropagation();
                                                (_a = event.target) === null || _a === void 0 ? void 0 : _a.blur();
                                                index = Media.mediaList.indexOf(entry);
                                                if (!(0 <= index && index < Media.mediaList.length)) return [3 /*break*/, 2];
                                                console.log("🗑️ Removing media:", Media.mediaList[index]);
                                                URL.revokeObjectURL(Media.mediaList[index].url);
                                                Media.mediaList.splice(index, 1);
                                                Media.updateInformationDisplay();
                                                return [4 /*yield*/, Media.updateMediaListDisplay()];
                                            case 1:
                                                _b.sent();
                                                _b.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                }); }
                            },
                            _a)];
                }
            });
        }); };
        Media.makeMediaEntryDom = function (entry) { return __awaiter(_this, void 0, void 0, function () {
            var ix, item, _a, _b, _c;
            var _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        ix = Media.mediaList.indexOf(entry);
                        _b = (_a = _library_3.Library.UI).createElement;
                        _d = {
                            tag: "div",
                            className: "item",
                            attributes: { draggable: "true", "data-index": ix }
                        };
                        return [4 /*yield*/, Media.makeThumbnailElement(entry)];
                    case 1:
                        _c = [
                            _e.sent(),
                            { tag: "span", className: "name", text: entry.name, },
                            { tag: "span", className: "type", text: entry.category, },
                            { tag: "span", className: "size", text: tools_1.Tools.Byte.toDisplayString(entry.size, 3), },
                            { tag: "span", className: "duration", text: null !== entry.duration ? tools_1.Tools.Timespan.toMediaTimeString(entry.duration) : "", }
                        ];
                        return [4 /*yield*/, Media.removeButton(entry)];
                    case 2:
                        item = _b.apply(_a, [(_d.children = _c.concat([
                                _e.sent()
                            ]),
                                _d)]);
                        item.addEventListener("dragstart", function (event) {
                            var _a;
                            ui_3.UI.mediaList.classList.add("dragging");
                            item.classList.add("dragging");
                            (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", String(ix));
                        });
                        item.addEventListener("dragend", function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        ui_3.UI.mediaList.classList.remove("dragging");
                                        item.classList.remove("dragging");
                                        return [4 /*yield*/, Media.updateMediaListDisplay()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        item.addEventListener("dragover", function (event) {
                            event.preventDefault();
                            item.classList.add("drag-over");
                        });
                        item.addEventListener("dragleave", function () {
                            item.classList.remove("drag-over");
                        });
                        item.addEventListener("drop", function (event) { return __awaiter(_this, void 0, void 0, function () {
                            var fromIndex, toIndex, moved;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        event.preventDefault();
                                        item.classList.remove("drag-over");
                                        fromIndex = Number((_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain"));
                                        toIndex = ix;
                                        if (fromIndex !== null && fromIndex !== toIndex) {
                                            moved = Media.mediaList.splice(fromIndex, 1)[0];
                                            Media.mediaList.splice(toIndex, 0, moved);
                                        }
                                        return [4 /*yield*/, Media.updateMediaListDisplay()];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, item];
                }
            });
        }); };
        Media.updateMediaListDisplay = function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, mediaList_1, entry, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        Array.from(ui_3.UI.mediaList.children).forEach(function (child) {
                            if (child instanceof HTMLDivElement && !child.classList.contains("add")) {
                                child.remove();
                            }
                            ;
                        });
                        _i = 0, mediaList_1 = Media.mediaList;
                        _c.label = 1;
                    case 1:
                        if (!(_i < mediaList_1.length)) return [3 /*break*/, 4];
                        entry = mediaList_1[_i];
                        _b = (_a = ui_3.UI.mediaList).insertBefore;
                        return [4 /*yield*/, Media.makeMediaEntryDom(entry)];
                    case 2:
                        _b.apply(_a, [_c.sent(), ui_3.UI.addMediaButton.dom.parentElement]);
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        Media.updateInformationDisplay = function () {
            _library_3.Library.UI.setTextContent(ui_3.UI.mediaCount, Media.mediaList.length.toString());
            var imageSpan = parseInt(ui_3.UI.imageSpanSelect.get());
            var totalDuration = Media.mediaList.reduce(function (sum, entry) { var _a; return sum + ((_a = entry.duration) !== null && _a !== void 0 ? _a : imageSpan); }, 0);
            _library_3.Library.UI.setTextContent(ui_3.UI.mediaLength, tools_1.Tools.Timespan.toMediaTimeString(totalDuration));
        };
        Media.initialize = function () {
            Media.updateInformationDisplay();
        };
    })(Media || (exports.Media = Media = {}));
});
define("script/features/visualizer", ["require", "exports", "script/library/index", "script/tools/index"], function (require, exports, _library_4, _tools_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Visualizer = void 0;
    var Visualizer;
    (function (Visualizer) {
        Visualizer.make = function (media) {
            var visualDom = _library_4.Library.UI.createElement({ tag: "div", className: "visual" });
            switch (media.type) {
                case "audio":
                    //visualDom.classList.add("audio");
                    break;
            }
            return visualDom;
        };
        Visualizer.step = function (_media, playerDom, visualDom) {
            _library_4.Library.UI.setTextContent(visualDom, "".concat(_tools_4.Tools.Timespan.toMediaTimeString(playerDom.currentTime), " / ").concat(_tools_4.Tools.Timespan.toMediaTimeString(playerDom.duration)));
        };
    })(Visualizer || (exports.Visualizer = Visualizer = {}));
});
define("script/features/player", ["require", "exports", "script/features/fps", "script/features/clock", "script/library/index", "script/ui", "script/features/media", "script/features/visualizer", "resource/config"], function (require, exports, fps_1, clock_1, _library_5, ui_4, media_1, visualizer_1, config) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Player = void 0;
    config = __importStar(config);
    var Player;
    (function (Player) {
        var TransitionSession = /** @class */ (function () {
            function TransitionSession() {
            }
            return TransitionSession;
        }());
        Player.TransitionSession = TransitionSession;
        var Track = /** @class */ (function () {
            function Track(media) {
                this.startTime = null;
                this.elapsedTime = null;
                this.media = media;
                switch (media.type) {
                    case "image":
                        this.playerDom = _library_5.Library.UI.createElement({
                            tag: "img",
                            className: "player",
                            attributes: {
                                src: media.url,
                                alt: media.name,
                            },
                        });
                        this.visualDom = this.playerDom;
                        break;
                    case "audio":
                        this.playerDom = _library_5.Library.UI.createElement({
                            tag: "audio",
                            className: "player",
                            attributes: {
                                src: media.url,
                                controls: false,
                                autoplay: false,
                                loop: this.isLoop(),
                            },
                        });
                        this.visualDom = visualizer_1.Visualizer.make(media);
                        break;
                    case "video":
                        this.playerDom = _library_5.Library.UI.createElement({
                            tag: "video",
                            className: "player",
                            attributes: {
                                src: media.url,
                                controls: false,
                                autoplay: false,
                                loop: this.isLoop(),
                            },
                        });
                        this.visualDom = _library_5.Library.UI.createElement({ tag: "div", className: "visual" });
                        break;
                    default:
                        console.error("🦋 Unknown media type:", media.type, media);
                        this.playerDom = null;
                        this.visualDom = null;
                        break;
                }
                // this.startTime = Date.now();
                // this.endTime = this.startTime + (media.duration ?? parseFloat(UI.imageSpanSelect.get()));
            }
            Track.prototype.play = function () {
                if (this.playerDom instanceof HTMLMediaElement) {
                    this.playerDom.play();
                }
                if (null !== this.elapsedTime) {
                    this.startTime = Date.now() - this.elapsedTime;
                }
                else {
                    this.startTime = Date.now();
                }
            };
            Track.prototype.pause = function () {
                if (this.playerDom instanceof HTMLMediaElement) {
                    this.playerDom.pause();
                }
                if (null !== this.startTime) {
                    this.elapsedTime = Date.now() - this.startTime;
                }
            };
            Track.prototype.setPositionState = function () {
                navigator.mediaSession.setPositionState({
                    duration: this.getDuration(),
                    playbackRate: this.playerDom instanceof HTMLMediaElement ? this.playerDom.playbackRate : 1.0,
                    position: this.getElapsedTime() / 1000,
                });
            };
            Track.prototype.step = function () {
                if (this.playerDom instanceof HTMLAudioElement && !this.playerDom.paused) {
                    visualizer_1.Visualizer.step(this.media, this.playerDom, this.visualDom);
                }
                this.setPositionState(); // 🔥 これはここでやっちゃダメ！
            };
            Track.prototype.isLoop = function () {
                var loopShortMedia = ui_4.UI.loopShortMediaCheckbox.get();
                var imageSpan = parseFloat(ui_4.UI.imageSpanSelect.get());
                return loopShortMedia && null !== this.media.duration && this.media.duration < imageSpan;
            };
            Track.prototype.getDuration = function () {
                var _a;
                var imageSpan = parseFloat(ui_4.UI.imageSpanSelect.get());
                if (this.isLoop()) {
                    return imageSpan;
                }
                else {
                    return (_a = this.media.duration) !== null && _a !== void 0 ? _a : imageSpan;
                }
            };
            Track.prototype.getEndTime = function () {
                if (null === this.startTime) {
                    return 0;
                }
                else if (this.playerDom instanceof HTMLMediaElement && !this.isLoop()) {
                    return Date.now() + ((this.playerDom.duration - this.playerDom.currentTime) * 1000);
                }
                else {
                    return this.startTime + this.getDuration();
                }
            };
            Track.prototype.getElapsedTime = function () {
                if (null === this.startTime) {
                    return 0;
                }
                else if (this.playerDom instanceof HTMLMediaElement && !this.isLoop()) {
                    return this.playerDom.currentTime * 1000;
                }
                else {
                    return Date.now() - this.startTime;
                }
            };
            Track.prototype.getRemainingTime = function () {
                if (null === this.startTime) {
                    return 0;
                }
                else if (this.playerDom instanceof HTMLMediaElement && !this.isLoop()) {
                    return (this.playerDom.duration - this.playerDom.currentTime) * 1000;
                }
                else {
                    return this.getEndTime() - Date.now();
                }
            };
            Track.prototype.updateMinVisibleRate = function () {
                if (this.visualDom) {
                    var minVisibleRate = (100 - ui_4.UI.stretchRange.get()) / 100;
                    if (this.media.area) {
                        var widthScale = this.media.area.width / document.body.clientWidth;
                        var heightScale = this.media.area.height / document.body.clientHeight;
                        var minScale = Math.min(widthScale, heightScale);
                        var maxScale = Math.max(widthScale, heightScale);
                        var maxStreach = minScale / maxScale;
                        var ratio = Math.min(maxStreach, minVisibleRate);
                        var scale = minScale / ratio;
                        var scaledWidth = this.media.area.width * scale;
                        var scaledHeight = this.media.area.height * scale;
                        _library_5.Library.UI.setStyle(this.visualDom, "width", "".concat(scaledWidth, "px"));
                        _library_5.Library.UI.setStyle(this.visualDom, "height", "".concat(scaledHeight, "px"));
                    }
                    else {
                        _library_5.Library.UI.setStyle(this.visualDom, "width", "100%");
                        _library_5.Library.UI.setStyle(this.visualDom, "height", "100%");
                    }
                }
            };
            Track.prototype.setVolume = function (volume) {
                if (this.playerDom instanceof HTMLMediaElement) {
                    this.playerDom.volume = volume;
                }
            };
            Track.prototype.transitionStep = function (rate) {
                if (this.visualDom) {
                    this.visualDom.style.opacity = "".concat(rate);
                }
            };
            return Track;
        }());
        Player.Track = Track;
        var noMediaTimer = new _library_5.Library.UI.ToggleClassForWhileTimer();
        var loopHandle = null;
        Player.updateFullscreenState = function (fullscreen) {
            if (_library_5.Library.UI.fullscreenEnabled) {
                if (fullscreen !== null && fullscreen !== void 0 ? fullscreen : ui_4.UI.withFullscreenCheckbox.get()) {
                    _library_5.Library.UI.requestFullscreen(document.body);
                    setTimeout(function () { return document.body.focus(); }, 100);
                }
                else {
                    _library_5.Library.UI.exitFullscreen();
                }
            }
        };
        Player.play = function () {
            Player.updateFullscreenState();
            if (null !== loopHandle) {
                window.cancelAnimationFrame(loopHandle);
            }
            loopHandle = window.requestAnimationFrame(Player.loop);
            navigator.mediaSession.metadata = new MediaMetadata({
                title: config.applicationTitle,
                artist: "Unknown Artist",
                album: "Temporary Media List",
                artwork: [
                    {
                        src: "./image/appicon.png",
                        type: "image/png",
                    },
                ],
            });
            navigator.mediaSession.playbackState = "playing";
            document.body.classList.toggle("list", false);
            document.body.classList.toggle("play", true);
            if (media_1.Media.mediaList.length <= 0) {
                noMediaTimer.start(document.body, "no-media", 5000);
            }
        };
        Player.pause = function () {
            if (null !== loopHandle) {
                window.cancelAnimationFrame(loopHandle);
            }
            ui_4.UI.clockDisplay.style.removeProperty("opacity");
            Player.updateFullscreenState(false);
            navigator.mediaSession.playbackState = "paused";
            document.body.classList.toggle("list", true);
            document.body.classList.toggle("play", false);
        };
        Player.previous = function () {
        };
        Player.next = function () {
        };
        Player.updateFps = function () {
            if (ui_4.UI.showFpsCheckbox.get()) {
                _library_5.Library.UI.setTextContent(ui_4.UI.fpsDisplay, fps_1.Fps.getText());
            }
        };
        Player.loop = function (now) {
            if (document.body.classList.contains("play")) {
                clock_1.Clock.update(now);
                fps_1.Fps.step(now);
                Player.updateFps();
                loopHandle = window.requestAnimationFrame(Player.loop);
            }
            else {
                loopHandle = null;
            }
        };
        Player.playMedia = function (entry) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: entry.name,
                artist: "Unknown Artist",
                album: "Temporary Media List",
                artwork: [{ src: entry.thumbnail, }],
            });
            switch (entry.type) {
                case "image":
                    break;
                case "audio":
                    break;
                case "video":
                    break;
                default:
                    console.error("🦋 Unknown media type:", entry.type, entry);
                    return;
            }
        };
    })(Player || (exports.Player = Player = {}));
});
define("script/features/index", ["require", "exports", "script/features/fps", "script/features/clock", "script/features/media", "script/features/visualizer", "script/features/player"], function (require, exports, ImportedFps, ImportedClock, ImportedMedia, ImportedVisualizer, ImportedPlayer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Features = void 0;
    ImportedFps = __importStar(ImportedFps);
    ImportedClock = __importStar(ImportedClock);
    ImportedMedia = __importStar(ImportedMedia);
    ImportedVisualizer = __importStar(ImportedVisualizer);
    ImportedPlayer = __importStar(ImportedPlayer);
    var Features;
    (function (Features) {
        Features.Fps = ImportedFps.Fps;
        Features.Clock = ImportedClock.Clock;
        Features.Media = ImportedMedia.Media;
        Features.Visualizer = ImportedVisualizer.Visualizer;
        Features.Player = ImportedPlayer.Player;
    })(Features || (exports.Features = Features = {}));
});
define("resource/evil-commonjs.config", [], {
    "log": {
        "config": false,
        "load": false,
        "define": false,
        "readyToCapture": false,
        "results": false
    },
    "loadingTimeout": 500
});
define("resource/evil-timer.js.config", [], {
    "debug": true
});
define("script/url", ["require", "exports", "resource/config"], function (require, exports, config_json_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Url = void 0;
    config_json_3 = __importDefault(config_json_3);
    var Url;
    (function (Url) {
        Url.parseParameter = function (url) {
            var result = {};
            var urlObj = new URL(url);
            var params = urlObj.searchParams;
            params.forEach(function (value, key) { return result[key] = value; });
            return result;
        };
        Url.make = function (params) {
            var url = new URL(config_json_3.default.canonicalUrl || window.location.href);
            for (var _i = 0, _a = Object.entries(params); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                url.searchParams.set(key, value);
            }
            return url.toString();
        };
        // export const update = (params: Record<string, string>): void =>
        //     window.history.replaceState({}, "", make(params));
        Url.addParameter = function (params, key, value) {
            params[key] = value;
            return params;
        };
        // export const applyParam = (key: string, value: string): void =>
        //     update(addParameter(parseParameter(window.location.href), key, value));
        Url.initialize = function () {
            // Initialization of params is necessary, but it is actually initialized at the time of declaration. In reality, nothing is done here.
        };
        Url.params = Url.parseParameter(window.location.href);
    })(Url || (exports.Url = Url = {}));
});
define("script/events", ["require", "exports", "script/library/index", "script/features/index", "script/ui", "script/url", "resource/config", "resource/control"], function (require, exports, _library_6, _features_1, ui_5, url_1, config_json_4, control_json_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Events = void 0;
    config_json_4 = __importDefault(config_json_4);
    control_json_2 = __importDefault(control_json_2);
    var Events;
    (function (Events) {
        var _this = this;
        var updateShowFps = function () {
            ui_5.UI.fpsDisplay.classList.toggle("hide", !ui_5.UI.showFpsCheckbox.get());
        };
        var updateClock = function () {
            control_json_2.default.clock.enum.forEach(function (i) { return ui_5.UI.clockDisplay.classList.toggle(i, i === ui_5.UI.clockSelect.get()); });
        };
        var updateUrlAnchor = function (params) {
            return ui_5.UI.urlAnchor.href = url_1.Url.make(params);
        };
        var dragover = function (event) {
            var _a;
            var files = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.files;
            if (files && 0 < files.length) {
                var hasMedia = Array.from(files).some(function (file) { return _features_1.Features.Media.isMediaFile(file); });
                if (hasMedia) {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = "copy";
                    ui_5.UI.addMediaButton.dom.classList.add("dragover");
                }
                else {
                    event.dataTransfer.dropEffect = "none";
                }
            }
        };
        var drop = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, file;
            return __generator(this, function (_b) {
                event.preventDefault();
                event.stopPropagation();
                if (event.dataTransfer && event.dataTransfer.files && 0 < event.dataTransfer.files.length) {
                    for (_i = 0, _a = Array.from(event.dataTransfer.files); _i < _a.length; _i++) {
                        file = _a[_i];
                        console.log("📂 File dropped:", file);
                        _features_1.Features.Media.addMediaSerial(file);
                    }
                }
                return [2 /*return*/];
            });
        }); };
        var mouseMoveTimer = new _library_6.Library.UI.ToggleClassForWhileTimer();
        Events.mousemove = function () {
            return mouseMoveTimer.start(document.body, "mousemove", 3000);
        };
        Events.loadToggleButtonParameter = function (button, params) {
            var value = params[button.getId()];
            if (undefined !== value) {
                if (value) {
                    button.dom.classList.add("on");
                }
                else {
                    button.dom.classList.remove("on");
                }
            }
        };
        Events.initialize = function () {
            var _a, _b, _c, _d, _e;
            window.addEventListener("dragover", function (event) { return event.preventDefault(); });
            window.addEventListener("drop", function (event) { return event.preventDefault(); });
            document.body.addEventListener("dragover", dragover);
            document.body.addEventListener("drop", drop);
            //document.body.className = "play";
            document.body.className = "list";
            var applyParam = function (key, value) {
                url_1.Url.addParameter(url_1.Url.params, key, value);
                updateUrlAnchor(url_1.Url.params);
            };
            navigator.mediaSession.setActionHandler("play", _features_1.Features.Player.play);
            navigator.mediaSession.setActionHandler("pause", _features_1.Features.Player.pause);
            navigator.mediaSession.setActionHandler("previoustrack", _features_1.Features.Player.previous);
            navigator.mediaSession.setActionHandler("nexttrack", _features_1.Features.Player.next);
            ui_5.UI.playButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                if (navigator.mediaSession && "playing" !== navigator.mediaSession.playbackState) {
                    _features_1.Features.Player.play();
                }
                else {
                    _features_1.Features.Player.pause();
                }
            };
            ui_5.UI.nextButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                _features_1.Features.Player.next();
            };
            ui_5.UI.backBUtton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                _features_1.Features.Player.previous();
            };
            ui_5.UI.shuffleButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                ui_5.UI.shuffleButton.dom.classList.toggle("on");
                applyParam(ui_5.UI.shuffleButton.getId(), "".concat(ui_5.UI.shuffleButton.dom.classList.contains("on")));
            };
            ui_5.UI.repeatButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                ui_5.UI.repeatButton.dom.classList.toggle("on");
                applyParam(ui_5.UI.repeatButton.getId(), "".concat(ui_5.UI.repeatButton.dom.classList.contains("on")));
            };
            ui_5.UI.volumeButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                ui_5.UI.volumeButton.dom.classList.toggle("on");
                ui_5.UI.settingButton.dom.classList.toggle("on", false);
            };
            (_a = ui_5.UI.volumeRange).options || (_a.options = {});
            ui_5.UI.volumeRange.options.change = function (_event, range) {
                var value = range.get();
                console.log("🔊 Volume changed:", value);
                ui_5.UI.volumeButton.dom.classList.toggle("volume-mute", value <= 0);
                ui_5.UI.volumeButton.dom.classList.toggle("volume-0", 0 < value && value <= 25);
                ui_5.UI.volumeButton.dom.classList.toggle("volume-1", 25 < value && value <= 50);
                ui_5.UI.volumeButton.dom.classList.toggle("volume-2", 50 < value && value <= 75);
                ui_5.UI.volumeButton.dom.classList.toggle("volume-3", 75 < value);
                //Features.Media.setVolume(value);
                Events.mousemove();
            };
            ui_5.UI.settingButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                ui_5.UI.settingButton.dom.classList.toggle("on");
                ui_5.UI.volumeButton.dom.classList.toggle("on", false);
            };
            ui_5.UI.addMediaButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                ui_5.UI.inputFile.click();
            };
            ui_5.UI.inputFile.addEventListener("change", function () { return __awaiter(_this, void 0, void 0, function () {
                var files, _i, _a, file;
                return __generator(this, function (_b) {
                    files = ui_5.UI.inputFile.files;
                    for (_i = 0, _a = Array.from(files !== null && files !== void 0 ? files : []); _i < _a.length; _i++) {
                        file = _a[_i];
                        console.log("📂 File selected:", file);
                        _features_1.Features.Media.addMediaSerial(file);
                    }
                    ui_5.UI.inputFile.value = "";
                    return [2 /*return*/];
                });
            }); });
            (_b = ui_5.UI.imageSpanSelect).options || (_b.options = {});
            ui_5.UI.imageSpanSelect.options.change = function (_event, select) {
                var value = select.get();
                console.log("⏱️ Image span changed:", value);
                _features_1.Features.Media.updateInformationDisplay();
            };
            (_c = ui_5.UI.withFullscreenCheckbox).options || (_c.options = {});
            ui_5.UI.withFullscreenCheckbox.options.change = function (_event, _checkbox) {
                if (document.body.classList.contains("play")) {
                    if (_library_6.Library.UI.fullscreenEnabled) {
                        _features_1.Features.Player.updateFullscreenState();
                    }
                }
            };
            ui_5.UI.introductionPanel.addEventListener("click", function (event) {
                event.stopPropagation();
                ui_5.UI.introductionPanel.classList.toggle("force-show", false);
            });
            ui_5.UI.introductionPanel.classList.toggle("force-show", true);
            setTimeout(function () { return ui_5.UI.introductionPanel.classList.toggle("force-show", false); }, 15000);
            (_d = ui_5.UI.brightnessRange).options || (_d.options = {});
            ui_5.UI.brightnessRange.options.change = function (_event, range) {
                var value = range.get();
                console.log("💡 Brightness changed:", value);
                _library_6.Library.UI.setStyle(ui_5.UI.mediaScreen, "opacity", "".concat(value / 100));
                if (document.body.classList.contains("play")) {
                    _library_6.Library.UI.setStyle(ui_5.UI.clockDisplay, "opacity", "".concat(value / 100));
                }
                Events.mousemove();
            };
            (_e = ui_5.UI.stretchRange).options || (_e.options = {});
            ui_5.UI.stretchRange.options.change = function (_event, range) {
                var value = range.get();
                console.log("📏 Stretch changed:", value);
                //Features.Media.setStretch(value / 100);
                Events.mousemove();
            };
            ui_5.UI.volumeRange.loadParameter(url_1.Url.params, applyParam).setChange(ui_5.UI.volumeRange.options.change);
            ui_5.UI.transitionCheckbox.loadParameter(url_1.Url.params, applyParam); //.setChange(UI.transitionCheckbox.options.change);
            ui_5.UI.imageSpanSelect.loadParameter(url_1.Url.params, applyParam).setChange(ui_5.UI.imageSpanSelect.options.change);
            ui_5.UI.loopShortMediaCheckbox.loadParameter(url_1.Url.params, applyParam);
            ui_5.UI.withFullscreenCheckbox.loadParameter(url_1.Url.params, applyParam).setChange(ui_5.UI.withFullscreenCheckbox.options.change);
            ui_5.UI.showFpsCheckbox.loadParameter(url_1.Url.params, applyParam).setChange(updateShowFps);
            ui_5.UI.clockSelect.loadParameter(url_1.Url.params, applyParam).setChange(updateClock);
            ui_5.UI.brightnessRange.loadParameter(url_1.Url.params, applyParam).setChange(ui_5.UI.brightnessRange.options.change);
            ui_5.UI.stretchRange.loadParameter(url_1.Url.params, applyParam).setChange(ui_5.UI.stretchRange.options.change);
            ui_5.UI.paddingCheckbox.loadParameter(url_1.Url.params, applyParam);
            ui_5.UI.languageSelect.loadParameter(url_1.Url.params, applyParam).setChange(ui_5.UI.updateLanguage);
            document.body.addEventListener("mousemove", function (event) {
                if (config_json_4.default.log.mousemove && !mouseMoveTimer.isOn()) {
                    console.log("🖱️ MouseMove:", event, ui_5.UI.screenBody);
                }
                Events.mousemove();
            });
            _library_6.Library.UI.querySelectorAllWithFallback("label", ["label[for]:has(select)", "label[for]"])
                .forEach(function (label) { return _library_6.Library.UI.showPickerOnLabel(label); });
            [
                ui_5.UI.volumeRange,
                // UI.withFullscreen,
                ui_5.UI.showFpsCheckbox,
            ].forEach(function (i) { return i.fire(); });
            document.addEventListener("visibilitychange", function () {
                console.log("\uD83D\uDC40 visibilitychange: document.hidden: ".concat(document.hidden));
                _features_1.Features.Fps.reset();
            });
            updateClock();
            ui_5.UI.updateLanguage();
            updateUrlAnchor(url_1.Url.params);
            document.addEventListener("DOMContentLoaded", function () {
                // Catch up input values that the web browser quietly restores without firing events when a previously closed page is restored
                setTimeout(function () {
                    return [
                        ui_5.UI.withFullscreenCheckbox,
                        ui_5.UI.showFpsCheckbox,
                        ui_5.UI.clockSelect,
                        ui_5.UI.brightnessRange,
                        ui_5.UI.languageSelect,
                    ]
                        .forEach(function (i) { return i.catchUpRestore(url_1.Url.params); });
                }, 25);
            });
            window.addEventListener("languagechange", function () {
                console.log("🌐 languagechange:", navigator.language, navigator.languages);
                var old = _library_6.Library.Locale.getLocale();
                _library_6.Library.Locale.setLocale(ui_5.UI.languageSelect.get());
                if (old !== _library_6.Library.Locale.getLocale()) {
                    ui_5.UI.updateLanguage();
                }
            });
        };
    })(Events || (exports.Events = Events = {}));
});
define("script/index", ["require", "exports", "script/tools/index", "script/library/index", "script/features/index", "resource/config", "resource/control", "resource/evil-commonjs.config", "resource/evil-timer.js.config", "resource/images", "resource/powered-by", "script/url", "script/ui", "script/events"], function (require, exports, _tools_5, _library_7, _features_2, config_json_5, control_json_3, evil_commonjs_config_json_1, evil_timer_js_config_json_1, images_json_1, powered_by_json_2, url_2, ui_6, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    config_json_5 = __importDefault(config_json_5);
    control_json_3 = __importDefault(control_json_3);
    evil_commonjs_config_json_1 = __importDefault(evil_commonjs_config_json_1);
    evil_timer_js_config_json_1 = __importDefault(evil_timer_js_config_json_1);
    images_json_1 = __importDefault(images_json_1);
    powered_by_json_2 = __importDefault(powered_by_json_2);
    url_2.Url.initialize();
    ui_6.UI.initialize();
    events_1.Events.initialize();
    _features_2.Features.Media.initialize();
    console.log("\uD83D\uDCE6 BUILD AT: ".concat(build.at, " ( ").concat(_tools_5.Tools.Timespan.toDisplayString(new Date().getTime() - build.tick, 1), " ").concat(_library_7.Library.Locale.map("ago"), " )"));
    var consoleInterface = globalThis;
    var Resource = {
        config: config_json_5.default,
        control: control_json_3.default,
        evilCommonJsConfig: evil_commonjs_config_json_1.default,
        evilTimerJsConfig: evil_timer_js_config_json_1.default,
        images: images_json_1.default,
        locale: _library_7.Library.Locale.master,
        poweredBy: powered_by_json_2.default
    };
    var modules = {
        Tools: _tools_5.Tools,
        Library: _library_7.Library,
        Features: _features_2.Features,
        Url: url_2.Url,
        UI: ui_6.UI,
        Events: events_1.Events,
        Resource: Resource
    };
    Object.entries(modules).forEach(function (_a) {
        var name = _a[0], module = _a[1];
        return consoleInterface[name] = module;
    });
    console.log("\uD83D\uDCE6 Available modules: ".concat(Object.keys(modules).join(", ")));
});
//# sourceMappingURL=index.js.map