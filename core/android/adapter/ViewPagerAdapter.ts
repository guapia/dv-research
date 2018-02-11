/// <reference path="../database/DataSetObservable.ts" />

namespace android.adapter {
    import DataSetObservable  = android.database.DataSetObservable;
    import DataSetObserver = android.database.DataSetObserver;
    import View = android.view.View;
    export abstract class ViewPageAdapter {
    private mDataSetObservable :DataSetObservable =new DataSetObservable();
	private mViewCache :Array<ViewInfo>  = new Array<ViewInfo>();
	private  mShouldCache :boolean= false;

	public XBaseAdapter() {
	}

	/************************************* don't use this  **********************************************/

	 registerDataSetObserver(observer:DataSetObserver ) {
		this.mDataSetObservable.registerObserver(observer);
	}

	 unregisterDataSetObserver(observer:DataSetObserver ) {
		this.mDataSetObservable.unregisterObserver(observer);
	}

	/**********************************************************************************************/

	public notifyDataSetChanged() {
		this.mDataSetObservable.notifyChanged();
	}
	
	public  notifyDataSetInvalidated() {
		this.mDataSetObservable.notifyInvalidated();
	}
	/***
	 * set cache
	 * 
	 * @param enable
	 */
	public  setCacheEnable( enable:boolean) {
		this.mShouldCache = enable;
		if (!this.mShouldCache) {
			this.mViewCache.length =0;
		}
	}

	public abstract  getCount():number;


	public abstract  getItem( position:number):any;

	public abstract  destoryItem(position:number,  container:View);

	public abstract  instantiateItem( position:number,
			container:View, contentView:View):View;

	 initItem(position:number,  container:View):View {
		let view:View = null;
		if (this.mShouldCache) {
			for (let i:number = 0; i < this.mViewCache.length; ++i) {
                let info:ViewInfo  = this.mViewCache[i];
				if (info != null && info.position == position) {
					view = info.view;
					if (view != null) {
						return this.instantiateItem(position, container, view);
					}
				}
			}
			if (view == null) {
				view = this.instantiateItem(position, container, null);
			}
			this.mViewCache.push(new ViewInfo(view, position));
		}
		if (view == null) {
			view = this.instantiateItem(position, container, null);
		}
		return view;
	}
	/**
	 * unuseful methods currently
	 */

	public   beginUpdata(){}

	/**
	 * unuseful methods currently
	 */

	public   finishUpdata(){}

	
    }
    export class ViewInfo {
		view:View;
		position:number;

		constructor( v:View,  pos:number) {
			this.view = v;
			this.position = pos;
		}
	}
}