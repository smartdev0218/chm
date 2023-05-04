import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';
import { CredentialsService } from 'app/pages/configuration/credentials/shared/credentials.service';
import { environment } from 'environments/environment';
import { TranslateService } from 'app/services/translate.service';

@Component({
  selector: 'chm-credential-form',
  templateUrl: './credential-form.component.html',
  styleUrls: ['./credential-form.component.css']
})
export class  CredentialFormComponent {



}
