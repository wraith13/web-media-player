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
            "cross-fade-label": "Cross Fade:",
            "cross-fade-0": "None",
            "colorspace-label": "Color Space:",
            "coloring-label": "Coloring:",
            "pattern-label": "Pattern:",
            "lines": "Lines",
            "spots": "Spots",
            "both": "Both",
            "image-span-label": "Image Display Time:",
            "loop-short-media-label": "Loop Short Media:",
            "visualizer-label": "Visualizer:",
            "visualizer-simple": "Simple",
            "visualizer-plane-frequency": "Plane Frequency",
            "visualizer-plane-waveform": "Plane Waveform",
            "visualizer-arc-frequency": "Arc Frequency",
            "visualizer-arc-waveform": "Arc Waveform",
            "with-fullscreen-label": "FullScreen:",
            "show-fps-label": "Show FPS:",
            "clock-label": "Clock:",
            "hide": "Hide",
            "blend": "Blend",
            "white": "White",
            "black": "Black",
            "system": "System",
            "alternate": "Alternate",
            "rainbow": "Rainbow",
            "brightness-label": "Brightness:",
            "clock-position-label": "Clock Position:",
            "center": "Center",
            "top-right": "Top Right",
            "bottom-right": "Bottom Right",
            "bottom-left": "Bottom Left",
            "top-left": "Top Left",
            "stretch-label": "Stretch:",
            "padding-label": "Padding:",
            "language-label": "Language:",
            "url-label": "Link to this setting",
            "timeUnitMs": "ms",
            "timeUnitS": "s",
            "timeUnitM": "m",
            "timeUnitH": "h",
            "timeUnitD": "d",
            "ago": "ago",
            "Hide UI": "Hide UI",
            "Play / Pause": "Play / Pause",
            "FullScreen": "FullScreen",
            "Show FPS": "Show FPS",
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
            "cross-fade-label": "クロスフェード:",
            "cross-fade-0": "なし",
            "colorspace-label": "色空間:",
            "coloring-label": "カラーリング:",
            "pattern-label": "パターン:",
            "lines": "ライン",
            "spots": "スポット",
            "both": "両方",
            "image-span-label": "画像表示時間:",
            "loop-short-media-label": "短いメディアをループ再生:",
            "visualizer-label": "ビジュアライザー:",
            "visualizer-simple": "シンプル",
            "visualizer-plane-frequency": "平面周波数",
            "visualizer-plane-waveform": "平面波形",
            "visualizer-arc-frequency": "アーク周波数",
            "visualizer-arc-waveform": "アーク波形",
            "with-fullscreen-label": "フルスクリーン:",
            "show-fps-label": "FPS を表示:",
            "clock-label": "時計:",
            "hide": "非表示",
            "blend": "ブレンド",
            "white": "ホワイト",
            "black": "ブラック",
            "system": "システム",
            "alternate": "交互",
            "rainbow": "レインボー",
            "clock-position-label": "時計位置:",
            "center": "中央",
            "top-right": "右上",
            "bottom-right": "右下",
            "bottom-left": "左下",
            "top-left": "左上",
            "brightness-label": "明るさ:",
            "stretch-label": "ストレッチ:",
            "padding-label": "パディング:",
            "language-label": "言語:",
            "url-label": "この設定のリンク",
            "timeUnitMs": "ミリ秒",
            "timeUnitS": "秒",
            "timeUnitM": "分",
            "timeUnitH": "時間",
            "timeUnitD": "日",
            "ago": "前",
            "Hide UI": "UI 非表示",
            "Play / Pause": "再生 / 一時停止",
            "FullScreen": "フルスクリーン",
            "Show FPS": "FPS 表示",
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
define("resource/shortcuts", [], {
    "YouTube": [
        {
            "description": "Hide UI",
            "shortcuts": [
                {
                    "command": "toggleHideUI",
                    "type": "onKeyDown",
                    "keys": [
                        "U",
                        "I"
                    ]
                }
            ]
        },
        {
            "description": "Play / Pause",
            "shortcuts": [
                {
                    "command": "toggleAnimation",
                    "type": "onKeyUp",
                    "keys": [
                        " "
                    ]
                }
            ]
        },
        {
            "description": "Switch Pattern",
            "shortcuts": [
                {
                    "command": "switchPatternForward",
                    "type": "onKeyDown",
                    "keys": [
                        "P"
                    ]
                },
                {
                    "command": "switchPatternBackward",
                    "type": "onKeyDown",
                    "keys": [
                        "Shift",
                        "P"
                    ]
                }
            ]
        },
        {
            "description": "Switch Coloring",
            "shortcuts": [
                {
                    "command": "switchColoringForward",
                    "type": "onKeyDown",
                    "keys": [
                        "C"
                    ]
                },
                {
                    "command": "switchColoringBackward",
                    "type": "onKeyDown",
                    "keys": [
                        "Shift",
                        "C"
                    ]
                }
            ]
        },
        {
            "description": "Scaling Canvas Size",
            "shortcuts": [
                {
                    "command": "increaseCanvasSize",
                    "type": "onKeyDown",
                    "keys": [
                        "Shift",
                        "ArrowUp"
                    ]
                },
                {
                    "command": "decreaseCanvasSize",
                    "type": "onKeyDown",
                    "keys": [
                        "Shift",
                        "ArrowDown"
                    ]
                }
            ]
        },
        {
            "description": "Increase / Decrease Frame Delay",
            "shortcuts": [
                {
                    "command": "increaseFrameDelay",
                    "type": "onKeyDown",
                    "keys": [
                        "Shift",
                        "ArrowLeft"
                    ]
                },
                {
                    "command": "decreaseFrameDelay",
                    "type": "onKeyDown",
                    "keys": [
                        "Shift",
                        "ArrowRight"
                    ]
                }
            ]
        },
        {
            "description": "Increase / Decrease Layer",
            "shortcuts": [
                {
                    "command": "increaseLayer",
                    "type": "onKeyDown",
                    "keys": [
                        "ArrowUp"
                    ]
                },
                {
                    "command": "decreaseLayer",
                    "type": "onKeyDown",
                    "keys": [
                        "ArrowDown"
                    ]
                }
            ]
        },
        {
            "description": "Speed Down / Up",
            "shortcuts": [
                {
                    "command": "speedDown",
                    "type": "onKeyDown",
                    "keys": [
                        "ArrowLeft"
                    ]
                },
                {
                    "command": "speedUp",
                    "type": "onKeyDown",
                    "keys": [
                        "ArrowRight"
                    ]
                }
            ]
        },
        {
            "description": "FullScreen",
            "shortcuts": [
                {
                    "command": "toggleFullScreen",
                    "type": "onKeyUp",
                    "keys": [
                        "F"
                    ]
                }
            ]
        },
        {
            "description": "Show FPS",
            "shortcuts": [
                {
                    "command": "toggleShowFps",
                    "type": "onKeyDown",
                    "keys": [
                        "S"
                    ]
                }
            ]
        },
        {
            "description": "Switch Clock",
            "shortcuts": [
                {
                    "command": "switchClockForward",
                    "type": "onKeyDown",
                    "keys": [
                        "T"
                    ]
                },
                {
                    "command": "switchClockBackward",
                    "type": "onKeyDown",
                    "keys": [
                        "Shift",
                        "T"
                    ]
                }
            ]
        }
    ]
});
define("script/library/shortcuts", ["require", "exports", "resource/shortcuts"], function (require, exports, shortcuts_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Shortcuts = void 0;
    shortcuts_json_1 = __importDefault(shortcuts_json_1);
    var Shortcuts;
    (function (Shortcuts) {
        var style = "YouTube";
        var currentCommandMap = null;
        var keyDisplayNames = {
            "ArrowUp": "↑",
            "ArrowDown": "↓",
            "ArrowLeft": "←",
            "ArrowRight": "→",
            " ": "Space",
            "Control": "Ctrl",
        };
        var getDisplayKeyName = function (key) { var _a; return (_a = keyDisplayNames[key]) !== null && _a !== void 0 ? _a : key; };
        Shortcuts.getDisplayList = function () {
            return shortcuts_json_1.default[style].map(function (i) {
                return ({
                    keyss: i.shortcuts.map(function (j) { return j.keys.map(function (key) { return getDisplayKeyName(key); }); }),
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
                    var commandKeys = shortcuts_json_1.default[style].reduce(function (a, b) { return a.concat(b.shortcuts); }, []).filter(function (shortcut) {
                        return shortcut.keys.length === shortcutKeys_1.length &&
                            shortcut.keys.every(function (key) { return shortcutKeys_1.includes(key); }) &&
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
    "volume": {
        "id": "volume",
        "min": 0,
        "max": 100,
        "step": 1,
        "default": 100
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
        "id": "visualizer",
        "enum": [
            "simple",
            "plane-frequency",
            "plane-waveform",
            "arc-frequency",
            "arc-waveform"
        ],
        "default": "arc-waveform"
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
    "clockPosition": {
        "id": "clock-position",
        "enum": [
            "center",
            "top-right",
            "bottom-right",
            "bottom-left",
            "top-left"
        ],
        "default": "center"
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
        UI.shuffleButton = new _library_2.Library.Control.Button({ id: "shuffle-button", });
        UI.repeatButton = new _library_2.Library.Control.Button({ id: "repeat-button", });
        UI.volumeButton = new _library_2.Library.Control.Button({ id: "volume-button", });
        UI.volumeRange = new _library_2.Library.Control.Range(control_json_1.default.volume);
        UI.settingButton = new _library_2.Library.Control.Button({ id: "setting-button", });
        UI.mediaList = _library_2.Library.UI.getElementById("div", "media-list");
        UI.isScrolledToMediaListBottom = function () {
            return UI.mediaList.scrollHeight <= UI.mediaList.scrollTop + (UI.mediaList.clientHeight * 1) + UI.addMediaButtonHeight;
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
        UI.clockSelect = new _library_2.Library.Control.Select(control_json_1.default.clock, { makeLabel: function (i) { return _library_2.Library.Locale.map(i); }, });
        UI.clockPositionSelect = new _library_2.Library.Control.Select(control_json_1.default.clockPosition, { makeLabel: function (i) { return _library_2.Library.Locale.map(i); }, });
        UI.showFpsCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.showFps);
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
define("script/features/clock", ["require", "exports", "script/library/index", "script/ui", "resource/config"], function (require, exports, library_1, ui_2, config_json_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Clock = void 0;
    config_json_2 = __importDefault(config_json_2);
    var phi = (1 + Math.sqrt(5)) / 2;
    var Clock;
    (function (Clock) {
        Clock.title = undefined;
        Clock.subtitle = undefined;
        Clock.makeDate = function (local) {
            return new Date().toLocaleDateString(local, config_json_2.default.clock.dateFormat);
        };
        Clock.makeTime = function (local) {
            return new Date().toLocaleTimeString(local, config_json_2.default.clock.timeFormat);
        };
        Clock.updateText = function (local) {
            library_1.Library.UI.setTextContent(ui_2.UI.date, Clock.subtitle !== null && Clock.subtitle !== void 0 ? Clock.subtitle : Clock.makeDate(local));
            library_1.Library.UI.setTextContent(ui_2.UI.time, Clock.title !== null && Clock.title !== void 0 ? Clock.title : Clock.makeTime(local));
        };
        Clock.setColor = function (color) {
            library_1.Library.UI.setStyle(ui_2.UI.date, "color", color);
            library_1.Library.UI.setStyle(ui_2.UI.time, "color", color);
        };
        Clock.cloclLocale = undefined;
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
                        Clock.setColor("hsl(".concat((now * 360) / (24000 * phi), ", 100%, 50%)"));
                        break;
                    default:
                        Clock.setColor(undefined);
                        break;
                }
            }
        };
        Clock.initialize = function (params) {
            Clock.title = params["title"];
            Clock.subtitle = params["subtitle"];
            ui_2.UI.time.classList.toggle("text", undefined !== Clock.title);
        };
    })(Clock || (exports.Clock = Clock = {}));
});
define("script/features/analyser", ["require", "exports", "resource/config"], function (require, exports, config_json_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Analyser = void 0;
    config_json_3 = __importDefault(config_json_3);
    var Analyser;
    (function (Analyser) {
        var _this = this;
        var _a;
        Analyser.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        Analyser.fftSize = (_a = config_json_3.default.analyser.fftSize) !== null && _a !== void 0 ? _a : 1024;
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
        var Entry = /** @class */ (function () {
            function Entry(mediaElement, gainOnly) {
                this.mediaElement = mediaElement;
                this.analyserNode = null;
                this.isValidFrequencyData = false;
                this.isValidTimeDomainData = false;
                this.frequencyDataArray = null;
                this.timeDomainDataArray = null;
                if (gainOnly) {
                    this.gainNode = Analyser.audioContext.createGain();
                    this.mediaElementAudioSourceNode = Analyser.audioContext.createMediaElementSource(mediaElement);
                    this.mediaElementAudioSourceNode.connect(this.gainNode);
                    this.gainNode.connect(Analyser.audioContext.destination);
                }
                else {
                    this.analyserNode = Analyser.audioContext.createAnalyser();
                    this.analyserNode.fftSize = Analyser.fftSize;
                    this.gainNode = Analyser.audioContext.createGain();
                    this.mediaElementAudioSourceNode = Analyser.audioContext.createMediaElementSource(mediaElement);
                    this.mediaElementAudioSourceNode.connect(this.analyserNode);
                    this.mediaElementAudioSourceNode.connect(this.gainNode);
                    this.gainNode.connect(Analyser.audioContext.destination);
                    //this.analyserNode.connect(audioContext.destination);
                    //this.frequencyDataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
                }
            }
            Entry.prototype.destroy = function () {
                var _a;
                this.mediaElementAudioSourceNode.disconnect();
                (_a = this.analyserNode) === null || _a === void 0 ? void 0 : _a.disconnect();
            };
            Entry.prototype.step = function () {
                this.isValidFrequencyData = false;
                this.isValidTimeDomainData = false;
            };
            Entry.prototype.getByteFrequencyData = function () {
                if (this.analyserNode && !this.isValidFrequencyData) {
                    if (!this.frequencyDataArray) {
                        this.frequencyDataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
                    }
                    this.analyserNode.getByteFrequencyData(this.frequencyDataArray);
                    this.isValidFrequencyData = true;
                }
                return this.frequencyDataArray;
            };
            Entry.prototype.getByteTimeDomainData = function () {
                if (this.analyserNode && !this.isValidTimeDomainData) {
                    if (!this.timeDomainDataArray) {
                        this.timeDomainDataArray = new Uint8Array(this.analyserNode.fftSize);
                    }
                    this.analyserNode.getByteTimeDomainData(this.timeDomainDataArray);
                    this.isValidTimeDomainData = true;
                }
                return this.timeDomainDataArray;
            };
            return Entry;
        }());
        Analyser.Entry = Entry;
    })(Analyser || (exports.Analyser = Analyser = {}));
});
define("script/features/media", ["require", "exports", "script/library/index", "script/tools/index", "resource/config"], function (require, exports, _library_3, tools_1, Config) {
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
                    tools_1.Tools.Timer.sleep(1000).then(function () {
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
                    tools_1.Tools.Timer.sleep(1000).then(function () {
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
define("script/features/visualizer", ["require", "exports", "script/library/index", "script/ui", "resource/config"], function (require, exports, _library_4, ui_3, config_json_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Visualizer = void 0;
    config_json_4 = __importDefault(config_json_4);
    var circleRadians = 2 * Math.PI;
    var arcConfig = config_json_4.default.visualizer.arc[config_json_4.default.visualizer.arcType];
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
            return ui_3.UI.mediaScreen.classList.contains("simple");
        };
        Visualizer.isPlaneFrequencyMode = function () {
            return ui_3.UI.mediaScreen.classList.contains("plane-frequency");
        };
        Visualizer.isPlaneWaveformMode = function () {
            return ui_3.UI.mediaScreen.classList.contains("plane-waveform");
        };
        Visualizer.isArcFrequencyMode = function () {
            return ui_3.UI.mediaScreen.classList.contains("arc-frequency");
        };
        Visualizer.isArcWaveformMode = function () {
            return ui_3.UI.mediaScreen.classList.contains("arc-waveform");
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
        Visualizer.makeSureCanvas = function (visualDom) {
            var result = visualDom.querySelector(".visual-canvas");
            if (!result) {
                result = _library_4.Library.UI.createElement({ tag: "canvas", className: "visual-canvas" });
                visualDom.appendChild(result);
            }
            return result;
        };
        Visualizer.fitCanvas = function (visualDom, canvas) {
            var _a = Visualizer.getElementSize(visualDom), width = _a.width, height = _a.height;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
        };
        Visualizer.drawPlaneFrequency = function (context, rect, analyser) {
            var _a;
            var frequencyDataArray = (_a = analyser.getByteFrequencyData()) !== null && _a !== void 0 ? _a : null;
            if (context && frequencyDataArray) {
                var maxIndex = frequencyDataArray.length * config_json_4.default.visualizer.frequencyDataLengthRate;
                var zeroLevel = 1;
                if (rect.height <= rect.width) {
                    var barWidth = rect.width / maxIndex;
                    for (var i = 0; i < maxIndex; ++i) {
                        var value = frequencyDataArray[i] / 255.0;
                        var hue = (i / maxIndex) * config_json_4.default.visualizer.maxHue;
                        var barHeight = zeroLevel + (value * (rect.height - zeroLevel));
                        var point = Visualizer.makePoint(i * barWidth, (rect.height - barHeight) / 2);
                        context.fill("hsl(".concat(hue, ", 100%, 50%)"), Visualizer.makeRect(Visualizer.addPoints(rect, point), Visualizer.makeSize(barWidth, barHeight)));
                    }
                }
                else {
                    var barHeight = rect.height / maxIndex;
                    for (var i = 0; i < maxIndex; ++i) {
                        var value = frequencyDataArray[i] / 255.0;
                        var hue = (i / maxIndex) * config_json_4.default.visualizer.maxHue;
                        var barWidth = zeroLevel + (value * (rect.width - zeroLevel));
                        var point = Visualizer.makePoint((rect.width - barWidth) / 2, rect.height - ((i + 1) * barHeight));
                        context.fill("hsl(".concat(hue, ", 100%, 50%)"), Visualizer.makeRect(Visualizer.addPoints(rect, point), Visualizer.makeSize(barWidth, barHeight)));
                    }
                }
            }
        };
        Visualizer.drawPlaneWaveform = function (context, rect, analyser) {
            var _a;
            var timeDomainDataArray = (_a = analyser.getByteTimeDomainData()) !== null && _a !== void 0 ? _a : null;
            if (context && timeDomainDataArray) {
                var maxIndex = timeDomainDataArray.length;
                context.beginPath(config_json_4.default.visualizer.waveform);
                if (rect.height <= rect.width) {
                    var sliceWidth = rect.width / maxIndex;
                    context.moveTo(Visualizer.offsetPointY(rect, rect.height / 2));
                    for (var i = 0; i < maxIndex; ++i) {
                        var value = timeDomainDataArray[i] / 255.0;
                        var x = i * sliceWidth;
                        var y = value * rect.height;
                        context.lineTo(Visualizer.addPoints(rect, { x: x, y: y }));
                    }
                    context.lineTo(Visualizer.addPoints(rect, Visualizer.makePoint(rect.width, rect.height / 2)));
                }
                else {
                    var sliceHeight = rect.height / maxIndex;
                    context.moveTo(Visualizer.offsetPointX(rect, rect.width / 2));
                    for (var i = 0; i < maxIndex; ++i) {
                        var value = timeDomainDataArray[i] / 255.0;
                        var x = value * rect.width;
                        var y = i * sliceHeight;
                        context.lineTo(Visualizer.addPoints(rect, { x: x, y: y }));
                    }
                    context.lineTo(Visualizer.addPoints(rect, Visualizer.makePoint(rect.width / 2, rect.height)));
                }
                context.stroke();
            }
        };
        Visualizer.drawArcFrequency = function (context, rect, analyser) {
            var _a;
            var frequencyDataArray = (_a = analyser.getByteFrequencyData()) !== null && _a !== void 0 ? _a : null;
            if (context && frequencyDataArray) {
                var startAngle = circleRadians * (arcConfig.startAngleRate + ((1 - arcConfig.angleRate) / 2));
                var radius = (rect.width + rect.height) * arcConfig.radiusRate;
                var center = Visualizer.getCenterPoint(rect);
                var maxIndex = frequencyDataArray.length * config_json_4.default.visualizer.frequencyDataLengthRate;
                var lineWidth = (circleRadians * radius) / maxIndex * 0.8;
                var zeroLevel = 1;
                for (var i = 0; i < maxIndex; i++) {
                    var hue = (i / maxIndex) * config_json_4.default.visualizer.maxHue;
                    var angle = ((circleRadians * arcConfig.angleRate * i) / maxIndex) + startAngle;
                    var value = frequencyDataArray[i] / 255.0;
                    var barLength = radius * value + zeroLevel;
                    var strokeStyle = "hsl(".concat(hue, ", 100%, 50%)");
                    context.beginPath({ lineWidth: lineWidth, strokeStyle: strokeStyle, });
                    context.moveTo(Visualizer.getPointAtAngle(center, angle, radius - (barLength / 2)));
                    context.lineTo(Visualizer.getPointAtAngle(center, angle, radius + (barLength / 2)));
                    context.stroke();
                }
            }
        };
        Visualizer.drawArcWaveform = function (context, rect, analyser) {
            var _a;
            var timeDomainDataArray = (_a = analyser.getByteTimeDomainData()) !== null && _a !== void 0 ? _a : null;
            if (context && timeDomainDataArray) {
                var startAngle = circleRadians * (arcConfig.startAngleRate + ((1 - arcConfig.angleRate) / 2));
                var radius = (rect.width + rect.height) * arcConfig.radiusRate;
                var center = Visualizer.getCenterPoint(rect);
                var maxIndex = timeDomainDataArray.length;
                context.beginPath(config_json_4.default.visualizer.waveform);
                context.moveTo(Visualizer.getPointAtAngle(center, startAngle, radius));
                for (var i = 0; i < maxIndex; i++) {
                    var value = timeDomainDataArray[i] / 255.0;
                    var barLength = (radius * (value - 0.5)) * 2.0;
                    var angle = ((circleRadians * arcConfig.angleRate * i) / maxIndex) + startAngle;
                    context.lineTo(Visualizer.getPointAtAngle(center, angle, radius + barLength));
                }
                context.lineTo(Visualizer.getPointAtAngle(center, startAngle + circleRadians * arcConfig.angleRate, radius));
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
                var frequencyDataArray = (_a = analyser === null || analyser === void 0 ? void 0 : analyser.getByteFrequencyData()) !== null && _a !== void 0 ? _a : null;
                Visualizer.makeSureProgressCircle(visualDom).style.setProperty("--progress", "".concat((playerDom.currentTime / playerDom.duration) * 360, "deg"));
                Visualizer.makeSureProgressCircle(visualDom).style.setProperty("--volume", "".concat(Visualizer.getVolume(frequencyDataArray)));
            }
            if (Visualizer.isPlaneFrequencyMode()) {
                var canvas = Visualizer.makeSureCanvas(visualDom);
                var context = new CanvasContext2D(canvas);
                if (context && analyser) {
                    Visualizer.fitCanvas(visualDom, canvas);
                    context.clear();
                    Visualizer.drawPlaneFrequency(context, Visualizer.getElementRect(visualDom), analyser);
                }
            }
            if (Visualizer.isPlaneWaveformMode()) {
                var canvas = Visualizer.makeSureCanvas(visualDom);
                var context = new CanvasContext2D(canvas);
                if (context && analyser) {
                    Visualizer.fitCanvas(visualDom, canvas);
                    context.clear();
                    Visualizer.drawPlaneWaveform(context, Visualizer.getElementRect(visualDom), analyser);
                }
            }
            if (Visualizer.isArcFrequencyMode()) {
                var canvas = Visualizer.makeSureCanvas(visualDom);
                var context = new CanvasContext2D(canvas);
                if (context && analyser) {
                    Visualizer.fitCanvas(visualDom, canvas);
                    context.clear();
                    Visualizer.drawArcFrequency(context, Visualizer.getElementRect(visualDom), analyser);
                }
            }
            if (Visualizer.isArcWaveformMode()) {
                var canvas = Visualizer.makeSureCanvas(visualDom);
                var context = new CanvasContext2D(canvas);
                if (context && analyser) {
                    Visualizer.fitCanvas(visualDom, canvas);
                    context.clear();
                    Visualizer.drawArcWaveform(context, Visualizer.getElementRect(visualDom), analyser);
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
define("script/features/elementpool", ["require", "exports", "script/library/index", "script/ui", "script/features/analyser"], function (require, exports, _library_5, ui_4, analyser_1) {
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
                while (ui_4.UI.elementPool.getElementsByTagName("img").length < 4) {
                    var imgElement = _library_5.Library.UI.createElement({
                        tag: "img",
                        className: "player",
                        attributes: {
                            src: data.image.url,
                            alt: data.image.name,
                        },
                    });
                    ui_4.UI.elementPool.appendChild(imgElement);
                }
            }
            if (data.audio) {
                var url_1 = data.audio.url;
                var count = ui_4.UI.elementPool.getElementsByTagName("audio").length;
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
                        ui_4.UI.elementPool.appendChild(audioElement);
                        audioElement.volume = 0;
                        audioElement.muted = false;
                        return audioElement.play().then(function () { audioElement.pause(); audioElement.currentTime = 0; });
                    });
                }
            }
            if (data.video) {
                var url_2 = data.video.url;
                var count = ui_4.UI.elementPool.getElementsByTagName("video").length;
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
                        ui_4.UI.elementPool.appendChild(videoElement);
                        videoElement.volume = 0;
                        videoElement.muted = false;
                        return videoElement.play().then(function () { videoElement.pause(); videoElement.currentTime = 0; });
                    });
                }
            }
            return result.then(function () { return undefined; });
        };
        ElementPool.makeSureAnalyser = function (element, gainOnly) { return __awaiter(_this, void 0, void 0, function () {
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
                            result = new analyser_1.Analyser.Entry(element, gainOnly);
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
                    var imgElement = ui_4.UI.elementPool.getElementsByTagName("img")[0];
                    if (imgElement) {
                        imgElement.src = media.url;
                        imgElement.alt = media.name;
                        return imgElement;
                    }
                    break;
                case "audio":
                    var audioElement = ui_4.UI.elementPool.getElementsByTagName("audio")[0];
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
                    var videoElement = ui_4.UI.elementPool.getElementsByTagName("video")[0];
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
                ui_4.UI.elementPool.appendChild(element);
            }
        };
    })(ElementPool || (exports.ElementPool = ElementPool = {}));
});
define("script/features/history", ["require", "exports", "script/features/media", "script/tools/index", "script/ui", "resource/config"], function (require, exports, media_1, _tools_3, ui_5, Config) {
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
        History.play = function () {
            if (0 <= media_1.Media.mediaList.length) {
                if (0 <= currentIndex && currentIndex < history.length) {
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
                    if (ui_5.UI.shuffleButton.dom.classList.contains("on")) {
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
                    ui_5.UI.repeatButton.dom.classList.contains("on")) {
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
                        _tools_3.Tools.Random.makeInteger(media_1.Media.mediaList.length) :
                        (0 === history[_tools_3.Tools.Random.makeInteger(history.length)] ? 1 : 0);
                default:
                    var playedList_1 = history.slice(Math.floor(currentIndex / media_1.Media.mediaList.length) * media_1.Media.mediaList.length);
                    var unplayedList = media_1.Media.mediaList.map(function (_, i) { return i; }).filter(function (i) { return !playedList_1.includes(i); });
                    var forbidens_1 = _tools_3.Tools.Array.backSlice(history, Math.ceil(media_1.Media.mediaList.length * Config.history.shuffleForbiddenRate));
                    var canonicals = unplayedList.filter(function (i) { return !forbidens_1.includes(i); });
                    return canonicals[_tools_3.Tools.Random.makeInteger(canonicals.length)];
            }
        };
    })(History || (exports.History = History = {}));
});
define("script/features/track", ["require", "exports", "script/tools/index", "script/library/index", "script/ui", "script/features/elementpool", "script/features/analyser", "script/features/visualizer", "resource/config"], function (require, exports, _tools_4, _library_6, ui_6, elementpool_1, analyser_2, visualizer_1, config_json_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Track = exports.hasValidGainNode = void 0;
    config_json_5 = __importDefault(config_json_5);
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
                        elementpool_1.ElementPool.makeSureAnalyser(this.playerElement, "gainOnly")
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
            this.diffSeek(config_json_5.default.player.fastFowardSpan);
        };
        Track.prototype.rewind = function () {
            this.diffSeek(-config_json_5.default.player.rewindSpan);
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
            if (this.playerElement instanceof HTMLMediaElement && !this.isLoop()) {
                ui_6.UI.seekRange.valueAsNumber = (this.playerElement.currentTime * 1000) / this.getDuration();
            }
            else {
                ui_6.UI.seekRange.valueAsNumber = this.getElapsedTime() / this.getDuration();
            }
        };
        Track.prototype.isLoop = function () {
            var loopShortMedia = ui_6.UI.loopShortMediaCheckbox.get();
            var imageSpan = this.getImageDuration();
            return loopShortMedia && null !== this.media.duration && this.media.duration <= imageSpan;
        };
        Track.prototype.getImageDuration = function () {
            return parseFloat(ui_6.UI.imageSpanSelect.get());
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
                    var StretchRate = ui_6.UI.stretchRange.get() / 100;
                    var isFit = this.appleyStretch(this.playerElement, StretchRate);
                    if (ui_6.UI.paddingCheckbox.get()) {
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
            if (_tools_4.Tools.Environment.isSafari()) {
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
define("script/features/player", ["require", "exports", "script/tools/index", "script/library/index", "script/features/fps", "script/features/clock", "script/ui", "script/features/elementpool", "script/features/media", "script/features/history", "script/features/track", "resource/config"], function (require, exports, _tools_5, _library_7, fps_1, clock_1, ui_7, elementpool_2, media_2, history_1, track_1, Config) {
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
                return parseFloat(ui_7.UI.crossFadeSelect.get());
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
                if (fullscreen !== null && fullscreen !== void 0 ? fullscreen : ui_7.UI.withFullscreenCheckbox.get()) {
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
        Player.play = function () { return __awaiter(_this, void 0, void 0, function () {
            var media;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (ui_7.UI.isScrolledToMediaListBottom()) {
                            ui_7.UI.mediaList.scrollTop = ui_7.UI.mediaList.scrollHeight - ((ui_7.UI.mediaList.clientHeight * 1.5) + ui_7.UI.addMediaButtonHeight);
                            document.body.classList.toggle("show-paused-media", false);
                        }
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
                        media = history_1.History.play();
                        if (media) {
                            Player.playMedia(media, "resume");
                        }
                        else if (!ui_7.UI.repeatButton.dom.classList.contains("on")) {
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
            ui_7.UI.clockDisplay.style.removeProperty("opacity");
            Player.updateFullscreenState(false);
            navigator.mediaSession.playbackState = "paused";
            document.body.classList.toggle("list", true);
            document.body.classList.toggle("play", false);
            currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.pause();
            fadeoutingTrack === null || fadeoutingTrack === void 0 ? void 0 : fadeoutingTrack.pause();
            CrossFade.pause();
            ui_7.UI.screenBody.classList.toggle("paused", 0 < media_2.Media.mediaList.length && null !== currentTrack);
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
                    var currentVolume = ui_7.UI.volumeRange.get() / 100;
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
            if (ui_7.UI.showFpsCheckbox.get()) {
                _library_7.Library.UI.setTextContent(ui_7.UI.fpsDisplay, fps_1.Fps.getText());
            }
        };
        var lastTimeVolume = 1.0;
        Player.isNextTiming = function () {
            if (null !== currentTrack) {
                if (currentTrack.getRemainingTime() <= 0) {
                    return true;
                }
                if (0 < parseFloat(ui_7.UI.crossFadeSelect.get())) {
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
                            ui_7.UI.mediaLength.click();
                        }
                        currentVolume = ui_7.UI.volumeRange.get() / 100;
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
            return "".concat(_tools_5.Tools.Timespan.toMediaTimeString(track.getElapsedTime()), " / ").concat(_tools_5.Tools.Timespan.toMediaTimeString(track.getDuration()));
        };
        Player.step = function () {
            if (null !== fadeoutingTrack) {
                fadeoutingTrack.step();
            }
            if (null !== currentTrack) {
                _library_7.Library.UI.setTextContent(ui_7.UI.mediaTime, Player.makeTimeText(currentTrack));
                currentTrack.step();
                currentTrack.setPositionState();
            }
        };
        Player.loop = function (now) {
            var _a, _b;
            if (Player.isPlaying()) {
                clock_1.Clock.update(now);
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
                currentTrack.updateStretch();
                _library_7.Library.UI.setTextContent(ui_7.UI.mediaIndex, Player.makeIndexText(currentTrack));
                _library_7.Library.UI.setTextContent(ui_7.UI.mediaTitle, Player.makeTitleText(currentTrack));
                var currentVolume = ui_7.UI.volumeRange.get() / 100;
                if (0 < parseFloat(ui_7.UI.crossFadeSelect.get()) && fadeoutingTrack) {
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
                    ui_7.UI.mediaScreen.insertBefore(currentTrack.visualElement, ui_7.UI.clockDisplay);
                }
            }
        };
        Player.removeTrack = function (track) {
            if (track) {
                track.pause();
                if (track.visualElement) {
                    ui_7.UI.mediaScreen.removeChild(track.visualElement);
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
            ui_7.UI.screenBody.classList.toggle("paused", false);
            _library_7.Library.UI.setTextContent(ui_7.UI.mediaIndex, "");
            _library_7.Library.UI.setTextContent(ui_7.UI.mediaTitle, "");
            _library_7.Library.UI.setTextContent(ui_7.UI.mediaTime, "");
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
define("script/features/index", ["require", "exports", "script/features/fps", "script/features/clock", "script/features/analyser", "script/features/visualizer", "script/features/player"], function (require, exports, ImportedFps, ImportedClock, ImportedAnalyser, ImportedVisualizer, ImportedPlayer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Features = void 0;
    ImportedFps = __importStar(ImportedFps);
    ImportedClock = __importStar(ImportedClock);
    ImportedAnalyser = __importStar(ImportedAnalyser);
    ImportedVisualizer = __importStar(ImportedVisualizer);
    ImportedPlayer = __importStar(ImportedPlayer);
    var Features;
    (function (Features) {
        Features.Fps = ImportedFps.Fps;
        Features.Clock = ImportedClock.Clock;
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
define("script/url", ["require", "exports", "resource/config"], function (require, exports, config_json_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Url = void 0;
    config_json_6 = __importDefault(config_json_6);
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
            var url = new URL(config_json_6.default.canonicalUrl || window.location.href);
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
define("script/progress", ["require", "exports", "script/ui"], function (require, exports, ui_8) {
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
            ui_8.UI.progressCircle.style.setProperty("--progress", "".concat((completedTasks / totalTasks) * 360, "deg"));
            if (totalTasks <= completedTasks) {
                totalTasks = 0;
                completedTasks = 0;
            }
        };
    })(Progress || (exports.Progress = Progress = {}));
});
define("script/medialist", ["require", "exports", "script/tools/index", "script/library/index", "script/features/index", "script/features/media", "script/ui", "script/progress"], function (require, exports, _tools_6, _library_8, _features_1, media_3, ui_9, progress_1) {
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
                        _b = (_a = ui_9.UI.mediaList).insertBefore;
                        return [4 /*yield*/, MediaList.makeMediaEntryDom(entry)];
                    case 2:
                        _b.apply(_a, [_c.sent(), ui_9.UI.addMediaButton.dom.parentElement]);
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
                            { tag: "span", className: "size", text: _tools_6.Tools.Byte.toDisplayString(entry.size, 3), },
                            { tag: "span", className: "duration", text: null !== entry.duration ? _tools_6.Tools.Timespan.toMediaTimeString(entry.duration) : "", }
                        ];
                        return [4 /*yield*/, MediaList.removeButton(entry)];
                    case 2:
                        item = _b.apply(_a, [(_d.children = _c.concat([
                                _e.sent()
                            ]),
                                _d)]);
                        item.addEventListener("dragstart", function (event) {
                            var _a;
                            ui_9.UI.mediaList.classList.add("dragging");
                            item.classList.add("dragging");
                            (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", String(ix));
                        });
                        item.addEventListener("dragend", function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        ui_9.UI.mediaList.classList.remove("dragging");
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
                        return [2 /*return*/, item];
                }
            });
        }); };
        MediaList.updateMediaListDisplay = function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, entry, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        Array.from(ui_9.UI.mediaList.children).forEach(function (child) {
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
                        _c = (_b = ui_9.UI.mediaList).insertBefore;
                        return [4 /*yield*/, MediaList.makeMediaEntryDom(entry)];
                    case 2:
                        _c.apply(_b, [_d.sent(), ui_9.UI.addMediaButton.dom.parentElement]);
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        MediaList.updateInformationDisplay = function () {
            _library_8.Library.UI.setTextContent(ui_9.UI.mediaCount, media_3.Media.mediaList.length.toString());
            var imageSpan = parseInt(ui_9.UI.imageSpanSelect.get());
            var totalDuration = media_3.Media.mediaList.reduce(function (sum, entry) { var _a; return sum + ((_a = entry.duration) !== null && _a !== void 0 ? _a : imageSpan); }, 0);
            _library_8.Library.UI.setTextContent(ui_9.UI.mediaLength, _tools_6.Tools.Timespan.toMediaTimeString(totalDuration));
        };
        MediaList.initialize = function () {
            MediaList.updateInformationDisplay();
        };
        MediaList.clearPlayState = function () {
            _features_1.Features.Player.clear();
            ui_9.UI.mediaList.classList.toggle("paused", false);
        };
    })(MediaList || (exports.MediaList = MediaList = {}));
});
define("script/events", ["require", "exports", "script/tools/index", "script/library/index", "script/features/index", "script/features/media", "script/medialist", "script/ui", "script/url", "resource/config", "resource/control"], function (require, exports, _tools_7, _library_9, _features_2, media_4, medialist_1, ui_10, url_3, config_json_7, control_json_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Events = void 0;
    config_json_7 = __importDefault(config_json_7);
    control_json_2 = __importDefault(control_json_2);
    var Events;
    (function (Events) {
        var _this = this;
        var updateShowFps = function () {
            ui_10.UI.fpsDisplay.classList.toggle("hide", !ui_10.UI.showFpsCheckbox.get());
        };
        var brightnessTimer = new _library_9.Library.UI.ToggleClassForWhileTimer();
        Events.updateBrightness = function () {
            var value = ui_10.UI.brightnessRange.get();
            console.log("💡 Brightness changed:", value);
            brightnessTimer.start(ui_10.UI.mediaScreen, "disable-transition", 100);
            _library_9.Library.UI.setStyle(ui_10.UI.mediaScreen, "opacity", "".concat(value / 100));
            Events.mousemove();
        };
        var updateLoopShortMedia = function () {
            _features_2.Features.Player.updateLoopShortMedia();
        };
        var updateVisualizer = function () {
            var value = ui_10.UI.visualizerSelect.get();
            control_json_2.default.visualizer.enum.forEach(function (i) { return ui_10.UI.mediaScreen.classList.toggle(i, i === value); });
        };
        var updateClock = function () {
            control_json_2.default.clock.enum.forEach(function (i) { return ui_10.UI.clockDisplay.classList.toggle(i, i === ui_10.UI.clockSelect.get()); });
        };
        var updateClockPosition = function () {
            control_json_2.default.clockPosition.enum.forEach(function (i) { return ui_10.UI.clockDisplay.classList.toggle(i, i === ui_10.UI.clockPositionSelect.get()); });
        };
        var updateUrlAnchor = function (params) {
            return ui_10.UI.urlAnchor.href = url_3.Url.make(params);
        };
        var dragover = function (event) {
            var _a;
            var files = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.files;
            if (files && 0 < files.length) {
                var hasMedia = Array.from(files).some(function (file) { return media_4.Media.isMediaFile(file); });
                if (hasMedia) {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = "copy";
                    ui_10.UI.addMediaButton.dom.classList.add("dragover");
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
        var isSeekingTimer = new _tools_7.Tools.Timer.ExtendableTimer(function () {
            document.body.classList.add("is-seeking");
            if (_features_2.Features.Player.isPlaying()) {
                _features_2.Features.Player.temporaryPause();
            }
        }, function () {
            document.body.classList.remove("is-seeking");
            if (_features_2.Features.Player.isPlaying()) {
                _features_2.Features.Player.temporaryResume();
                _features_2.Features.Player.seek(ui_10.UI.seekRange.valueAsNumber);
            }
        }, 500);
        var updateSeek = function () {
            isSeekingTimer.kick();
            _features_2.Features.Player.seek(ui_10.UI.seekRange.valueAsNumber);
        };
        var mouseMoveTimer = new _library_9.Library.UI.ToggleClassForWhileTimer();
        Events.mousemove = function () {
            return mouseMoveTimer.start(document.body, "mousemove", config_json_7.default.ui.mousemoveTimeout);
        };
        Events.loadToggleButtonParameter = function (button, params) {
            var value = params[button.getId()];
            if (undefined !== value) {
                button.dom.classList.toggle("on", "true" === value.toLowerCase());
            }
        };
        Events.initialize = function () {
            var _a, _b;
            var _c, _d, _e, _f, _g, _h;
            window.addEventListener("dragover", function (event) { return event.preventDefault(); });
            window.addEventListener("drop", function (event) { return event.preventDefault(); });
            window.addEventListener("resize", function () { return _features_2.Features.Player.updateStretch(); });
            window.addEventListener("orientationchange", function () { return _features_2.Features.Player.updateStretch(); });
            //Library.Shortcuts.setCommandMap();
            window.addEventListener("keydown", function (event) {
                if (["Space", " "].includes(event.key) && !event.repeat) {
                    event.preventDefault();
                    if (_features_2.Features.Player.isPlaying()) {
                        _features_2.Features.Player.pause();
                        medialist_1.MediaList.updateMediaListDisplay();
                        medialist_1.MediaList.updateInformationDisplay();
                    }
                    else {
                        _features_2.Features.Player.play();
                    }
                }
                if (["ArrowLeft"].includes(event.key) && !event.repeat) {
                    event.preventDefault();
                    if (_features_2.Features.Player.isPlaying()) {
                        _features_2.Features.Player.previous();
                    }
                    else {
                        _features_2.Features.Player.play();
                    }
                }
                if (["ArrowRight"].includes(event.key) && !event.repeat) {
                    event.preventDefault();
                    if (_features_2.Features.Player.isPlaying()) {
                        _features_2.Features.Player.next();
                    }
                    else {
                        _features_2.Features.Player.play();
                    }
                }
                if (["ArrowUp"].includes(event.key)) {
                    event.preventDefault();
                    ui_10.UI.volumeRange.set(ui_10.UI.volumeRange.get() + 5);
                    ui_10.UI.volumeRange.fire();
                }
                if (["ArrowDown"].includes(event.key)) {
                    event.preventDefault();
                    ui_10.UI.volumeRange.set(ui_10.UI.volumeRange.get() - 5);
                    ui_10.UI.volumeRange.fire();
                }
                if (["Escape"].includes(event.key) && !event.repeat) {
                    event.preventDefault();
                    ui_10.UI.settingButton.dom.classList.toggle("on", false);
                    ui_10.UI.volumeButton.dom.classList.toggle("on", false);
                }
                if ("F" === event.key.toUpperCase() && !event.repeat) {
                    event.preventDefault();
                    if (_library_9.Library.UI.fullscreenEnabled) {
                        ui_10.UI.withFullscreenCheckbox.toggle();
                        _features_2.Features.Player.updateFullscreenState();
                    }
                }
                if ("P" === event.key.toUpperCase() && !event.repeat) {
                    //event.preventDefault();
                    ui_10.UI.paddingCheckbox.toggle();
                    _features_2.Features.Player.updateStretch();
                }
                if ("R" === event.key.toUpperCase() && !event.repeat) {
                    //event.preventDefault();
                    ui_10.UI.repeatButton.dom.classList.toggle("on");
                }
                if ("S" === event.key.toUpperCase() && !event.repeat) {
                    //event.preventDefault();
                    ui_10.UI.shuffleButton.dom.classList.toggle("on");
                }
            });
            document.body.addEventListener("dragover", dragover);
            document.body.addEventListener("drop", drop);
            //document.body.className = "play";
            document.body.className = "list";
            ui_10.UI.screenBody.addEventListener("click", function () { return document.body.classList.toggle("show-ui"); });
            var applyParam = function (key, value) {
                url_3.Url.addParameter(url_3.Url.params, key, value);
                updateUrlAnchor(url_3.Url.params);
            };
            navigator.mediaSession.setActionHandler("play", _features_2.Features.Player.play);
            navigator.mediaSession.setActionHandler("pause", _features_2.Features.Player.pause);
            navigator.mediaSession.setActionHandler("previoustrack", _features_2.Features.Player.previous);
            navigator.mediaSession.setActionHandler("nexttrack", _features_2.Features.Player.next);
            ui_10.UI.mediaList.addEventListener("scroll", function () { return document.body.classList.toggle("show-paused-media", ui_10.UI.screenBody.classList.contains("paused") && ui_10.UI.isScrolledToMediaListBottom()); });
            ui_10.UI.addMediaButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                ui_10.UI.inputFile.click();
            };
            ui_10.UI.inputFile.addEventListener("click", function (event) { return event.stopPropagation(); });
            ui_10.UI.inputFile.addEventListener("change", function () { return __awaiter(_this, void 0, void 0, function () {
                var files, _i, _a, file;
                return __generator(this, function (_b) {
                    files = ui_10.UI.inputFile.files;
                    for (_i = 0, _a = Array.from(files !== null && files !== void 0 ? files : []); _i < _a.length; _i++) {
                        file = _a[_i];
                        console.log("📂 File selected:", file);
                        medialist_1.MediaList.addMediaSerial(file);
                    }
                    ui_10.UI.inputFile.value = "";
                    return [2 /*return*/];
                });
            }); });
            ui_10.UI.playButton.data.click = function (event, button) {
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
            ui_10.UI.nextButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                _features_2.Features.Player.next();
            };
            ui_10.UI.backBUtton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                _features_2.Features.Player.previous();
            };
            ui_10.UI.fastForwardButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                _features_2.Features.Player.fastForward();
            };
            ui_10.UI.rewindButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                _features_2.Features.Player.rewind();
            };
            ui_10.UI.shuffleButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                ui_10.UI.shuffleButton.dom.classList.toggle("on");
                applyParam("shuffle", "".concat(ui_10.UI.shuffleButton.dom.classList.contains("on")));
            };
            ui_10.UI.repeatButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                ui_10.UI.repeatButton.dom.classList.toggle("on");
                applyParam("repeat", "".concat(ui_10.UI.repeatButton.dom.classList.contains("on")));
            };
            ui_10.UI.volumeButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                if (_tools_7.Tools.Environment.isSafari() && !_features_2.Features.Analyser.isSupported()) {
                    ui_10.UI.volumeRange.set(ui_10.UI.volumeRange.get() <= 0 ? 100 : 0);
                }
                else {
                    ui_10.UI.volumeButton.dom.classList.toggle("on");
                }
                ui_10.UI.settingButton.dom.classList.toggle("on", false);
            };
            (_c = ui_10.UI.volumeRange).options || (_c.options = {});
            ui_10.UI.volumeRange.options.change = function (_event, range) {
                var value = range.get();
                console.log("🔊 Volume changed:", value);
                ui_10.UI.volumeButton.dom.classList.toggle("volume-mute", value <= 0);
                ui_10.UI.volumeButton.dom.classList.toggle("volume-0", 0 < value && value <= 25);
                ui_10.UI.volumeButton.dom.classList.toggle("volume-1", 25 < value && value <= 50);
                ui_10.UI.volumeButton.dom.classList.toggle("volume-2", 50 < value && value <= 75);
                ui_10.UI.volumeButton.dom.classList.toggle("volume-3", 75 < value);
                //Media.setVolume(value);
                Events.mousemove();
            };
            ui_10.UI.settingButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                ui_10.UI.settingButton.dom.classList.toggle("on");
                ui_10.UI.volumeButton.dom.classList.toggle("on", false);
            };
            ui_10.UI.mediaLength.click = function () {
                medialist_1.MediaList.updateMediaListDisplay();
                medialist_1.MediaList.updateInformationDisplay();
            };
            (_d = ui_10.UI.withFullscreenCheckbox).options || (_d.options = {});
            ui_10.UI.withFullscreenCheckbox.options.change = function (_event, _checkbox) {
                if (document.body.classList.contains("play")) {
                    if (_library_9.Library.UI.fullscreenEnabled) {
                        _features_2.Features.Player.updateFullscreenState();
                    }
                }
            };
            (_e = ui_10.UI.brightnessRange).options || (_e.options = {});
            ui_10.UI.brightnessRange.options.change = Events.updateBrightness;
            (_f = ui_10.UI.stretchRange).options || (_f.options = {});
            ui_10.UI.stretchRange.options.change = function (_event, range) {
                var value = range.get();
                console.log("📏 Stretch changed:", value);
                //Features.Media.setStretch(value / 100);
                _features_2.Features.Player.updateStretch();
                Events.mousemove();
            };
            (_g = ui_10.UI.imageSpanSelect).options || (_g.options = {});
            ui_10.UI.imageSpanSelect.options.change = function (_event, select) {
                var value = select.get();
                console.log("⏱️ Image span changed:", value);
                medialist_1.MediaList.updateInformationDisplay();
            };
            (_h = ui_10.UI.loopShortMediaCheckbox).options || (_h.options = {});
            ui_10.UI.loopShortMediaCheckbox.options.change = function (_event, _checkbox) {
                console.log("🔁 Loop short media changed:", ui_10.UI.loopShortMediaCheckbox.get());
                updateLoopShortMedia();
            };
            ui_10.UI.mediaTitle.addEventListener("click", function (event) {
                event.stopPropagation();
                document.body.classList.toggle("show-seek-bar");
            });
            ui_10.UI.mediaTime.addEventListener("click", function (event) {
                event.stopPropagation();
                document.body.classList.toggle("show-seek-bar");
            });
            ui_10.UI.seekRange.addEventListener("click", function (event) { return event.stopPropagation(); });
            ui_10.UI.seekRange.addEventListener("change", updateSeek);
            ui_10.UI.seekRange.addEventListener("input", updateSeek);
            ui_10.UI.shuffleButton.dom.classList.toggle("on", "true" === ((_a = url_3.Url.params["shuffle"]) !== null && _a !== void 0 ? _a : "false").toLowerCase());
            ui_10.UI.repeatButton.dom.classList.toggle("on", "true" === ((_b = url_3.Url.params["repeat"]) !== null && _b !== void 0 ? _b : "false").toLowerCase());
            ui_10.UI.volumeRange.loadParameter(url_3.Url.params, applyParam).setChange(ui_10.UI.volumeRange.options.change);
            ui_10.UI.withFullscreenCheckbox.loadParameter(url_3.Url.params, applyParam).setChange(ui_10.UI.withFullscreenCheckbox.options.change);
            ui_10.UI.brightnessRange.loadParameter(url_3.Url.params, applyParam).setChange(ui_10.UI.brightnessRange.options.change);
            ui_10.UI.stretchRange.loadParameter(url_3.Url.params, applyParam).setChange(ui_10.UI.stretchRange.options.change);
            ui_10.UI.paddingCheckbox.loadParameter(url_3.Url.params, applyParam).setChange(function () { return _features_2.Features.Player.updateStretch(); });
            ui_10.UI.crossFadeSelect.loadParameter(url_3.Url.params, applyParam); //.setChange(UI.transitionCheckbox.options.change);
            ui_10.UI.imageSpanSelect.loadParameter(url_3.Url.params, applyParam).setChange(ui_10.UI.imageSpanSelect.options.change);
            ui_10.UI.loopShortMediaCheckbox.loadParameter(url_3.Url.params, applyParam);
            ui_10.UI.visualizerSelect.loadParameter(url_3.Url.params, applyParam).setChange(updateVisualizer);
            ui_10.UI.clockSelect.loadParameter(url_3.Url.params, applyParam).setChange(updateClock);
            ui_10.UI.clockPositionSelect.loadParameter(url_3.Url.params, applyParam).setChange(updateClockPosition);
            ui_10.UI.showFpsCheckbox.loadParameter(url_3.Url.params, applyParam).setChange(updateShowFps);
            ui_10.UI.languageSelect.loadParameter(url_3.Url.params, applyParam).setChange(ui_10.UI.updateLanguage);
            document.body.addEventListener("mousemove", function (event) {
                if (config_json_7.default.log.mousemove && !mouseMoveTimer.isInTimer()) {
                    console.log("🖱️ MouseMove:", event, ui_10.UI.screenBody);
                }
                Events.mousemove();
            });
            _library_9.Library.UI.querySelectorAllWithFallback("label", ["label[for]:has(select)", "label[for]"])
                .forEach(function (label) { return _library_9.Library.UI.showPickerOnLabel(label); });
            [
                ui_10.UI.volumeRange,
                // UI.withFullscreen,
                ui_10.UI.showFpsCheckbox,
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
            updateClock();
            updateClockPosition();
            ui_10.UI.updateLanguage();
            updateUrlAnchor(url_3.Url.params);
            document.addEventListener("DOMContentLoaded", function () {
                // Catch up input values that the web browser quietly restores without firing events when a previously closed page is restored
                setTimeout(function () {
                    return [
                        ui_10.UI.withFullscreenCheckbox,
                        ui_10.UI.brightnessRange,
                        ui_10.UI.stretchRange,
                        ui_10.UI.paddingCheckbox,
                        ui_10.UI.crossFadeSelect,
                        ui_10.UI.imageSpanSelect,
                        ui_10.UI.loopShortMediaCheckbox,
                        ui_10.UI.visualizerSelect,
                        ui_10.UI.clockSelect,
                        ui_10.UI.clockPositionSelect,
                        ui_10.UI.showFpsCheckbox,
                        ui_10.UI.languageSelect,
                    ]
                        .forEach(function (i) { return i.catchUpRestore(url_3.Url.params); });
                }, 25);
            });
            window.addEventListener("languagechange", function () {
                console.log("🌐 languagechange:", navigator.language, navigator.languages);
                var old = _library_9.Library.Locale.getLocale();
                _library_9.Library.Locale.setLocale(ui_10.UI.languageSelect.get());
                if (old !== _library_9.Library.Locale.getLocale()) {
                    ui_10.UI.updateLanguage();
                }
            });
        };
    })(Events || (exports.Events = Events = {}));
});
define("script/screenshot", ["require", "exports", "script/library/index", "script/ui"], function (require, exports, _library_10, ui_11) {
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
                    Screenshot.setDisplayNone(["#media-screen", "#background-screen", ".item.add", "#shuffle-button", "#repeat-button", "#volume-button", "#setting-button",]);
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
            ui_11.UI.screenBody.style.setProperty("background-color", "white");
            ui_11.UI.screenBody.style.setProperty("display", "flex");
            ui_11.UI.screenBody.style.setProperty("flex-direction", "column");
            ui_11.UI.screenBody.style.setProperty("align-items", "center");
            ui_11.UI.screenBody.style.setProperty("justify-content", "center");
            ui_11.UI.mediaList.style.setProperty("position", "relative");
            ui_11.UI.mediaList.style.setProperty("background-color", "black");
            ["min-width", "max-width",].forEach(function (i) { return ui_11.UI.mediaList.style.setProperty(i, width); });
            ["min-height", "max-height",].forEach(function (i) { return ui_11.UI.mediaList.style.setProperty(i, height); });
        };
        Screenshot.toCenterControlPanel = function (rate) {
            var controlPanel = _library_10.Library.UI.getElementById("div", "control-panel");
            controlPanel.style.setProperty("inset-block-end", "50%");
            controlPanel.style.setProperty("transform", "translate(-50%, 50%) scale(".concat(rate, ")"));
        };
    })(Screenshot || (exports.Screenshot = Screenshot = {}));
});
define("script/index", ["require", "exports", "script/tools/index", "script/library/index", "script/features/index", "resource/config", "resource/control", "resource/evil-commonjs.config", "resource/evil-timer.js.config", "resource/images", "resource/powered-by", "script/url", "script/ui", "script/medialist", "script/events", "script/screenshot"], function (require, exports, _tools_8, _library_11, _features_3, config_json_8, control_json_3, evil_commonjs_config_json_1, evil_timer_js_config_json_1, images_json_1, powered_by_json_2, url_4, ui_12, medialist_2, events_1, screenshot_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    config_json_8 = __importDefault(config_json_8);
    control_json_3 = __importDefault(control_json_3);
    evil_commonjs_config_json_1 = __importDefault(evil_commonjs_config_json_1);
    evil_timer_js_config_json_1 = __importDefault(evil_timer_js_config_json_1);
    images_json_1 = __importDefault(images_json_1);
    powered_by_json_2 = __importDefault(powered_by_json_2);
    url_4.Url.initialize();
    ui_12.UI.initialize();
    events_1.Events.initialize();
    medialist_2.MediaList.initialize();
    _features_3.Features.Clock.initialize(url_4.Url.params);
    screenshot_1.Screenshot.initialize(url_4.Url.params);
    console.log("\uD83D\uDCE6 BUILD AT: ".concat(build.at, " ( ").concat(_tools_8.Tools.Timespan.toDisplayString(new Date().getTime() - build.tick, 1), " ").concat(_library_11.Library.Locale.map("ago"), " )"));
    var consoleInterface = globalThis;
    var Resource = {
        config: config_json_8.default,
        control: control_json_3.default,
        evilCommonJsConfig: evil_commonjs_config_json_1.default,
        evilTimerJsConfig: evil_timer_js_config_json_1.default,
        images: images_json_1.default,
        locale: _library_11.Library.Locale.master,
        poweredBy: powered_by_json_2.default
    };
    var modules = {
        Tools: _tools_8.Tools,
        Library: _library_11.Library,
        Features: _features_3.Features,
        Url: url_4.Url,
        UI: ui_12.UI,
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