
/// <reference path="../../../base.ts" />
namespace android.test.cartesian {
    import Padding = android.graphics.Padding;
    import Align = android.graphics.Align;
    import Gravity = android.graphics.Gravity;
    import AlignElement = android.graphics.AlignElement;
    import Margin = android.graphics.Margin;
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import ViewGroup = android.view.ViewGroup;
    import View = android.view.View;
    import Point = android.graphics.Point;
    import MeasureSpec = android.view.MeasureSpec;
    import LayoutParams = android.view.LayoutParams;
    import MotionEvent = android.view.event.MotionEvent;
    import FrameLayout = android.widget.FrameLayout;
    import LineaerLayout = android.widget.LinearLayout;
    import RenderType = android.graphics.RenderType;
    import Context = android.app.Context;
    import Device = android.device.Device;
    import Orientation = android.graphics.Orientation;
    import RootView = android.widget.RootView;
    import Util = android.graphics.Util;
    import Handler = android.util.Handler;
    import Message = android.util.Message;

    export const EventMessage:string = 'EventMessage';
    export class ChartLayout extends BaseChartLayout {

        private _chart: CartesianChart;
        private _legends: ScaleLegend|SeriesLegend[];
        private _dataModel: DataModel;
        
        constructor(context: Context) {
            super(context);
            this.clip = false;
            let handler :Handler = new Handler((msg:Message)=>{
                let types:ElementType =msg.args['types'];
                let info:any = msg.args['info'];
                // let pt 
                console.log(" " +  ", type " + types + " , info " + info);
                    if (types == ElementType.SeriesLegend) {
                        let series: string[] = this._dataModel.filter.series;
                        let index: number = series.indexOf(info.series);
                        if (info.action === 'enableseries') {
                            if (info.enable) {
                                if (index > -1) {
                                    this._dataModel.filter.series.splice(index, 1);
                                }
                            } else {
                                if (index < 0) {
                                    this._dataModel.filter.series.push(info.series);
                                }
                            }
                            this.perpareComparedAnimation()
                            this._dataModel.refresh();
                            this.setChart();
                            this.startCompare();
    
                        } else if (info.action === 'showlabel') {
                            this.requestLayout();
                        }
                    }
            });
            context.setArgs(EventMessage,handler);

            // let EventHandler = (pt: Point, types: ElementType, info: any) => {
            //     console.log(" " + pt.toString() + ", type " + types + " , info " + info);
            //     if (types == ElementType.SeriesLegend) {
            //         let series: string[] = this._dataModel.filter.series;
            //         let index: number = series.indexOf(info.series);
            //         if (info.action === 'enableseries') {
            //             if (info.enable) {
            //                 if (index > -1) {
            //                     this._dataModel.filter.series.splice(index, 1);
            //                 }
            //             } else {
            //                 if (index < 0) {
            //                     this._dataModel.filter.series.push(info.series);
            //                 }
            //             }

            //             this._dataModel.refresh();
            //             this.setChart();

            //         } else if (info.action === 'showlabel') {
            //             this.requestLayout();
            //         }
            //     }
            // }
            // window['EventHandler'] = EventHandler;
        }

        attachElement(element: HTMLElement, renderType:RenderType,datamodel?: DataModel,update?:boolean) {
            super.attachElement(element,Util.asEnum(renderType,RenderType));
            this.padding = new Padding(20);
            this._dataModel = datamodel;
            this.setChart();
        }

        public beginLoadingAnimation() {
            if(this.getContext() != null){
                let comparedAnimationCache :ComparedAnimationCache=this.getContext().getArgs('comparedanimation');
                if(comparedAnimationCache != null){
                    comparedAnimationCache.clear();
                }
            }
            this._chart.beginLoadingAnimation();
        }

        setChart() {
            this.removeAllViews();
            this._chart = new CartesianChart(this.getContext(), null, ChartType.Bar);
            this._chart.layoutParams.width = LayoutParams.MATCH_PARENT;
            this._chart.layoutParams.height = LayoutParams.MATCH_PARENT;

            this._chart.datamodel = this._dataModel;
            this._chart.gravity = Gravity.Bottom;
            this.setMainLayout(this._chart);
            if (this._dataModel.allSeries.length > 1) {
                let legend = new SeriesLegend(this.getContext(),'bar');
                legend.series = this._dataModel.allSeries;
                legend.gravity = Gravity.Bottom;
                legend.layoutParams.margin.marginLeft=0;
                legend.layoutParams.margin.marginTop=20;
                legend.layoutParams.width = LayoutParams.WRAP_CONTENT;
                legend.layoutParams.height = LayoutParams.WRAP_CONTENT;
                this.addLegend(legend);
                
            } else if (this._dataModel.series.length == 1) {
                // this._horizontallegend.series = datamodel._getScaleByName('color',datamodel.series[0].name);
            }
            if(this._dataModel != null){
                for(let scaleinfo of this._dataModel.scalePairs){
                    if(scaleinfo.filed.name =='color'){
                        let legend:ScaleLegend = new ScaleLegend(this.getContext(),'color');
                        legend.scale = scaleinfo.scale;
                        legend.layoutParams.width = 200;
                        legend.layoutParams.height = 30;
                        legend.gravity = Gravity.Top;
                        legend.layoutParams.margin.marginLeft=100;
                        legend.layoutParams.margin.marginBottom=20;
                        
                        this.addLegend(legend);
                    }
                }
            }
            // if (legend != null) {
            //     // _horizontallegend.setOrientation(Orientation.Horizontal);
                
            // }
        }

        oninvalidate(){
            // let comparedanimationcache :ComparedAnimationCache =this.getContext().getArgs('comparedanimation');
            // if( comparedanimationcache!= null && comparedanimationcache.getPreparing()) {
            //     return;
            // }
            super.oninvalidate();
        }

        public dispatchDraw(canvas: Canvas): void {
            
            super.dispatchDraw(canvas);
            var rect = this.layoutInfo.outterrect;
            canvas.drawRect(rect.startPoint, rect.endPoint, false, this.background);
        }

        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            return super.onMeasure(width, height, canvas);
        }

        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            super.onLayout(l, t, r, b, canvas);
        }
        
        public addView(view: View, index: number): number {
            super.addView(view, index);
            return 0;
        }

    }
}