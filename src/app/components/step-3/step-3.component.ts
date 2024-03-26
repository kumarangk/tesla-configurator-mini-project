import { Component, OnInit } from '@angular/core';
import { ICarColors, ICarModelResponse, IConfigs, IPriceData } from '../../models/car-model';
import { CommonModule } from '@angular/common';
import { CarDataService } from '../../services/car-data.service';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss'
})
export class Step3Component implements OnInit{
  public priceDetails = [] as IPriceData[];
  public selectedConfig = {} as IConfigs;
  public selectedModel = {} as ICarModelResponse;
  public selectedColor = {} as ICarColors;
  public imgURL: SafeResourceUrl = '';
  public totalAmount: number = 0;

  constructor(private carService: CarDataService){ }

  ngOnInit(){
    this.selectedConfig = this.carService.getSelectedConfig;
    this.selectedModel = this.carService.getSelectedModel;
    this.selectedColor = this.carService.getSelectedColor;
    this.imgURL = this.carService.getImgURL;
     this.priceDetails.push({
      title: this.selectedConfig.description,
      value: this.selectedConfig.price,
      hasDescription: true,
      range: this.selectedConfig.range,
      speed: this.selectedConfig.speed
     });
     if(this.selectedColor.price > 0){
      this.priceDetails.push({
        title: this.selectedColor.description + ' Color',
        value: this.selectedColor.price
      })
     }
     if(this.carService.getSelectedTow && this.carService.getConfigList?.towHitch){
      this.priceDetails.push({
        title: 'Tow Hitch Package',
        value: 1000
      });
     }
     if(this.carService.getSelectedYoke && this.carService.getConfigList?.yoke){
      this.priceDetails.push({
        title: 'Yoke Wheel Package',
        value: 1000
      });
     }
     this.priceDetails.forEach(
      data=>{
        if(data.value){
          this.totalAmount +=data.value;
        }
      }
     )
  }

}
