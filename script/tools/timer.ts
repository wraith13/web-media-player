export namespace Timer
{
    export const sleep = (timeout: number): Promise<void> =>
        new Promise(resolve => setTimeout(resolve, timeout));
    export class ExtendableTimer
    {
        timer: ReturnType<typeof setTimeout> | undefined;
        constructor(public onStart: () => unknown, public onEnd: () => unknown, public span: number)
        {
            this.timer = undefined;
        }
        kick()
        {
            if (this.isInTimer())
            {
                clearTimeout(this.timer);
            }
            else
            {
                this.onStart();
            }
            this.timer = setTimeout
            (
                () =>
                {
                    this.timer = undefined;
                    this.onEnd();
                },
                this.span
            );
        }
        isInTimer = () => undefined !== this.timer;
    }
}

