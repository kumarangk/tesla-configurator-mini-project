import { Component, OnInit } from '@angular/core';
import { CarDataService } from '../../services/car-data.service';
import {  IConfigData, IConfigDetails, IConfigs } from '../../models/car-model';
import { CommonModule } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss'
})
export class Step2Component implements OnInit{
  public configList = {} as IConfigData;
  public range: number = 0;
  public speed: number = 0;
  public price: number = 0;
  public selectedConfig = {} as IConfigs;
  public imgURL: SafeResourceUrl = '';
  public configDetails: IConfigDetails = {
    config: 0,
    towHitch: false,
    yoke: false
  }
  constructor(private carService: CarDataService){

  }

  ngOnInit(){
    const selectedModel: string = (this.carService.getSelectedModel && this.carService.getSelectedModel.code) ?? '';
    this.carService.getCarConfig(selectedModel).subscribe(
      (res)=>{
      this.configList = res;
      this.carService.setConfigList = this.configList;
      this.getExistingData();
      return res;
      }
    );
    this.imgURL = this.carService.getImgURL;
  }

  onConfigChange(value: string){
    if(value){
      this.selectedConfig = this.configList.configs.find(data => data.id === parseInt(value)) ?? {} as IConfigs;
      this.carService.setSelectedConfig = this.selectedConfig;
      this.range = this.selectedConfig.range;
      this.speed = this.selectedConfig.speed;
      this.price = this.selectedConfig.price;
    }
    this.carService.setStep2AuthStatus = this.configDetails.config ? true : false;
  }

  onTowChange(checked: boolean){
    this.carService.setSelectedTow = checked;
  }

  onYokeChange(checked: boolean){
    this.carService.setSelectedYoke = checked;
  }

  getExistingData(): void{
    if(this.carService.getSelectedConfig && this.carService.getSelectedConfig.id){
      this.configDetails.config = this.carService.getSelectedConfig.id;
      this.range = this.carService.getSelectedConfig.range;
      this.speed = this.carService.getSelectedConfig.speed;
      this.price = this.carService.getSelectedConfig.price;
    }
    this.configDetails.towHitch = this.carService.getSelectedTow;
    this.configDetails.yoke = this.carService.getSelectedYoke;
    this.carService.setStep2AuthStatus = this.configDetails.config ? true : false;
  }
}
