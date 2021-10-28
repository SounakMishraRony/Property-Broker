import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertybase } from 'src/app/model/IPropertybase';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  Properties: Array<IPropertybase> =[];
  //Properties: any = null;
  city = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';
  constructor(private route:ActivatedRoute,private propertyService:PropertyService,private http:HttpClient) {}
  sellRent:number = 1;
  
  ngOnInit(): void {
    if(this.route.snapshot.url.toString()){
      this.sellRent=2;
    }
    this.propertyService.getAllProperties(this.sellRent).subscribe(
      data =>{
        this.Properties =data;
      },error =>  {
        console.log('HttpError'+ error);
      }
    );
  }
  onCityFilter() {
    this.SearchCity = this.city;
  }

  onCityFilterClear() {
    this.SearchCity = '';
    this.city = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
}
