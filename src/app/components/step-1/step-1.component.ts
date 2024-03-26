import { Component, OnInit } from '@angular/core';
import { CarDataService } from '../../services/car-data.service';
import { ICarColors, ICarDetails, ICarModelResponse, IConfigs } from '../../models/car-model';
import { CommonModule } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component implements OnInit {
  public modelList = [] as ICarModelResponse[];
  public selectedModel = {} as ICarModelResponse;
  public selectedColor = {} as ICarColors;
  public imgURL: SafeResourceUrl = '';
  public carDetails: ICarDetails = {
    model: '',
    color: ''
  };

  constructor( private carService: CarDataService){}

  ngOnInit(){
    this.carService.getCarModels().subscribe(
      (response) =>{
        this.modelList = response;
        this.getExistingData();
        return response;
      }
    );
  }

  onCarModelChange(value: string): void{
    if(value){
      this.selectedModel = this.modelList.find(data => data.code === value) ?? {} as ICarModelResponse;
      this.carService.setSelectedModel = this.selectedModel;
      if(this.carDetails.color && this.selectedModel.colors.length > 0){
        this.carDetails.color = this.selectedModel.colors[0].code;
        this.onCarColorChange(this.carDetails.color);
        this.carService.setSelectedConfig = {} as IConfigs;
        this.carService.setStep2AuthStatus = false;
        this.carService.setSelectedTow = false;
        this.carService.setSelectedYoke = false;
      }
    }
    const status: boolean = this.carDetails.color && this.carDetails.model ? true : false;
    this.carService.setStep1AuthStatus = this.carDetails.color && this.carDetails.model ? true : false;
    if(!status){
      this.carService.setStep1AuthStatus = status;
    }
  }

  onCarColorChange(value: string): void{
    if(value){
      this.selectedColor = this.selectedModel.colors.find(data => data.code === value) ?? {} as ICarColors;
      this.carService.setSelectedColor = this.selectedColor;
      this.imgURL = this.carService.getCarImgURL(this.selectedModel.code, this.selectedColor.code);
      this.carService.setImgURL = this.imgURL;
    }
    const status: boolean = this.carDetails.color && this.carDetails.model ? true : false;
    this.carService.setStep1AuthStatus = this.carDetails.color && this.carDetails.model ? true : false;
    if(!status){
      this.carService.setStep1AuthStatus = status;
    }
  }

  getExistingData(): void{
    if(this.carService.getSelectedModel && this.carService.getSelectedModel.code){
      this.carDetails.model = this.carService.getSelectedModel.code;
    }
    if(this.carService.getSelectedColor && this.carService.getSelectedColor.code){
      this.selectedModel = this.carService.getSelectedModel;
      this.carDetails.color = this.carService.getSelectedColor.code;
    }
    this.imgURL = this.carService.getImgURL;
    const status: boolean = this.carDetails.color && this.carDetails.model ? true : false;
    this.carService.setStep1AuthStatus = this.carDetails.color && this.carDetails.model ? true : false;
    if(!status){
      this.carService.setStep1AuthStatus = status;
    }
  }

}
