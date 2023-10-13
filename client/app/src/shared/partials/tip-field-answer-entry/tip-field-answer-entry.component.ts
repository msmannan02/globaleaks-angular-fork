import { Component, Input } from '@angular/core';
import { AuthenticationService } from 'app/src/services/authentication.service';
import { UtilsService } from '../../services/utils.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RecieverTipService } from 'app/src/services/recievertip.service';

@Component({
  selector: 'src-tip-field-answer-entry',
  templateUrl: './tip-field-answer-entry.component.html',
  styleUrls: ['./tip-field-answer-entry.component.css']
})
export class TipFieldAnswerEntryComponent {
  @Input() entry: any
  @Input() field: any
  @Input() fieldAnswers: any
  audioFiles: { [key: string]: string } = {};
  format = 'dd/MM/yyyy';
  locale = 'en-US';
  myDate = 'Tue Feb 05 2019 00:00:00 GMT+0530 (India Standard Time)';
  constructor(private http: HttpClient,private utilsService: UtilsService, public authenticationService: AuthenticationService, public tipService: RecieverTipService) { }
  ngOnInit(): void {
    this.loadAudioFile(this.field.id)
  }
  loadAudioFile(reference_id: string): void {
    for (const wbfile of this.tipService.tip.wbfiles) {
      if (wbfile.reference_id === reference_id) {
        const id = wbfile.id;

        const headers = new HttpHeaders({
          'x-session': this.authenticationService.session.id
        });

        this.http.get('api/recipient/wbfiles/' + id, {
          headers,
          responseType: 'blob'
        })
        .subscribe(response => {
          this.audioFiles[reference_id] = URL.createObjectURL(response);
        });
        break;
      }
    }
  }
}
