import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';
import { StatementsService } from 'app/pages/statements/shared/statements.service';
import { environment } from 'environments/environment';
import { TranslateService } from 'app/services/translate.service';

@Component({
  selector: 'chm-credential-form',
  templateUrl: './statement-form.component.html',
  styleUrls: ['./statements-form.component.css']
})
export class StatementsFormComponent {



}
