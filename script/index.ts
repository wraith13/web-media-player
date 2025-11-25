import { Tools } from "@tools";
import { Library } from "@library";
import { Features } from "@features";
import config from "@resource/config.json";
import control from "@resource/control.json";
import evilCommonJsConfig from "@resource/evil-commonjs.config.json";
import evilTimerJsConfig from "@resource/evil-timer.js.config.json";
import images from "@resource/images.json";
import { Url } from "./url";
import { UI } from "./ui";
import { MediaList } from "./medialist";
import { Events } from "./events";
import { Screenshot } from "./screenshot";
interface BuildInformation
{
    at: string;
    tick: number;
}
declare var build: BuildInformation;
console.log(`📦 BUILD AT: ${build.at} ( ${Tools.Timespan.toHumanizedString(new Date().getTime() -build.tick, 1)} ${Library.Locale.map("ago")} )`);
Url.initialize();
UI.initialize(Url.params);
Events.initialize(Url.params);
Library.Shortcuts.initialize();
MediaList.initialize(Url.params);
Features.Player.initialize(Url.params);
Features.Overlay.initialize(Url.params);
Screenshot.initialize(Url.params);
Features.Timer.initialize
({
    isPlaying: Features.Player.isPlaying,
    play: () =>
    {
        console.log("⏰ Timer: Resuming playback for wake-up.");
        //UI.wakeUpToggle.toggle(false);
        Features.Player.play();
    },
    pause: () =>
    {
        console.log("💤 Timer: Pausing playback for sleep mode.");
        UI.sleepToggle.toggle(false);
        Features.Player.pause();
    },
    onChangedSleepMode: Events.onChangedSleepMode,
});
const consoleInterface = globalThis as any;
const Resource =
{
    config,
    control,
    evilCommonJsConfig,
    evilTimerJsConfig,
    images,
    locale: Library.Locale.master,
};
const modules =
{
    Tools,
    Library,
    Features,
    Url,
    UI,
    Events,
    Resource
};
Object.entries(modules).forEach(([ name, module ]) => consoleInterface[name] = module);
console.log(`📦 Available modules: ${Object.keys(modules).join(", ")}`);
