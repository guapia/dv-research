namespace android.graphics {
    export class Size {
        width: number;
        height: number;
        constructor(w: number, h: number) {
            this.width = w;
            this.height = h;
        }
        clone(): Size {
            return new Size(this.width, this.height);
        }
        public hashCode():number{
            return this.width* 37213 + this.height;
        }
    }
}