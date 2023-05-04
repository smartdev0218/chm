import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-exporters',
  templateUrl: './exporters.component.html',
  styleUrls: ['./exporters.component.css']
})
export class ExportersComponent implements OnInit {

  

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("launching exporters");
  }

}
