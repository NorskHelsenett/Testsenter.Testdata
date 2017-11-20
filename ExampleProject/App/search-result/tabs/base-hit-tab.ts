import { Input, EventEmitter, Output } from "@angular/core";
import {HitInformation, ChildViews, Detail } from "../../models/UtilityModels";

export abstract class BaseHitTab<T> {

    @Input()
    item: T;

    @Output()
    _showDetails = new EventEmitter();
    
    public information:HitInformation = <HitInformation>{
        details: [],
        faded: false
    };

    public childviews = ChildViews;

    showDetails(view: ChildViews, data:string) {
        this._showDetails.emit({ view: view, data: data });
    }

    showJsonDetails(data: string) {
        this._showDetails.emit({view:ChildViews.Json, data:data});
    }

    protected addDetail(description?: string, value?: string | number, extra?: string, children?: HitInformation[], info = this.information) {
        if (value == undefined)
            return;
        info.details.push((<Detail>
        {
            description: description,
            value: value,
            extra: extra,
            children: children
        }));
    }
}