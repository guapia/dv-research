namespace android.graphics {

    /**
     * Point holds two integer coordinates
     */
    export class Point {
        public x: number;
        public y: number;



        public constructor(x?: number, y?: number) {
            if(!isNaN(x)){
                this.x = x;
            }else{
                this.x = 0;
            }
                
            if(!isNaN(y)){
                this.y = y;
            }else {
                this.y = 0;
            }

        }

        /**
         * Set the point's x and y coordinates
         */
        public set(x: number, y: number): void {
            this.x = x;
            this.y = y;
        }

        /**
         * Negate the point's coordinates
         */
        public negate() {
            this.x = -this.x;
            this.y = -this.y;
        }

        /**
         * Offset the point's coordinates by dx, dy
         */
        public offset(dx: number, dy: number): void {
            this.x += dx;
            this.y += dy;
        }

        /**
         * Returns true if the point's coordinates equal (x,y)
         */
        public equals(x: number, y: number): boolean {
            return this.x == x && this.y == y;
        }

        public equalPoint(pt:Point){
            return this.equals(pt.x,pt.y);
        }


        public hashCode(): number {
            let result: number = this.x;
            result = 31 * result + this.y;
            return result;
        }


        public toString(): string {
            return "Point(" + this.x + ", " + this.y + ")";
        }

        /**
         * Parcelable interface methods
         */

        public describeContents(): number {
            return 0;
        }

        public clone(){
            return new Point(this.x,this.y);
        }

    }

}