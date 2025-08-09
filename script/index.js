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
            "colorspace-label": "Color Space:",
            "coloring-label": "Coloring:",
            "pattern-label": "Pattern:",
            "lines": "Lines",
            "spots": "Spots",
            "both": "Both",
            "canvas-size-label": "Canvas Size:",
            "layers-label": "Layers:",
            "spots-layers-label": "Layers(Spots):",
            "cycle-span-label": "Cycle Span:",
            "fuse-fps-label": "Fuse FPS:",
            "frame-delay-label": "Frame Delay:",
            "easing-label": "Easing:",
            "with-fullscreen-label": "FullScreen:",
            "show-fps-label": "Show FPS:",
            "clock-label": "Clock:",
            "brightness-label": "Brightness:",
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
            "noscript-message": "JavaScript is disabled. Please enable JavaScript.",
            "noscript-introduction-title": "Introduction",
            "noscript-introduction-description": "Kaleidoscope Web Screensaver is a web-based screensaver that displays kaleidoscope-like animations. Users can customize patterns and colors to create simple yet visually engaging effects reminiscent of a kaleidoscope. It works on various devices, including PCs, smartphones, and tablets, and supports fullscreen mode.\n\nBy increasing the number of layers, users can create even more beautiful and intricate visuals. However, please note that higher layer counts may also increase the computational load, which could affect performance on less powerful devices.\n\nYou can display a clock on the screen with various styles and options, making it useful as a clock screensaver.\n\nIn addition, Kaleidoscope Web Screensaver　also includes a benchmark feature that measures the overall performance of your device and web browser together."
        },
        "ja": {
            "lang-label": "日本語",
            "lang-direction": "ltr",
            "Auto": "自動",
            "description": "Web ブラウザ上で動作するメディアプレイヤー",
            "colorspace-label": "色空間:",
            "coloring-label": "カラーリング:",
            "pattern-label": "パターン:",
            "lines": "ライン",
            "spots": "スポット",
            "both": "両方",
            "canvas-size-label": "キャンバスサイズ:",
            "layers-label": "レイヤー数:",
            "spots-layers-label": "レイヤー数(スポット):",
            "cycle-span-label": "サイクルスパン:",
            "fuse-fps-label": "フューズ FPS:",
            "frame-delay-label": "フレーム遅延:",
            "easing-label": "イージング:",
            "with-fullscreen-label": "フルスクリーン:",
            "show-fps-label": "FPS を表示:",
            "clock-label": "時計:",
            "brightness-label": "明るさ:",
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
    "applicationTitle": "Web Media Play",
    "repositoryUrl": "https://github.com/wraith13/web-media-player/",
    "canonicalUrl": "https://wraith13.github.io/web-media-player/",
    "log": {
        "mousemove": false,
        "ToggleClassForWhileTimer.Timeout": false
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
        UI.createElement = function (element) {
            return "string" === typeof element ? document.createTextNode(element) :
                element instanceof Node ? element :
                    UI.setOptions(document.createElement(element.tag), element);
        };
        UI.removeAllChildren = function (parent) {
            Array.from(parent.children).forEach(function (i) { return parent.removeChild(i); });
            return parent;
        };
        UI.appendChild = function (parent, element) {
            parent.appendChild(UI.createElement(element));
            return parent;
        };
        UI.replaceChild = function (parent, element) {
            UI.removeAllChildren(parent);
            return UI.appendChild(parent, element);
        };
        UI.appendChildren = function (parent, elements) {
            if ("append" in parent) {
                parent.append.apply(parent, elements.map(function (i) { return UI.createElement(i); }));
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
    })(Control || (exports.Control = Control = {}));
});
define("script/library/index", ["require", "exports", "script/library/locale", "script/library/ui", "script/library/control"], function (require, exports, ImportedLocale, ImportedUI, ImportedControl) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Library = void 0;
    ImportedLocale = __importStar(ImportedLocale);
    ImportedUI = __importStar(ImportedUI);
    ImportedControl = __importStar(ImportedControl);
    var Library;
    (function (Library) {
        Library.Locale = ImportedLocale.Locale;
        Library.UI = ImportedUI.UI;
        Library.Control = ImportedControl.Control;
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
define("script/tools/index", ["require", "exports", "script/tools/type-guards", "script/tools/number", "script/tools/timespan", "script/tools/math", "script/tools/random", "script/tools/array", "script/tools/hash"], function (require, exports, ImportedTypeGuards, ImportedNumber, ImportedTimespan, ImportedMath, ImportedRandom, ImportedArray, ImportedHash) {
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
    var Tools;
    (function (Tools) {
        Tools.TypeGuards = ImportedTypeGuards.TypeGuards;
        Tools.Number = ImportedNumber.Number;
        Tools.Timespan = ImportedTimespan.Timespan;
        Tools.Math = ImportedMath.Math;
        Tools.Random = ImportedRandom.Random;
        Tools.Array = ImportedArray.Array;
        Tools.Hash = ImportedHash.Hash;
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
    "colorspace": {
        "id": "colorspace",
        "enum": [
            "sRGB",
            "Display P3",
            "Rec. 2020"
        ],
        "default": "sRGB"
    },
    "coloring": {
        "id": "coloring",
        "enum": [
            "monochrome",
            "primary-colors",
            "phi-colors"
        ],
        "default": "phi-colors"
    },
    "pattern": {
        "id": "pattern",
        "enum": [
            "lines",
            "spots",
            "both"
        ],
        "default": "both"
    },
    "canvasSize": {
        "id": "canvas-size",
        "enum": [
            100,
            75,
            50,
            30,
            25,
            20,
            15,
            10,
            5,
            3,
            2,
            1
        ],
        "default": 100
    },
    "layers": {
        "id": "layers",
        "enum": [
            97,
            89,
            83,
            79,
            73,
            71,
            67,
            61,
            59,
            53,
            47,
            43,
            41,
            37,
            31,
            29,
            23,
            19,
            17,
            13,
            11,
            7,
            5,
            3,
            2,
            1
        ],
        "default": 7
    },
    "spotsLayers": {
        "id": "spotsLayers",
        "enum": [
            100,
            95,
            90,
            85,
            80,
            75,
            70,
            65,
            60,
            55,
            50,
            45,
            40,
            35,
            30,
            25,
            20,
            15,
            10,
            5
        ],
        "default": 30
    },
    "cycleSpan": {
        "id": "cycle-span",
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
    "fuseFps": {
        "id": "fuse-fps",
        "enum": [
            25,
            20,
            15,
            12.5,
            10,
            7.5,
            5,
            3
        ],
        "default": 7.5
    },
    "frameDelay": {
        "id": "frame-delay",
        "enum": [
            0,
            25,
            50,
            75,
            100,
            125,
            150,
            200,
            250,
            300,
            350,
            500,
            750,
            1000,
            1250,
            1500
        ],
        "default": 0
    },
    "lowLoadMode": {
        "id": "low-load-mode",
        "default": false
    },
    "easing": {
        "id": "easing",
        "default": true
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
        "enum": [
            100,
            95,
            90,
            85,
            80,
            75,
            70,
            65,
            60,
            55,
            50,
            45,
            40,
            35,
            30,
            25,
            20,
            15,
            10,
            5
        ],
        "default": 100
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
        UI.canvas = _library_2.Library.UI.getElementById("div", "canvas");
        UI.playButton = new _library_2.Library.Control.Button({ id: "play-button", });
        UI.shuffleButton = new _library_2.Library.Control.Button({ id: "shuffle-button", });
        UI.repeatButton = new _library_2.Library.Control.Button({ id: "repeat-button", });
        UI.mediaList = _library_2.Library.UI.getElementById("div", "media-list");
        UI.addMediaButton = new _library_2.Library.Control.Button({ id: "add-media", });
        UI.inputFile = _library_2.Library.UI.getElementById("input", "add-file");
        UI.colorspaceSelect = new _library_2.Library.Control.Select(control_json_1.default.colorspace);
        UI.coloringSelect = new _library_2.Library.Control.Select(control_json_1.default.coloring);
        UI.patternSelect = new _library_2.Library.Control.Select(control_json_1.default.pattern, { makeLabel: function (i) { return _library_2.Library.Locale.map(i); }, });
        UI.canvasSizeSelect = new _library_2.Library.Control.Select(control_json_1.default.canvasSize, { makeLabel: function (i) { return "".concat(i, " %"); } });
        UI.layersSelect = new _library_2.Library.Control.Select(control_json_1.default.layers);
        UI.spotslayersSelect = new _library_2.Library.Control.Select(control_json_1.default.spotsLayers, { makeLabel: function (i) { return "".concat(i, " %"); } });
        UI.cycleSpanSelect = new _library_2.Library.Control.Select(control_json_1.default.cycleSpan, { makeLabel: _tools_2.Tools.Timespan.toDisplayString });
        UI.fuseFpsSelect = new _library_2.Library.Control.Select(control_json_1.default.fuseFps);
        UI.getFrameDelayLabel = function (i) { return _tools_2.Tools.Timespan.toDisplayString(i); };
        UI.frameDelaySelect = new _library_2.Library.Control.Select(control_json_1.default.frameDelay, { makeLabel: UI.getFrameDelayLabel });
        UI.easingCheckbox = new _library_2.Library.Control.Checkbox(control_json_1.default.easing);
        UI.withFullscreen = new _library_2.Library.Control.Checkbox(control_json_1.default.withFullscreen);
        UI.showFps = new _library_2.Library.Control.Checkbox(control_json_1.default.showFps);
        UI.clockSelect = new _library_2.Library.Control.Select(control_json_1.default.clock, { makeLabel: function (i) { return _library_2.Library.Locale.map(i); }, });
        UI.brightnessSelect = new _library_2.Library.Control.Select(control_json_1.default.brightness, { makeLabel: function (i) { return "".concat(i, " %"); } });
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
            UI.colorspaceSelect.reloadOptions();
            UI.coloringSelect.reloadOptions();
            UI.patternSelect.reloadOptions();
            UI.canvasSizeSelect.reloadOptions();
            UI.layersSelect.reloadOptions();
            UI.cycleSpanSelect.reloadOptions();
            UI.fuseFpsSelect.reloadOptions();
            UI.frameDelaySelect.reloadOptions();
            UI.clockSelect.reloadOptions();
            UI.languageSelect.reloadOptions();
            _library_2.Library.UI.querySelectorAllWithFallback("span", ["[data-lang-key]"])
                .forEach(function (i) { return UI.updateLabel(i); });
        };
        UI.initialize = function () {
            UI.noscript.style.setProperty("display", "none");
            if (!_library_2.Library.UI.fullscreenEnabled && UI.withFullscreen.dom.parentElement) {
                UI.withFullscreen.dom.parentElement.style.setProperty("display", "none");
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
    var Clock;
    (function (Clock) {
        Clock.makeDate = function (local) {
            return new Date().toLocaleDateString(local, config_json_2.default.clock.dateFormat);
        };
        Clock.makeTime = function (local) {
            return new Date().toLocaleTimeString(local, config_json_2.default.clock.timeFormat);
        };
        Clock.update = function (local) {
            library_1.Library.UI.setTextContent(ui_2.UI.date, Clock.makeDate(local));
            library_1.Library.UI.setTextContent(ui_2.UI.time, Clock.makeTime(local));
        };
        Clock.setColor = function (color) {
            library_1.Library.UI.setStyle(ui_2.UI.date, "color", color);
            library_1.Library.UI.setStyle(ui_2.UI.time, "color", color);
        };
    })(Clock || (exports.Clock = Clock = {}));
});
define("script/features/media", ["require", "exports", "script/ui", "script/tools/index"], function (require, exports, ui_3, tools_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Media = void 0;
    var Media;
    (function (Media) {
        var _this = this;
        ;
        Media.mediaList = [];
        Media.getMediaType = function (file) {
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
            return null !== Media.getMediaType(file);
        };
        Media.getName = function (file) {
            return file.name || "Unknown File";
        };
        Media.getThumbnail = function (file) { return __awaiter(_this, void 0, void 0, function () {
            var mediaType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mediaType = Media.getMediaType(file);
                        if (mediaType === "image") {
                            return [2 /*return*/, URL.createObjectURL(file)];
                        }
                        if (mediaType === "audio") {
                            return [2 /*return*/, "SVG:audio"];
                        }
                        if (!(mediaType === "video")) return [3 /*break*/, 2];
                        return [4 /*yield*/, getVideoThumbnail(file)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, "SVG:error"];
                }
            });
        }); };
        var getVideoThumbnail = function (file) {
            return new Promise(function (resolve) {
                var url = URL.createObjectURL(file);
                var video = document.createElement("video");
                video.src = url;
                video.currentTime = 0.1;
                video.muted = true;
                video.playsInline = true;
                video.addEventListener("loadeddata", function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    var ctx = canvas.getContext("2d");
                    if (ctx) {
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        resolve(canvas.toDataURL("image/png"));
                    }
                    else {
                        resolve("SVG:error");
                    }
                    URL.revokeObjectURL(url);
                });
                video.addEventListener("error", function () {
                    resolve("SVG:error");
                    URL.revokeObjectURL(url);
                });
            });
        };
        Media.getDuration = function (file) {
            return new Promise(function (resolve) {
                var mediaType = Media.getMediaType(file);
                if (mediaType === "audio" || mediaType === "video") {
                    var url_1 = URL.createObjectURL(file);
                    var media_1 = document.createElement(mediaType);
                    media_1.src = url_1;
                    media_1.addEventListener("loadedmetadata", function () {
                        resolve(media_1.duration);
                        URL.revokeObjectURL(url_1);
                    });
                    media_1.addEventListener("error", function () {
                        resolve(null);
                        URL.revokeObjectURL(url_1);
                    });
                }
                else {
                    resolve(null);
                }
            });
        };
        Media.addMedia = function (file) { return __awaiter(_this, void 0, void 0, function () {
            var type, _a, _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log("📂 Adding media:", file);
                        type = Media.getMediaType(file);
                        if (!(null !== type)) return [3 /*break*/, 3];
                        console.log("✅ Valid media file:", file);
                        _b = (_a = Media.mediaList).push;
                        _c = {
                            file: file,
                            type: type,
                            name: Media.getName(file)
                        };
                        return [4 /*yield*/, Media.getThumbnail(file)];
                    case 1:
                        _c.thumbnail = _d.sent();
                        return [4 /*yield*/, Media.getDuration(file)];
                    case 2:
                        _b.apply(_a, [(_c.duration = _d.sent(),
                                _c)]);
                        console.log("📂 Media added:", Media.mediaList[Media.mediaList.length - 1]);
                        return [3 /*break*/, 4];
                    case 3:
                        console.warn("🚫 Invalid media file:", file);
                        _d.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        Media.updateMediaListDisplay = function () {
            Array.from(ui_3.UI.mediaList.children).forEach(function (child) {
                if (child instanceof HTMLDivElement && ui_3.UI.addMediaButton.dom !== child) {
                    child.remove();
                }
            });
            Media.mediaList.forEach(function (entry) {
                console.log("📂 Media rendering:", entry);
                var item = document.createElement("div");
                item.classList.add("item");
                item.innerHTML = "\n                    <img class=\"thumbnail\" src=\"".concat(entry.thumbnail, "\" alt=\"").concat(entry.name, "\" />\n                    <span class=\"name\">").concat(entry.name, "</span>\n                    <span class=\"type\">").concat(entry.type, "</span>\n                    <span class=\"duration\">").concat(entry.duration !== null ? tools_1.Tools.Timespan.toMediaTimeString(entry.duration * 1000) : "", "</span>\n                ");
                ui_3.UI.mediaList.insertBefore(item, ui_3.UI.addMediaButton.dom);
            });
        };
    })(Media || (exports.Media = Media = {}));
});
define("script/features/index", ["require", "exports", "script/features/fps", "script/features/clock", "script/features/media"], function (require, exports, ImportedFps, ImportedClock, ImportedMedia) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Features = void 0;
    ImportedFps = __importStar(ImportedFps);
    ImportedClock = __importStar(ImportedClock);
    ImportedMedia = __importStar(ImportedMedia);
    var Features;
    (function (Features) {
        Features.Fps = ImportedFps.Fps;
        Features.Clock = ImportedClock.Clock;
        Features.Media = ImportedMedia.Media;
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
define("resource/images", [], {
    "play-icon": "./image/play.svg",
    "pause-icon": "./image/pause.svg"
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
define("script/events", ["require", "exports", "script/library/index", "script/features/index", "script/ui", "script/url", "resource/config", "resource/control"], function (require, exports, _library_3, _features_1, ui_4, url_2, config_json_4, control_json_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Events = void 0;
    config_json_4 = __importDefault(config_json_4);
    control_json_2 = __importDefault(control_json_2);
    var Events;
    (function (Events) {
        var _this = this;
        var updateFuseFps = function () {
            return _features_1.Features.Fps.fuseFps = parseFloat(ui_4.UI.fuseFpsSelect.get());
        };
        var updateShowFps = function () {
            ui_4.UI.fpsDisplay.classList.toggle("hide", !ui_4.UI.showFps.get());
        };
        var updateClock = function () {
            control_json_2.default.clock.enum.forEach(function (i) { return ui_4.UI.clockDisplay.classList.toggle(i, i === ui_4.UI.clockSelect.get()); });
        };
        var updateUrlAnchor = function (params) {
            return ui_4.UI.urlAnchor.href = url_2.Url.make(params);
        };
        var dragover = function (event) {
            var _a;
            var files = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.files;
            if (files && 0 < files.length) {
                var hasMedia = Array.from(files).some(function (file) { return _features_1.Features.Media.isMediaFile(file); });
                if (hasMedia) {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = "copy";
                    ui_4.UI.addMediaButton.dom.classList.add("dragover");
                }
                else {
                    event.dataTransfer.dropEffect = "none";
                }
            }
        };
        var drop = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, file;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        event.preventDefault();
                        event.stopPropagation();
                        if (!(event.dataTransfer && event.dataTransfer.files && 0 < event.dataTransfer.files.length)) return [3 /*break*/, 5];
                        _i = 0, _a = Array.from(event.dataTransfer.files);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        file = _a[_i];
                        console.log("📂 File dropped:", file);
                        return [4 /*yield*/, _features_1.Features.Media.addMedia(file)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _features_1.Features.Media.updateMediaListDisplay();
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        Events.initialize = function () {
            window.addEventListener("dragover", function (event) { return event.preventDefault(); });
            window.addEventListener("drop", function (event) { return event.preventDefault(); });
            document.body.addEventListener("dragover", dragover);
            document.body.addEventListener("drop", drop);
            document.body.className = "list";
            var applyParam = function (key, value) {
                url_2.Url.addParameter(url_2.Url.params, key, value);
                updateUrlAnchor(url_2.Url.params);
            };
            ui_4.UI.playButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                //Controller.toggleAnimation();
            };
            ui_4.UI.shuffleButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                ui_4.UI.shuffleButton.dom.classList.toggle("on");
            };
            ui_4.UI.repeatButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                ui_4.UI.repeatButton.dom.classList.toggle("on");
            };
            ui_4.UI.addMediaButton.data.click = function (event, button) {
                event === null || event === void 0 ? void 0 : event.stopPropagation();
                button.dom.blur();
                ui_4.UI.inputFile.click();
            };
            ui_4.UI.inputFile.addEventListener("change", function () { return __awaiter(_this, void 0, void 0, function () {
                var _i, _a, file;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _i = 0, _a = Array.from((_b = ui_4.UI.inputFile.files) !== null && _b !== void 0 ? _b : []);
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            file = _a[_i];
                            console.log("📂 File selected:", file);
                            return [4 /*yield*/, _features_1.Features.Media.addMedia(file)];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            _features_1.Features.Media.updateMediaListDisplay();
                            ui_4.UI.inputFile.value = ""; // Reset input value to allow re-selection of the same file
                            return [2 /*return*/];
                    }
                });
            }); });
            ui_4.UI.introductionPanel.addEventListener("click", function (event) {
                event.stopPropagation();
                ui_4.UI.introductionPanel.classList.toggle("force-show", false);
            });
            ui_4.UI.introductionPanel.classList.toggle("force-show", true);
            setTimeout(function () { return ui_4.UI.introductionPanel.classList.toggle("force-show", false); }, 15000);
            ui_4.UI.fuseFpsSelect.loadParameter(url_2.Url.params, applyParam).setChange(updateFuseFps);
            ui_4.UI.showFps.loadParameter(url_2.Url.params, applyParam).setChange(updateShowFps);
            ui_4.UI.clockSelect.loadParameter(url_2.Url.params, applyParam).setChange(updateClock);
            ui_4.UI.languageSelect.loadParameter(url_2.Url.params, applyParam).setChange(ui_4.UI.updateLanguage);
            var mouseMoveTimer = new _library_3.Library.UI.ToggleClassForWhileTimer();
            ui_4.UI.screenBody.addEventListener("mousemove", function (_event) {
                if (config_json_4.default.log.mousemove && !mouseMoveTimer.isOn()) {
                    console.log("🖱️ MouseMove:", event, ui_4.UI.screenBody);
                }
                mouseMoveTimer.start(document.body, "mousemove", 1000);
            });
            _library_3.Library.UI.querySelectorAllWithFallback("label", ["label[for]:has(select)", "label[for]"])
                .forEach(function (label) { return _library_3.Library.UI.showPickerOnLabel(label); });
            [
                ui_4.UI.colorspaceSelect,
                ui_4.UI.coloringSelect,
                ui_4.UI.patternSelect,
                ui_4.UI.canvasSizeSelect,
                ui_4.UI.layersSelect,
                ui_4.UI.spotslayersSelect,
                ui_4.UI.cycleSpanSelect,
                ui_4.UI.fuseFpsSelect,
                ui_4.UI.easingCheckbox,
                // UI.withFullscreen,
                ui_4.UI.showFps,
            ].forEach(function (i) { return i.fire(); });
            document.addEventListener("visibilitychange", function () {
                console.log("\uD83D\uDC40 visibilitychange: document.hidden: ".concat(document.hidden));
                _features_1.Features.Fps.reset();
            });
            updateClock();
            ui_4.UI.updateLanguage();
            updateUrlAnchor(url_2.Url.params);
            document.addEventListener("DOMContentLoaded", function () {
                // Catch up input values that the web browser quietly restores without firing events when a previously closed page is restored
                setTimeout(function () {
                    return [
                        ui_4.UI.colorspaceSelect,
                        ui_4.UI.coloringSelect,
                        ui_4.UI.patternSelect,
                        ui_4.UI.canvasSizeSelect,
                        ui_4.UI.layersSelect,
                        ui_4.UI.spotslayersSelect,
                        ui_4.UI.cycleSpanSelect,
                        ui_4.UI.fuseFpsSelect,
                        ui_4.UI.frameDelaySelect,
                        ui_4.UI.easingCheckbox,
                        ui_4.UI.withFullscreen,
                        ui_4.UI.showFps,
                        ui_4.UI.clockSelect,
                        ui_4.UI.brightnessSelect,
                        ui_4.UI.languageSelect,
                    ]
                        .forEach(function (i) { return i.catchUpRestore(url_2.Url.params); });
                }, 25);
            });
            window.addEventListener("languagechange", function () {
                console.log("🌐 languagechange:", navigator.language, navigator.languages);
                var old = _library_3.Library.Locale.getLocale();
                _library_3.Library.Locale.setLocale(ui_4.UI.languageSelect.get());
                if (old !== _library_3.Library.Locale.getLocale()) {
                    ui_4.UI.updateLanguage();
                }
            });
        };
    })(Events || (exports.Events = Events = {}));
});
define("script/index", ["require", "exports", "script/tools/index", "script/library/index", "script/features/index", "resource/config", "resource/control", "resource/evil-commonjs.config", "resource/evil-timer.js.config", "resource/images", "resource/powered-by", "script/url", "script/ui", "script/events"], function (require, exports, _tools_3, _library_4, _features_2, config_json_5, control_json_3, evil_commonjs_config_json_1, evil_timer_js_config_json_1, images_json_1, powered_by_json_2, url_3, ui_5, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    config_json_5 = __importDefault(config_json_5);
    control_json_3 = __importDefault(control_json_3);
    evil_commonjs_config_json_1 = __importDefault(evil_commonjs_config_json_1);
    evil_timer_js_config_json_1 = __importDefault(evil_timer_js_config_json_1);
    images_json_1 = __importDefault(images_json_1);
    powered_by_json_2 = __importDefault(powered_by_json_2);
    url_3.Url.initialize();
    ui_5.UI.initialize();
    events_1.Events.initialize();
    console.log("\uD83D\uDCE6 BUILD AT: ".concat(build.at, " ( ").concat(_tools_3.Tools.Timespan.toDisplayString(new Date().getTime() - build.tick, 1), " ").concat(_library_4.Library.Locale.map("ago"), " )"));
    var consoleInterface = globalThis;
    var Resource = {
        config: config_json_5.default,
        control: control_json_3.default,
        evilCommonJsConfig: evil_commonjs_config_json_1.default,
        evilTimerJsConfig: evil_timer_js_config_json_1.default,
        images: images_json_1.default,
        locale: _library_4.Library.Locale.master,
        poweredBy: powered_by_json_2.default
    };
    var modules = {
        Tools: _tools_3.Tools,
        Library: _library_4.Library,
        Features: _features_2.Features,
        Url: url_3.Url,
        UI: ui_5.UI,
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