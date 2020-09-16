import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { SearchService } from 'src/app/services/search.service';
import { CoinModel } from 'src/app/utilities/models/coin-model';

@Component({
  selector: 'app-coins-panel-search',
  templateUrl: './coins-panel-search.component.html',
  styleUrls: ['./coins-panel-search.component.scss']
})
export class CoinsPanelSearchComponent implements OnInit {


  public searchEntries: CoinModel[];
  public progress : number

  constructor(
    private searchService: SearchService,
    private loaderService : LoaderService

  ) { }

  ngOnInit(): void {
    this.subscribeToSearchEntries()
    this.subscribeToLoader()
  }
  
    // SUBSCRIPTION SECTION
  private subscribeToSearchEntries() {
    this.searchService.searchEntries.subscribe(
      (searchEntries) => {
        this.searchEntries = searchEntries
      }
    )
  }

  private subscribeToLoader() {

    this.loaderService.loader.subscribe(
      (loader) => {
        this.progress = loader.progress
        // console.log(this.progress)
      }
    )
  }



}
