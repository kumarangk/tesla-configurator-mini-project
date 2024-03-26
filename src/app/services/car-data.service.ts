import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICarColors, ICarModelResponse, IConfigData, IConfigs } from '../models/car-model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CarDataService {
  private baseURL: string = 'https://interstate21.com/tesla-app/images';
  private imgURL: SafeResourceUrl = '';
  private selectedTow: boolean = false;
  private selectedYoke: boolean = false;
  private step1Status: boolean = false;
  private step2Status: boolean = false;
  private selectedModel = {} as ICarModelResponse;
  private selectedColor = {} as ICarColors;
  private selectedConfig = {} as IConfigs;
  private configList = {} as IConfigData;
  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) { }

  getCarModels():Observable<ICarModelResponse[]>{
    return this.http.get<ICarModelResponse[]>('/models')
    .pipe(
      map((data:ICarModelResponse[])=>data)
    );
  }

  getCarImgURL(model: string, color: string): SafeResourceUrl{
    return this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.baseURL}/${model}/${color}.jpg`);
  }

  getCarConfig(modelCode: string): Observable<IConfigData>{
    return this.http.get<IConfigData>(`/options/${modelCode}`)
    .pipe(
      map((data: IConfigData)=>data)
    )
  }

  public set setImgURL(URL: string | SafeResourceUrl){
    this.imgURL = URL;
  }

  public get getImgURL(): string | SafeResourceUrl{
    return this.imgURL;
  }

  public set setSelectedModel(data: ICarModelResponse){
    this.selectedModel = data;
  }

  public get getSelectedModel(): ICarModelResponse{
    return this.selectedModel;
  }

  public set setSelectedColor(data: ICarColors){
    this.selectedColor = data;
  }

  public get getSelectedColor(): ICarColors{
    return this.selectedColor;
  }

  public set setSelectedConfig(data: IConfigs){
    this.selectedConfig = data;
  }

  public get getSelectedConfig(): IConfigs{
    return this.selectedConfig;
  }

  public set setSelectedTow(checked: boolean){
    this.selectedTow = checked;
  }

  public get getSelectedTow(): boolean{
    return this.selectedTow;
  }

  public set setSelectedYoke(checked: boolean){
    this.selectedYoke = checked;
  }

  public get getSelectedYoke(): boolean{
    return this.selectedYoke;
  }

  public set setConfigList(data: IConfigData){
    this.configList = data;
  }

  public get getConfigList(): IConfigData{
    return this.configList;
  }

  public set setStep1AuthStatus(data: boolean){
    this.step1Status = data;
  }

  public set setStep2AuthStatus(data: boolean){
    this.step2Status = data;
  }

  public get getStep1AuthStatus(): boolean{
    return this.step1Status;
  }

  public get getStep2AuthStatus(): boolean{
    return this.step2Status;
  }
}
