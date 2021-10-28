import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { property } from 'src/app/model/property';
import { environment } from 'src/environments/environment';
import { IKeyValuePair } from '../model/IKeyValuePair';
import { IPropertybase } from '../model/IPropertybase';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  baseUrl= environment.baseUrl;
  constructor(private http :HttpClient) {}

  getAllCities():any{
    return this.http.get<string[]>('data/cities.json');
  }
  // getAllCities():Observable<string[]>{
  //   return this.http.get<string[]>(this.baseUrl +'city/cities');
  // }
  getPropertyTypes():Observable<IKeyValuePair[]>{
    return this.http.get<IKeyValuePair[]>('data/property.json');
  }
  // getPropertyTypes():Observable<IKeyValuePair[]>{
  //   return this.http.get<IKeyValuePair[]>(this.baseUrl + 'propertytype/list');
  // }
  getFurnishingTypes():Observable<IKeyValuePair[]>{
    return this.http.get<IKeyValuePair[]>('data/furnishing.json');
  }
  // getFurnishingTypes():Observable<IKeyValuePair[]>{
  //   return this.http.get<IKeyValuePair[]>(this.baseUrl + 'furnishingtype/list');
  // }
  getProperty(id:number){
    return this.getAllProperties(1).pipe(
      map(propertiesArray =>{
        //throw new Error("wwdwdw");
        return propertiesArray.find(p => p.id == id);
      }))
  }
  // getProperty(id:number){
  //   return this.http.get<property>(this.baseUrl+'property/detail/'+id.toString());
  // }
  // getAllProperties(sellRent?:number): Observable<property[]>{
  //   return this.http.get<property[]>(this.baseUrl +'property/list/'+sellRent.toString());
  // }

  getAllProperties(sellRent?: number): Observable<IPropertybase[]> {
    return this.http.get('data/properties.json').pipe(
      map(data => {
      const propertiesArray: Array<IPropertybase> = [];
      const localProperties = JSON.parse(localStorage.getItem('newProp'));

      if (localProperties) {
        for (const id in localProperties) {
          if (sellRent) {
          if (localProperties.hasOwnProperty(id) && localProperties[id].sellRent === sellRent) {
            propertiesArray.push(localProperties[id]);
          }
        } else {
          propertiesArray.push(localProperties[id]);
        }
        }
      }

      for (const id in data) {
        if (sellRent) {
          if (data.hasOwnProperty(id) && data[id].sellRent === sellRent) {
            propertiesArray.push(data[id]);
          }
          } else {
            propertiesArray.push(data[id]);
        }
      }
      return propertiesArray;
      })
    );

    return this.http.get<IPropertybase[]>('data/properties.json');
  }

  getPropertyAge(dateOfEstablishment: string):string {
      const today= new Date();
      const estDate= new Date(dateOfEstablishment);
      let age= today.getFullYear() - estDate.getFullYear();
      const m = today.getMonth() - estDate.getMonth();

      if(m< 0 || (m == 0 && today.getDate() < estDate.getDate())){
            age--;
      }

      if(today < estDate){
        return '0';
      }

      if(age === 0){
        return 'less than a year';
      }
      return age.toString();
  }
    addProperty(property: property) {
      let newProp = [property];

      // Add new property in array if newProp alreay exists in local storage
      if (localStorage.getItem('newProp')) {
        newProp = [property,
                            ...JSON.parse(localStorage.getItem('newProp'))];
      }

      localStorage.setItem('newProp', JSON.stringify(newProp));
    }
    // addProperty(property:property){
    //   const httpOptions={
    //     headers: new HttpHeaders({
    //       Authorization:'Bearer '+ localStorage.getItem('token')
    //     })
    //   };
    //   return this.http.post( this.baseUrl+ 'property/add', property,httpOptions);
    // }

    newPropId(){
      if(localStorage.getItem('PID'))
      {
        localStorage.setItem('PID',String(+localStorage.getItem('PID')+1));
        return +localStorage.getItem('PID');
      }
      else{
        localStorage.setItem('PID','101');
        return 101;
      }
    }
}
