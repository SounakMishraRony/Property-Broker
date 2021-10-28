import { Component, Input } from "@angular/core";
import { IPropertybase } from "src/app/model/IPropertybase";

@Component({
  selector:'app-property-card',
  templateUrl:'property-card.component.html',
  styleUrls:['property-card.component.css']
})
export class PropertyCardComponent
{
@Input() property_name:IPropertybase;
@Input() hideIcons:boolean;

}
