// Resources/Private/Source/Custom/Counter.ts
function Counter_default(Alpine) {
    Alpine.directive("counter", (el, { expression, modifiers }, { evaluate }) => {
        expression = evaluate(expression);
        let duration = 0;
        const modifierValue = modifiers[1];
        if (modifiers[0] == "duration" && modifierValue) {
            if (modifierValue.endsWith("ms")) {
                duration = parseInt(modifierValue);
            } else if (modifierValue.endsWith("s")) {
                duration = parseInt(modifierValue) * 1e3;
            }
        }
        Alpine.bind(el, {
            "x-data"() {
                return {
                    current: 0,
                    countTo: 0,
                };
            },
            "x-init"() {
                if (typeof expression !== "number") {
                    return;
                }
                this.countTo = expression;
                this.useEase = expression > 10;
                if (!duration) {
                    duration = this.useEase ? 2e3 : 1e3;
                }
                this.totalFrames = Math.round(duration / frameDuration);
            },
            "x-intersect.full.once"() {
                let frame = 0;
                const counter = rafInterval(() => {
                    frame++;
                    const progressValue = frame / this.totalFrames;
                    const progress = this.useEase ? ease(progressValue) : progressValue;
                    const currentCount = Math.round(this.countTo * progress);
                    if (this.current !== currentCount) {
                        this.current = currentCount;
                    }
                    if (frame === this.totalFrames) {
                        counter.clear();
                    }
                }, frameDuration);
            },
            "x-text"() {
                return formatThousands(this.current);
            },
        });
    });
}
var frameDuration = 1e3 / 60;
var dateNow = Date.now;
var raf = window.requestAnimationFrame;
function rafInterval(callback, delay) {
    let start = dateNow();
    let stop = false;
    const intervalFunc = () => {
        dateNow() - start < delay || ((start += delay), callback());
        stop || raf(intervalFunc);
    };
    raf(intervalFunc);
    return {
        clear: () => (stop = true),
    };
}
function formatThousands(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}
function ease(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}
export { Counter_default as default };
