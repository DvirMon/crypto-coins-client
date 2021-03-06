import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChartData, ChartService } from 'src/app/services/chart.service';
import { ChartCardModel } from 'src/app/utilities/models/chart-card.mode';
import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';
import { CoinModel } from 'src/app/utilities/models/coin.model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss']
})
export class ChartCardComponent implements OnInit {

  @Input() card: ChartCardModel;

  public chartData$: Observable<ChartData> = this.chartService.chartData$
  public selectedCoins: CoinModel[] = [];
  public currencies: string[] = [];
  public coinToDelete: CoinModel = CoinModel.create();

  private ids: string[] = [];
  private currentHistoryCoin: string;

  constructor(
    private chartService: ChartService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscribeToStore()
    this.subscribeToCoinId()
    this.handleChartData()
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.handleLineHistoryChartData(this.selectedCoins[0].id)
    }, 1000)
  }


  // HTTP SECTION

  private handleChartData() {

    if (this.selectedCoins.length === 0) {
      this.router.navigateByUrl("/coins")
    }

    this.chartService.getChartData(this.ids).subscribe(
      (chartData: ChartData) => {
        this.currencies = chartData.currencies
      }
    )
  }


  // SUBSCRIPTION SECTION

  private subscribeToStore() {
    store.subscribe(
      () => {
        this.selectedCoins = store.getState().coins.selectedCoins
        this.ids = store.getState().coins.selectedCoins.map((coin: CoinModel) => {
          return coin.id
        })
      })
    this.selectedCoins = store.getState().coins.selectedCoins
    this.ids = store.getState().coins.selectedCoins.map((coin: CoinModel) => {
      return coin.id
    })
  }

  // DELETE COIN WHEN TOGGLE
  private subscribeToCoinId() {
    this.chartService.deleteCoin.subscribe(
      (coin: CoinModel) => {

        if (coin) {
          this.coinToDelete = coin
          this.handleChartData()
        }
      }
    )
  }

  // LOGIC SECTION

  // Change chart data by coin currency
  public handleCurrencyChange(payload: { type: string, currency: string }) {


    this.card.currentCurrency = payload.currency.toUpperCase()


   if (this.card.type === "history") {
      this.handleLineHistoryChartData(this.currentHistoryCoin)
    }

  }

  // Change chart data by coin

  public handleCoinChange(payload: { type: string, coin: string }) {
    this.handleLineHistoryChartData(payload.coin)
  }

  // handle history chart subject
  private handleLineHistoryChartData(coinId: string) {
    this.currentHistoryCoin = coinId
    this.chartService.historyCoin.next({ coinId, currency: this.card.currentCurrency })
  }






}
