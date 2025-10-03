import * as ImportedFps from "./fps";
import * as ImportedOverlay from "./overlay";
import * as ImportedLocation from "./location";
import * as ImportedWeather from "./weather";
//import * as ImportedMedia from "./media";
//import * as ImortedHistory from "./history";
import * as ImportedAnalyser from "./analyser";
//import * as ImportedTrack from "./track";
import * as ImportedVisualizer from "./visualizer";
import * as ImportedPlayer from "./player";
export namespace Features
{
    export import Fps = ImportedFps.Fps;
    export import Overlay = ImportedOverlay.Overlay;
    export import Location = ImportedLocation.Location;
    export import Weather = ImportedWeather.Weather;
    //export import Media = ImportedMedia.Media;
    //export import History = ImortedHistory.History;
    export import Analyser = ImportedAnalyser.Analyser;
    //export import Track = ImportedTrack.Track;
    export import Visualizer = ImportedVisualizer.Visualizer;
    export import Player = ImportedPlayer.Player;
}
