import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit,OnDestroy {
  prefixSrc:string="https://image.tmdb.org/t/p/w400"
  anonymousImage:string="https://p0.piqsels.com/preview/375/145/317/person-human-mask-head.jpg"
  page:number=1;
  totaltv:any;
  tvList:any[]=[]
  isLoading: boolean=true;
  subscription:any;
  constructor(private _MoviesService:MoviesService) { }
 
  ngOnInit(): void {
    this.subscription=this._MoviesService.getMedia("tv",this.page).subscribe((response)=>{
      this.tvList=response.results
      this.totaltv=response.total_results
      this.isLoading=false
    })
  }

  nextPage(page:number)
  {
    this._MoviesService.getMedia("tv",page).subscribe((response)=>{
      this.tvList=response.results
      this.totaltv=response.total_results
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
