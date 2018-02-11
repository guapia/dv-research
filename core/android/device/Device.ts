namespace android.device {
    export class Device {
        private static _density: number = 0;
        private static _width: number = 0;
        private static _height: number = 0;
        
        static set width(value: number) {
            Device._width = value;
        }
        
        static set height(value: number) {
            Device._height = value;
        }

        static get width() {
            // return 340;
            if (Device._width == 0) {
                Device._width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            }
            return Device._width ;
        }

        static get height() {
            // return 620;
            if (Device._height == 0) {
                Device._height = (window.innerHeight > 0) ?
                    window.innerHeight : screen.height;
            }
            return Device._height ;
        }

        static get density() {
            if (Device._density === 0) {
                Device._density = Math.sqrt(Device.width * Device.width + Device.height * Device.height) / 160;
            }
            // return Device._density;
            return 1;
        }
    }

}