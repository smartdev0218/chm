import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';

const apiPrefix = (isDevMode()) ? '/chm/backend/' : '/chm/';

@Injectable()
export class ReportsService extends ChmHttp {

	constructor(
		private http: AuthHttp,
		private store: StoreService) {
		super();
	}

	private geBaseUrl() {
		return this.store.getSitesUrl() + 'models';
	}

	// GET /sites/{idSite}/reports/top-five-products
	getTop5ProductsByChannel() {
		return <Observable<any>>this.http
			.get(`${this.store.getSitesUrl()}reports/top-five-products`)
			.map(res => this.extractData<Object[]>(res));
	}

	loadChartTop5ProductsByChannel(top5products) {

		var backgroundColors = [
			'rgba(230, 25, 75, 0.2)',
			'rgba(60, 180, 75, 0.2)',
			'rgba(255, 225, 25, 0.2)',
			'rgba(0, 130, 200, 0.2)',
			'rgba(245, 130, 48, 0.2)',
			'rgba(145, 30, 180, 0.2)',
			'rgba(70, 240, 240, 0.2)',
			'rgba(240, 50, 230, 0.2)',
			'rgba(210, 245, 60, 0.2)',
			'rgba(250, 190, 190, 0.2)',
			'rgba(0, 128, 128, 0.2)',
			'rgba(230, 190, 255, 0.2)',
			'rgba(170, 110, 40, 0.2)',
			'rgba(255, 250, 200, 0.2)',
			'rgba(128, 0, 0, 0.2)',
			'rgba(170, 255, 195, 0.2)',
			'rgba(128, 128, 0, 0.2)',
			'rgba(255, 215, 180, 0.2)',
			'rgba(0, 0, 128, 0.2)',
			'rgba(128, 128, 128, 0.2)',
			'rgba(255, 255, 255, 0.2)',
			'rgba(0, 0, 0, 0.2)'
		];
		var borderColors = [
			'rgba(230, 25, 75, 1)',
			'rgba(60, 180, 75, 1)',
			'rgba(255, 225, 25, 1)',
			'rgba(0, 130, 200, 1)',
			'rgba(245, 130, 48, 1)',
			'rgba(145, 30, 180, 1)',
			'rgba(70, 240, 240, 1)',
			'rgba(240, 50, 230, 1)',
			'rgba(210, 245, 60, 1)',
			'rgba(250, 190, 190, 1)',
			'rgba(0, 128, 128, 1)',
			'rgba(230, 190, 255, 1)',
			'rgba(170, 110, 40, 1)',
			'rgba(255, 250, 200, 1)',
			'rgba(128, 0, 0, 1)',
			'rgba(170, 255, 195, 1)',
			'rgba(128, 128, 0, 1)',
			'rgba(255, 215, 180, 1)',
			'rgba(0, 0, 128, 1)',
			'rgba(128, 128, 128, 1)',
			'rgba(255, 255, 255, 1)',
			'rgba(0, 0, 0, 1)'
		];

		var dataLabels = [];
		for (var i = 0; i < top5products.length; i++) {
			dataLabels.push(top5products[i].name);
		}
		var datasets = [];
		var allLabels = [];
		var colorsByLabel = [];
		var bordersByLabel = [];

		for (var i = 0; i < top5products.length; i++) {
			for (var j = 0; j < top5products[i].sellsPerChannel.length; j++) {
				if (!allLabels.includes(top5products[i].sellsPerChannel[j].channelName)) {
					allLabels.push(top5products[i].sellsPerChannel[j].channelName);
					colorsByLabel.push(backgroundColors[i]);
					bordersByLabel.push(borderColors[i]);
				}
			}

		}

		for (var i = 0; i < allLabels.length; i++) {
			var data = [];

			for (var j = 0; j < top5products.length; j++) {
				for (var k = 0; k < top5products[j].sellsPerChannel.length; k++) {
					if (top5products[j].sellsPerChannel[k].channelName === allLabels[i]) {
						data.push(top5products[j].sellsPerChannel[k].numSells);
					}
				}
			}

			var dataset = {
				label: allLabels[i],
				data: data,
				backgroundColor: backgroundColors[i],
				borderColor: borderColors[i],
				borderWidth: 1
			}

			datasets.push(dataset);
		}


		var Chart = require('chart.js');
		var ctx = document.getElementById("chartTop5ProductsByChannel");
		var chartTop5ProductsByChannel = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: dataLabels,
				datasets: datasets
			},
			options: {
				scales: {
					yAxes: [{
						stacked: true,
						ticks: {
							beginAtZero: true
						}
					}],
					xAxes: [{
						stacked: true
					}]
				}
			}
		});
	}


	// GET /sites/{idSite}/reports/top-fifteen
	getTopFifteen() {
		return <Observable<any>>this.http
			.get(`${this.store.getSitesUrl()}reports/top-fifteen`)
			.map(res => this.extractData<Object[]>(res));
	}

	loadChartTopFifteen(topFifteen) {
		var backgroundColors = [
			'rgba(230, 25, 75, 0.2)',
			'rgba(60, 180, 75, 0.2)',
			'rgba(255, 225, 25, 0.2)',
			'rgba(0, 130, 200, 0.2)',
			'rgba(245, 130, 48, 0.2)',
			'rgba(145, 30, 180, 0.2)',
			'rgba(70, 240, 240, 0.2)',
			'rgba(240, 50, 230, 0.2)',
			'rgba(210, 245, 60, 0.2)',
			'rgba(250, 190, 190, 0.2)',
			'rgba(0, 128, 128, 0.2)',
			'rgba(230, 190, 255, 0.2)',
			'rgba(170, 110, 40, 0.2)',
			'rgba(255, 250, 200, 0.2)',
			'rgba(128, 0, 0, 0.2)',
			'rgba(170, 255, 195, 0.2)',
			'rgba(128, 128, 0, 0.2)',
			'rgba(255, 215, 180, 0.2)',
			'rgba(0, 0, 128, 0.2)',
			'rgba(128, 128, 128, 0.2)',
			'rgba(255, 255, 255, 0.2)',
			'rgba(0, 0, 0, 0.2)'
		];
		var borderColors = [
			'rgba(230, 25, 75, 1)',
			'rgba(60, 180, 75, 1)',
			'rgba(255, 225, 25, 1)',
			'rgba(0, 130, 200, 1)',
			'rgba(245, 130, 48, 1)',
			'rgba(145, 30, 180, 1)',
			'rgba(70, 240, 240, 1)',
			'rgba(240, 50, 230, 1)',
			'rgba(210, 245, 60, 1)',
			'rgba(250, 190, 190, 1)',
			'rgba(0, 128, 128, 1)',
			'rgba(230, 190, 255, 1)',
			'rgba(170, 110, 40, 1)',
			'rgba(255, 250, 200, 1)',
			'rgba(128, 0, 0, 1)',
			'rgba(170, 255, 195, 1)',
			'rgba(128, 128, 0, 1)',
			'rgba(255, 215, 180, 1)',
			'rgba(0, 0, 128, 1)',
			'rgba(128, 128, 128, 1)',
			'rgba(255, 255, 255, 1)',
			'rgba(0, 0, 0, 1)'
		];

		var dataLabels = [];
		for (var i = 0; i < topFifteen.length; i++) {
			dataLabels.push(topFifteen[i].name);
		}

		var datasets = [];
		var allLabels = [];
		var colorsByLabel = [];
		var bordersByLabel = [];

		for (var i = 0; i < topFifteen.length; i++) {
			for (var j = 0; j < topFifteen[i].sellsPerChannel.length; j++) {
				if (!allLabels.includes(topFifteen[i].sellsPerChannel[j].channelName)) {
					allLabels.push(topFifteen[i].sellsPerChannel[j].channelName);
					colorsByLabel.push(backgroundColors[i]);
					bordersByLabel.push(borderColors[i]);
				}
			}

		}

		for (var i = 0; i < allLabels.length; i++) {
			var data = [];

			for (var j = 0; j < topFifteen.length; j++) {
				for (var k = 0; k < topFifteen[j].sellsPerChannel.length; k++) {
					if (topFifteen[j].sellsPerChannel[k].channelName === allLabels[i]) {
						data.push(topFifteen[j].sellsPerChannel[k].numSells);
					}
				}
			}

			var dataset = {
				label: allLabels[i],
				data: data,
				backgroundColor: backgroundColors[i],
				borderColor: borderColors[i],
				borderWidth: 1
			}

			datasets.push(dataset);
		}

		var Chart = require('chart.js');
		var ctx = document.getElementById("chartTopFifteen");
		var chartTop5ProductsByChannel = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: dataLabels,
				datasets: datasets
			},
			options: {
				scales: {
					yAxes: [{
						stacked: true,
						ticks: {
							beginAtZero: true
						}
					}],
					xAxes: [{
						stacked: true
					}]
				}
			}
		});
	}


	// GET /sites/{idSite}/reports/average-ticket
	getAverageTicket() {
		return <Observable<any>>this.http
			.get(`${this.store.getSitesUrl()}reports/average-ticket`)
			.map(res => this.extractData<Object[]>(res));
	}

	loadChartAverageTicket(averageTicket) {

		var backgroundColors = [
			'rgba(230, 25, 75, 0.2)',
			'rgba(60, 180, 75, 0.2)',
			'rgba(255, 225, 25, 0.2)',
			'rgba(0, 130, 200, 0.2)',
			'rgba(245, 130, 48, 0.2)',
			'rgba(145, 30, 180, 0.2)',
			'rgba(70, 240, 240, 0.2)',
			'rgba(240, 50, 230, 0.2)',
			'rgba(210, 245, 60, 0.2)',
			'rgba(250, 190, 190, 0.2)',
			'rgba(0, 128, 128, 0.2)',
			'rgba(230, 190, 255, 0.2)',
			'rgba(170, 110, 40, 0.2)',
			'rgba(255, 250, 200, 0.2)',
			'rgba(128, 0, 0, 0.2)',
			'rgba(170, 255, 195, 0.2)',
			'rgba(128, 128, 0, 0.2)',
			'rgba(255, 215, 180, 0.2)',
			'rgba(0, 0, 128, 0.2)',
			'rgba(128, 128, 128, 0.2)',
			'rgba(255, 255, 255, 0.2)',
			'rgba(0, 0, 0, 0.2)'
		];
		var borderColors = [
			'rgba(230, 25, 75, 1)',
			'rgba(60, 180, 75, 1)',
			'rgba(255, 225, 25, 1)',
			'rgba(0, 130, 200, 1)',
			'rgba(245, 130, 48, 1)',
			'rgba(145, 30, 180, 1)',
			'rgba(70, 240, 240, 1)',
			'rgba(240, 50, 230, 1)',
			'rgba(210, 245, 60, 1)',
			'rgba(250, 190, 190, 1)',
			'rgba(0, 128, 128, 1)',
			'rgba(230, 190, 255, 1)',
			'rgba(170, 110, 40, 1)',
			'rgba(255, 250, 200, 1)',
			'rgba(128, 0, 0, 1)',
			'rgba(170, 255, 195, 1)',
			'rgba(128, 128, 0, 1)',
			'rgba(255, 215, 180, 1)',
			'rgba(0, 0, 128, 1)',
			'rgba(128, 128, 128, 1)',
			'rgba(255, 255, 255, 1)',
			'rgba(0, 0, 0, 1)'
		];



		var dataLabels = [];
		for (var i = 0; i < averageTicket.length; i++) {
			dataLabels.push(averageTicket[i].channelName);
		}

		var datasets = [];

		for (var i = 0; i < averageTicket.length; i++) {
			var data = [];
			var backgroundColor = [];
			var borderColor = [];
			for (var j = 0; j < averageTicket.length; j++) {
				if (i == j)
					data.push(averageTicket[j].amount);
				else
					data.push(0);
				backgroundColor.push(backgroundColors[i]);
				borderColor.push(borderColors[i]);
			}
			var dataset = {
				label: averageTicket[i].channelName,
				data: data,
				backgroundColor: backgroundColor,
				borderColor: borderColor,
				borderWidth: 1
			}
			datasets.push(dataset);
		}

		var Chart = require('chart.js');
		var ctx = document.getElementById("chartAverageTicket");
		console.log(datasets);
		var chartTop5ProductsByChannel = new Chart(ctx, {
			type: 'horizontalBar',
			data: {
				labels: dataLabels,
				datasets: datasets
			},
			options: {
				scales: {
					yAxes: [{
						stacked: true,
						ticks: {
							beginAtZero: true
						}
					}],
					xAxes: [{
						stacked: true
					}]
				}
			}
		});
	}


	// GET /sites/{idSite}/reports/sells-evolutions
	getSellsEvolution() {
		return <Observable<any>>this.http
			.get(`${this.store.getSitesUrl()}reports/sells-evolution`)
			.map(res => this.extractData<Object[]>(res));
	}

	loadChartSellsEvolution(sellsEvolution) {

		var borderColors = [
			'rgba(230, 25, 75, 1)',
			'rgba(60, 180, 75, 1)',
			'rgba(255, 225, 25, 1)',
			'rgba(0, 130, 200, 1)',
			'rgba(245, 130, 48, 1)',
			'rgba(145, 30, 180, 1)',
			'rgba(70, 240, 240, 1)',
			'rgba(240, 50, 230, 1)',
			'rgba(210, 245, 60, 1)',
			'rgba(250, 190, 190, 1)',
			'rgba(0, 128, 128, 1)',
			'rgba(230, 190, 255, 1)',
			'rgba(170, 110, 40, 1)',
			'rgba(255, 250, 200, 1)',
			'rgba(128, 0, 0, 1)',
			'rgba(170, 255, 195, 1)',
			'rgba(128, 128, 0, 1)',
			'rgba(255, 215, 180, 1)',
			'rgba(0, 0, 128, 1)',
			'rgba(128, 128, 128, 1)',
			'rgba(255, 255, 255, 1)',
			'rgba(0, 0, 0, 1)'
		];

		var dataLabels = [];
		for (var i = 0; i < sellsEvolution.length; i++) {
			dataLabels.push(sellsEvolution[i].period);
		}
		var datasets = [];
		for (var i = 0; i < sellsEvolution[0].sells.length; i++) {
			var data = [];
			for (var j = 0; j < sellsEvolution.length; j++) {
				data.push(sellsEvolution[j].sells[i].numSells);
			}
			var dataset = {
				label: sellsEvolution[0].sells[i].channelName,
				data: data,
				borderColor: borderColors[i],
				fill: false
			}
			datasets.push(dataset);
		}

		var Chart = require('chart.js');
		var ctx = document.getElementById("chartSellsEvolution");
		var chartSellsEvolution = new Chart(ctx, {
			type: 'line',
			data: {
				labels: dataLabels,
				datasets: datasets
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}],
					xAxes: [{
					}]
				}
			}
		});
	}
}
