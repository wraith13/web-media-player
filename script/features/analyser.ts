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
    export interface Channels<T>
    {
        left: T;
        right: T;
        mono: T;
    };
    export type ChannelType = keyof Channels<any>;
    export class Entry
    {
        splitter: ChannelSplitterNode | null = null;
        analyserNodes: Channels<AnalyserNode> | null = null;
        gainNode: GainNode;
        mediaElementAudioSourceNode: MediaElementAudioSourceNode;
        isValidFrequencyData: Channels<boolean> = { left: false, right: false, mono: false };
        isValidTimeDomainData: Channels<boolean> = { left: false, right: false, mono: false };
        frequencyDataArray: Channels<Uint8Array<ArrayBuffer> | null> = { left: null, right: null, mono: null, };
        timeDomainDataArray: Channels<Uint8Array<ArrayBuffer> | null> = { left: null, right: null, mono: null, };
        constructor(public mediaElement: HTMLMediaElement)
        {
            // if (mediaElement instanceof HTMLVideoElement)
            // {
            //     this.gainNode = audioContext.createGain();
            //     this.mediaElementAudioSourceNode = audioContext.createMediaElementSource(mediaElement);
            //     this.mediaElementAudioSourceNode.connect(this.gainNode);
            //     this.gainNode.connect(audioContext.destination);
            // }
            // else
            // {
                this.splitter = audioContext.createChannelSplitter(2);
                this.analyserNodes =
                {
                    left: audioContext.createAnalyser(),
                    right: audioContext.createAnalyser(),
                    mono: audioContext.createAnalyser(),
                };
                this.analyserNodes.left.fftSize = fftSize;
                this.analyserNodes.right.fftSize = fftSize;
                this.gainNode = audioContext.createGain();
                this.mediaElementAudioSourceNode = audioContext.createMediaElementSource(mediaElement);
                this.mediaElementAudioSourceNode.connect(this.splitter);
                this.splitter.connect(this.analyserNodes.left, 0);
                this.splitter.connect(this.analyserNodes.right, 1);
                this.mediaElementAudioSourceNode.connect(this.analyserNodes.mono);
                this.mediaElementAudioSourceNode.connect(this.gainNode);
                this.gainNode.connect(audioContext.destination);
                //this.analyserNode.connect(audioContext.destination);
                //this.frequencyDataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
            // }
        }
        destroy(): void
        {
            this.analyserNodes?.left?.disconnect();
            this.analyserNodes?.right?.disconnect();
            this.splitter?.disconnect();
            this.analyserNodes?.mono?.disconnect();
            this.gainNode.disconnect();
            this.mediaElementAudioSourceNode.disconnect();
        }
        step(): void
        {
            this.isValidFrequencyData = { left: false, right: false, mono: false };
            this.isValidTimeDomainData = { left: false, right: false, mono: false };
        }
        getByteFrequencyData(channel: ChannelType): Uint8Array<ArrayBuffer> | null
        {
            if (this.analyserNodes && ! this.isValidFrequencyData[channel])
            {
                if ( ! this.frequencyDataArray[channel])
                {
                    this.frequencyDataArray[channel] = new Uint8Array(this.analyserNodes[channel].frequencyBinCount);
                }
                this.analyserNodes[channel].getByteFrequencyData(this.frequencyDataArray[channel]);
                this.isValidFrequencyData[channel] = true;
            }
            return this.frequencyDataArray[channel];
        }
        getByteTimeDomainData(channel: ChannelType): Uint8Array<ArrayBuffer> | null
        {
            if (this.analyserNodes && ! this.isValidTimeDomainData[channel])
            {
                if ( ! this.timeDomainDataArray[channel])
                {
                    this.timeDomainDataArray[channel] = new Uint8Array(this.analyserNodes[channel].fftSize);
                }
                this.analyserNodes[channel].getByteTimeDomainData(this.timeDomainDataArray[channel]);
                this.isValidTimeDomainData[channel] = true;
            }
            return this.timeDomainDataArray[channel];
        }
    }}
