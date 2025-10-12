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
    exports.NumberTools = void 0;
    var NumberTools;
    (function (NumberTools) {
        NumberTools.getIntegralDigits = function (value) {
            return 1 <= value ? Math.floor(Math.log10(value)) + 1 : 0;
        };
        NumberTools.toString = function (value, maximumFractionDigits) {
            return value.toLocaleString("en-US", { useGrouping: false, maximumFractionDigits: maximumFractionDigits, });
        };
        NumberTools.parseInt = function (text) {
            var value = Number.parseInt(text, 10);
            return Number.isNaN(value) ? undefined : value;
        };
    })(NumberTools || (exports.NumberTools = NumberTools = {}));
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
        Array.backSlice = function (list, start) {
            return start <= 0 ? [] : list.slice(-start);
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
            "with-fullscreen-label": "FullScreen:",
            "brightness-label": "Brightness:",
            "stretch-label": "Stretch:",
            "padding-label": "Padding:",
            "cross-fade-label": "Cross Fade:",
            "cross-fade-0": "None",
            "image-span-label": "Image Display Time:",
            "loop-short-media-label": "Loop Short Media:",
            "visualizer-label": "Visualizer:",
            "visualizer-simple": "Simple",
            "visualizer-plane-frequency": "Plane Frequency",
            "visualizer-plane-waveform": "Plane Waveform",
            "visualizer-arc-frequency": "Arc Frequency",
            "visualizer-arc-waveform": "Arc Waveform",
            "visualizer-double-arc": "Double Arc",
            "visualizer-stereo-arc-frequency": "Stereo Arc Frequency",
            "visualizer-stereo-arc-waveform": "Stereo Arc Waveform",
            "visualizer-stereo-double-arc": "Stereo Double Arc",
            "overlay-style-label": "Overlay Style:",
            "hide": "Hide",
            "blend": "Blend",
            "white": "White",
            "black": "Black",
            "system": "System",
            "alternate": "Alternate",
            "rainbow": "Rainbow",
            "overlay-position-label": "Overlay Position:",
            "center": "Center",
            "top-right": "Top Right",
            "bottom-right": "Bottom Right",
            "bottom-left": "Bottom Left",
            "top-left": "Top Left",
            "rotate": "Rotate",
            "with-weather-label": "Weather:",
            "weather-location-label": "Weather Location:",
            "ip-address": "IP Address(Low Accuracy)",
            "geolocation": "Geolocation(High Accuracy)",
            "with-clock-label": "Clock:",
            "with-date-label": "Date:",
            "with-calendar-label": "Calendar:",
            "with-visualizer-label": "Visualizer(Overlay):",
            "show-fps-label": "Show FPS:",
            "shortcuts-label": "Keyboard Shortcuts:",
            "language-label": "Language:",
            "url-label": "Link to this setting",
            "timeUnitMs": "ms",
            "timeUnitS": "s",
            "timeUnitM": "m",
            "timeUnitH": "h",
            "timeUnitD": "d",
            "ago": "ago",
            "Shuffle": "Shuffle",
            "Repeat": "Repeat",
            "Play / Pause": "Play / Pause",
            "Mute / Unmute": "Mute / Unmute",
            "Volume Up / Down": "Volume Up / Down",
            "Seek": "Seek",
            "Seek Backward": "Seek Backward",
            "Seek Forward": "Seek Forward",
            "Go to Previous/Next Media": "Go to Previous/Next Media",
            "Go to Previous Media": "Go to Previous Media",
            "Go to Next Media": "Go to Next Media",
            "FullScreen": "FullScreen",
            "Switch Clock": "Switch Clock",
            "no-media-message": "No media available. Please add media.",
            "not-supported-media-message": "This media cannot be played.",
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
            "with-fullscreen-label": "フルスクリーン:",
            "brightness-label": "明るさ:",
            "stretch-label": "ストレッチ:",
            "padding-label": "パディング:",
            "cross-fade-label": "クロスフェード:",
            "cross-fade-0": "なし",
            "image-span-label": "画像表示時間:",
            "loop-short-media-label": "短いメディアをループ再生:",
            "visualizer-label": "ビジュアライザー:",
            "visualizer-simple": "シンプル",
            "visualizer-plane-frequency": "平面周波数",
            "visualizer-plane-waveform": "平面波形",
            "visualizer-arc-frequency": "アーク周波数",
            "visualizer-arc-waveform": "アーク波形",
            "visualizer-double-arc": "ダブルアーク",
            "visualizer-stereo-arc-frequency": "ステレオアーク周波数",
            "visualizer-stereo-arc-waveform": "ステレオアーク波形",
            "visualizer-stereo-double-arc": "ステレオダブルアーク",
            "overlay-style-label": "オーバーレイスタイル:",
            "hide": "非表示",
            "blend": "ブレンド",
            "white": "ホワイト",
            "black": "ブラック",
            "system": "システム",
            "alternate": "交互",
            "rainbow": "レインボー",
            "overlay-position-label": "オーバーレイ位置:",
            "center": "中央",
            "top-right": "右上",
            "bottom-right": "右下",
            "bottom-left": "左下",
            "top-left": "左上",
            "rotate": "回転",
            "with-weather-label": "天気:",
            "weather-location-label": "天気の場所:",
            "ip-address": "IP アドレス(低精度)",
            "geolocation": "ジオロケーション(高精度)",
            "with-clock-label": "時計:",
            "with-date-label": "日付:",
            "with-calendar-label": "カレンダー:",
            "with-visualizer-label": "ビジュアライザー(オーバーレイ):",
            "show-fps-label": "FPS を表示:",
            "shortcuts-label": "キーボードショートカット:",
            "language-label": "言語:",
            "url-label": "この設定のリンク",
            "timeUnitMs": "ミリ秒",
            "timeUnitS": "秒",
            "timeUnitM": "分",
            "timeUnitH": "時間",
            "timeUnitD": "日",
            "ago": "前",
            "Shuffle": "シャッフル",
            "Repeat": "リピート",
            "Play / Pause": "再生 / 一時停止",
            "Mute / Unmute": "ミュート / ミュート解除",
            "Volume Up / Down": "音量アップ / ダウン",
            "Seek": "再生位置移動",
            "Seek Backward": "巻き戻し",
            "Seek Forward": "早送り",
            "Go to Previous/Next Media": "前後のメディアへ移動",
            "Go to Previous Media": "前のメディアへ移動",
            "Go to Next Media": "次のメディアへ移動",
            "FullScreen": "フルスクリーン",
            "Switch Clock": "時計切り替え",
            "no-media-message": "メディアがありません。メディアを追加してください。",
            "not-supported-media-message": "再生できないメディアです。",
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
    "history": {
        "maxLength": 1000,
        "shuffleForbiddenRate": 0.333
    },
    "ui": {
        "mousemoveTimeout": 1500
    },
    "analyser": {
        "fftSize": 4096
    },
    "visualizer": {
        "frequencyDataLengthRate": 1.0,
        "maxHue": 300,
        "arcType": "arc",
        "waveform": {
            "lineWidth": 2,
            "strokeStyle": "hsl(200, 100%, 50%)"
        },
        "arc": {
            "arc": {
                "radiusRate": 0.15,
                "angleRate": 0.8,
                "startAngleRate": 0.25
            },
            "circle": {
                "radiusRate": 0.15,
                "angleRate": 1.0,
                "startAngleRate": -0.25
            }
        }
    },
    "player": {
        "fastFowardSpan": 5000,
        "rewindSpan": 5000
    },
    "clock": {
        "alternate": {
            "span": 47000
        },
        "phiColors": {
            "saturation": 0.8,
            "lightness": 0.6
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
        },
        "firstDayOfWeek": 0
    },
    "weather": {
        "site": "wttr.in",
        "format": "%c 🌡️%t 💧%h 💨%w",
        "na": "🚫 🌡️N/A 💧N/A 💨N/A",
        "updateInterval": "30m",
        "expire": "60m",
        "retryInterval": "3m",
        "fahrenheitLocales": [
            "en-US",
            "en-BS",
            "en-BZ",
            "en-KY",
            "en-PW",
            "en-LR",
            "en-FM"
        ]
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
                this.isInTimer = function () { return undefined !== _this.timer; };
                this.timer = undefined;
            }
            ToggleClassForWhileTimer.prototype.start = function (element, token, span) {
                var _this = this;
                if (this.isInTimer()) {
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
                this.dom.addEventListener(
                // Without this, in Chromium-based browsers, selecting from the dropdown triggers the label's click event, causing the dropdown to reopen.
                "click", function (event) { return event.stopPropagation(); });
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
define("script/tools/environment", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Environment = void 0;
    var Environment;
    (function (Environment) {
        Environment.isApple = function () {
            return /Macintosh|iPhone|iPad|iPod/i.test(navigator.userAgent);
        };
        Environment.isSafari = function () {
            return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        };
        Environment.isMobile = function () {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        };
        Environment.isTouchDevice = function () {
            return "ontouchstart" in window || 0 < navigator.maxTouchPoints;
        };
    })(Environment || (exports.Environment = Environment = {}));
});
define("resource/shortcuts", [], {
    "youtube": {
        "label": "YouTube",
        "items": [
            {
                "description": "Shuffle",
                "shortcuts": [
                    {
                        "command": "toggleShuffle",
                        "type": "onKeyUp",
                        "keys": [
                            "S"
                        ]
                    }
                ]
            },
            {
                "description": "Repeat",
                "shortcuts": [
                    {
                        "command": "toggleRepeat",
                        "type": "onKeyUp",
                        "keys": [
                            "R"
                        ]
                    }
                ]
            },
            {
                "description": "Play / Pause",
                "shortcuts": [
                    {
                        "command": "togglePlay",
                        "type": "onKeyUp",
                        "keys": [
                            " "
                        ]
                    }
                ]
            },
            {
                "description": "Mute / Unmute",
                "shortcuts": [
                    {
                        "command": "toggleMute",
                        "type": "onKeyUp",
                        "keys": [
                            "M"
                        ]
                    }
                ]
            },
            {
                "description": "Volume Up / Down",
                "shortcuts": [
                    {
                        "command": "volumeUp",
                        "type": "onKeyDown",
                        "keys": [
                            "ArrowUp"
                        ]
                    },
                    {
                        "command": "volumeDown",
                        "type": "onKeyDown",
                        "keys": [
                            "ArrowDown"
                        ]
                    }
                ]
            },
            {
                "description": "Seek",
                "shortcuts": [
                    {
                        "command": "seekBackward",
                        "type": "onKeyDown",
                        "keys": [
                            "ArrowLeft"
                        ]
                    },
                    {
                        "command": "seekForward",
                        "type": "onKeyDown",
                        "keys": [
                            "ArrowRight"
                        ]
                    }
                ]
            },
            {
                "description": "Go to Previous Media",
                "shortcuts": [
                    {
                        "command": "goPreviousMedia",
                        "type": "onKeyDown",
                        "keys": [
                            "Shift",
                            "P"
                        ]
                    }
                ]
            },
            {
                "description": "Go to Next Media",
                "shortcuts": [
                    {
                        "command": "goNextMedia",
                        "type": "onKeyDown",
                        "keys": [
                            "Shift",
                            "N"
                        ]
                    }
                ]
            },
            {
                "description": "FullScreen",
                "shortcuts": [
                    {
                        "command": "toggleFullscreen",
                        "type": "onKeyUp",
                        "keys": [
                            "F"
                        ]
                    }
                ]
            }
        ]
    },
    "spotify": {
        "label": "Spotify",
        "items": [
            {
                "description": "Shuffle",
                "shortcuts": [
                    {
                        "command": "toggleShuffle",
                        "type": "onKeyUp",
                        "keys": [
                            "Control",
                            "S"
                        ],
                        "appleKeys": [
                            "Alt",
                            "S"
                        ]
                    }
                ]
            },
            {
                "description": "Repeat",
                "shortcuts": [
                    {
                        "command": "toggleRepeat",
                        "type": "onKeyUp",
                        "keys": [
                            "Control",
                            "R"
                        ],
                        "appleKeys": [
                            "Alt",
                            "R"
                        ]
                    }
                ]
            },
            {
                "description": "Play / Pause",
                "shortcuts": [
                    {
                        "command": "togglePlay",
                        "type": "onKeyUp",
                        "keys": [
                            " "
                        ]
                    }
                ]
            },
            {
                "description": "Volume Up / Down",
                "shortcuts": [
                    {
                        "command": "volumeUp",
                        "type": "onKeyDown",
                        "keys": [
                            "ArrowRight"
                        ]
                    },
                    {
                        "command": "volumeDown",
                        "type": "onKeyDown",
                        "keys": [
                            "ArrowLeft"
                        ]
                    }
                ]
            },
            {
                "description": "Seek Backward",
                "shortcuts": [
                    {
                        "command": "seekBackward",
                        "type": "onKeyDown",
                        "keys": [
                            "Shift",
                            "ArrowUp"
                        ]
                    }
                ]
            },
            {
                "description": "Seek Forward",
                "shortcuts": [
                    {
                        "command": "seekForward",
                        "type": "onKeyDown",
                        "keys": [
                            "Shift",
                            "ArrowDown"
                        ]
                    }
                ]
            },
            {
                "description": "Go to Previous Media",
                "shortcuts": [
                    {
                        "command": "goPreviousMedia",
                        "type": "onKeyDown",
                        "keys": [
                            "ArrowUp"
                        ]
                    }
                ]
            },
            {
                "description": "Go to Next Media",
                "shortcuts": [
                    {
                        "command": "goNextMedia",
                        "type": "onKeyDown",
                        "keys": [
                            "ArrowDown"
                        ]
                    }
                ]
            },
            {
                "description": "FullScreen",
                "shortcuts": [
                    {
                        "command": "toggleFullscreen",
                        "type": "onKeyUp",
                        "keys": [
                            "F"
                        ]
                    }
                ]
            }
        ]
    },
    "apple": {
        "label": "Apple Music",
        "items": [
            {
                "description": "Shuffle",
                "shortcuts": [
                    {
                        "command": "toggleShuffle",
                        "type": "onKeyUp",
                        "keys": [
                            "Control",
                            "S"
                        ],
                        "appleKeys": [
                            "Meta",
                            "S"
                        ]
                    }
                ]
            },
            {
                "description": "Repeat",
                "shortcuts": [
                    {
                        "command": "toggleRepeat",
                        "type": "onKeyUp",
                        "keys": [
                            "Control",
                            "R"
                        ],
                        "appleKeys": [
                            "Meta",
                            "R"
                        ]
                    }
                ]
            },
            {
                "description": "Play / Pause",
                "shortcuts": [
                    {
                        "command": "togglePlay",
                        "type": "onKeyUp",
                        "keys": [
                            " "
                        ]
                    }
                ]
            },
            {
                "description": "Mute / Unmute",
                "shortcuts": [
                    {
                        "command": "toggleMute",
                        "type": "onKeyUp",
                        "keys": [
                            "M"
                        ]
                    }
                ]
            },
            {
                "description": "Volume Up / Down",
                "shortcuts": [
                    {
                        "command": "volumeUp",
                        "type": "onKeyDown",
                        "keys": [
                            "Control",
                            "ArrowUp"
                        ],
                        "appleKeys": [
                            "ArrowUp"
                        ]
                    },
                    {
                        "command": "volumeDown",
                        "type": "onKeyDown",
                        "keys": [
                            "Control",
                            "ArrowDown"
                        ],
                        "appleKeys": [
                            "ArrowDown"
                        ]
                    }
                ]
            },
            {
                "description": "Seek Backward",
                "shortcuts": [
                    {
                        "command": "seekBackward",
                        "type": "onKeyDown",
                        "keys": [
                            "Shift",
                            "ArrowLeft"
                        ]
                    }
                ]
            },
            {
                "description": "Seek Forward",
                "shortcuts": [
                    {
                        "command": "seekForward",
                        "type": "onKeyDown",
                        "keys": [
                            "Shift",
                            "ArrowRight"
                        ]
                    }
                ]
            },
            {
                "description": "Go to Previous/Next Media",
                "shortcuts": [
                    {
                        "command": "goPreviousMedia",
                        "type": "onKeyDown",
                        "keys": [
                            "Control",
                            "ArrowLeft"
                        ],
                        "appleKeys": [
                            "ArrowLeft"
                        ]
                    },
                    {
                        "command": "goNextMedia",
                        "type": "onKeyDown",
                        "keys": [
                            "Control",
                            "ArrowRight"
                        ],
                        "appleKeys": [
                            "ArrowRight"
                        ]
                    }
                ]
            },
            {
                "description": "FullScreen",
                "shortcuts": [
                    {
                        "command": "toggleFullscreen",
                        "type": "onKeyUp",
                        "keys": [
                            "F"
                        ]
                    }
                ]
            }
        ]
    },
    "windows": {
        "label": "Windows Media Player",
        "items": [
            {
                "description": "Shuffle",
                "shortcuts": [
                    {
                        "command": "toggleShuffle",
                        "type": "onKeyUp",
                        "keys": [
                            "Control",
                            "H"
                        ]
                    }
                ]
            },
            {
                "description": "Repeat",
                "shortcuts": [
                    {
                        "command": "toggleRepeat",
                        "type": "onKeyUp",
                        "keys": [
                            "Control",
                            "T"
                        ]
                    }
                ]
            },
            {
                "description": "Play / Pause",
                "shortcuts": [
                    {
                        "command": "togglePlay",
                        "type": "onKeyUp",
                        "keys": [
                            " "
                        ]
                    }
                ]
            },
            {
                "description": "Mute / Unmute",
                "shortcuts": [
                    {
                        "command": "toggleMute",
                        "type": "onKeyUp",
                        "keys": [
                            "F7"
                        ]
                    }
                ]
            },
            {
                "description": "Volume Up / Down",
                "shortcuts": [
                    {
                        "command": "volumeUp",
                        "type": "onKeyDown",
                        "keys": [
                            "F9"
                        ]
                    },
                    {
                        "command": "volumeDown",
                        "type": "onKeyDown",
                        "keys": [
                            "F8"
                        ]
                    }
                ]
            },
            {
                "description": "Seek",
                "shortcuts": [
                    {
                        "command": "seekBackward",
                        "type": "onKeyDown",
                        "keys": [
                            "ArrowLeft"
                        ]
                    },
                    {
                        "command": "seekForward",
                        "type": "onKeyDown",
                        "keys": [
                            "ArrowRight"
                        ]
                    }
                ]
            },
            {
                "description": "Go to Previous Media",
                "shortcuts": [
                    {
                        "command": "goPreviousMedia",
                        "type": "onKeyDown",
                        "keys": [
                            "Control",
                            "B"
                        ]
                    }
                ]
            },
            {
                "description": "Go to Next Media",
                "shortcuts": [
                    {
                        "command": "goNextMedia",
                        "type": "onKeyDown",
                        "keys": [
                            "Control",
                            "F"
                        ]
                    }
                ]
            },
            {
                "description": "FullScreen",
                "shortcuts": [
                    {
                        "command": "toggleFullscreen",
                        "type": "onKeyUp",
                        "keys": [
                            "F11"
                        ]
                    }
                ]
            }
        ]
    }
});
define("script/library/shortcuts", ["require", "exports", "script/tools/environment", "resource/shortcuts"], function (require, exports, environment_1, shortcuts_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Shortcuts = void 0;
    shortcuts_json_1 = __importDefault(shortcuts_json_1);
    var Shortcuts;
    (function (Shortcuts) {
        var style = "youtube";
        var currentCommandMap = null;
        var keyDisplayNames = {
            "ArrowUp": "↑",
            "ArrowDown": "↓",
            "ArrowLeft": "←",
            "ArrowRight": "→",
            " ": "Space",
            "Control": "Ctrl",
        };
        var appleKeyDisplayNames = {
            "Alt": "⌥(option)",
            "Control": "⌃(control)",
            "Meta": "⌘(command)",
            "Shift": "⇧(shift)",
        };
        var getKeys = function (entry) {
            return environment_1.Environment.isApple() && "appleKeys" in entry ? entry.appleKeys : entry.keys;
        };
        var getDisplayKeyName = function (key) {
            var _a, _b, _c;
            return environment_1.Environment.isApple() ?
                (_b = (_a = appleKeyDisplayNames[key]) !== null && _a !== void 0 ? _a : keyDisplayNames[key]) !== null && _b !== void 0 ? _b : key :
                (_c = keyDisplayNames[key]) !== null && _c !== void 0 ? _c : key;
        };
        Shortcuts.getDisplayList = function () {
            return shortcuts_json_1.default[style].items.map(function (i) {
                return ({
                    keyss: i.shortcuts.map(function (j) { return getKeys(j).map(function (key) { return getDisplayKeyName(key); }); }),
                    description: i.description,
                });
            });
        };
        var isInputElementFocused = function () { var _a, _b, _c; return ["input", "textarea", "button"].includes((_c = (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.tagName) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : ""); };
        var normalizeKey = function (key, code) {
            return code === "Space" ? " " :
                key.length === 1 ? key.toUpperCase() :
                    key;
        };
        var pressedKeys = [];
        var getShortcutKeys = function (type, normalizedKey) {
            switch (type) {
                case "onKeyDown":
                    pressedKeys.push(normalizedKey);
                    return pressedKeys;
                case "onKeyUp":
                    var result = __spreadArray([], pressedKeys, true);
                    pressedKeys = pressedKeys.filter(function (i) { return i !== normalizedKey; });
                    return result;
            }
        };
        Shortcuts.handleKeyEvent = function (type, event) {
            var _a;
            var commandMap = currentCommandMap;
            if (null !== commandMap) {
                var normalizedKey = normalizeKey(event.key, event.code);
                var shortcutKeys_1 = getShortcutKeys(type, normalizedKey);
                if (!isInputElementFocused()) {
                    var commandKeys = shortcuts_json_1.default[style].items.reduce(function (a, b) { return a.concat(b.shortcuts); }, []).filter(function (shortcut) {
                        return getKeys(shortcut).length === shortcutKeys_1.length &&
                            getKeys(shortcut).every(function (key) { return shortcutKeys_1.includes(key); }) &&
                            type === shortcut.type;
                    })
                        .map(function (i) { return i.command; });
                    if (0 < commandKeys.length) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    commandKeys.forEach(function (i) {
                        console.log("👆 KeyboardShortcut:", i, type, pressedKeys);
                        var command = commandMap[i];
                        if (command) {
                            command();
                        }
                        else {
                            console.error("🦋 FIXME: Shortcuts.handleKeyEvent.NotFoundCommand", i);
                        }
                    });
                    if ("onKeyDown" === type && commandKeys.length <= 0 && !["Shift", "Control"].includes(normalizedKey)) {
                        console.log("💡 UnknownKeyDown:", pressedKeys);
                        (_a = commandMap["unknownKeyDown"]) === null || _a === void 0 ? void 0 : _a.call(commandMap);
                    }
                }
            }
        };
        Shortcuts.initialize = function () {
            window.addEventListener("keydown", function (event) { return Shortcuts.handleKeyEvent("onKeyDown", event); });
            window.addEventListener("keyup", function (event) { return Shortcuts.handleKeyEvent("onKeyUp", event); });
        };
        Shortcuts.setCommandMap = function (commandMap) {
            currentCommandMap = commandMap;
        };
        Shortcuts.setStyle = function (newStyle) {
            if (style !== newStyle && shortcuts_json_1.default[newStyle]) {
                style = newStyle;
            }
        };
    })(Shortcuts || (exports.Shortcuts = Shortcuts = {}));
});
define("script/library/index", ["require", "exports", "script/library/locale", "script/library/ui", "script/library/control", "script/library/svg", "script/library/shortcuts"], function (require, exports, ImportedLocale, ImportedUI, ImportedControl, ImportedSvg, ImportedShortcuts) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Library = void 0;
    ImportedLocale = __importStar(ImportedLocale);
    ImportedUI = __importStar(ImportedUI);
    ImportedControl = __importStar(ImportedControl);
    ImportedSvg = __importStar(ImportedSvg);
    ImportedShortcuts = __importStar(ImportedShortcuts);
    var Library;
    (function (Library) {
        Library.Locale = ImportedLocale.Locale;
        Library.UI = ImportedUI.UI;
        Library.Control = ImportedControl.Control;
        Library.Svg = ImportedSvg.Svg;
        Library.Shortcuts = ImportedShortcuts.Shortcuts;
    })(Library || (exports.Library = Library = {}));
});
define("script/tools/timespan", ["require", "exports", "script/library/index", "script/tools/number"], function (require, exports, _library_1, number_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Timespan = void 0;
    var Timespan;
    (function (Timespan) {
        Timespan.toDisplayString = function (value, maximumFractionDigits) {
            return value < 1000 ? "".concat(number_1.NumberTools.toString(value, maximumFractionDigits), " ").concat(_library_1.Library.Locale.map("timeUnitMs")) :
                value < 60 * 1000 ? "".concat(number_1.NumberTools.toString(value / 1000, maximumFractionDigits), " ").concat(_library_1.Library.Locale.map("timeUnitS")) :
                    value < 60 * 60 * 1000 ? "".concat(number_1.NumberTools.toString(value / (60 * 1000), maximumFractionDigits), " ").concat(_library_1.Library.Locale.map("timeUnitM")) :
                        value < 24 * 60 * 60 * 1000 ? "".concat(number_1.NumberTools.toString(value / (60 * 60 * 1000), maximumFractionDigits), " ").concat(_library_1.Library.Locale.map("timeUnitH")) :
                            "".concat(number_1.NumberTools.toString(value / (24 * 60 * 60 * 1000), maximumFractionDigits), " ").concat(_library_1.Library.Locale.map("timeUnitD"));
        };
        Timespan.toMediaTimeString = function (value) {
            if (Number.isNaN(value)) {
                return "NaN";
            }
            else if (value < 0 || !Number.isFinite(value)) {
                return "00:00";
            }
            else {
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
            }
        };
        Timespan.parse = function (timespan) {
            try {
                switch (typeof timespan) {
                    case "number":
                        return timespan;
                    case "string":
                        if (timespan.endsWith("ms")) {
                            return parseFloat(timespan.substring(0, timespan.length - 2).trim());
                        }
                        else if (timespan.endsWith("s")) {
                            return parseFloat(timespan.substring(0, timespan.length - 1).trim()) * 1000;
                        }
                        else if (timespan.endsWith("m")) {
                            return parseFloat(timespan.substring(0, timespan.length - 1).trim()) * 60 * 1000;
                        }
                        else if (timespan.endsWith("h")) {
                            return parseFloat(timespan.substring(0, timespan.length - 1).trim()) * 60 * 60 * 1000;
                        }
                        else if (timespan.endsWith("d")) {
                            return parseFloat(timespan.substring(0, timespan.length - 1).trim()) * 24 * 60 * 60 * 1000;
                        }
                        else if (timespan.endsWith("w")) {
                            return parseFloat(timespan.substring(0, timespan.length - 1).trim()) * 7 * 24 * 60 * 60 * 1000;
                        }
                        else if (timespan.endsWith("y")) {
                            return parseFloat(timespan.substring(0, timespan.length - 1).trim()) * 365.2425 * 24 * 60 * 60 * 1000;
                        }
                        else {
                            return parseInt(timespan.trim());
                        }
                }
            }
            catch (err) {
                console.error(err);
            }
            return null;
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
            if (random === void 0) { random = function () { return Math.random(); }; }
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
                    Math.max(0, maximumDigits - number_2.NumberTools.getIntegralDigits(value)),
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
define("script/tools/timer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Timer = void 0;
    var Timer;
    (function (Timer) {
        Timer.sleep = function (timeout) {
            return new Promise(function (resolve) { return setTimeout(resolve, timeout); });
        };
        var ExtendableTimer = /** @class */ (function () {
            function ExtendableTimer(onStart, onEnd, span) {
                var _this = this;
                this.onStart = onStart;
                this.onEnd = onEnd;
                this.span = span;
                this.isInTimer = function () { return undefined !== _this.timer; };
                this.timer = undefined;
            }
            ExtendableTimer.prototype.kick = function () {
                var _this = this;
                if (this.isInTimer()) {
                    clearTimeout(this.timer);
                }
                else {
                    this.onStart();
                }
                this.timer = setTimeout(function () {
                    _this.timer = undefined;
                    _this.onEnd();
                }, this.span);
            };
            return ExtendableTimer;
        }());
        Timer.ExtendableTimer = ExtendableTimer;
    })(Timer || (exports.Timer = Timer = {}));
});
define("script/tools/index", ["require", "exports", "script/tools/type-guards", "script/tools/number", "script/tools/timespan", "script/tools/math", "script/tools/random", "script/tools/array", "script/tools/hash", "script/tools/byte", "script/tools/timer", "script/tools/environment"], function (require, exports, ImportedTypeGuards, ImportedNumber, ImportedTimespan, ImportedMath, ImportedRandom, ImportedArray, ImportedHash, ImportedByte, ImportedTimer, ImportedEnvironment) {
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
    ImportedTimer = __importStar(ImportedTimer);
    ImportedEnvironment = __importStar(ImportedEnvironment);
    var Tools;
    (function (Tools) {
        Tools.TypeGuards = ImportedTypeGuards.TypeGuards;
        Tools.Number = ImportedNumber.NumberTools;
        Tools.Timespan = ImportedTimespan.Timespan;
        Tools.Math = ImportedMath.Math;
        Tools.Random = ImportedRandom.Random;
        Tools.Array = ImportedArray.Array;
        Tools.Hash = ImportedHash.Hash;
        Tools.Byte = ImportedByte.Byte;
        Tools.Timer = ImportedTimer.Timer;
        Tools.Environment = ImportedEnvironment.Environment;
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
    "shuffle": {
        "id": "shuffle",
        "default": false
    },
    "repeat": {
        "id": "repeat",
        "default": false
    },
    "volumeButton": {
        "id": "volume-button",
        "default": false
    },
    "volume": {
        "id": "volume",
        "min": 0,
        "max": 100,
        "step": 1,
        "default": 100
    },
    "settingsButton": {
        "id": "settings-button",
        "default": false
    },
    "withFullscreen": {
        "id": "with-fullscreen",
        "default": false
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
        "default": 30
    },
    "padding": {
        "id": "padding",
        "default": true
    },
    "crossFade": {
        "id": "cross-fade",
        "enum": [
            30000,
            24000,
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
            1250,
            1000,
            750,
            500,
            250,
            0
        ],
        "default": 1500
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
            24000,
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
        "default": 24000
    },
    "loopShortMedia": {
        "id": "loop-short-media",
        "default": false
    },
    "visualizer": {
        "id": "visualizer-type",
        "enum": [
            "simple",
            "plane-frequency",
            "plane-waveform",
            "arc-frequency",
            "arc-waveform",
            "double-arc",
            "stereo-arc-frequency",
            "stereo-arc-waveform",
            "stereo-double-arc"
        ],
        "default": "stereo-double-arc"
    },
    "overlayStyle": {
        "id": "overlay-style",
        "enum": [
            "blend",
            "white",
            "black",
            "system",
            "alternate",
            "rainbow"
        ],
        "default": "alternate"
    },
    "overlayPosition": {
        "id": "overlay-position",
        "enum": [
            "center",
            "top-right",
            "bottom-right",
            "bottom-left",
            "top-left",
            "rotate"
        ],
        "default": "rotate"
    },
    "withClock": {
        "id": "with-clock",
        "default": false
    },
    "withDate": {
        "id": "with-date",
        "default": false
    },
    "withWeather": {
        "id": "with-weather",
        "default": false
    },
    "weatherLocation": {
        "id": "weather-location",
        "enum": [
            "ip-address",
            "geolocation"
        ],
        "default": "ip-address"
    },
    "withCalendar": {
        "id": "with-calendar",
        "default": false
    },
    "withVisualizer": {
        "id": "with-visualizer",
        "default": false
    },
    "showFps": {
        "id": "show-fps",
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
define("script/ui", ["require", "exports", "script/tools/index", "script/library/index", "resource/control", "resource/shortcuts", "resource/powered-by"], function (require, exports, _tools_2, _library_2, control_json_1, shortcuts_json_2, powered_by_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UI = void 0;
    control_json_1 = __importDefault(control_json_1);
    shortcuts_json_2 = __importDefault(shortcuts_json_2);
    powered_by_json_1 = __importDefault(powered_by_json_1);
    var UI;
    (function (UI) {
        UI.manifest = _library_2.Library.UI.getElementById("link", "manifest");
        UI.noscript = _library_2.Library.UI.getElementById("div", "noscript");
        UI.screenBody = _library_2.Library.UI.getElementById("div", "screen-body");
        UI.mediaScreen = _library_2.Library.UI.getElementById("div", "media-screen");
        UI.elementPool = _library_2.Library.UI.getElementById("div", "element-pool");
        UI.playButton = new _library_2.Library.Control.Button({ id: "play-button", });
        UI.mediaIndex = _library_2.Library.UI.getElementById("span", "media-index");
        UI.mediaTitle = _library_2.Library.UI.getElementById("span", "media-title");
        UI.mediaTime = _library_2.Library.UI.getElementById("span", "media-time");
        UI.seekRange = _library_2.Library.UI.getElementById("input", "seek");
        UI.nextButton = new _library_2.Library.Control.Button({ id: "next-button", });
        UI.backBUtton = new _library_2.Library.Control.Button({ id: "back-button", });
        UI.fastForwardButton = new _library_2.Library.Control.Button({ id: "fast-forward-button", });
        UI.rewindButton = new _library_2.Library.Control.Button({ id: "rewind-button", });
        UI.shuffle = new _library_2.Library.Control.Checkbox(control_json_1.default.shuffle);
        UI.repeat = new _library_2.Library.Control.Checkbox(control_json_1.default.repeat);
        UI.volumeLabel = _library_2.Library.UI.querySelector("label", "label[for='volume-button']");
        UI.volumeButton = new _library_2.Library.Control.Checkbox(control_json_1.default.volumeButton);
        UI.volumeRange = new _library_2.Library.Control.Range(control_json_1.default.volume);
        UI.settingsButton = new _library_2.Library.Control.Checkbox(control_json_1.default.settingsButton);
        UI.mediaList = _library_2.Library.UI.getElementById("div", "media-list");
        UI.isScrolledToMediaListBottom = function () {
            return UI.mediaList.scrollHeight <= UI.mediaList.scrollTop + (UI.mediaList.clientHeight * 1) + (UI.addMediaButtonHeight * 0.3);
        };
        UI.progressCircle = _library_2.Library.UI.getElementById("div", "progress-circle");
        UI.addMediaButton = new _library_2.Library.Control.Button({ id: "add-media", });
        UI.addMediaButtonHeight = 84;
        UI.inputFile = _library_2.Library.UI.getElementById("input", "add-file");
        UI.mediaCount = _library_2.Library.UI.getElementById("span", "media-count");
        UI.mediaLength = _library_2.Library.UI.getElementById("span", "media-length");
        UI.withFullscreenCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.withFullscreen);
        UI.brightnessRange = new _library_2.Library.Control.Range(control_json_1.default.brightness);
        UI.stretchRange = new _library_2.Library.Control.Range(control_json_1.default.stretch);
        UI.paddingCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.padding);
        UI.crossFadeSelect = new _library_2.Library.Control.Select(control_json_1.default.crossFade, {
            makeLabel: function (value) { return value <= 0 ?
                _library_2.Library.Locale.map("cross-fade-0") :
                _tools_2.Tools.Timespan.toDisplayString(value); }
        });
        UI.imageSpanSelect = new _library_2.Library.Control.Select(control_json_1.default.imageSpan, { makeLabel: _tools_2.Tools.Timespan.toDisplayString });
        UI.loopShortMediaCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.loopShortMedia);
        UI.visualizerSelect = new _library_2.Library.Control.Select(control_json_1.default.visualizer, { makeLabel: function (i) { return _library_2.Library.Locale.map("visualizer-".concat(i)); }, });
        UI.overlayStyleSelect = new _library_2.Library.Control.Select(control_json_1.default.overlayStyle, { makeLabel: function (i) { return _library_2.Library.Locale.map(i); }, });
        UI.overlayPositionSelect = new _library_2.Library.Control.Select(control_json_1.default.overlayPosition, { makeLabel: function (i) { return _library_2.Library.Locale.map(i); }, });
        UI.withWeatherCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.withWeather);
        UI.weatherLocationSelect = new _library_2.Library.Control.Select(control_json_1.default.weatherLocation, { makeLabel: function (i) { return _library_2.Library.Locale.map(i); }, });
        UI.withClockCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.withClock);
        UI.withDateCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.withDate);
        UI.withCalenderCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.withCalendar);
        UI.withVisualizerCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.withVisualizer);
        UI.showFpsCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.showFps);
        UI.shortcutsSelect = new _library_2.Library.Control.Select({
            id: "shortcuts",
            enum: Object.keys(shortcuts_json_2.default),
            default: Object.keys(shortcuts_json_2.default)[0],
        }, {
            makeLabel: function (i) { return shortcuts_json_2.default[i].label; },
        });
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
        UI.fpsDisplay = _library_2.Library.UI.getElementById("div", "fps");
        UI.overlay = _library_2.Library.UI.getElementById("div", "overlay-panel");
        UI.visualizer = _library_2.Library.UI.getElementById("div", "visualizer");
        UI.calendar = _library_2.Library.UI.getElementById("div", "calendar");
        UI.weather = _library_2.Library.UI.getElementById("div", "weather");
        UI.date = _library_2.Library.UI.getElementById("span", "date");
        UI.time = _library_2.Library.UI.getElementById("span", "time");
        UI.keyboardShortcut = _library_2.Library.UI.getElementById("div", "keyboard-shortcut");
        UI.updateShortcuts = function () {
            _library_2.Library.UI.replaceChildren(UI.keyboardShortcut, _library_2.Library.Shortcuts.getDisplayList().map(function (i) {
                return [
                    {
                        tag: "span",
                        children: i.keyss
                            .map(function (j) { return j.map(function (key) { return ({ tag: "kbd", text: key }); }); })
                            .reduce(function (accumulator, item, i) {
                            return __spreadArray(__spreadArray(__spreadArray([], accumulator, true), (0 < i ? [{ tag: "span", className: "separator", text: "/", }] : []), true), item, true);
                        }, []),
                    },
                    { tag: "span", text: _library_2.Library.Locale.map(i.description), }
                ];
            })
                .reduce(function (a, b) { return a.concat(b); }, []));
        };
        UI.updateLanguage = function () {
            _library_2.Library.Locale.setLocale(UI.languageSelect.get());
            var lang = _library_2.Library.Locale.getLocale();
            document.documentElement.setAttribute("lang", lang);
            document.documentElement.setAttribute("dir", _library_2.Library.Locale.getDirection(lang));
            UI.manifest.setAttribute("href", "web.manifest/generated/".concat(lang, ".json"));
            UI.overlayStyleSelect.reloadOptions();
            UI.languageSelect.reloadOptions();
            _library_2.Library.UI.querySelectorAllWithFallback("span", ["[data-lang-key]"])
                .forEach(function (i) { return UI.updateLabel(i); });
            UI.updateShortcuts();
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
define("script/features/location", ["require", "exports", "script/ui"], function (require, exports, ui_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Location = void 0;
    var Location;
    (function (Location) {
        var coords;
        Location.requestToGetGeolocation = function () {
            if (window.isSecureContext && "geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    console.log("📍 Geolocation obtained:", position.coords);
                    coords = "".concat(position.coords.latitude.toFixed(4), ",").concat(position.coords.longitude.toFixed(4));
                }, function (error) {
                    console.warn("🚫 Failed to obtain geolocation:", error);
                }, {
                    enableHighAccuracy: false,
                    timeout: 10000,
                    maximumAge: 60 * 60 * 1000,
                });
            }
            else {
                console.warn("🚫 Geolocation not supported. Falling back to IP address.");
            }
        };
        Location.get = function () {
            if ("geolocation" === ui_2.UI.weatherLocationSelect.get()) {
                return coords;
            }
            return undefined;
        };
    })(Location || (exports.Location = Location = {}));
});
define("script/features/weather", ["require", "exports", "script/tools/index", "script/features/location", "resource/config"], function (require, exports, _tools_3, location_1, config_json_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Weather = void 0;
    config_json_2 = __importDefault(config_json_2);
    var Weather;
    (function (Weather) {
        var _this = this;
        Weather.site = config_json_2.default.weather.site;
        Weather.format = config_json_2.default.weather.format;
        Weather.separator = "|";
        Weather.extractFixedText = function (format) { var _a; return (_a = format.replace(/%\S+/g, "").trim().match(/\S+/g)) !== null && _a !== void 0 ? _a : []; };
        Weather.isRegularResponse = function (text) {
            return Weather.extractFixedText(Weather.format).every(function (i) { return text.includes(i); });
        };
        Weather.getTemperatureUnit = function (locale) {
            if (locale === void 0) { locale = navigator.language; }
            return config_json_2.default.weather.fahrenheitLocales.includes(locale) ? "imperial" : "metric";
        };
        Weather.getTemperatureParam = function (locale) {
            if (locale === void 0) { locale = navigator.language; }
            return Weather.getTemperatureUnit(locale) === "imperial" ? "&u" : "";
        };
        var locationCache = undefined;
        Weather.makeRequestUrl = function (location, locale) {
            if (locale === void 0) { locale = navigator.language; }
            return location && 0 < location.length ?
                "https://".concat(Weather.site, "/").concat(encodeURIComponent(location), "?format=").concat(encodeURIComponent(Weather.format)).concat(Weather.getTemperatureParam(locale)) :
                "https://".concat(Weather.site, "/?format=").concat(encodeURIComponent(Weather.format)).concat(Weather.getTemperatureParam(locale)).concat(Weather.separator, "%l");
        };
        var lastRequestTimestamp = 0;
        var isLastRequestWithGeolocation = false;
        // export const enforceMonocromeFont = (text: string): string =>
        //     text.replace(/[\u2600-\u26FF\u1F300-\u1F5FF]/g, m => `${m}\uFE0E`);
        Weather.fetch = function (location) { return __awaiter(_this, void 0, void 0, function () {
            var result, response, parts, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = undefined;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        console.log("🌤 Fetching weather data...", Weather.makeRequestUrl(location));
                        return [4 /*yield*/, window.fetch(Weather.makeRequestUrl(location))];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.text()];
                    case 3:
                        //result = enforceMonocromeFont(await response.text())
                        result = (_a.sent())
                            .replace(/\s+/g, " ")
                            .trim();
                        if (Weather.isRegularResponse(result)) {
                            console.log("🌤 Weather data fetched:", result);
                            if (result.includes(Weather.separator)) {
                                parts = result.split(Weather.separator);
                                if (2 <= parts.length) {
                                    locationCache = parts[1].trim();
                                    console.log("📍 Location extracted:", locationCache);
                                }
                                result = parts[0].trim();
                            }
                            Weather.setCache(result);
                        }
                        else {
                            console.warn("🚫 Irregular weather data:", result);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        console.warn("🚫 Failed to fetch weather data:", response.status, response.statusText);
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.error("🚫 Error fetching weather data:", error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, result];
                }
            });
        }); };
        Weather.cache = config_json_2.default.weather.na;
        Weather.lastTimestamp = 0;
        Weather.setCache = function (data) {
            Weather.cache = data !== null && data !== void 0 ? data : config_json_2.default.weather.na;
            Weather.lastTimestamp = new Date().getTime();
        };
        Weather.isWeatherFetchAllowed = function () {
            var _a;
            var now = Date.now();
            var retryInterval = (_a = _tools_3.Tools.Timespan.parse(config_json_2.default.weather.retryInterval)) !== null && _a !== void 0 ? _a : (3 * 60 * 1000);
            return lastRequestTimestamp + retryInterval < now;
        };
        Weather.isUpdateRequired = function () {
            var _a;
            var now = Date.now();
            var updateInterval = (_a = _tools_3.Tools.Timespan.parse(config_json_2.default.weather.updateInterval)) !== null && _a !== void 0 ? _a : (30 * 60 * 1000);
            return Weather.lastTimestamp + updateInterval < now;
        };
        Weather.isExpired = function () {
            var _a;
            var now = Date.now();
            var expire = (_a = _tools_3.Tools.Timespan.parse(config_json_2.default.weather.expire)) !== null && _a !== void 0 ? _a : (60 * 60 * 1000);
            return Weather.lastTimestamp + expire < now;
        };
        Weather.get = function () {
            var location = location_1.Location.get();
            var isWithGeolocation = undefined !== location;
            if (Weather.isUpdateRequired() || isWithGeolocation !== isLastRequestWithGeolocation) {
                if (Weather.isWeatherFetchAllowed()) {
                    lastRequestTimestamp = Date.now();
                    isLastRequestWithGeolocation = isWithGeolocation;
                    Weather.fetch(location !== null && location !== void 0 ? location : locationCache);
                }
            }
            if (Weather.isExpired()) {
                return config_json_2.default.weather.na;
            }
            else {
                return Weather.cache;
            }
        };
    })(Weather || (exports.Weather = Weather = {}));
});
define("script/features/overlay", ["require", "exports", "script/library/index", "script/tools/index", "script/ui", "script/features/weather", "resource/config"], function (require, exports, library_1, tools_1, ui_3, weather_1, config_json_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Overlay = void 0;
    config_json_3 = __importDefault(config_json_3);
    var phi = (1 + Math.sqrt(5)) / 2;
    var Overlay;
    (function (Overlay) {
        Overlay.firstDayOfWeek = config_json_3.default.clock.firstDayOfWeek;
        Overlay.locale = undefined;
        Overlay.title = undefined;
        Overlay.subtitle = undefined;
        Overlay.makeDate = function (date, locale) {
            return date.toLocaleDateString(locale, config_json_3.default.clock.dateFormat);
        };
        Overlay.makeTime = function (date, locale) {
            return date.toLocaleTimeString(locale, config_json_3.default.clock.timeFormat);
        };
        Overlay.updateLayout = function (date) {
            if (ui_3.UI.overlay.classList.contains("rotate")) {
                var direction_1 = ((date.getHours() % 12) / 3) | 0;
                [
                    "top-right",
                    "bottom-right",
                    "bottom-left",
                    "top-left",
                ]
                    .forEach(function (i, ix) { return ui_3.UI.overlay.classList.toggle(i, direction_1 === ix); });
            }
        };
        Overlay.updateWeather = function () {
            var _a, _b, _c;
            if (ui_3.UI.withWeatherCheckbox.get()) {
                var weather = weather_1.Weather.get();
                if (((_a = ui_3.UI.weather.attributes.getNamedItem("data-weather")) === null || _a === void 0 ? void 0 : _a.value) !== weather) {
                    var attribute = document.createAttribute("data-weather");
                    attribute.value = weather;
                    ui_3.UI.weather.attributes.setNamedItem(attribute);
                    var firstLetter = (_c = (_b = weather.match(/\S+/)) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : "";
                    var tail = weather.slice(firstLetter.length).trim();
                    library_1.Library.UI.replaceChildren(ui_3.UI.weather, [
                        {
                            tag: "span",
                            className: "first-letter",
                            text: firstLetter,
                        },
                        {
                            tag: "span",
                            className: "tail",
                            text: tail,
                        }
                    ]);
                }
            }
            else {
                library_1.Library.UI.setTextContent(ui_3.UI.weather, "");
            }
        };
        Overlay.updateTime = function (date) {
            if (ui_3.UI.withClockCheckbox.get()) {
                library_1.Library.UI.setTextContent(ui_3.UI.time, Overlay.title !== null && Overlay.title !== void 0 ? Overlay.title : Overlay.makeTime(date, Overlay.locale));
            }
            else {
                library_1.Library.UI.setTextContent(ui_3.UI.time, "");
            }
        };
        Overlay.updateDate = function (date) {
            if (ui_3.UI.withDateCheckbox.get()) {
                library_1.Library.UI.setTextContent(ui_3.UI.date, Overlay.subtitle !== null && Overlay.subtitle !== void 0 ? Overlay.subtitle : Overlay.makeDate(date, Overlay.locale));
            }
            else {
                library_1.Library.UI.setTextContent(ui_3.UI.date, "");
            }
        };
        Overlay.updateCalendar = function (date) {
            var _a;
            var dateDate = ui_3.UI.withCalenderCheckbox.get() ? Overlay.makeDate(date, Overlay.locale) : "";
            if (((_a = ui_3.UI.calendar.attributes.getNamedItem("data-date")) === null || _a === void 0 ? void 0 : _a.value) !== dateDate) {
                var attribute = document.createAttribute("data-date");
                attribute.value = dateDate;
                ui_3.UI.calendar.attributes.setNamedItem(attribute);
                if ("" === dateDate) {
                    library_1.Library.UI.removeAllChildren(ui_3.UI.calendar);
                }
                else {
                    var weeks = [];
                    var currentDate = new Date(date);
                    var currentDay = currentDate.getDay();
                    var offset = (currentDay - Overlay.firstDayOfWeek + 7) % 7;
                    var startOfWeek = new Date(currentDate);
                    startOfWeek.setDate(currentDate.getDate() - offset);
                    for (var w = -3; w <= 3; ++w) {
                        var weekDays = [];
                        for (var d = 0; d < 7; ++d) {
                            var day = new Date(startOfWeek);
                            day.setDate(startOfWeek.getDate() + w * 7 + d);
                            weekDays.push({
                                tag: "span",
                                className: "day".concat(currentDate.getMonth() === day.getMonth() && currentDate.getDate() === day.getDate() ? " today" : "").concat(currentDate.getMonth() === day.getMonth() ? " current-month" : ""),
                                text: day.getDate().toString(),
                            });
                        }
                        weeks.push({
                            tag: "div",
                            className: "week",
                            children: weekDays,
                        });
                    }
                    library_1.Library.UI.replaceChildren(ui_3.UI.calendar, weeks);
                }
            }
        };
        Overlay.setColor = function (color) {
            library_1.Library.UI.setStyle(ui_3.UI.calendar, "color", color);
            library_1.Library.UI.setStyle(ui_3.UI.weather, "color", color);
            library_1.Library.UI.setStyle(ui_3.UI.date, "color", color);
            library_1.Library.UI.setStyle(ui_3.UI.time, "color", color);
        };
        Overlay.cloclLocale = undefined;
        Overlay.update = function (now) {
            var overlayOption = ui_3.UI.overlayStyleSelect.get();
            if ("hide" !== overlayOption) {
                var date = new Date();
                Overlay.updateLayout(date);
                Overlay.updateWeather();
                Overlay.updateTime(date);
                Overlay.updateDate(date);
                Overlay.updateCalendar(date);
                switch (overlayOption) {
                    case "alternate":
                        var isWhite = (new Date().getTime() / config_json_3.default.clock.alternate.span) % 2 < 1.0;
                        ui_3.UI.overlay.classList.toggle("white", isWhite);
                        ui_3.UI.overlay.classList.toggle("black", !isWhite);
                        Overlay.setColor(undefined);
                        break;
                    case "rainbow":
                        Overlay.setColor("hsl(".concat((now * 360) / (24000 * phi), ", 100%, 50%)"));
                        break;
                    default:
                        Overlay.setColor(undefined);
                        break;
                }
            }
        };
        Overlay.initialize = function (params) {
            var _a;
            Overlay.firstDayOfWeek = ((_a = tools_1.Tools.Number.parseInt(params["first-day-of-week"])) !== null && _a !== void 0 ? _a : config_json_3.default.clock.firstDayOfWeek) % 7;
            Overlay.locale = params["locale"];
            Overlay.title = params["title"];
            Overlay.subtitle = params["subtitle"];
            ui_3.UI.time.classList.toggle("text", undefined !== Overlay.title);
        };
    })(Overlay || (exports.Overlay = Overlay = {}));
});
define("script/features/analyser", ["require", "exports", "resource/config"], function (require, exports, config_json_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Analyser = void 0;
    config_json_4 = __importDefault(config_json_4);
    var Analyser;
    (function (Analyser) {
        var _this = this;
        var _a;
        Analyser.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        Analyser.fftSize = (_a = config_json_4.default.analyser.fftSize) !== null && _a !== void 0 ? _a : 1024;
        Analyser.isSupported = function () {
            return Boolean(Analyser.audioContext) &&
                "function" === typeof Analyser.audioContext.createGain &&
                "function" === typeof Analyser.audioContext.createAnalyser;
        };
        Analyser.resume = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Analyser.audioContext.state === "suspended")) return [3 /*break*/, 2];
                        return [4 /*yield*/, Analyser.audioContext.resume()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        ;
        var Entry = /** @class */ (function () {
            function Entry(mediaElement) {
                this.mediaElement = mediaElement;
                this.splitter = null;
                this.analyserNodes = null;
                this.isValidFrequencyData = { left: false, right: false, mono: false };
                this.isValidTimeDomainData = { left: false, right: false, mono: false };
                this.frequencyDataArray = { left: null, right: null, mono: null, };
                this.timeDomainDataArray = { left: null, right: null, mono: null, };
                // if (mediaElement instanceof HTMLVideoElement)
                // {
                //     this.gainNode = audioContext.createGain();
                //     this.mediaElementAudioSourceNode = audioContext.createMediaElementSource(mediaElement);
                //     this.mediaElementAudioSourceNode.connect(this.gainNode);
                //     this.gainNode.connect(audioContext.destination);
                // }
                // else
                // {
                this.splitter = Analyser.audioContext.createChannelSplitter(2);
                this.analyserNodes =
                    {
                        left: Analyser.audioContext.createAnalyser(),
                        right: Analyser.audioContext.createAnalyser(),
                        mono: Analyser.audioContext.createAnalyser(),
                    };
                this.analyserNodes.left.fftSize = Analyser.fftSize;
                this.analyserNodes.right.fftSize = Analyser.fftSize;
                this.gainNode = Analyser.audioContext.createGain();
                this.mediaElementAudioSourceNode = Analyser.audioContext.createMediaElementSource(mediaElement);
                this.mediaElementAudioSourceNode.connect(this.splitter);
                this.splitter.connect(this.analyserNodes.left, 0);
                this.splitter.connect(this.analyserNodes.right, 1);
                this.mediaElementAudioSourceNode.connect(this.analyserNodes.mono);
                this.mediaElementAudioSourceNode.connect(this.gainNode);
                this.gainNode.connect(Analyser.audioContext.destination);
                //this.analyserNode.connect(audioContext.destination);
                //this.frequencyDataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
                // }
            }
            Entry.prototype.destroy = function () {
                var _a, _b, _c, _d, _e, _f, _g;
                (_b = (_a = this.analyserNodes) === null || _a === void 0 ? void 0 : _a.left) === null || _b === void 0 ? void 0 : _b.disconnect();
                (_d = (_c = this.analyserNodes) === null || _c === void 0 ? void 0 : _c.right) === null || _d === void 0 ? void 0 : _d.disconnect();
                (_e = this.splitter) === null || _e === void 0 ? void 0 : _e.disconnect();
                (_g = (_f = this.analyserNodes) === null || _f === void 0 ? void 0 : _f.mono) === null || _g === void 0 ? void 0 : _g.disconnect();
                this.gainNode.disconnect();
                this.mediaElementAudioSourceNode.disconnect();
            };
            Entry.prototype.step = function () {
                this.isValidFrequencyData = { left: false, right: false, mono: false };
                this.isValidTimeDomainData = { left: false, right: false, mono: false };
            };
            Entry.prototype.getByteFrequencyData = function (channel) {
                if (this.analyserNodes && !this.isValidFrequencyData[channel]) {
                    if (!this.frequencyDataArray[channel]) {
                        this.frequencyDataArray[channel] = new Uint8Array(this.analyserNodes[channel].frequencyBinCount);
                    }
                    this.analyserNodes[channel].getByteFrequencyData(this.frequencyDataArray[channel]);
                    this.isValidFrequencyData[channel] = true;
                }
                return this.frequencyDataArray[channel];
            };
            Entry.prototype.getByteTimeDomainData = function (channel) {
                if (this.analyserNodes && !this.isValidTimeDomainData[channel]) {
                    if (!this.timeDomainDataArray[channel]) {
                        this.timeDomainDataArray[channel] = new Uint8Array(this.analyserNodes[channel].fftSize);
                    }
                    this.analyserNodes[channel].getByteTimeDomainData(this.timeDomainDataArray[channel]);
                    this.isValidFrequencyData[channel] = true;
                }
                return this.timeDomainDataArray[channel];
            };
            return Entry;
        }());
        Analyser.Entry = Entry;
    })(Analyser || (exports.Analyser = Analyser = {}));
});
define("script/features/media", ["require", "exports", "script/library/index", "script/tools/index", "resource/config"], function (require, exports, _library_3, tools_2, Config) {
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
            if (width <= 0 || height <= 0) {
                console.warn("🚫 Invalid dimensions for canvas image source:", { width: width, height: height, canvasImageSource: canvasImageSource });
            }
            else {
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
            }
            return "SVG:error";
        };
        Media.imageToEntry = function (category, file) {
            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                var img, url;
                return __generator(this, function (_a) {
                    img = new Image();
                    url = Media.getUrl(file);
                    img.onload = function () { return resolve({
                        url: url,
                        type: file.type,
                        category: category,
                        name: Media.getName(file),
                        thumbnail: canvasImageSourceToDataUrl(img, img.width, img.height),
                        size: file.size,
                        duration: null,
                        area: { width: img.width, height: img.height },
                    }); };
                    img.onerror = function (error) {
                        console.error("🚫 Error loading image metadata:", error);
                        resolve(null);
                    };
                    img.src = url;
                    return [2 /*return*/];
                });
            }); });
        };
        Media.audioToEntry = function (category, file) {
            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                var url, audio, loadedmetadataCalled, failed, finish;
                return __generator(this, function (_a) {
                    url = Media.getUrl(file);
                    audio = document.createElement("audio");
                    loadedmetadataCalled = false;
                    failed = false;
                    finish = function () { return resolve({
                        url: url,
                        type: file.type,
                        category: category,
                        name: Media.getName(file),
                        thumbnail: "SVG:audio",
                        size: file.size,
                        duration: audio.duration * 1000,
                        area: null,
                    }); };
                    audio.addEventListener("loadedmetadata", function () {
                        loadedmetadataCalled = true;
                        finish();
                    });
                    audio.addEventListener("error", function (error) {
                        console.error("🚫 Error loading audio metadata:", error);
                        failed = true;
                        resolve(null);
                    });
                    audio.src = url;
                    tools_2.Tools.Timer.sleep(1000).then(function () {
                        if (!loadedmetadataCalled && !failed) {
                            console.warn("⏳ Audio metadata not loaded in time, trying to finish anyway.");
                            finish();
                        }
                    });
                    return [2 /*return*/];
                });
            }); });
        };
        Media.videoToEntry = function (category, file) {
            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                var url, video, finish, loadedmetadataCalled, loadeddataCalled, failed, tryFinish;
                return __generator(this, function (_a) {
                    url = Media.getUrl(file);
                    video = document.createElement("video");
                    video.muted = true;
                    video.playsInline = true;
                    finish = function (skipThumbnail) { return resolve({
                        url: url,
                        type: file.type,
                        category: category,
                        name: Media.getName(file),
                        thumbnail: skipThumbnail ?
                            "SVG:error" :
                            canvasImageSourceToDataUrl(video, video.videoWidth, video.videoHeight),
                        size: file.size,
                        duration: video.duration * 1000,
                        area: { width: video.videoWidth, height: video.videoHeight },
                    }); };
                    loadedmetadataCalled = false;
                    loadeddataCalled = false;
                    failed = false;
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
                    video.addEventListener("error", function (error) {
                        console.error("🚫 Error loading video metadata:", error);
                        failed = true;
                        resolve(null);
                    });
                    video.src = url;
                    video.currentTime = 0.1;
                    tools_2.Tools.Timer.sleep(1000).then(function () {
                        video.play().finally(function () {
                            video.pause();
                            if ((!loadedmetadataCalled || !loadeddataCalled) && !failed) {
                                console.warn("⏳ Video metadata not loaded in time, trying to finish anyway.");
                                finish("skipThumbnail");
                            }
                        });
                    });
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
    })(Media || (exports.Media = Media = {}));
});
define("script/features/visualizer", ["require", "exports", "script/library/index", "script/ui", "resource/config"], function (require, exports, _library_4, ui_4, config_json_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Visualizer = void 0;
    config_json_5 = __importDefault(config_json_5);
    var circleRadians = 2 * Math.PI;
    var arcConfig = config_json_5.default.visualizer.arc[config_json_5.default.visualizer.arcType];
    var Visualizer;
    (function (Visualizer) {
        var _this = this;
        Visualizer.makePoint = function (x, y) {
            return ({
                x: x,
                y: y,
            });
        };
        Visualizer.makeSize = function (width, height) {
            return ({
                width: width,
                height: height,
            });
        };
        Visualizer.makeRect = function (point, size) {
            var x = point.x, y = point.y;
            var width = size.width, height = size.height;
            return { x: x, y: y, width: width, height: height };
        };
        Visualizer.addPoints = function (a, b) {
            return Visualizer.makePoint(a.x + b.x, a.y + b.y);
        };
        Visualizer.offsetPointX = function (a, x) {
            return Visualizer.makePoint(a.x + x, a.y);
        };
        Visualizer.offsetPointY = function (a, y) {
            return Visualizer.makePoint(a.x, a.y + y);
        };
        Visualizer.scalePoint = function (point, scale) {
            return Visualizer.makePoint(point.x * scale, point.y * scale);
        };
        Visualizer.scaleSize = function (size, scale) {
            return Visualizer.makeSize(size.width * scale, size.height * scale);
        };
        Visualizer.sizeToPoint = function (size) {
            return Visualizer.makePoint(size.width, size.height);
        };
        Visualizer.scaleRect = function (rect, scale) {
            return Visualizer.makeRect(Visualizer.addPoints(rect, Visualizer.sizeToPoint(Visualizer.scaleSize(rect, (1 - scale) / 2))), Visualizer.scaleSize(rect, scale));
        };
        Visualizer.getElementSize = function (element) {
            return Visualizer.makeSize(element.clientWidth, element.clientHeight);
        };
        Visualizer.getElementRect = function (element) {
            return Visualizer.makeRect(Visualizer.makePoint(0, 0), Visualizer.getElementSize(element));
        };
        Visualizer.getCenterPoint = function (rect) { return Visualizer.addPoints(rect, Visualizer.sizeToPoint(Visualizer.scaleSize(rect, 0.5))); };
        Visualizer.angleToPoint = function (angle) { return Visualizer.makePoint(Math.cos(angle), Math.sin(angle)); };
        Visualizer.getPointAtAngle = function (center, angle, radius) { return Visualizer.addPoints(center, Visualizer.scalePoint(Visualizer.angleToPoint(angle), radius)); };
        var CanvasContext2D = /** @class */ (function () {
            function CanvasContext2D(canvas) {
                this.canvas = canvas;
                var context = canvas.getContext("2d");
                if (!context) {
                    throw new Error("Failed to get 2D context");
                }
                this.context = context;
                this.rect = Visualizer.getElementRect(canvas);
            }
            CanvasContext2D.prototype.clear = function (rect) {
                if (rect === void 0) { rect = Visualizer.getElementRect(this.canvas); }
                this.context.clearRect(rect.x, rect.y, rect.width, rect.height);
            };
            CanvasContext2D.prototype.fill = function (fillStyle, rect) {
                if (rect === void 0) { rect = this.rect; }
                this.context.fillStyle = fillStyle;
                this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
            };
            CanvasContext2D.prototype.moveTo = function (point) {
                this.context.moveTo(point.x, point.y);
            };
            CanvasContext2D.prototype.lineTo = function (point) {
                this.context.lineTo(point.x, point.y);
            };
            CanvasContext2D.prototype.beginPath = function (data) {
                if (undefined !== data) {
                    if (undefined !== data.lineWidth) {
                        this.context.lineWidth = data.lineWidth;
                    }
                    if (undefined !== data.strokeStyle) {
                        this.context.strokeStyle = data.strokeStyle;
                    }
                }
                this.context.beginPath();
            };
            CanvasContext2D.prototype.stroke = function () {
                this.context.stroke();
            };
            return CanvasContext2D;
        }());
        Visualizer.CanvasContext2D = CanvasContext2D;
        Visualizer.VisualizerDom = HTMLDivElement;
        Visualizer.isSimpleMode = function () {
            return ui_4.UI.mediaScreen.classList.contains("simple");
        };
        Visualizer.isPlaneFrequencyMode = function () {
            return ui_4.UI.mediaScreen.classList.contains("plane-frequency");
        };
        Visualizer.isPlaneWaveformMode = function () {
            return ui_4.UI.mediaScreen.classList.contains("plane-waveform");
        };
        Visualizer.isArcFrequencyMode = function () {
            return ui_4.UI.mediaScreen.classList.contains("arc-frequency");
        };
        Visualizer.isArcWaveformMode = function () {
            return ui_4.UI.mediaScreen.classList.contains("arc-waveform");
        };
        Visualizer.isDoubleArcMode = function () {
            return ui_4.UI.mediaScreen.classList.contains("double-arc");
        };
        Visualizer.isStereoArcFrequencyMode = function () {
            return ui_4.UI.mediaScreen.classList.contains("stereo-arc-frequency");
        };
        Visualizer.isStereoArcWaveformMode = function () {
            return ui_4.UI.mediaScreen.classList.contains("stereo-arc-waveform");
        };
        Visualizer.isStereoDoubleArcMode = function () {
            return ui_4.UI.mediaScreen.classList.contains("stereo-double-arc");
        };
        Visualizer.make = function (media, index) {
            var visualDom = _library_4.Library.UI.createElement({ tag: "div", className: "visualizer" });
            switch (media.type) {
                case "audio":
                    //visualDom.classList.add("audio");
                    break;
            }
            visualDom.classList.toggle("odd", 0 !== (index % 2));
            return visualDom;
        };
        Visualizer.makeSureIcon = function (cssClass, icon) { return function (visualDom) { return __awaiter(_this, void 0, void 0, function () {
            var baseCssClass, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseCssClass = "visual-icon";
                        result = visualDom.querySelector(".".concat(baseCssClass, ".").concat(cssClass));
                        if (!!result) return [3 /*break*/, 2];
                        return [4 /*yield*/, _library_4.Library.Svg.loadSvg(icon)];
                    case 1:
                        result = _a.sent();
                        result.classList.add(baseCssClass);
                        result.classList.add(cssClass);
                        visualDom.appendChild(result);
                        _a.label = 2;
                    case 2: return [2 /*return*/, result];
                }
            });
        }); }; };
        Visualizer.makeSureAudioIcon = Visualizer.makeSureIcon("audio-icon", "audio-icon");
        Visualizer.makeSureMuteIcon = Visualizer.makeSureIcon("mute-icon", "error-icon");
        Visualizer.makeSureProgressCircle = function (visualDom) {
            var result = visualDom.querySelector(".visual-progress-circle");
            if (!result) {
                result = _library_4.Library.UI.createElement({ tag: "div", className: "visual-progress-circle" });
                visualDom.appendChild(result);
            }
            return result;
        };
        Visualizer.makeSureTextSpan = function (visualDom) {
            var result = visualDom.querySelector(".visual-text");
            if (!result) {
                result = _library_4.Library.UI.createElement({ tag: "span", className: "visual-text" });
                visualDom.appendChild(result);
            }
            return result;
        };
        Visualizer.getCanvasOrNull = function (visualDom) {
            return visualDom.querySelector(".visual-canvas") || null;
        };
        Visualizer.makeCanvas = function (visualDom) {
            var result = _library_4.Library.UI.createElement({ tag: "canvas", className: "visual-canvas" });
            visualDom.appendChild(result);
            Visualizer.fitCanvas(visualDom, result);
            return result;
        };
        Visualizer.makeSureCanvas = function (visualDom) { var _a; return (_a = Visualizer.getCanvasOrNull(visualDom)) !== null && _a !== void 0 ? _a : Visualizer.makeCanvas(visualDom); };
        Visualizer.fitCanvas = function (visualDom, canvas) {
            var _a = Visualizer.getElementSize(visualDom), width = _a.width, height = _a.height;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
        };
        Visualizer.updateStretch = function (visualDom) {
            var canvas = Visualizer.getCanvasOrNull(visualDom);
            if (canvas) {
                Visualizer.fitCanvas(visualDom, canvas);
            }
        };
        Visualizer.drawPlaneFrequency = function (context, rect, scale, analyser) {
            var _a;
            var frequencyDataArray = (_a = analyser.getByteFrequencyData("mono")) !== null && _a !== void 0 ? _a : null;
            if (context && frequencyDataArray) {
                var maxIndex = frequencyDataArray.length * config_json_5.default.visualizer.frequencyDataLengthRate;
                var zeroLevel = 1;
                if (rect.height <= rect.width) {
                    var barWidth = rect.width / maxIndex;
                    for (var i = 0; i < maxIndex; ++i) {
                        var value = frequencyDataArray[i] / 255.0;
                        var hue = (i / maxIndex) * config_json_5.default.visualizer.maxHue;
                        var barHeight = zeroLevel + (scale * value * (rect.height - zeroLevel));
                        var point = Visualizer.makePoint(i * barWidth, (rect.height - barHeight) / 2);
                        context.fill("hsl(".concat(hue, ", 100%, 50%)"), Visualizer.makeRect(Visualizer.addPoints(rect, point), Visualizer.makeSize(barWidth, barHeight)));
                    }
                }
                else {
                    var barHeight = rect.height / maxIndex;
                    for (var i = 0; i < maxIndex; ++i) {
                        var value = frequencyDataArray[i] / 255.0;
                        var hue = (i / maxIndex) * config_json_5.default.visualizer.maxHue;
                        var barWidth = zeroLevel + (scale * value * (rect.width - zeroLevel));
                        var point = Visualizer.makePoint((rect.width - barWidth) / 2, rect.height - ((i + 1) * barHeight));
                        context.fill("hsl(".concat(hue, ", 100%, 50%)"), Visualizer.makeRect(Visualizer.addPoints(rect, point), Visualizer.makeSize(barWidth, barHeight)));
                    }
                }
            }
        };
        Visualizer.drawPlaneWaveform = function (context, rect, scale, analyser) {
            var _a;
            var timeDomainDataArray = (_a = analyser.getByteTimeDomainData("mono")) !== null && _a !== void 0 ? _a : null;
            if (context && timeDomainDataArray) {
                var maxIndex = timeDomainDataArray.length;
                context.beginPath(config_json_5.default.visualizer.waveform);
                if (rect.height <= rect.width) {
                    var sliceWidth = rect.width / maxIndex;
                    context.moveTo(Visualizer.offsetPointY(rect, rect.height / 2));
                    for (var i = 0; i < maxIndex; ++i) {
                        var value = timeDomainDataArray[i] / 255.0;
                        var x = rect.width - i * sliceWidth;
                        var y = scale * value * rect.height;
                        context.lineTo(Visualizer.addPoints(rect, { x: x, y: y }));
                    }
                    context.lineTo(Visualizer.addPoints(rect, Visualizer.makePoint(0, rect.height / 2)));
                }
                else {
                    var sliceHeight = rect.height / maxIndex;
                    context.moveTo(Visualizer.offsetPointX(rect, rect.width / 2));
                    for (var i = 0; i < maxIndex; ++i) {
                        var value = timeDomainDataArray[i] / 255.0;
                        var x = scale * value * rect.width;
                        var y = rect.height - i * sliceHeight;
                        context.lineTo(Visualizer.addPoints(rect, { x: x, y: y }));
                    }
                    context.lineTo(Visualizer.addPoints(rect, Visualizer.makePoint(rect.width / 2, 0)));
                }
                context.stroke();
            }
        };
        Visualizer.getStartAngle = function (channel) {
            switch (channel) {
                case "left":
                    return circleRadians * (arcConfig.startAngleRate + ((1 - arcConfig.angleRate) / 4));
                case "right":
                    return circleRadians * (arcConfig.startAngleRate - ((1 - arcConfig.angleRate) / 4));
                case "mono":
                default:
                    return circleRadians * (arcConfig.startAngleRate + ((1 - arcConfig.angleRate) / 2));
            }
        };
        Visualizer.getAngle = function (channel, rate) {
            var base = circleRadians * arcConfig.angleRate * rate;
            switch (channel) {
                case "left":
                    return base * 0.5;
                case "right":
                    return base * -0.5;
                case "mono":
                default:
                    return base;
            }
        };
        Visualizer.drawArcFrequency = function (context, channel, rect, scale, analyser) {
            var _a;
            var frequencyDataArray = (_a = analyser.getByteFrequencyData(channel)) !== null && _a !== void 0 ? _a : null;
            if (context && frequencyDataArray) {
                var startAngle = Visualizer.getStartAngle(channel);
                var radius = (rect.width + rect.height) * arcConfig.radiusRate;
                var center = Visualizer.getCenterPoint(rect);
                var maxIndex = frequencyDataArray.length * config_json_5.default.visualizer.frequencyDataLengthRate;
                var lineWidth = (circleRadians * radius) / maxIndex * 0.8;
                var zeroLevel = 1;
                for (var i = 0; i < maxIndex; i++) {
                    var hue = (i / maxIndex) * config_json_5.default.visualizer.maxHue;
                    var angle = startAngle + Visualizer.getAngle(channel, i / maxIndex);
                    var value = frequencyDataArray[i] / 255.0;
                    var barLength = scale * radius * value + zeroLevel;
                    var strokeStyle = "hsl(".concat(hue, ", 100%, 50%)");
                    context.beginPath({ lineWidth: lineWidth, strokeStyle: strokeStyle, });
                    context.moveTo(Visualizer.getPointAtAngle(center, angle, radius - (barLength / 2)));
                    context.lineTo(Visualizer.getPointAtAngle(center, angle, radius + (barLength / 2)));
                    context.stroke();
                }
            }
        };
        Visualizer.drawArcWaveform = function (context, channel, rect, scale, analyser) {
            var _a;
            var timeDomainDataArray = (_a = analyser.getByteTimeDomainData(channel)) !== null && _a !== void 0 ? _a : null;
            if (context && timeDomainDataArray) {
                var startAngle = Visualizer.getStartAngle(channel);
                var radius = (rect.width + rect.height) * arcConfig.radiusRate;
                var center = Visualizer.getCenterPoint(rect);
                var maxIndex = timeDomainDataArray.length;
                context.beginPath(config_json_5.default.visualizer.waveform);
                context.moveTo(Visualizer.getPointAtAngle(center, startAngle + Visualizer.getAngle(channel, 1.0), radius));
                for (var i = 0; i < maxIndex; i++) {
                    var value = timeDomainDataArray[i] / 255.0;
                    var barLength = scale * (radius * (value - 0.5)) * 2.0;
                    var angle = startAngle + Visualizer.getAngle(channel, 1.0 - (i / maxIndex));
                    context.lineTo(Visualizer.getPointAtAngle(center, angle, radius + barLength));
                }
                context.lineTo(Visualizer.getPointAtAngle(center, startAngle, radius));
                context.stroke();
            }
        };
        Visualizer.step = function (_media, playerDom, visualDom, analyser) {
            var _a;
            Visualizer.makeSureAudioIcon(visualDom).catch(console.error);
            if (playerDom.muted) {
                Visualizer.makeSureMuteIcon(visualDom).catch(console.error);
            }
            if (Visualizer.isSimpleMode()) {
                var frequencyDataArray = (_a = analyser === null || analyser === void 0 ? void 0 : analyser.getByteFrequencyData("mono")) !== null && _a !== void 0 ? _a : null;
                Visualizer.makeSureProgressCircle(visualDom).style.setProperty("--progress", "".concat((playerDom.currentTime / playerDom.duration) * 360, "deg"));
                Visualizer.makeSureProgressCircle(visualDom).style.setProperty("--volume", "".concat(Visualizer.getVolume(frequencyDataArray)));
            }
            else {
                var canvas = Visualizer.makeSureCanvas(visualDom);
                var context = new CanvasContext2D(canvas);
                if (context && analyser) {
                    context.clear();
                    var rect = Visualizer.getElementRect(visualDom);
                    if (Visualizer.isPlaneFrequencyMode()) {
                        Visualizer.drawPlaneFrequency(context, rect, 1.0, analyser);
                    }
                    if (Visualizer.isPlaneWaveformMode()) {
                        Visualizer.drawPlaneWaveform(context, rect, 1.0, analyser);
                    }
                    if (Visualizer.isArcFrequencyMode()) {
                        Visualizer.drawArcFrequency(context, "mono", rect, 1.0, analyser);
                    }
                    if (Visualizer.isArcWaveformMode()) {
                        Visualizer.drawArcWaveform(context, "mono", rect, 1.0, analyser);
                    }
                    if (Visualizer.isDoubleArcMode()) {
                        Visualizer.drawArcFrequency(context, "mono", Visualizer.scaleRect(rect, 1.2), 0.6, analyser);
                        Visualizer.drawArcWaveform(context, "mono", Visualizer.scaleRect(rect, 0.8), 0.7, analyser);
                    }
                    if (Visualizer.isStereoArcFrequencyMode()) {
                        Visualizer.drawArcFrequency(context, "left", rect, 1.0, analyser);
                        Visualizer.drawArcFrequency(context, "right", rect, 1.0, analyser);
                    }
                    if (Visualizer.isStereoArcWaveformMode()) {
                        Visualizer.drawArcWaveform(context, "left", rect, 1.0, analyser);
                        Visualizer.drawArcWaveform(context, "right", rect, 1.0, analyser);
                    }
                    if (Visualizer.isStereoDoubleArcMode()) {
                        Visualizer.drawArcFrequency(context, "left", Visualizer.scaleRect(rect, 1.2), 0.6, analyser);
                        Visualizer.drawArcWaveform(context, "left", Visualizer.scaleRect(rect, 0.8), 0.7, analyser);
                        Visualizer.drawArcFrequency(context, "right", Visualizer.scaleRect(rect, 1.2), 0.6, analyser);
                        Visualizer.drawArcWaveform(context, "right", Visualizer.scaleRect(rect, 0.8), 0.7, analyser);
                    }
                }
            }
        };
        Visualizer.isValidFrequencyDataArray = function (frequencyDataArray) { var _a; return 0 < ((_a = frequencyDataArray === null || frequencyDataArray === void 0 ? void 0 : frequencyDataArray.length) !== null && _a !== void 0 ? _a : 0); };
        Visualizer.getVolume = function (frequencyDataArray) {
            return Visualizer.isValidFrequencyDataArray(frequencyDataArray) ?
                Math.sqrt(Visualizer.getRawVolume(frequencyDataArray)) :
                0.5;
        };
        Visualizer.getRawVolume = function (frequencyDataArray) {
            return (Math.hypot.apply(Math, Array.from(frequencyDataArray)) / Math.sqrt(frequencyDataArray.length)) / 255.0;
        };
    })(Visualizer || (exports.Visualizer = Visualizer = {}));
});
define("script/features/elementpool", ["require", "exports", "script/library/index", "script/ui", "script/features/analyser"], function (require, exports, _library_5, ui_5, analyser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ElementPool = void 0;
    var ElementPool;
    (function (ElementPool) {
        var _this = this;
        var analyserPool = new Map();
        ElementPool.makeSure = function (data) {
            var result = Promise.resolve();
            if (data.image) {
                while (ui_5.UI.elementPool.getElementsByTagName("img").length < 4) {
                    var imgElement = _library_5.Library.UI.createElement({
                        tag: "img",
                        className: "player",
                        attributes: {
                            src: data.image.url,
                            alt: data.image.name,
                        },
                    });
                    ui_5.UI.elementPool.appendChild(imgElement);
                }
            }
            if (data.audio) {
                var url_1 = data.audio.url;
                var count = ui_5.UI.elementPool.getElementsByTagName("audio").length;
                while (count++ < 2) {
                    result = result.then(function () {
                        var audioElement = _library_5.Library.UI.createElement({
                            tag: "audio",
                            className: "player",
                            attributes: {
                                src: url_1,
                                //controls: false,
                                autoplay: false,
                            },
                        });
                        ui_5.UI.elementPool.appendChild(audioElement);
                        audioElement.volume = 0;
                        audioElement.muted = false;
                        return audioElement.play().then(function () { audioElement.pause(); audioElement.currentTime = 0; });
                    });
                }
            }
            if (data.video) {
                var url_2 = data.video.url;
                var count = ui_5.UI.elementPool.getElementsByTagName("video").length;
                while (count++ < 4) {
                    result = result.then(function () {
                        var videoElement = _library_5.Library.UI.createElement({
                            tag: "video",
                            className: "player",
                            attributes: {
                                src: url_2,
                                //controls: false,
                                autoplay: false,
                                playsinline: true,
                                webkitPlaysinline: true,
                            },
                        });
                        ui_5.UI.elementPool.appendChild(videoElement);
                        videoElement.volume = 0;
                        videoElement.muted = false;
                        return videoElement.play().then(function () { videoElement.pause(); videoElement.currentTime = 0; });
                    });
                }
            }
            return result.then(function () { return undefined; });
        };
        ElementPool.makeSureAnalyser = function (element) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!analyser_1.Analyser.isSupported()) return [3 /*break*/, 2];
                        return [4 /*yield*/, analyser_1.Analyser.resume()];
                    case 1:
                        _a.sent();
                        result = analyserPool.get(element);
                        if (!result) {
                            result = new analyser_1.Analyser.Entry(element);
                            analyserPool.set(element, result);
                        }
                        return [2 /*return*/, result];
                    case 2: return [2 /*return*/, null];
                }
            });
        }); };
        ElementPool.get = function (media) {
            switch (media.category) {
                case "image":
                    var imgElement = ui_5.UI.elementPool.getElementsByTagName("img")[0];
                    if (imgElement) {
                        imgElement.src = media.url;
                        imgElement.alt = media.name;
                        return imgElement;
                    }
                    break;
                case "audio":
                    var audioElement = ui_5.UI.elementPool.getElementsByTagName("audio")[0];
                    if (audioElement) {
                        audioElement.src = media.url;
                        audioElement.controls = false;
                        audioElement.autoplay = false;
                        audioElement.currentTime = 0;
                        audioElement.volume = 0;
                        audioElement.muted = false;
                        return audioElement;
                    }
                    break;
                case "video":
                    var videoElement = ui_5.UI.elementPool.getElementsByTagName("video")[0];
                    if (videoElement) {
                        videoElement.src = media.url;
                        videoElement.autoplay = false;
                        videoElement.currentTime = 0;
                        videoElement.volume = 0;
                        videoElement.muted = false;
                        return videoElement;
                    }
                    break;
                default:
                    console.error("🦋 Unknown media type:", media.type, media);
                    return null;
            }
            console.error("🦋 No element found in the pool for media:", media);
            return null;
        };
        ElementPool.release = function (element) {
            if (element) {
                element.className = "player";
                ui_5.UI.elementPool.appendChild(element);
            }
        };
    })(ElementPool || (exports.ElementPool = ElementPool = {}));
});
define("script/features/history", ["require", "exports", "script/features/media", "script/tools/index", "script/ui", "resource/config"], function (require, exports, media_1, _tools_4, ui_6, Config) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.History = void 0;
    Config = __importStar(Config);
    var History;
    (function (History) {
        var history = [];
        var baseIndex = 0;
        var currentIndex = -1;
        History.clear = function () {
            navigator.mediaSession.setPositionState();
            history = [];
            baseIndex = 0;
            currentIndex = -1;
        };
        History.isCleared = function () {
            return 0 === history.length && -1 === currentIndex;
        };
        History.regulate = function () {
            var maxHistoryLength = Math.max(Config.history.maxLength, media_1.Media.mediaList.length);
            if (maxHistoryLength < history.length) {
                var oldLength = history.length;
                history = history.slice(-maxHistoryLength);
                var diff = oldLength - history.length;
                baseIndex += diff;
                currentIndex -= diff;
            }
        };
        History.getCurrentIndex = function () {
            return baseIndex + currentIndex;
        };
        History.getMedia = function () {
            var mediaIndex = history[currentIndex];
            var media = media_1.Media.mediaList[mediaIndex];
            if (media) {
                return media;
            }
            else {
                console.error("🦋 Broken media list", { currentIndex: currentIndex, mediaIndex: mediaIndex, playlist: history, mediaList: media_1.Media.mediaList, });
                return undefined;
            }
        };
        History.play = function (media) {
            if (0 <= media_1.Media.mediaList.length) {
                if (media) {
                    History.clear();
                    var index = media_1.Media.mediaList.indexOf(media);
                    if (ui_6.UI.shuffle.get()) {
                        history.push(index);
                    }
                    else {
                        for (var i = 0; i <= index; ++i) {
                            history.push(i);
                        }
                    }
                    return media;
                }
                else if (0 <= currentIndex && currentIndex < history.length) {
                    return History.getMedia();
                }
                else {
                    return History.next();
                }
            }
            return undefined;
        };
        History.next = function () {
            if (History.isAtEnd()) {
                History.clear();
                return undefined;
            }
            else {
                ++currentIndex;
                if (history.length <= currentIndex) {
                    currentIndex = history.length;
                    if (ui_6.UI.shuffle.get()) {
                        history.push(History.getShuffleNext());
                    }
                    else {
                        history.push(History.getStraightNext(currentIndex));
                    }
                    History.regulate();
                }
                return History.getMedia();
            }
        };
        History.isAtEnd = function () {
            if (0 <= media_1.Media.mediaList.length) {
                var nextIndex = currentIndex + 1;
                if (nextIndex < media_1.Media.mediaList.length ||
                    0 < History.getStraightNext(nextIndex) ||
                    ui_6.UI.repeat.get()) {
                    return false;
                }
            }
            return true;
        };
        History.back = function () {
            if (0 <= media_1.Media.mediaList.length) {
                if (0 < currentIndex) {
                    --currentIndex;
                    return History.getMedia();
                }
            }
            return undefined;
        };
        History.getStraightNext = function (index) {
            var _a;
            var backMediaIndex = (_a = history[index - 1]) !== null && _a !== void 0 ? _a : -1;
            var currentMediaIndex = backMediaIndex + 1;
            return currentMediaIndex % media_1.Media.mediaList.length;
        };
        History.getShuffleNext = function () {
            switch (media_1.Media.mediaList.length) {
                case 0:
                    return -1;
                case 1:
                    return 0;
                case 2:
                    return history.length < 2 ?
                        _tools_4.Tools.Random.makeInteger(media_1.Media.mediaList.length) :
                        (0 === history[_tools_4.Tools.Random.makeInteger(history.length)] ? 1 : 0);
                default:
                    var playedList_1 = history.slice(Math.floor(currentIndex / media_1.Media.mediaList.length) * media_1.Media.mediaList.length);
                    var unplayedList = media_1.Media.mediaList.map(function (_, i) { return i; }).filter(function (i) { return !playedList_1.includes(i); });
                    var forbidens_1 = _tools_4.Tools.Array.backSlice(history, Math.ceil(media_1.Media.mediaList.length * Config.history.shuffleForbiddenRate));
                    var canonicals = unplayedList.filter(function (i) { return !forbidens_1.includes(i); });
                    return canonicals[_tools_4.Tools.Random.makeInteger(canonicals.length)];
            }
        };
    })(History || (exports.History = History = {}));
});
define("script/features/track", ["require", "exports", "script/tools/index", "script/library/index", "script/ui", "script/features/elementpool", "script/features/analyser", "script/features/visualizer", "resource/config"], function (require, exports, _tools_5, _library_6, ui_7, elementpool_1, analyser_2, visualizer_1, config_json_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Track = exports.hasValidGainNode = void 0;
    config_json_6 = __importDefault(config_json_6);
    var hasValidGainNode = function (track) {
        return track.analyser instanceof analyser_2.Analyser.Entry && track.analyser.gainNode instanceof GainNode;
    };
    exports.hasValidGainNode = hasValidGainNode;
    var Track = /** @class */ (function () {
        function Track(media, index) {
            var _this = this;
            this.paddingElement = null;
            this.startTime = null;
            this.elapsedTime = null;
            this.fadeRate = 0.0;
            this.currentTimeForValidation = 0.0;
            this.analyser = null;
            this.media = media;
            switch (media.category) {
                case "image":
                    this.playerElement = this.makePlayerElement();
                    this.visualElement = _library_6.Library.UI.createElement({
                        tag: "div",
                        className: "track-frame",
                        children: [this.playerElement,]
                    });
                    break;
                case "audio":
                    this.playerElement = this.makePlayerElement();
                    this.visualElement = visualizer_1.Visualizer.make(media, index);
                    this.visualElement.appendChild(this.playerElement);
                    if (analyser_2.Analyser.isSupported()) {
                        elementpool_1.ElementPool.makeSureAnalyser(this.playerElement)
                            .then(function (analyser) { return _this.setAnalyser(analyser); })
                            .catch(console.error);
                    }
                    break;
                case "video":
                    this.playerElement = this.makePlayerElement();
                    this.visualElement = _library_6.Library.UI.createElement({
                        tag: "div",
                        className: "track-frame",
                        children: [this.playerElement,]
                    });
                    if (analyser_2.Analyser.isSupported()) {
                        elementpool_1.ElementPool.makeSureAnalyser(this.playerElement)
                            .then(function (analyser) { return _this.setAnalyser(analyser); })
                            .catch(console.error);
                    }
                    break;
                default:
                    console.error("🦋 Unknown media type:", media.type, media);
                    this.playerElement = null;
                    this.visualElement = null;
                    break;
            }
            if (this.playerElement instanceof HTMLMediaElement) {
                if (this.isLoop()) {
                    this.playerElement.loop = true;
                }
                else {
                    this.playerElement.removeAttribute("loop");
                }
            }
            // this.visualElement?.addEventListener
            // (
            //     "click",
            //     () => document.body.classList.toggle("mousemove")
            // );
        }
        Track.prototype.setAnalyser = function (analyser) {
            this.analyser = analyser;
            if (this.analyser instanceof analyser_2.Analyser.Entry && this.analyser.gainNode instanceof GainNode && this.playerElement instanceof HTMLMediaElement) {
                this.analyser.gainNode.gain.value = this.playerElement.volume;
                this.playerElement.volume = 1.0;
            }
        };
        Track.prototype.selfValidate = function () {
            if (this.playerElement instanceof HTMLMediaElement) {
                if (this.currentTimeForValidation + (60 * 60) < this.playerElement.currentTime && this.playerElement.paused) {
                    var actualDuration = this.currentTimeForValidation * 1000;
                    if (null === this.media.duration || (actualDuration + (60 * 60 * 1000)) < this.media.duration) {
                        this.media.duration = actualDuration;
                        console.log("🦋 Updated media duration:", this.media.name, this.media.duration);
                        if (this.isLoop()) {
                            this.playerElement.loop = true;
                            this.playerElement.play();
                        }
                        return true;
                    }
                }
                else {
                    this.currentTimeForValidation = this.playerElement.currentTime;
                }
            }
            return false;
        };
        Track.prototype.makePlayerElement = function () {
            return elementpool_1.ElementPool.get(this.media);
        };
        Track.prototype.isPlaying = function () {
            return null !== this.startTime;
        };
        Track.prototype.play = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.startTime = Date.now() - ((_a = this.elapsedTime) !== null && _a !== void 0 ? _a : 0);
                            if (!(this.playerElement instanceof HTMLMediaElement)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.playerElement.play()];
                        case 1:
                            _b.sent();
                            this.currentTimeForValidation = this.playerElement.currentTime;
                            if (!(this.paddingElement instanceof HTMLMediaElement)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.paddingElement.play()];
                        case 2:
                            _b.sent();
                            this.paddingElement.currentTime = this.playerElement.currentTime;
                            _b.label = 3;
                        case 3:
                            if (!this.isLoop()) {
                                this.startTime = Date.now() - (this.playerElement.currentTime * 1000);
                            }
                            _b.label = 4;
                        case 4:
                            this.elapsedTime = null;
                            return [2 /*return*/];
                    }
                });
            });
        };
        Track.prototype.pause = function () {
            if (this.playerElement instanceof HTMLMediaElement) {
                this.playerElement.pause();
                if (this.paddingElement instanceof HTMLMediaElement) {
                    this.paddingElement.pause();
                }
            }
            if (null !== this.startTime) {
                this.elapsedTime = Date.now() - this.startTime;
                this.startTime = null;
            }
        };
        Track.prototype.seek = function (seekPosition) {
            seekPosition = Math.max(0, Math.min(seekPosition, this.getDuration()));
            if (this.playerElement instanceof HTMLMediaElement) {
                var singleSeekPosition = this.isLoop() ?
                    seekPosition % this.getSingleDuration() :
                    seekPosition;
                this.playerElement.currentTime = singleSeekPosition / 1000;
                if (this.paddingElement instanceof HTMLMediaElement) {
                    this.paddingElement.currentTime = singleSeekPosition / 1000;
                }
            }
            if (null !== this.startTime) {
                this.startTime = Date.now() - seekPosition;
            }
            if (null !== this.elapsedTime) {
                this.elapsedTime = seekPosition;
            }
        };
        Track.prototype.getSeek = function () {
            var _a;
            if (this.playerElement instanceof HTMLMediaElement && !this.isLoop()) {
                return this.playerElement.currentTime * 1000;
            }
            else {
                return (_a = this.elapsedTime) !== null && _a !== void 0 ? _a : this.getElapsedTime();
            }
        };
        Track.prototype.diffSeek = function (seekDiff) {
            this.seek(this.getSeek() + seekDiff);
        };
        Track.prototype.rateSeek = function (rate) {
            this.seek(this.getDuration() * rate);
        };
        Track.prototype.fastForward = function () {
            this.diffSeek(config_json_6.default.player.fastFowardSpan);
        };
        Track.prototype.rewind = function () {
            this.diffSeek(-config_json_6.default.player.rewindSpan);
        };
        Track.prototype.setPositionState = function () {
            navigator.mediaSession.setPositionState({
                duration: this.getDuration(),
                playbackRate: this.playerElement instanceof HTMLMediaElement ? this.playerElement.playbackRate : 1.0,
                position: this.getElapsedTime() / 1000,
            });
        };
        Track.prototype.step = function () {
            var _a;
            (_a = this.analyser) === null || _a === void 0 ? void 0 : _a.step();
            if (this.playerElement instanceof HTMLMediaElement && this.visualElement instanceof visualizer_1.Visualizer.VisualizerDom) {
                visualizer_1.Visualizer.step(this.media, this.playerElement, this.visualElement, this.analyser);
            }
            if (this.playerElement instanceof HTMLMediaElement && !(this.visualElement instanceof visualizer_1.Visualizer.VisualizerDom) && ui_7.UI.withVisualizerCheckbox.get()) {
                visualizer_1.Visualizer.step(this.media, this.playerElement, ui_7.UI.visualizer, this.analyser);
            }
            else {
            }
            if (this.playerElement instanceof HTMLMediaElement && !this.isLoop()) {
                ui_7.UI.seekRange.valueAsNumber = (this.playerElement.currentTime * 1000) / this.getDuration();
            }
            else {
                ui_7.UI.seekRange.valueAsNumber = this.getElapsedTime() / this.getDuration();
            }
        };
        Track.prototype.isLoop = function () {
            var loopShortMedia = ui_7.UI.loopShortMediaCheckbox.get();
            var imageSpan = this.getImageDuration();
            return loopShortMedia && null !== this.media.duration && this.media.duration <= imageSpan;
        };
        Track.prototype.getImageDuration = function () {
            return parseFloat(ui_7.UI.imageSpanSelect.get());
        };
        Track.prototype.getDuration = function () {
            if (this.isLoop()) {
                return this.getImageDuration();
            }
            else {
                return this.getSingleDuration();
            }
        };
        Track.prototype.getSingleDuration = function () {
            var _a;
            return (_a = this.media.duration) !== null && _a !== void 0 ? _a : this.getImageDuration();
        };
        Track.prototype.getEndTime = function () {
            if (null !== this.startTime) {
                return this.startTime + this.getDuration();
            }
            else {
                return 0;
            }
        };
        Track.prototype.getElapsedTime = function () {
            var _a;
            if (null !== this.startTime) {
                return Date.now() - this.startTime;
            }
            else {
                return (_a = this.elapsedTime) !== null && _a !== void 0 ? _a : 0;
            }
        };
        Track.prototype.getRemainingTime = function () {
            if (null === this.startTime) {
                return this.getDuration();
            }
            else {
                return this.getEndTime() - Date.now();
            }
        };
        Track.prototype.appleyStretch = function (dom, StretchRate) {
            if (this.media.area) {
                var widthScale = window.innerWidth / this.media.area.width;
                var heightScale = window.innerHeight / this.media.area.height;
                var minScale = Math.min(widthScale, heightScale);
                var maxScale = Math.max(widthScale, heightScale);
                var maxStreach = maxScale / minScale; // 1以上
                var ratio = 1 / Math.max(1 / maxStreach, 1 - StretchRate);
                var scale = ratio * minScale;
                var scaledWidth = this.media.area.width * scale;
                var scaledHeight = this.media.area.height * scale;
                _library_6.Library.UI.setStyle(dom, "width", "".concat(scaledWidth, "px"));
                _library_6.Library.UI.setStyle(dom, "height", "".concat(scaledHeight, "px"));
                if (maxStreach <= ratio) {
                    return true;
                }
            }
            return false;
        };
        Track.prototype.updateStretch = function () {
            var _this = this;
            if (this.visualElement) {
                if (this.media.area) {
                    var StretchRate = ui_7.UI.stretchRange.get() / 100;
                    var isFit = this.appleyStretch(this.playerElement, StretchRate);
                    if (ui_7.UI.paddingCheckbox.get()) {
                        if (!isFit) {
                            if (null === this.paddingElement) {
                                this.paddingElement = this.makePlayerElement();
                                this.paddingElement.classList.add("padding");
                                if (this.paddingElement instanceof HTMLMediaElement) {
                                    var playerDom = this.playerElement;
                                    this.paddingElement.volume = 0;
                                    this.paddingElement.muted = true;
                                    this.paddingElement.loop = playerDom.loop;
                                    this.paddingElement.currentTime = playerDom.currentTime;
                                    if (this.playerElement instanceof HTMLMediaElement && !this.playerElement.paused) {
                                        this.paddingElement.play().then(function () {
                                            if (_this.paddingElement instanceof HTMLVideoElement && _this.playerElement instanceof HTMLVideoElement) {
                                                _this.paddingElement.currentTime = _this.playerElement.currentTime;
                                            }
                                        });
                                    }
                                }
                                this.visualElement.insertBefore(this.paddingElement, this.playerElement);
                            }
                            this.appleyStretch(this.paddingElement, 1.0);
                        }
                    }
                    else {
                        if (null !== this.paddingElement) {
                            if (this.paddingElement instanceof HTMLMediaElement) {
                                this.paddingElement.pause();
                            }
                            elementpool_1.ElementPool.release(this.paddingElement);
                            this.paddingElement = null;
                        }
                    }
                }
                // else
                // {
                //     Library.UI.setStyle(this.visualElement, "width", `100%`);
                //     Library.UI.setStyle(this.visualElement, "height", `100%`);
                // }
                if (this.playerElement instanceof HTMLMediaElement && this.visualElement instanceof visualizer_1.Visualizer.VisualizerDom) {
                    visualizer_1.Visualizer.updateStretch(this.visualElement);
                    visualizer_1.Visualizer.step(this.media, this.playerElement, this.visualElement, this.analyser);
                }
            }
        };
        Track.prototype.updateLoopShortMedia = function (isPlaying) {
            if (this.playerElement instanceof HTMLMediaElement) {
                if (this.isLoop()) {
                    this.playerElement.loop = true;
                    if (this.playerElement.paused && isPlaying) {
                        this.playerElement.play();
                    }
                    if (this.paddingElement instanceof HTMLMediaElement) {
                        this.paddingElement.loop = true;
                        if (this.paddingElement.paused && isPlaying) {
                            this.paddingElement.play();
                        }
                    }
                }
                else {
                    this.playerElement.removeAttribute("loop");
                    if (this.paddingElement instanceof HTMLMediaElement) {
                        this.paddingElement.removeAttribute("loop");
                    }
                }
            }
        };
        Track.prototype.isMuteCondition = function (volume, rate, fade) {
            if (_tools_5.Tools.Environment.isSafari()) {
                if ((0, exports.hasValidGainNode)(this)) {
                    switch (fade) {
                        case "fadeIn":
                            return false;
                        case "fadeOut":
                            return true;
                        default:
                            break;
                    }
                }
                if (undefined !== rate) {
                    return volume <= 0 || rate <= 0.5;
                }
            }
            return volume <= 0;
        };
        Track.prototype.setVolume = function (volume, rate, fade) {
            if (this.playerElement instanceof HTMLMediaElement) {
                if ((0, exports.hasValidGainNode)(this)) {
                    this.analyser.gainNode.gain.value = volume * (rate !== null && rate !== void 0 ? rate : 1.0);
                }
                else {
                    this.playerElement.volume = volume * (rate !== null && rate !== void 0 ? rate : 1.0);
                }
                this.playerElement.muted = this.isMuteCondition(volume, rate, fade);
            }
            if ("fadeOut" !== fade && this.visualElement instanceof visualizer_1.Visualizer.VisualizerDom && this.playerElement instanceof HTMLMediaElement) {
                this.visualElement.classList.toggle("muted", this.playerElement.muted);
            }
        };
        Track.prototype.crossFadeStep = function (rate) {
            this.fadeRate = rate;
            if (this.visualElement) {
                this.visualElement.style.opacity = "".concat(rate);
            }
        };
        Track.prototype.release = function () {
            elementpool_1.ElementPool.release(this.playerElement);
            elementpool_1.ElementPool.release(this.paddingElement);
        };
        return Track;
    }());
    exports.Track = Track;
});
define("script/features/player", ["require", "exports", "script/tools/index", "script/library/index", "script/features/fps", "script/features/overlay", "script/ui", "script/features/elementpool", "script/features/media", "script/features/history", "script/features/track", "resource/config"], function (require, exports, _tools_6, _library_7, fps_1, overlay_1, ui_8, elementpool_2, media_2, history_1, track_1, Config) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Player = void 0;
    Config = __importStar(Config);
    var Player;
    (function (Player) {
        var _this = this;
        var CrossFade;
        (function (CrossFade) {
            CrossFade.startAt = null;
            CrossFade.elapsedTime = null;
            CrossFade.getDuration = function () {
                return parseFloat(ui_8.UI.crossFadeSelect.get());
            };
            CrossFade.clear = function () {
                CrossFade.startAt = null;
                CrossFade.elapsedTime = null;
            };
            CrossFade.isCrossFading = function () {
                return null !== CrossFade.startAt || null !== CrossFade.elapsedTime;
            };
            CrossFade.start = function () {
                CrossFade.startAt = Date.now();
                CrossFade.elapsedTime = null;
            };
            CrossFade.pause = function () {
                if (null !== CrossFade.startAt) {
                    CrossFade.elapsedTime = Date.now() - CrossFade.startAt;
                }
            };
            CrossFade.resume = function () {
                if (null !== CrossFade.elapsedTime) {
                    CrossFade.startAt = Date.now() - CrossFade.elapsedTime;
                    CrossFade.elapsedTime = null;
                }
            };
            CrossFade.getEndAt = function () {
                if (null !== CrossFade.startAt) {
                    return CrossFade.startAt + CrossFade.getDuration();
                }
                else if (null !== CrossFade.elapsedTime) {
                    return Date.now() + CrossFade.getDuration() - CrossFade.elapsedTime;
                }
                else {
                    return null;
                }
            };
            CrossFade.getProgress = function () {
                if (null !== CrossFade.elapsedTime) {
                    return Math.min(CrossFade.elapsedTime / CrossFade.getDuration(), 1);
                }
                else if (null !== CrossFade.startAt) {
                    return Math.min((Date.now() - CrossFade.startAt) / CrossFade.getDuration(), 1);
                }
                else {
                    return 0;
                }
            };
            CrossFade.isHotCrossFadeTarget = function (target) {
                return (CrossFade.getDuration() * 3) < target.getDuration();
            };
        })(CrossFade = Player.CrossFade || (Player.CrossFade = {}));
        var noMediaTimer = new _library_7.Library.UI.ToggleClassForWhileTimer();
        var loopHandle = null;
        Player.updateFullscreenState = function (fullscreen) {
            if (_library_7.Library.UI.fullscreenEnabled) {
                if (fullscreen !== null && fullscreen !== void 0 ? fullscreen : ui_8.UI.withFullscreenCheckbox.get()) {
                    _library_7.Library.UI.requestFullscreen(document.body);
                    setTimeout(function () { return document.body.focus(); }, 100);
                }
                else {
                    _library_7.Library.UI.exitFullscreen();
                }
            }
        };
        var currentTrack = null;
        var fadeoutingTrack = null;
        Player.isPlaying = function () {
            return document.body.classList.contains("play");
        };
        Player.isSeeking = function () {
            return document.body.classList.contains("is-seeking");
        };
        Player.startAnimationFrameLoop = function () {
            if (null !== loopHandle) {
                window.cancelAnimationFrame(loopHandle);
            }
            loopHandle = window.requestAnimationFrame(Player.loop);
        };
        Player.play = function (media) { return __awaiter(_this, void 0, void 0, function () {
            var currentMedia;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        document.body.classList.toggle("show-ui", false);
                        return [4 /*yield*/, elementpool_2.ElementPool.makeSure({
                                image: (_a = media_2.Media.mediaList.find(function (m) { return "image" === m.category; })) !== null && _a !== void 0 ? _a : null,
                                audio: (_b = media_2.Media.mediaList.find(function (m) { return "audio" === m.category; })) !== null && _b !== void 0 ? _b : null,
                                video: (_c = media_2.Media.mediaList.find(function (m) { return "video" === m.category; })) !== null && _c !== void 0 ? _c : null,
                            })];
                    case 1:
                        _d.sent();
                        Player.updateFullscreenState();
                        Player.startAnimationFrameLoop();
                        navigator.mediaSession.metadata = new MediaMetadata({
                            title: Config.applicationTitle,
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
                        if (media_2.Media.mediaList.length <= 0) {
                            noMediaTimer.start(document.body, "no-media", 5000);
                        }
                        if (history_1.History.isCleared()) {
                            CrossFade.clear();
                            Player.removeFadeoutTrack();
                            Player.removeTrack(currentTrack);
                            currentTrack = null;
                        }
                        CrossFade.resume();
                        currentMedia = history_1.History.play(media);
                        if (currentMedia) {
                            Player.playMedia(currentMedia, "resume");
                        }
                        else if (!ui_8.UI.repeat.get()) {
                            Player.pause();
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        Player.resume = function () {
            if (Player.isPlaying()) {
                Player.startAnimationFrameLoop();
            }
        };
        Player.pause = function () {
            if (null !== loopHandle) {
                window.cancelAnimationFrame(loopHandle);
            }
            ui_8.UI.overlay.style.removeProperty("opacity");
            Player.updateFullscreenState(false);
            navigator.mediaSession.playbackState = "paused";
            document.body.classList.toggle("list", true);
            document.body.classList.toggle("play", false);
            currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.pause();
            fadeoutingTrack === null || fadeoutingTrack === void 0 ? void 0 : fadeoutingTrack.pause();
            CrossFade.pause();
            var isResumable = 0 < media_2.Media.mediaList.length && null !== currentTrack;
            ui_8.UI.screenBody.classList.toggle("paused", isResumable);
            if (isResumable) {
                ui_8.UI.mediaList.scrollTop = ui_8.UI.mediaList.scrollHeight;
                document.body.classList.toggle("show-paused-media", true);
            }
        };
        Player.previous = function () {
            var media = history_1.History.back();
            if (media) {
                Player.playMedia(media);
            }
            else {
                Player.pause();
            }
        };
        Player.next = function () {
            var media = history_1.History.next();
            if (media) {
                Player.playMedia(media);
            }
            else {
                Player.pause();
                Player.clear();
            }
        };
        Player.clearCrossFade = function () {
            if (null !== currentTrack) {
                if (CrossFade.isCrossFading()) {
                    var currentVolume = ui_8.UI.volumeRange.get() / 100;
                    CrossFade.clear();
                    Player.removeFadeoutTrack();
                    currentTrack.setVolume(currentVolume);
                    currentTrack.crossFadeStep(1);
                }
            }
        };
        Player.fastForward = function () {
            if (null !== currentTrack) {
                Player.clearCrossFade();
                currentTrack.fastForward();
                Player.step();
            }
        };
        Player.rewind = function () {
            if (null !== currentTrack) {
                Player.clearCrossFade();
                currentTrack.rewind();
                Player.step();
            }
        };
        Player.seek = function (rate) {
            if (null !== currentTrack) {
                Player.clearCrossFade();
                currentTrack.rateSeek(rate);
                Player.step();
            }
        };
        Player.temporaryPause = function () {
            if (null !== currentTrack) {
                Player.clearCrossFade();
                currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.pause();
            }
        };
        Player.temporaryResume = function () {
            if (null !== currentTrack) {
                Player.clearCrossFade();
                currentTrack.play();
            }
        };
        Player.updateFps = function () {
            if (ui_8.UI.showFpsCheckbox.get()) {
                _library_7.Library.UI.setTextContent(ui_8.UI.fpsDisplay, fps_1.Fps.getText());
            }
        };
        var lastTimeVolume = 1.0;
        Player.isNextTiming = function () {
            if (null !== currentTrack) {
                if (currentTrack.getRemainingTime() <= 0) {
                    return true;
                }
                if (0 < parseFloat(ui_8.UI.crossFadeSelect.get())) {
                    if (CrossFade.isHotCrossFadeTarget(currentTrack)) {
                        if (currentTrack.getRemainingTime() <= CrossFade.getDuration()) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        Player.crossFade = function () { return __awaiter(_this, void 0, void 0, function () {
            var currentVolume, progress, fadeoutProgress;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(null !== currentTrack && !Player.isSeeking())) return [3 /*break*/, 7];
                        if (currentTrack.selfValidate()) {
                            ui_8.UI.mediaLength.click();
                        }
                        currentVolume = ui_8.UI.volumeRange.get() / 100;
                        if (!CrossFade.isCrossFading()) return [3 /*break*/, 5];
                        if (!(((_a = CrossFade.getEndAt()) !== null && _a !== void 0 ? _a : 0) <= Date.now())) return [3 /*break*/, 3];
                        CrossFade.clear();
                        Player.removeFadeoutTrack();
                        currentTrack.setVolume(currentVolume);
                        currentTrack.crossFadeStep(1);
                        currentTrack.updateStretch();
                        if (!!currentTrack.isPlaying()) return [3 /*break*/, 2];
                        return [4 /*yield*/, currentTrack.play()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        progress = CrossFade.getProgress();
                        if (null !== fadeoutingTrack) {
                            fadeoutProgress = 1 - progress;
                            fadeoutingTrack.setVolume(currentVolume, fadeoutProgress, "fadeOut");
                            //fadeoutingTrack.crossFadeStep(fadeoutProgress);
                        }
                        currentTrack.setVolume(currentVolume, progress, "fadeIn");
                        currentTrack.crossFadeStep(progress);
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (lastTimeVolume !== currentVolume) {
                            if (null !== currentTrack) {
                                currentTrack.setVolume(currentVolume);
                            }
                        }
                        if (currentTrack.getRemainingTime() <= 0 || (Player.isNextTiming() && !history_1.History.isAtEnd())) {
                            Player.next();
                        }
                        _b.label = 6;
                    case 6:
                        lastTimeVolume = currentVolume;
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        Player.makeIndexText = function (track) {
            return "".concat(media_2.Media.mediaList.indexOf(track.media) + 1, " / ").concat(media_2.Media.mediaList.length);
        };
        Player.makeTitleText = function (track) {
            return "".concat(track.media.name);
        };
        Player.makeTimeText = function (track) {
            return "".concat(_tools_6.Tools.Timespan.toMediaTimeString(track.getElapsedTime()), " / ").concat(_tools_6.Tools.Timespan.toMediaTimeString(track.getDuration()));
        };
        Player.step = function () {
            if (null !== fadeoutingTrack) {
                fadeoutingTrack.step();
            }
            if (null !== currentTrack) {
                _library_7.Library.UI.setTextContent(ui_8.UI.mediaTime, Player.makeTimeText(currentTrack));
                currentTrack.step();
                currentTrack.setPositionState();
            }
        };
        Player.loop = function (now) {
            var _a, _b;
            if (Player.isPlaying()) {
                overlay_1.Overlay.update(now);
                fps_1.Fps.step(now);
                Player.updateFps();
                Player.crossFade();
                Player.step();
                navigator.mediaSession.setPositionState({
                    duration: ((_a = currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.getDuration()) !== null && _a !== void 0 ? _a : 0) / 1000,
                    playbackRate: (currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.playerElement) instanceof HTMLMediaElement ? currentTrack.playerElement.playbackRate : 1.0,
                    position: ((_b = currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.getElapsedTime()) !== null && _b !== void 0 ? _b : 0) / 1000,
                });
                loopHandle = window.requestAnimationFrame(Player.loop);
            }
            else {
                loopHandle = null;
            }
        };
        Player.playMedia = function (entry, resume) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: entry.name,
                artist: "Unknown Artist",
                album: "Temporary Media List",
                artwork: [{ src: entry.thumbnail, }],
            });
            if (resume && currentTrack && entry === currentTrack.media) {
                currentTrack.updateStretch();
                currentTrack.play();
                fadeoutingTrack === null || fadeoutingTrack === void 0 ? void 0 : fadeoutingTrack.updateStretch();
                fadeoutingTrack === null || fadeoutingTrack === void 0 ? void 0 : fadeoutingTrack.play();
            }
            else {
                Player.removeFadeoutTrack();
                fadeoutingTrack = currentTrack;
                currentTrack = new track_1.Track(entry, history_1.History.getCurrentIndex());
                _library_7.Library.UI.setTextContent(ui_8.UI.mediaIndex, Player.makeIndexText(currentTrack));
                _library_7.Library.UI.setTextContent(ui_8.UI.mediaTitle, Player.makeTitleText(currentTrack));
                var currentVolume = ui_8.UI.volumeRange.get() / 100;
                if (0 < parseFloat(ui_8.UI.crossFadeSelect.get()) && fadeoutingTrack) {
                    CrossFade.start();
                    fadeoutingTrack === null || fadeoutingTrack === void 0 ? void 0 : fadeoutingTrack.setVolume(currentVolume, 1, "fadeOut");
                    currentTrack.setVolume(currentVolume, 0, "fadeIn");
                    currentTrack.crossFadeStep(0);
                    if (CrossFade.isHotCrossFadeTarget(currentTrack)) {
                        currentTrack.play();
                    }
                }
                else {
                    if (fadeoutingTrack) {
                        Player.removeFadeoutTrack();
                    }
                    currentTrack.setVolume(currentVolume);
                    currentTrack.crossFadeStep(1);
                    currentTrack.play();
                }
                if (currentTrack.visualElement) {
                    ui_8.UI.mediaScreen.insertBefore(currentTrack.visualElement, ui_8.UI.overlay);
                    currentTrack.updateStretch();
                }
            }
        };
        Player.removeTrack = function (track) {
            if (track) {
                track.pause();
                if (track.visualElement) {
                    ui_8.UI.mediaScreen.removeChild(track.visualElement);
                }
                track.release();
            }
        };
        Player.removeFadeoutTrack = function () {
            Player.removeTrack(fadeoutingTrack);
            fadeoutingTrack = null;
        };
        Player.updateStretch = function () {
            var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
            document.documentElement.style.setProperty('--diagonal', "".concat(Math.hypot(innerWidth, innerHeight) * 0.01, "px"));
            currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.updateStretch();
            fadeoutingTrack === null || fadeoutingTrack === void 0 ? void 0 : fadeoutingTrack.updateStretch();
        };
        Player.updateLoopShortMedia = function () {
            if (null !== currentTrack) {
                currentTrack.updateLoopShortMedia(Player.isPlaying());
            }
        };
        Player.clear = function () {
            ui_8.UI.screenBody.classList.toggle("paused", false);
            _library_7.Library.UI.setTextContent(ui_8.UI.mediaIndex, "");
            _library_7.Library.UI.setTextContent(ui_8.UI.mediaTitle, "");
            _library_7.Library.UI.setTextContent(ui_8.UI.mediaTime, "");
            history_1.History.clear();
            CrossFade.clear();
            Player.removeFadeoutTrack();
            if (null !== currentTrack) {
                var clearedTrack_1 = fadeoutingTrack = currentTrack;
                currentTrack = null;
                if (fadeoutingTrack.visualElement) {
                    _library_7.Library.UI.setStyle(fadeoutingTrack.visualElement, "opacity", undefined);
                    fadeoutingTrack.visualElement.classList.add("fade-out");
                }
                setTimeout(function () {
                    if (clearedTrack_1 === fadeoutingTrack) {
                        Player.removeFadeoutTrack();
                    }
                }, 3000);
            }
        };
    })(Player || (exports.Player = Player = {}));
});
define("script/features/index", ["require", "exports", "script/features/fps", "script/features/overlay", "script/features/location", "script/features/weather", "script/features/analyser", "script/features/visualizer", "script/features/player"], function (require, exports, ImportedFps, ImportedOverlay, ImportedLocation, ImportedWeather, ImportedAnalyser, ImportedVisualizer, ImportedPlayer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Features = void 0;
    ImportedFps = __importStar(ImportedFps);
    ImportedOverlay = __importStar(ImportedOverlay);
    ImportedLocation = __importStar(ImportedLocation);
    ImportedWeather = __importStar(ImportedWeather);
    ImportedAnalyser = __importStar(ImportedAnalyser);
    ImportedVisualizer = __importStar(ImportedVisualizer);
    ImportedPlayer = __importStar(ImportedPlayer);
    var Features;
    (function (Features) {
        Features.Fps = ImportedFps.Fps;
        Features.Overlay = ImportedOverlay.Overlay;
        Features.Location = ImportedLocation.Location;
        Features.Weather = ImportedWeather.Weather;
        //export import Media = ImportedMedia.Media;
        //export import History = ImortedHistory.History;
        Features.Analyser = ImportedAnalyser.Analyser;
        //export import Track = ImportedTrack.Track;
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
define("script/url", ["require", "exports", "resource/config"], function (require, exports, config_json_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Url = void 0;
    config_json_7 = __importDefault(config_json_7);
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
            var url = new URL(config_json_7.default.canonicalUrl || window.location.href);
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
        };
        Url.params = Url.parseParameter(window.location.href);
    })(Url || (exports.Url = Url = {}));
});
define("script/progress", ["require", "exports", "script/ui"], function (require, exports, ui_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Progress = void 0;
    var Progress;
    (function (Progress) {
        var totalTasks = 0;
        var completedTasks = 0;
        Progress.incrementTask = function (progress) {
            if (progress === void 0) { progress = 1; }
            totalTasks += progress;
            Progress.updateProgress();
        };
        Progress.completeTask = function (progress) {
            if (progress === void 0) { progress = 1; }
            completedTasks += progress;
            Progress.updateProgress();
        };
        Progress.updateProgress = function () {
            document.body.classList.toggle("progress-circle", 0 < totalTasks && completedTasks < totalTasks);
            ui_9.UI.progressCircle.style.setProperty("--progress", "".concat((completedTasks / totalTasks) * 360, "deg"));
            if (totalTasks <= completedTasks) {
                totalTasks = 0;
                completedTasks = 0;
            }
        };
    })(Progress || (exports.Progress = Progress = {}));
});
define("script/medialist", ["require", "exports", "script/tools/index", "script/library/index", "script/features/index", "script/features/media", "script/ui", "script/progress"], function (require, exports, _tools_7, _library_8, _features_1, media_3, ui_10, progress_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MediaList = void 0;
    var MediaList;
    (function (MediaList) {
        var _this = this;
        var notSupportedMediaTimer = new _library_8.Library.UI.ToggleClassForWhileTimer();
        MediaList.addMedia = function (file) { return __awaiter(_this, void 0, void 0, function () {
            var entry, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("📂 Adding media:", file);
                        return [4 /*yield*/, media_3.Media.fileToEntry(file)];
                    case 1:
                        entry = _c.sent();
                        if (!(null !== entry)) return [3 /*break*/, 3];
                        console.log("✅ Valid media file:", file);
                        media_3.Media.mediaList.push(entry);
                        MediaList.updateInformationDisplay();
                        _b = (_a = ui_10.UI.mediaList).insertBefore;
                        return [4 /*yield*/, MediaList.makeMediaEntryDom(entry)];
                    case 2:
                        _b.apply(_a, [_c.sent(), ui_10.UI.addMediaButton.dom.parentElement]);
                        if (_features_1.Features.Player.isPlaying()) {
                            _features_1.Features.Player.pause();
                        }
                        MediaList.clearPlayState();
                        console.log("📂 Media added:", media_3.Media.mediaList[media_3.Media.mediaList.length - 1]);
                        return [3 /*break*/, 4];
                    case 3:
                        console.warn("🚫 Invalid media file:", file);
                        notSupportedMediaTimer.start(document.body, "not-supported-media", 5000);
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        var addMediaQueue = Promise.resolve();
        MediaList.addMediaSerial = function (file) {
            progress_1.Progress.incrementTask();
            addMediaQueue = addMediaQueue.then(function () { return MediaList.addMedia(file).catch(function (e) { return console.error(e); }).finally(function () { return progress_1.Progress.completeTask(); }); });
        };
        MediaList.removeButton = function (entry) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {
                            tag: "button",
                            className: "remove-button"
                        };
                        return [4 /*yield*/, _library_8.Library.Svg.getSvg("SVG:close")];
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
                                                index = media_3.Media.mediaList.indexOf(entry);
                                                if (!(0 <= index && index < media_3.Media.mediaList.length)) return [3 /*break*/, 2];
                                                console.log("🗑️ Removing media:", media_3.Media.mediaList[index]);
                                                URL.revokeObjectURL(media_3.Media.mediaList[index].url);
                                                media_3.Media.mediaList.splice(index, 1);
                                                MediaList.clearPlayState();
                                                MediaList.updateInformationDisplay();
                                                return [4 /*yield*/, MediaList.updateMediaListDisplay()];
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
        MediaList.makeMediaEntryDom = function (entry) { return __awaiter(_this, void 0, void 0, function () {
            var ix, item, _a, _b, _c;
            var _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        ix = media_3.Media.mediaList.indexOf(entry);
                        _b = (_a = _library_8.Library.UI).createElement;
                        _d = {
                            tag: "div",
                            className: "item",
                            attributes: { draggable: "true", "data-index": ix }
                        };
                        return [4 /*yield*/, media_3.Media.makeThumbnailElement(entry)];
                    case 1:
                        _c = [
                            _e.sent(),
                            { tag: "span", className: "name", text: entry.name, },
                            { tag: "span", className: "type", text: entry.category, },
                            { tag: "span", className: "size", text: _tools_7.Tools.Byte.toDisplayString(entry.size, 3), },
                            { tag: "span", className: "duration", text: null !== entry.duration ? _tools_7.Tools.Timespan.toMediaTimeString(entry.duration) : "", }
                        ];
                        return [4 /*yield*/, MediaList.removeButton(entry)];
                    case 2:
                        item = _b.apply(_a, [(_d.children = _c.concat([
                                _e.sent()
                            ]),
                                _d)]);
                        item.addEventListener("dragstart", function (event) {
                            var _a;
                            ui_10.UI.mediaList.classList.add("dragging");
                            item.classList.add("dragging");
                            (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", String(ix));
                        });
                        item.addEventListener("dragend", function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        ui_10.UI.mediaList.classList.remove("dragging");
                                        item.classList.remove("dragging");
                                        return [4 /*yield*/, MediaList.updateMediaListDisplay()];
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
                                            moved = media_3.Media.mediaList.splice(fromIndex, 1)[0];
                                            media_3.Media.mediaList.splice(toIndex, 0, moved);
                                            MediaList.clearPlayState();
                                        }
                                        return [4 /*yield*/, MediaList.updateMediaListDisplay()];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        item.addEventListener("dblclick", function () {
                            _features_1.Features.Player.play(entry);
                        });
                        return [2 /*return*/, item];
                }
            });
        }); };
        MediaList.updateMediaListDisplay = function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, entry, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        Array.from(ui_10.UI.mediaList.children).forEach(function (child) {
                            if (child instanceof HTMLDivElement && !child.classList.contains("add")) {
                                child.remove();
                            }
                            ;
                        });
                        _i = 0, _a = media_3.Media.mediaList;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        entry = _a[_i];
                        _c = (_b = ui_10.UI.mediaList).insertBefore;
                        return [4 /*yield*/, MediaList.makeMediaEntryDom(entry)];
                    case 2:
                        _c.apply(_b, [_d.sent(), ui_10.UI.addMediaButton.dom.parentElement]);
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        MediaList.updateInformationDisplay = function () {
            _library_8.Library.UI.setTextContent(ui_10.UI.mediaCount, media_3.Media.mediaList.length.toString());
            var imageSpan = parseInt(ui_10.UI.imageSpanSelect.get());
            var totalDuration = media_3.Media.mediaList.reduce(function (sum, entry) { var _a; return sum + ((_a = entry.duration) !== null && _a !== void 0 ? _a : imageSpan); }, 0);
            _library_8.Library.UI.setTextContent(ui_10.UI.mediaLength, _tools_7.Tools.Timespan.toMediaTimeString(totalDuration));
        };
        MediaList.initialize = function () {
            MediaList.updateInformationDisplay();
        };
        MediaList.clearPlayState = function () {
            _features_1.Features.Player.clear();
            ui_10.UI.mediaList.classList.toggle("paused", false);
        };
    })(MediaList || (exports.MediaList = MediaList = {}));
});
define("script/events", ["require", "exports", "script/tools/index", "script/library/index", "script/features/index", "script/features/media", "script/medialist", "script/ui", "script/url", "resource/config", "resource/control"], function (require, exports, _tools_8, _library_9, _features_2, media_4, medialist_1, ui_11, url_3, config_json_8, control_json_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Events = void 0;
    config_json_8 = __importDefault(config_json_8);
    control_json_2 = __importDefault(control_json_2);
    var Events;
    (function (Events) {
        var _this = this;
        var updateShowFps = function () {
            ui_11.UI.fpsDisplay.classList.toggle("hide", !ui_11.UI.showFpsCheckbox.get());
        };
        var brightnessTimer = new _library_9.Library.UI.ToggleClassForWhileTimer();
        Events.updateBrightness = function () {
            var value = ui_11.UI.brightnessRange.get();
            console.log("💡 Brightness changed:", value);
            brightnessTimer.start(ui_11.UI.mediaScreen, "disable-transition", 100);
            _library_9.Library.UI.setStyle(ui_11.UI.mediaScreen, "opacity", "".concat(value / 100));
            Events.mousemove();
        };
        var updateLoopShortMedia = function () {
            _features_2.Features.Player.updateLoopShortMedia();
        };
        var updateVisualizer = function () {
            var value = ui_11.UI.visualizerSelect.get();
            control_json_2.default.visualizer.enum.forEach(function (i) { return ui_11.UI.mediaScreen.classList.toggle(i, i === value); });
        };
        var updateOverlayStyle = function () {
            control_json_2.default.overlayStyle.enum.forEach(function (i) { return ui_11.UI.overlay.classList.toggle(i, i === ui_11.UI.overlayStyleSelect.get()); });
        };
        var updateOverlayPosition = function () {
            control_json_2.default.overlayPosition.enum.forEach(function (i) { return ui_11.UI.overlay.classList.toggle(i, i === ui_11.UI.overlayPositionSelect.get()); });
        };
        var updateWeatherLocation = function () {
            if ("geolocation" === ui_11.UI.weatherLocationSelect.get()) {
                _features_2.Features.Location.requestToGetGeolocation();
            }
        };
        var updateShortcuts = function () {
            var value = ui_11.UI.shortcutsSelect.get();
            console.log("⌨️ Keyboard Shortcuts style changed:", value);
            _library_9.Library.Shortcuts.setStyle(value);
            ui_11.UI.updateShortcuts();
        };
        var updateUrlAnchor = function (params) {
            return ui_11.UI.urlAnchor.href = url_3.Url.make(params);
        };
        var dragover = function (event) {
            var _a;
            var files = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.files;
            if (files && 0 < files.length) {
                var hasMedia = Array.from(files).some(function (file) { return media_4.Media.isMediaFile(file); });
                if (hasMedia) {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = "copy";
                    ui_11.UI.addMediaButton.dom.classList.add("dragover");
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
                        medialist_1.MediaList.addMediaSerial(file);
                    }
                }
                return [2 /*return*/];
            });
        }); };
        var isSeekingTimer = new _tools_8.Tools.Timer.ExtendableTimer(function () {
            document.body.classList.add("is-seeking");
            if (_features_2.Features.Player.isPlaying()) {
                _features_2.Features.Player.temporaryPause();
            }
        }, function () {
            document.body.classList.remove("is-seeking");
            if (_features_2.Features.Player.isPlaying()) {
                _features_2.Features.Player.temporaryResume();
                _features_2.Features.Player.seek(ui_11.UI.seekRange.valueAsNumber);
            }
        }, 500);
        var updateSeek = function () {
            isSeekingTimer.kick();
            _features_2.Features.Player.seek(ui_11.UI.seekRange.valueAsNumber);
        };
        var mouseMoveTimer = new _library_9.Library.UI.ToggleClassForWhileTimer();
        Events.mousemove = function () {
            return mouseMoveTimer.start(document.body, "mousemove", config_json_8.default.ui.mousemoveTimeout);
        };
        Events.loadToggleButtonParameter = function (button, params) {
            var value = params[button.getId()];
            if (undefined !== value) {
                button.dom.classList.toggle("on", "true" === value.toLowerCase());
            }
        };
        var lastVolume = 100;
        Events.toggleMute = function () {
            if (ui_11.UI.volumeRange.get() <= 0) {
                ui_11.UI.volumeRange.set(lastVolume);
            }
            else {
                lastVolume = ui_11.UI.volumeRange.get();
                ui_11.UI.volumeRange.set(0);
            }
        };
        Events.initialize = function () {
            var _a, _b, _c, _d, _e, _f;
            window.addEventListener("dragover", function (event) { return event.preventDefault(); });
            window.addEventListener("drop", function (event) { return event.preventDefault(); });
            window.addEventListener("resize", function () { return _features_2.Features.Player.updateStretch(); });
            window.addEventListener("orientationchange", function () { return _features_2.Features.Player.updateStretch(); });
            _library_9.Library.Shortcuts.setCommandMap({
                "toggleShuffle": function () { return ui_11.UI.shuffle.toggle(); },
                "toggleRepeat": function () { return ui_11.UI.repeat.toggle(); },
                "togglePlay": function () {
                    if (_features_2.Features.Player.isPlaying()) {
                        _features_2.Features.Player.pause();
                        medialist_1.MediaList.updateMediaListDisplay();
                        medialist_1.MediaList.updateInformationDisplay();
                    }
                    else {
                        _features_2.Features.Player.play();
                    }
                },
                "toggleMute": function () { return Events.toggleMute(); },
                "volumeUp": function () {
                    ui_11.UI.volumeRange.set(ui_11.UI.volumeRange.get() + 5);
                    ui_11.UI.volumeRange.fire();
                },
                "volumeDown": function () {
                    ui_11.UI.volumeRange.set(ui_11.UI.volumeRange.get() - 5);
                    ui_11.UI.volumeRange.fire();
                },
                "seekBackward": function () {
                    _features_2.Features.Player.rewind();
                },
                "seekForward": function () {
                    _features_2.Features.Player.fastForward();
                },
                "goPreviousMedia": function () { return _features_2.Features.Player.previous(); },
                "goNextMedia": function () { return _features_2.Features.Player.next(); },
                "toggleFullscreen": function () {
                    if (_library_9.Library.UI.fullscreenEnabled) {
                        ui_11.UI.withFullscreenCheckbox.toggle();
                        _features_2.Features.Player.updateFullscreenState();
                    }
                }
            });
            document.body.addEventListener("dragover", dragover);
            document.body.addEventListener("drop", drop);
            //document.body.className = "play";
            document.body.className = "list";
            ui_11.UI.screenBody.addEventListener("click", function () { return document.body.classList.toggle("show-ui"); });
            var applyParam = function (key, value) {
                url_3.Url.addParameter(url_3.Url.params, key, value);
                updateUrlAnchor(url_3.Url.params);
            };
            navigator.mediaSession.setActionHandler("play", function () { return _features_2.Features.Player.play(); });
            navigator.mediaSession.setActionHandler("pause", _features_2.Features.Player.pause);
            navigator.mediaSession.setActionHandler("previoustrack", _features_2.Features.Player.previous);
            navigator.mediaSession.setActionHandler("nexttrack", _features_2.Features.Player.next);
            ui_11.UI.mediaList.addEventListener("scroll", function () { return document.body.classList.toggle("show-paused-media", ui_11.UI.screenBody.classList.contains("paused") && ui_11.UI.isScrolledToMediaListBottom()); });
            ui_11.UI.addMediaButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                ui_11.UI.inputFile.click();
            };
            ui_11.UI.inputFile.addEventListener("click", function (event) { return event.stopPropagation(); });
            ui_11.UI.inputFile.addEventListener("change", function () { return __awaiter(_this, void 0, void 0, function () {
                var files, _i, _a, file;
                return __generator(this, function (_b) {
                    files = ui_11.UI.inputFile.files;
                    for (_i = 0, _a = Array.from(files !== null && files !== void 0 ? files : []); _i < _a.length; _i++) {
                        file = _a[_i];
                        console.log("📂 File selected:", file);
                        medialist_1.MediaList.addMediaSerial(file);
                    }
                    ui_11.UI.inputFile.value = "";
                    return [2 /*return*/];
                });
            }); });
            ui_11.UI.playButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                if (_features_2.Features.Player.isPlaying()) {
                    _features_2.Features.Player.pause();
                    medialist_1.MediaList.updateMediaListDisplay();
                    medialist_1.MediaList.updateInformationDisplay();
                }
                else {
                    _features_2.Features.Player.play();
                }
            };
            ui_11.UI.nextButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                _features_2.Features.Player.next();
            };
            ui_11.UI.backBUtton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                _features_2.Features.Player.previous();
            };
            ui_11.UI.fastForwardButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                _features_2.Features.Player.fastForward();
            };
            ui_11.UI.rewindButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                _features_2.Features.Player.rewind();
            };
            ui_11.UI.shuffle.setChange(function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                applyParam("shuffle", "".concat(ui_11.UI.shuffle.get()));
            });
            ui_11.UI.volumeButton.setChange(function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                if (_tools_8.Tools.Environment.isSafari() && !_features_2.Features.Analyser.isSupported()) {
                    ui_11.UI.volumeRange.set(ui_11.UI.volumeRange.get() <= 0 ? 100 : 0);
                    ui_11.UI.volumeButton.toggle(false, "preventOnChange");
                }
                ui_11.UI.settingsButton.toggle(false, "preventOnChange");
            });
            (_a = ui_11.UI.volumeRange).options || (_a.options = {});
            ui_11.UI.volumeRange.options.change = function (_event, range) {
                var value = range.get();
                console.log("🔊 Volume changed:", value);
                ui_11.UI.volumeLabel.classList.toggle("volume-mute", value <= 0);
                ui_11.UI.volumeLabel.classList.toggle("volume-0", 0 < value && value <= 25);
                ui_11.UI.volumeLabel.classList.toggle("volume-1", 25 < value && value <= 50);
                ui_11.UI.volumeLabel.classList.toggle("volume-2", 50 < value && value <= 75);
                ui_11.UI.volumeLabel.classList.toggle("volume-3", 75 < value);
                //Media.setVolume(value);
                Events.mousemove();
            };
            ui_11.UI.settingsButton.setChange(function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                ui_11.UI.volumeButton.toggle(false, "preventOnChange");
            });
            ui_11.UI.mediaLength.click = function () {
                medialist_1.MediaList.updateMediaListDisplay();
                medialist_1.MediaList.updateInformationDisplay();
            };
            (_b = ui_11.UI.withFullscreenCheckbox).options || (_b.options = {});
            ui_11.UI.withFullscreenCheckbox.options.change = function (_event, _checkbox) {
                if (document.body.classList.contains("play")) {
                    if (_library_9.Library.UI.fullscreenEnabled) {
                        _features_2.Features.Player.updateFullscreenState();
                    }
                }
            };
            (_c = ui_11.UI.brightnessRange).options || (_c.options = {});
            ui_11.UI.brightnessRange.options.change = Events.updateBrightness;
            (_d = ui_11.UI.stretchRange).options || (_d.options = {});
            ui_11.UI.stretchRange.options.change = function (_event, range) {
                var value = range.get();
                console.log("📏 Stretch changed:", value);
                //Features.Media.setStretch(value / 100);
                _features_2.Features.Player.updateStretch();
                Events.mousemove();
            };
            (_e = ui_11.UI.imageSpanSelect).options || (_e.options = {});
            ui_11.UI.imageSpanSelect.options.change = function (_event, select) {
                var value = select.get();
                console.log("⏱️ Image span changed:", value);
                medialist_1.MediaList.updateInformationDisplay();
            };
            (_f = ui_11.UI.loopShortMediaCheckbox).options || (_f.options = {});
            ui_11.UI.loopShortMediaCheckbox.options.change = function (_event, _checkbox) {
                console.log("🔁 Loop short media changed:", ui_11.UI.loopShortMediaCheckbox.get());
                updateLoopShortMedia();
            };
            ui_11.UI.mediaTitle.addEventListener("click", function (event) {
                event.stopPropagation();
                document.body.classList.toggle("show-seek-bar");
            });
            ui_11.UI.mediaTime.addEventListener("click", function (event) {
                event.stopPropagation();
                document.body.classList.toggle("show-seek-bar");
            });
            ui_11.UI.seekRange.addEventListener("click", function (event) { return event.stopPropagation(); });
            ui_11.UI.seekRange.addEventListener("change", updateSeek);
            ui_11.UI.seekRange.addEventListener("input", updateSeek);
            ui_11.UI.shuffle.loadParameter(url_3.Url.params, applyParam);
            ui_11.UI.repeat.loadParameter(url_3.Url.params, applyParam);
            //UI.volumeButton.loadParameter(Url.params, applyParam);
            ui_11.UI.volumeRange.loadParameter(url_3.Url.params, applyParam).setChange(ui_11.UI.volumeRange.options.change);
            //UI.settingsButton.loadParameter(Url.params, applyParam);
            ui_11.UI.withFullscreenCheckbox.loadParameter(url_3.Url.params, applyParam).setChange(ui_11.UI.withFullscreenCheckbox.options.change);
            ui_11.UI.brightnessRange.loadParameter(url_3.Url.params, applyParam).setChange(ui_11.UI.brightnessRange.options.change);
            ui_11.UI.stretchRange.loadParameter(url_3.Url.params, applyParam).setChange(ui_11.UI.stretchRange.options.change);
            ui_11.UI.paddingCheckbox.loadParameter(url_3.Url.params, applyParam).setChange(function () { return _features_2.Features.Player.updateStretch(); });
            ui_11.UI.crossFadeSelect.loadParameter(url_3.Url.params, applyParam); //.setChange(UI.transitionCheckbox.options.change);
            ui_11.UI.imageSpanSelect.loadParameter(url_3.Url.params, applyParam).setChange(ui_11.UI.imageSpanSelect.options.change);
            ui_11.UI.loopShortMediaCheckbox.loadParameter(url_3.Url.params, applyParam);
            ui_11.UI.visualizerSelect.loadParameter(url_3.Url.params, applyParam).setChange(updateVisualizer);
            ui_11.UI.overlayStyleSelect.loadParameter(url_3.Url.params, applyParam).setChange(updateOverlayStyle);
            ui_11.UI.overlayPositionSelect.loadParameter(url_3.Url.params, applyParam).setChange(updateOverlayPosition);
            ui_11.UI.withWeatherCheckbox.loadParameter(url_3.Url.params, applyParam);
            ui_11.UI.weatherLocationSelect.loadParameter(url_3.Url.params, applyParam).setChange(updateWeatherLocation);
            ui_11.UI.withClockCheckbox.loadParameter(url_3.Url.params, applyParam);
            ui_11.UI.withDateCheckbox.loadParameter(url_3.Url.params, applyParam);
            ui_11.UI.withCalenderCheckbox.loadParameter(url_3.Url.params, applyParam);
            ui_11.UI.showFpsCheckbox.loadParameter(url_3.Url.params, applyParam).setChange(updateShowFps);
            ui_11.UI.shortcutsSelect.loadParameter(url_3.Url.params, applyParam).setChange(updateShortcuts);
            ui_11.UI.languageSelect.loadParameter(url_3.Url.params, applyParam).setChange(ui_11.UI.updateLanguage);
            document.body.addEventListener("mousemove", function (event) {
                if (config_json_8.default.log.mousemove && !mouseMoveTimer.isInTimer()) {
                    console.log("🖱️ MouseMove:", event, ui_11.UI.screenBody);
                }
                Events.mousemove();
            });
            _library_9.Library.UI.querySelectorAllWithFallback("label", ["label[for]:has(select):not(.icon-button)", "label[for]:not(.icon-button)"])
                .forEach(function (label) { return _library_9.Library.UI.showPickerOnLabel(label); });
            [
                ui_11.UI.volumeRange,
                // UI.withFullscreen,
                ui_11.UI.showFpsCheckbox,
            ].forEach(function (i) { return i.fire(); });
            document.addEventListener("visibilitychange", function () {
                console.log("\uD83D\uDC40 visibilitychange: document.hidden: ".concat(document.hidden));
                _features_2.Features.Fps.reset();
                if (!document.hidden) {
                    _features_2.Features.Player.resume();
                }
            });
            Events.updateBrightness();
            _features_2.Features.Player.updateStretch();
            updateVisualizer();
            updateOverlayStyle();
            updateOverlayPosition();
            ui_11.UI.updateLanguage();
            updateShortcuts();
            updateUrlAnchor(url_3.Url.params);
            document.addEventListener("DOMContentLoaded", function () {
                // Catch up input values that the web browser quietly restores without firing events when a previously closed page is restored
                setTimeout(function () {
                    return [
                        ui_11.UI.withFullscreenCheckbox,
                        ui_11.UI.brightnessRange,
                        ui_11.UI.stretchRange,
                        ui_11.UI.paddingCheckbox,
                        ui_11.UI.crossFadeSelect,
                        ui_11.UI.imageSpanSelect,
                        ui_11.UI.loopShortMediaCheckbox,
                        ui_11.UI.visualizerSelect,
                        ui_11.UI.overlayStyleSelect,
                        ui_11.UI.overlayPositionSelect,
                        ui_11.UI.withWeatherCheckbox,
                        ui_11.UI.weatherLocationSelect,
                        ui_11.UI.withClockCheckbox,
                        ui_11.UI.withDateCheckbox,
                        ui_11.UI.withCalenderCheckbox,
                        ui_11.UI.showFpsCheckbox,
                        ui_11.UI.shortcutsSelect,
                        ui_11.UI.languageSelect,
                    ]
                        .forEach(function (i) { return i.catchUpRestore(url_3.Url.params); });
                }, 25);
            });
            window.addEventListener("languagechange", function () {
                console.log("🌐 languagechange:", navigator.language, navigator.languages);
                var old = _library_9.Library.Locale.getLocale();
                _library_9.Library.Locale.setLocale(ui_11.UI.languageSelect.get());
                if (old !== _library_9.Library.Locale.getLocale()) {
                    ui_11.UI.updateLanguage();
                }
            });
        };
    })(Events || (exports.Events = Events = {}));
});
define("script/screenshot", ["require", "exports", "script/library/index", "script/ui"], function (require, exports, _library_10, ui_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Screenshot = void 0;
    var Screenshot;
    (function (Screenshot) {
        Screenshot.initialize = function (params) {
            var screenshot = params["screenshot"];
            switch (screenshot) {
                case "favicon":
                    Screenshot.fixCanvasSize("1024px", "1024px");
                    Screenshot.toCenterControlPanel(10);
                    _library_10.Library.UI.getElementById("div", "control-panel").style.setProperty("padding", "0px");
                    Screenshot.setDisplayNone(["#media-screen", "#background-screen", ".item.add", "#shuffle-button", "#repeat-button", "#volume-button", "#settings-button",]);
                    break;
                case "twitter-card":
                    Screenshot.fixCanvasSize("1200px", "630px");
                    Screenshot.toCenterControlPanel(3.5);
                    Screenshot.setDisplayNone(["#media-screen", "#background-screen", ".item.add",]);
                    break;
            }
        };
        Screenshot.setDisplayNone = function (querySelectors) { return querySelectors.forEach(function (selector) {
            var element = document.querySelector(selector);
            if (element) {
                element.style.setProperty("display", "none");
            }
        }); };
        Screenshot.fixCanvasSize = function (width, height) {
            ui_12.UI.screenBody.style.setProperty("background-color", "white");
            ui_12.UI.screenBody.style.setProperty("display", "flex");
            ui_12.UI.screenBody.style.setProperty("flex-direction", "column");
            ui_12.UI.screenBody.style.setProperty("align-items", "center");
            ui_12.UI.screenBody.style.setProperty("justify-content", "center");
            ui_12.UI.mediaList.style.setProperty("position", "relative");
            ui_12.UI.mediaList.style.setProperty("background-color", "black");
            ["min-width", "max-width",].forEach(function (i) { return ui_12.UI.mediaList.style.setProperty(i, width); });
            ["min-height", "max-height",].forEach(function (i) { return ui_12.UI.mediaList.style.setProperty(i, height); });
        };
        Screenshot.toCenterControlPanel = function (rate) {
            var controlPanel = _library_10.Library.UI.getElementById("div", "control-panel");
            controlPanel.style.setProperty("inset-block-end", "50%");
            controlPanel.style.setProperty("transform", "translate(-50%, 50%) scale(".concat(rate, ")"));
        };
    })(Screenshot || (exports.Screenshot = Screenshot = {}));
});
define("script/index", ["require", "exports", "script/tools/index", "script/library/index", "script/features/index", "resource/config", "resource/control", "resource/evil-commonjs.config", "resource/evil-timer.js.config", "resource/images", "resource/powered-by", "script/url", "script/ui", "script/medialist", "script/events", "script/screenshot"], function (require, exports, _tools_9, _library_11, _features_3, config_json_9, control_json_3, evil_commonjs_config_json_1, evil_timer_js_config_json_1, images_json_1, powered_by_json_2, url_4, ui_13, medialist_2, events_1, screenshot_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    config_json_9 = __importDefault(config_json_9);
    control_json_3 = __importDefault(control_json_3);
    evil_commonjs_config_json_1 = __importDefault(evil_commonjs_config_json_1);
    evil_timer_js_config_json_1 = __importDefault(evil_timer_js_config_json_1);
    images_json_1 = __importDefault(images_json_1);
    powered_by_json_2 = __importDefault(powered_by_json_2);
    url_4.Url.initialize();
    ui_13.UI.initialize();
    events_1.Events.initialize();
    _library_11.Library.Shortcuts.initialize();
    medialist_2.MediaList.initialize();
    _features_3.Features.Overlay.initialize(url_4.Url.params);
    screenshot_1.Screenshot.initialize(url_4.Url.params);
    console.log("\uD83D\uDCE6 BUILD AT: ".concat(build.at, " ( ").concat(_tools_9.Tools.Timespan.toDisplayString(new Date().getTime() - build.tick, 1), " ").concat(_library_11.Library.Locale.map("ago"), " )"));
    var consoleInterface = globalThis;
    var Resource = {
        config: config_json_9.default,
        control: control_json_3.default,
        evilCommonJsConfig: evil_commonjs_config_json_1.default,
        evilTimerJsConfig: evil_timer_js_config_json_1.default,
        images: images_json_1.default,
        locale: _library_11.Library.Locale.master,
        poweredBy: powered_by_json_2.default
    };
    var modules = {
        Tools: _tools_9.Tools,
        Library: _library_11.Library,
        Features: _features_3.Features,
        Url: url_4.Url,
        UI: ui_13.UI,
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