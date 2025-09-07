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
        analyserNode: AnalyserNode | null = null;
        gainNode: GainNode;
        mediaElementAudioSourceNode: MediaElementAudioSourceNode;
        frequencyDataArray: Uint8Array<ArrayBuffer> | null = null;
        constructor(public mediaElement: HTMLMediaElement, gainOnly?: "gainOnly")
        {
            if (gainOnly)
            {
                this.gainNode = audioContext.createGain();
                this.mediaElementAudioSourceNode = audioContext.createMediaElementSource(mediaElement);
                this.mediaElementAudioSourceNode.connect(this.gainNode);
                this.gainNode.connect(audioContext.destination);
            }
            else
            {
                this.analyserNode = audioContext.createAnalyser();
                this.analyserNode.fftSize = fftSize;
                this.gainNode = audioContext.createGain();
                this.mediaElementAudioSourceNode = audioContext.createMediaElementSource(mediaElement);
                this.mediaElementAudioSourceNode.connect(this.analyserNode);
                this.mediaElementAudioSourceNode.connect(this.gainNode);
                this.gainNode.connect(audioContext.destination);
                //this.analyserNode.connect(audioContext.destination);
                this.frequencyDataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
            }
        }
        destroy(): void
        {
            this.mediaElementAudioSourceNode.disconnect();
            this.analyserNode?.disconnect();
        }
        getByteFrequencyData(): Uint8Array<ArrayBuffer> | null
        {
            if (this.frequencyDataArray && this.analyserNode)
            {
                this.analyserNode.getByteFrequencyData(this.frequencyDataArray);
            }
            return this.frequencyDataArray;
        }
    }}
