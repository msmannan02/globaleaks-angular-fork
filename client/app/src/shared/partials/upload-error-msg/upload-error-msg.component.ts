import { Component, Input } from '@angular/core';

@Component({
  selector: 'src-upload-error-msg',
  templateUrl: './upload-error-msg.component.html',
  styleUrls: ['./upload-error-msg.component.css']
})
export class UploadErrorMsgComponent {
  @Input() file_error_msgs: any;
  displayErr: boolean = true

}
