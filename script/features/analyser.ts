import config from "@resource/config.json";
export namespace Analyser
{
    export const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    export const fftSize = config.analyser.fftSize ?? 1024;
    export const isSupported = (): boolean =>
        Boolean(audioContext);
    export const resume = async (): Promise<void> =>
    {
        if (audioContext.state === "suspended")
        {
            await audioContext.resume();
        }
    }
    export class Entry
    {
        analyserNode: AnalyserNode;
        mediaElementAudioSourceNode: MediaElementAudioSourceNode;
        dataArray: Uint8Array<ArrayBuffer>;
        constructor(public mediaElement: HTMLMediaElement)
        {
            this.analyserNode = audioContext.createAnalyser();
            this.analyserNode.fftSize = fftSize;
            this.mediaElementAudioSourceNode = audioContext.createMediaElementSource(mediaElement);
            this.mediaElementAudioSourceNode.connect(this.analyserNode);
            this.analyserNode.connect(audioContext.destination);
            this.dataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
        }
        destroy(): void
        {
            this.mediaElementAudioSourceNode.disconnect();
            this.analyserNode.disconnect();
        }
        getByteFrequencyData(): Uint8Array<ArrayBuffer>
        {
            this.analyserNode.getByteFrequencyData(this.dataArray);
            return this.dataArray;
        }
    }}
