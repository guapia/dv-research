/// <reference path="../view/implemention/ViewGroup.ts" />



namespace android.widget {

    import Padding = android.graphics.Padding;
    import Gravity = android.graphics.Gravity;
    import Rect = android.graphics.Rect;
    import AlignElement = android.graphics.AlignElement;
    import Margin = android.graphics.Margin;
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import ViewGroup = android.view.ViewGroup;
    import View = android.view.View;
    import Point = android.graphics.Point;
    import MeasureSpec = android.view.MeasureSpec;
    import Orientation = android.graphics.Orientation;
    import LayoutParams = android.view.LayoutParams;
    import Context = android.app.Context;
    import DataSetObserver = android.database.DataSetObserver;
    import Adapter = android.adapter.Adapter;
    export class ListView extends ViewGroup{
        constructor(context:Context){
            super(context);
        }

        setAdapter(adapter:Adapter){

        }
    }
}