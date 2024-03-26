import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarDataService } from '../../services/car-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    public carService: CarDataService
    ){}

  ngOnInit(): void {
    this.http.get('/models').subscribe();
  }

  selectedTab(id:string){
    this.router.navigate(['./'+ id]);
  }
}
