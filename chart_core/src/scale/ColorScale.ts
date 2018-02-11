// /// <reference path="../base.ts" />
// namespace android.test {
    
    
//         export class ColorScale extends OrdinalScale {
//             private __colorranges:string[];

//             constructor(id?: any) {
//                 super(id);
//                 this.__colorranges =[];

//             }
         
//             get domains(): any[] {
//                 return this.__domains;
//             }
    
//             range(ranges: any[]) {
//                 if(ranges.length > 1){
//                     this.__colorranges =ColorUtils.gradientColor(ranges[0],ranges[ranges.length-1],this.__domains.length);

//                 }
//                 return super.range([0,this.__colorranges.length-1]);

//             }
//              rangeBounds(ranges: any[]) {
//                 if(ranges.length > 1){
//                     this.__colorranges =ColorUtils.gradientColor(ranges[0],ranges[ranges.length-1],this.__domains.length);
//                 }
//                 return super.range([0,this.__colorranges.length-1]);
//             }
//             getScaleValue(v: any):any {
//                 var index = this.__domains.indexOf(v);
//                 return this.__colorranges[index];
//             }
           
           
//         }
    
//     }