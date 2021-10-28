import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { property } from 'src/app/model/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId: number;
  public mainPhotoUrl: string=null;
  property= new property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private route:ActivatedRoute,private router:Router,private propertyService:PropertyService,private alertify:AlertifyService) { }

  ngOnInit(): void {
    // this.propertyId = +this.route.snapshot.params['id'];
    //     this.route.data.subscribe(
    //         (data: property) => {
    //             this.property = data['prp'];
    //             console.log(this.property);
    //         }
    //     );

      this.property.age= this.propertyService.getPropertyAge(this.property.estPossessionOn);

    this.route.params.subscribe(
      (params) =>
      {
        this.propertyId= +params['id'];
        this.propertyService.getProperty(this.propertyId).subscribe( (data:property) => {
          this.property = data;
          if(this.property == undefined){
            this.alertify.error("Newly added property details cant be shown in this static website.See local storage for details.")
          }
        });
      }
    );

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    //this.galleryImages=this.getPropertyPhoto();

    this.galleryImages = [
      {
        small: 'https://images.unsplash.com/photo-1578503439976-f0c1f7daf1cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        medium: 'https://images.unsplash.com/photo-1578503439976-f0c1f7daf1cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        big: 'https://images.unsplash.com/photo-1578503439976-f0c1f7daf1cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
      },
      {
        small: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG9tZSUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        medium: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG9tZSUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        big: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG9tZSUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
      },
      {
        small: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvbWUlMjBpbnRlcmlvcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        medium: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvbWUlMjBpbnRlcmlvcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        big: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvbWUlMjBpbnRlcmlvcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
      },{
        small: 'https://images.unsplash.com/photo-1609347744425-175ecbd3cc0e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aG9tZSUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        medium: 'https://images.unsplash.com/photo-1609347744425-175ecbd3cc0e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aG9tZSUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        big: 'https://images.unsplash.com/photo-1609347744425-175ecbd3cc0e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aG9tZSUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
      },
      {
        small: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbWUlMjBpbnRlcmlvcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        medium: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbWUlMjBpbnRlcmlvcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        big: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbWUlMjBpbnRlcmlvcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
      }
    ];

  }
  // OnChange(){
  //   this.propertyId +=1;
  //   this.router.navigate(['property-detail',this.propertyId]);
  // }
  getPropertyPhoto() :NgxGalleryImage[]{
    const photoUrls:NgxGalleryImage[]= [];
    for(const photo of this.property.photos){
      if(photo.isPrimary)
      {
        this.mainPhotoUrl=photo.imageUrl;
      }
      else{
        photoUrls.push(
          {
            small:photo.imageUrl,
            medium:photo.imageUrl,
            big:photo.imageUrl
          }
        );
      }
    }
    return photoUrls;
  }
}
