import {Component, Input} from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {WbtipService} from "../../../services/wbtip.service";

@Component({
  selector: 'src-tip-files-whistleblower',
  templateUrl: './tip-files-whistleblower.component.html',
  styleUrls: ['./tip-files-whistleblower.component.css']
})
export class TipFilesWhistleblowerComponent {
  collapsed = false
  public toggleColapse(){
    this.collapsed = !this.collapsed
  }
  constructor(public utilsService:UtilsService, public wbtipService:WbtipService) {
  }

}
