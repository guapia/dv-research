/// <reference path="../../base.ts" />

namespace android.test.map{
    'use strict';
    export class FlightParser{
        private __data:any[];
        get data():any[]{
            return this.__data;
        }
        
        private __airportsFields:string[];
        private __airlinesFields:string[];
        private __airports:string[][];
        private __airlines:string[][];
        private __routes:number[][];
        
        constructor(originaldata:any){
            
            this.__airportsFields =  _.cloneDeep(originaldata.airportsFields);
            this.__airlinesFields = _.cloneDeep(originaldata.airlineFields);
            this.__airports = _.cloneDeep(originaldata.airports);
            this.__airlines = _.cloneDeep(originaldata.airlines);
            this.__routes = _.cloneDeep(originaldata.routes);
            this._analyse();
        }
        private _analyse(){
            let airlines:any[] = this.__airlines.map( (item)=>{
                let result:any ={};
                for(let i= 0; i < item.length; ++i){
                    result[this.__airlinesFields[i]]=item[i];
                }
                return result;
            });
            let airports:any[] = this.__airports.map( (item)=>{
                let result:any ={};
                for(let i= 0; i < item.length; ++i){
                    result[this.__airportsFields[i]]=item[i];
                }
                return result;
            });
            this.__data  = this.__routes.map((item) =>{
                let result :{start:any,end:any}={start:{},end:{}};
                let line:any = airlines[item[0]];
                let port1:any = airports[item[1]];
                let port2:any = airports[item[2]];
                for(let key in line){
                    result['start'][key] = line[key];
                    result['end'][key] = line[key];
                }
                for(let key in port1){
                    result['start'][key]= port1[key];
                }
                for(let key in port2){
                    result['end'][key]= port2[key];
                }
                return result;
            });
            
        }
    }
}