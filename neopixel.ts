
namespace light {

    export class RandomAnimation extends light.NeoPixelAnimation {
        public rgb: number;
        public delay: number;

        private i: number;
        private reveal: boolean;

        constructor(rgb: number, delay: number) {
            super();
            this.rgb = rgb;
            this.delay = delay;

            this.i = 100;
            this.reveal = true;
        }

        public showFrame(strip: NeoPixelStrip): void {
            const l = strip.length();
            if (this.start < 0) this.start = control.millis();
            const now = control.millis() - this.start;
            strip.setAll(light.fade(this.rgb, this.i % 255))
            strip.show()
            this.i += 10
        }
    }

    export class ColorCycleAnimation extends light.NeoPixelAnimation {
        public rgb: number[];
        public delay: number;

        private i: number;
        private reveal: boolean;

        constructor(rgb: number[], delay: number) {
            super();
            this.rgb = rgb;
            this.delay = delay;

            this.i = 0;
        }

        public showFrame(strip: NeoPixelStrip): void {
            let l = this.rgb.length;
            strip.setAll(light.fade(this.rgb[this.i], Math.randomRange(0, 100)))
            strip.show();
            if (this.i < l) {
                this.i++;
            } else {
                this.i = 0;
            }
            loops.pause(this.delay);
        }
    }


    export class FireAnimation extends light.NeoPixelAnimation {
        public rgb: number;
        public delay: number;

        private i: number;
        private reveal: boolean;

        constructor(rgb: number, delay: number) {
            super();
            this.rgb = rgb;
            this.delay = delay;

            this.i = 0;
        }

        public showFrame(strip: NeoPixelStrip): void {
            const l = strip.length();
            strip.setPixelColor(this.i, light.fade(this.rgb, 255 - this.i * 400 / l));
            strip.setPixelColor(l - this.i, light.fade(this.rgb, 255 - this.i * 400 / l));
            strip.show();
            if (this.i < l / 2) {
                this.i++;
            } else {
                this.i = 0;
                strip.clear()
            }
            loops.pause(this.delay);
        }
    }

    export class FadeOutAnimation extends light.NeoPixelAnimation {
        public rgb: number;
        public delay: number;

        private i: number;
        private reveal: boolean;

        constructor(rgb: number, delay: number) {
            super();
            this.rgb = rgb;
            this.delay = delay;

            this.i = 0;
        }

        public showFrame(strip: NeoPixelStrip): void {
            const l = strip.length();
            strip.setAll(light.fade(this.rgb, 200 - this.i * 50 / l));
            strip.show();
            if (this.i < l * 4) {
                this.i++;
            } else {
                this.i = 0;
            }
            loops.pause(this.delay);
        }
    }

    export class FadeInOutAnimation extends light.NeoPixelAnimation {
        public rgb: number;
        public delay: number;

        private i: number;
        private reveal: boolean;

        constructor(rgb: number, delay: number) {
            super();
            this.rgb = rgb;
            this.delay = delay;

            this.i = 0;
            this.reveal = true;
        }

        public showFrame(strip: NeoPixelStrip): void {
            const l = strip.length();
            strip.setAll(light.fade(this.rgb, 200 - (this.reveal ? this.i : l * 4 - this.i) * 50 / l));
            strip.show();
            if (this.i < l * 4) {
                this.i++;
            } else {
                this.i = 0;
                this.reveal = !this.reveal;
            }
            loops.pause(this.delay);
        }
    }
}

namespace LightAnimation {
    //% blockImage=1s
    //% block="halloween yellow"
    export const HalloweenYellow = new light.RandomAnimation(0xFF4500, 100)
    
    //% blockImage=1s
    //% block="halloween spooky"
    export const HalloweenSpooky = new light.ColorCycleAnimation([0xFF0000, 0xFF4500], 100)
    
    //% blockImage=1s
    //% block="halloween fire"
    export const HalloweenFire = new light.FireAnimation(0xFF0000, 50)
    
    //% blockImage=1s
    //% block="halloween blue"
    export const HalloweenBlue = new light.FadeInOutAnimation(0x0000FF, 5)
    
    //% blockImage=1s
    //% block="halloween green"
    export const HalloweenGreen = new light.FadeOutAnimation(0x00FF00, 5)

    //% blockImage=1s
    //% block="halloween purple"
    export const HalloweenPurple = new light.FadeInOutAnimation(0x330033, 5)
}