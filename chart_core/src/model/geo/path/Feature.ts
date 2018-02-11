/// <reference path="../../../base.ts" />

namespace android.test.map {
    'use strict';
    import Util = android.graphics.Util;
    export enum GeoType {
        Point,
        MultiPoint,
        LineString,
        MultiLineString,
        Polygon,
        MultiPolygon,
        GeometryCollection,
        Feature,
        FeatureCollection
    }
    export class Feature {
        id:string;
        name:string;
        properties: any;
        streams: Stream[];
        projection: Projection;
        constructor() {
        }
        parseFeature(feature: any): void {
            if(this.projection != null){
                this.properties = feature.properties;
                let geometry: any = feature.geometry;
                this.parseName(this.properties);
                this.streams = [];
                if (geometry != null) {
                    let geometry_type = Util.asEnum(geometry.type, GeoType, true);
                    let coordinates: any = geometry.coordinates;
                    switch (geometry_type) {
                        case GeoType.Point:
                            this.streams.push(this._createPointStream(coordinates));
                            break;
                        case GeoType.MultiPoint:
                            this.streams = this.streams.concat(this._createMultiPointStream(coordinates));
                            break;
                        case GeoType.LineString:
                            this.streams.push(this._createLineStream(coordinates));
                            break;
                        case GeoType.MultiLineString:
                            this.streams = this.streams.concat(this._createMultiLineStream(coordinates));
                            break;
                        case GeoType.Polygon:
                            this.streams.push(this._createAreaStream(coordinates));
                            break;
                        case GeoType.MultiPolygon:
                            this.streams = this.streams.concat(this._createMultiAreaStream(coordinates));
                            break;
                    }
                }
            }
        }
        parseName(prop:any){
            if(prop != null){
                this.name = prop.name;
                if(this.name == null){
                    this.name = prop.NAME;
                }
            }
        }

        private _createPointStream(coordinates: any): PointStream {
            let pointStream: PointStream = new PointStream();
            pointStream.setProjection(this.projection);
            pointStream.parseStream(coordinates);
            return pointStream;
        }

        private _createLineStream(coordinates: any): LineStream {
            let lineStream: LineStream = new LineStream();
            lineStream.setProjection(this.projection);

            lineStream.parseStream(coordinates);
            return lineStream;
        }

        private _createAreaStream(coordinates: any): AreaStream {
            let areaStream: AreaStream = new AreaStream();
            areaStream.setProjection(this.projection);

            areaStream.parseStream(coordinates);
            return areaStream;
        }

        private _createMultiPointStream(coordinates: any): PointStream[] {
            let list: Stream[] = [];
            if (coordinates != null && coordinates instanceof Array) {
                for (let coorpt of coordinates) {
                    list.push(this._createPointStream(coorpt));
                }
            }
            return list;
        }

        private _createMultiLineStream(coordinates: any): LineStream[] {
            let list: Stream[] = [];

            if (coordinates != null && coordinates instanceof Array) {
                for (let coorpt of coordinates) {
                    list.push(this._createLineStream(coorpt));
                }
            }
            return list;
        }

        private _createMultiAreaStream(coordinates: any): AreaStream[] {
            let list: Stream[] = [];
            if (coordinates != null && coordinates instanceof Array) {
                for (let coorpt of coordinates) {
                    list.push(this._createAreaStream(coorpt));
                }
            }
            return list;

        }
    }
}