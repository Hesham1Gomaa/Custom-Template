import { Component,NgZone, OnInit  } from '@angular/core';
import { DashboardServices } from '../pages.services/home/home.services';
import { POsPerMonth } from '../pages.services/home/POsPerMonth';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit  {
   
    interval: any;
  allPosPerMonth:POsPerMonth[];
  colors:string[] = ["#4899B6","#D0AFE9","#48B691","#7CB648","#CDD86D","#D8946D", "#1762AC","#C156A1","#97DC9C","#B3F31D","#46502E","#CA5E16"];

  constructor(private zone: NgZone,private _DashboardServices:DashboardServices,private _Amchart:AmChartsService) {}
  
  

    ngOnInit() {    

        var chartData = generateChartData();
        function generateChartData() {
            var chartData = [];
            var firstDate = new Date();
            firstDate.setDate(firstDate.getDate() - 5);
            var visits = 1200;
            
            for (var i = 0; i < 10; i++) {
                var newDate = new Date(firstDate);
                newDate.setDate(newDate.getDate() + i);        
                visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
                chartData.push({
                    lineColor:"#4899B6",
                    date: newDate,
                    visits: visits
                });
            }
            return chartData;
        }

        //Get All Pos Per Month
        this._DashboardServices.getAllPosPerMonth().subscribe( data => {     
            debugger;   
            this.allPosPerMonth = data;
            let poData = [];
            
            this.allPosPerMonth.forEach((itemObj, i) => {           
                let obj = {};
                obj["lineColor"] = this.colors[i];
                obj["Month"] = itemObj.crationDate;        
                obj["POsNo"] = itemObj.pos.length;
                poData.push(obj); 
            });

        }); 
        setTimeout(() => {
            this.CreatePOPerMonthChart(chartData);
        }, 50000);
    }

    CreatePOPerMonthChart(chartData) {
        //alert(chartData);
        var chart = this._Amchart.makeChart("chartPOPerMonth", {
        "type": "serial",
        "theme": "none",
        "marginRight": 80,
        "autoMarginOffset": 20,
        "marginTop": 7,
        "dataProvider": chartData,
        "valueAxes": [{
            "axisAlpha": 0.2,
            "dashLength": 1,
            "position": "left"
        }],
        "mouseWheelZoomEnabled": true,
        "graphs": [{
            "id": "g1",
            "balloonText": "[[value]]",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "hideBulletsCount": 50,
            "title": "red line",
            "valueField": "POsNo",
            "useLineColorForBulletBorder": true,
            "lineColorField": "lineColor",
            "fillColorsField": "lineColor",
            "fillAlphas": 0.3
        }],
        "chartScrollbar": {
            "autoGridCount": true,
            "graph": "g1",
            "scrollbarHeight": 40
        },
        "categoryField": "Month",
        "categoryAxis": {
            "parseDates": true,
            "axisColor": "#DADADA",
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true
        }
        });
        chart.validateData();
    }

    GetItemEmployees(chartData){
        
    }
  
  
}