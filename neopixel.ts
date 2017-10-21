
namespace light {

    export class HalloweenAnimation extends light.NeoPixelAnimation {
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
            this.reveal = true;
        }

        public showFrame(strip: NeoPixelStrip): void {
            let l = this.rgb.length;
            if (this.start < 0) this.start = control.millis();
            const now = control.millis() - this.start;
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


    export class HalloweenFireAnimation extends light.NeoPixelAnimation {
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
            if (this.start < 0) this.start = control.millis();
            const now = control.millis() - this.start;
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


    export class HalloweenFadeAnimation extends light.NeoPixelAnimation {
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
            if (this.start < 0) this.start = control.millis();
            const now = control.millis() - this.start;
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
}

namespace LightAnimation {
    //% blockImage=1s
    //% block="halloween"
    export const Halloween = new light.HalloweenAnimation(0xFF4500, 100)
    
    //% blockImage=1s
    //% block="halloween spooky"
    export const HalloweenColorCycle = new light.ColorCycleAnimation([0xFF0000, 0xFF4500], 100)
    
    //% blockImage=1s
    //% block="halloween fire"
    export const HalloweenFire = new light.HalloweenFireAnimation(0xFF0000, 50)
    
    //% blockImage=1s
    //% block="ghost"
    export const HalloweenGhost = new light.HalloweenFadeAnimation(0xFFFFFF, 30)
    
    //% blockImage=1s
    //% block="fire fade"
    export const HalloweenFireFade = new light.HalloweenFadeAnimation(0xFF4500, 5)
}