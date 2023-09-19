import { Component, Input } from '@angular/core';

@Component({
  selector: 'src-upload-error-msgs',
  templateUrl: './upload-error-msgs.component.html',
  styleUrls: ['./upload-error-msgs.component.css']
})
export class UploadErrorMsgsComponent {
  @Input() file_error_msgs: any;

}
