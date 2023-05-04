import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormDataService } from 'app/pages/publications/publications-form/data/formData.service';
import { environment } from 'environments/environment';
import { PublicationsService } from 'app/pages/publications/shared/publications.service';
import { StoreService } from 'app/shared/store.service';

@Component({
  selector: 'app-publications-form',
  templateUrl: './publications-form.component.html',
  styleUrls: ['./publications-form.component.css']
})
export class PublicationsFormComponent implements OnInit {

  title = 'Multi-Step Wizard';
  @Input() formData;

  debug = false;
  testing = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private publicationsService: PublicationsService,
    private cdr: ChangeDetectorRef,
    private formDataService: FormDataService,
    private storeService: StoreService) { }

    ngOnInit() {
                
        if (environment.mock) {
          this.debug = true;
          this.testing = true;
        }
    
        this.formDataService.debug = this.debug;
        this.formDataService.testing = this.testing;
          
        this.route.params.subscribe(params => {
        var id = params['id'];
            
        if(!(id === undefined)) {
          this.publicationsService.getPublicationById(id).subscribe(data => {
            this.formDataService.setPublicationModel(data);
            this.formData = this.formDataService.getFormData();
            //this.cdr.markForCheck();
            this.router.navigate(['/publications/form/general']);
          });
        } else {
          this.formData = this.formDataService.getFormData();
          //this.cdr.markForCheck();
          this.router.navigate(['/publications/form/general']);
        }
        });
                  
    }

}
