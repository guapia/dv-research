namespace android.graphics {

    export class Margin {
        marginLeft: number;
        marginRight: number;
        marginTop: number;
        marginBottom: number;
        constructor(marginLeft: number,
            marginRight: number,
            marginTop: number,
            marginBottom: number) {
            this.marginLeft = marginLeft;
            this.marginTop = marginTop;
            this.marginRight = marginRight;
            this.marginBottom = marginBottom
        }
        getStartXMargin() {
            if (this.marginRight > 0 && !this.marginLeft) {
                return -this.marginRight;
            }
            return this.marginLeft;
        }
        getStartYMargin() {
            if (this.marginBottom > 0 && !this.marginTop) {
                return -this.marginBottom;
            }
            return this.marginTop;
        }

    }

}