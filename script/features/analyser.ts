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
        splitter: ChannelSplitterNode | null = null;
        analyserNodes: Stereo<AnalyserNode> | null = null;
        gainNode: GainNode;
        mediaElementAudioSourceNode: MediaElementAudioSourceNode;
        isValidFrequencyData: Channels<boolean> = { left: false, right: false, mono: false };
        isValidTimeDomainData: Channels<boolean> = { left: false, right: false, mono: false };
        frequencyDataArray: Channels<Uint8Array<ArrayBuffer> | null> | null = null;
        timeDomainDataArray: Channels<Uint8Array<ArrayBuffer> | null> | null = null;
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
                this.splitter = audioContext.createChannelSplitter(2);
                this.analyserNodes =
                {
                    left: audioContext.createAnalyser(),
                    right: audioContext.createAnalyser()
                };
                this.analyserNodes.left.fftSize = fftSize;
                this.analyserNodes.right.fftSize = fftSize;
                this.gainNode = audioContext.createGain();
                this.mediaElementAudioSourceNode = audioContext.createMediaElementSource(mediaElement);
                this.mediaElementAudioSourceNode.connect(this.splitter);
                this.splitter.connect(this.analyserNodes.left, 0);
                this.splitter.connect(this.analyserNodes.right, 1);
                this.mediaElementAudioSourceNode.connect(this.gainNode);
                this.gainNode.connect(audioContext.destination);
                //this.analyserNode.connect(audioContext.destination);
                //this.frequencyDataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
            }
        }
        destroy(): void
        {
            this.analyserNodes?.left?.disconnect();
            this.analyserNodes?.right?.disconnect();
            this.splitter?.disconnect();
            this.mediaElementAudioSourceNode.disconnect();
        }
        step(): void
        {
            this.isValidFrequencyData = { left: false, right: false, mono: false };
            this.isValidTimeDomainData = { left: false, right: false, mono: false };
        }
        mixToMono(left: Uint8Array<ArrayBuffer>, right: Uint8Array<ArrayBuffer>, mono: Uint8Array<ArrayBuffer>): void
        {
            const length = Math.min(left.length, right.length, mono.length);
            for (let i = 0; i < length; i++)
            {
                mono[i] = ((left[i] +right[i]) /2) |0;
            }
        }
        getByteFrequencyData(channel: ChannelType): Uint8Array<ArrayBuffer> | null
        {
            if (null === this.frequencyDataArray)
            {
                this.frequencyDataArray =
                {
                    left: null,
                    right: null,
                    mono: null,
                };
            }
            if ("left" === channel)
            {
                if (this.analyserNodes && ! this.isValidFrequencyData.left)
                {
                    if ( ! this.frequencyDataArray.left)
                    {
                        this.frequencyDataArray.left = new Uint8Array(this.analyserNodes.left.frequencyBinCount);
                    }
                    this.analyserNodes.left.getByteFrequencyData(this.frequencyDataArray.left);
                    this.isValidFrequencyData.left = true;
                }
                return this.frequencyDataArray.left;
            }
            if ("right" === channel)
            {
                if (this.analyserNodes && ! this.isValidFrequencyData.right)
                {
                    if ( ! this.frequencyDataArray.right)
                    {
                        this.frequencyDataArray.right = new Uint8Array(this.analyserNodes.right.frequencyBinCount);
                    }
                    this.analyserNodes.right.getByteFrequencyData(this.frequencyDataArray.right);
                    this.isValidFrequencyData.right = true;
                }
                return this.frequencyDataArray.right;
            }
            if ("mono" === channel)
            {
                if (this.analyserNodes && ! this.isValidFrequencyData.mono)
                {
                    if ( ! this.frequencyDataArray.mono)
                    {
                        this.frequencyDataArray.mono = new Uint8Array(this.analyserNodes.left.frequencyBinCount);
                    }
                    const left = this.getByteFrequencyData("left");
                    const right = this.getByteFrequencyData("right");
                    if (left && right)
                    {
                        this.mixToMono
                        (
                            left,
                            right,
                            this.frequencyDataArray.mono
                        );
                        this.isValidFrequencyData.mono = true;
                    }
                }
                return this.frequencyDataArray.mono;
            }
            return null;
        }
        getByteTimeDomainData(channel: ChannelType): Uint8Array<ArrayBuffer> | null
        {
            if (null === this.timeDomainDataArray)
            {
                this.timeDomainDataArray =
                {
                    left: null,
                    right: null,
                    mono: null,
                };
            }
            if ("left" === channel)
            {
                if (this.analyserNodes && ! this.isValidTimeDomainData.left)
                {
                    if ( ! this.timeDomainDataArray.left)
                    {
                        this.timeDomainDataArray.left = new Uint8Array(this.analyserNodes.left.fftSize);
                    }
                    this.analyserNodes.left.getByteTimeDomainData(this.timeDomainDataArray.left);
                    this.isValidFrequencyData.left = true;
                }
                return this.timeDomainDataArray.left;
            }
            if ("right" === channel)
            {
                if (this.analyserNodes && ! this.isValidTimeDomainData.right)
                {
                    if ( ! this.timeDomainDataArray.right)
                    {
                        this.timeDomainDataArray.right = new Uint8Array(this.analyserNodes.right.fftSize);
                    }
                    this.analyserNodes.right.getByteTimeDomainData(this.timeDomainDataArray.right);
                    this.isValidTimeDomainData.right = true;
                }
                return this.timeDomainDataArray.right;
            }
            if ("mono" === channel)
            {
                if (this.analyserNodes && ! this.isValidTimeDomainData.mono)
                {
                    if ( ! this.timeDomainDataArray.mono)
                    {
                        this.timeDomainDataArray.mono = new Uint8Array(fftSize);
                    }
                    const left = this.getByteTimeDomainData("left");
                    const right = this.getByteTimeDomainData("right");
                    if (left && right)
                    {
                        this.mixToMono
                        (
                            left,
                            right,
                            this.timeDomainDataArray.mono
                        );
                        this.isValidTimeDomainData.mono = true;
                    }
                }
                return this.timeDomainDataArray.mono;
            }
            return null;
        }
    }}
