import config from "@resource/config.json";
export namespace Analyser
{
    export const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    export const fftSize = config.analyser.fftSize ?? 1024;
    export const isSupported = (): boolean =>
        Boolean(audioContext) &&
        "function" === typeof audioContext.createGain &&
        "function" === typeof audioContext.createAnalyser;
    export const resume = async (): Promise<void> =>
    {
        if (audioContext.state === "suspended")
        {
            await audioContext.resume();
        }
    }
    export interface Stereo<T>
    {
        left: T;
        right: T;
    };
    export interface Channels<T> extends Stereo<T>
    {
        mono: T;
    };
    export type ChannelType = keyof Channels<any>;
    export class Entry
    {
        analyserNode: AnalyserNode | null = null;
        gainNode: GainNode;
        mediaElementAudioSourceNode: MediaElementAudioSourceNode;
        isValidFrequencyData: boolean = false;
        isValidTimeDomainData: boolean = false;
        frequencyDataArray: Uint8Array<ArrayBuffer> | null = null;
        timeDomainDataArray: Uint8Array<ArrayBuffer> | null = null;
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
                //this.frequencyDataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
            }
        }
        destroy(): void
        {
            this.mediaElementAudioSourceNode.disconnect();
            this.analyserNode?.disconnect();
        }
        step(): void
        {
            this.isValidFrequencyData = false;
            this.isValidTimeDomainData = false;
        }
        getByteFrequencyData(channel: ChannelType): Uint8Array<ArrayBuffer> | null
        {
            if ("mono" === channel)
            {
                if (this.analyserNode && ! this.isValidFrequencyData)
                {
                    if ( ! this.frequencyDataArray)
                    {
                        this.frequencyDataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
                    }
                    this.analyserNode.getByteFrequencyData(this.frequencyDataArray);
                    this.isValidFrequencyData = true;
                }
                return this.frequencyDataArray;
            }
            return null;
        }
        getByteTimeDomainData(channel: ChannelType): Uint8Array<ArrayBuffer> | null
        {
            if ("mono" === channel)
            {
                if (this.analyserNode && ! this.isValidTimeDomainData)
                {
                    if ( ! this.timeDomainDataArray)
                    {
                        this.timeDomainDataArray = new Uint8Array(this.analyserNode.fftSize);
                    }
                    this.analyserNode.getByteTimeDomainData(this.timeDomainDataArray);
                    this.isValidTimeDomainData = true;
                }
                return this.timeDomainDataArray;
            }
            return null;
        }
    }}
