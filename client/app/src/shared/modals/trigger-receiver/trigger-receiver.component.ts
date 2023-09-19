import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersResolver } from '../../resolvers/users.resolver';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'src-trigger-receiver',
  templateUrl: './trigger-receiver.component.html',
  styleUrls: ['./trigger-receiver.component.css']
})
export class TriggerReceiverComponent {
  // @Input() selected: { value: any; name: string };
  selected: { value: any; name: string }
  @Input() arg: any
  admin_receivers_by_id: any = {};
  confirmFunction: (data: any) => void;
  userData: any = []
  constructor(public utilsService: UtilsService, public users: UsersResolver, public activeModal: NgbActiveModal, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.selected = { value: "", name: "" }
    this.userData = this.users.dataModel
    this.admin_receivers_by_id = this.utilsService.array_to_map(this.users.dataModel);
  }
  confirm() {
    this.confirmFunction(this.arg)
    return this.activeModal.close(this.arg);
  }
  cancel() {
    this.modalService.dismissAll();
  }
  addReceiver(item: any) {
    console.log(item,"item");
    console.log(this.arg.trigger_receiver,"arg.trigger_receiver");
    
    if (item && this.arg.trigger_receiver.indexOf(item.id) === -1) {
      console.log("hellooooo");
      
      this.arg.trigger_receiver.push(item.id);
      this.selected.value = ""
    }
  }


  removeReceiver(index: number) {
    this.arg.trigger_receiver.splice(index, 1);
  }

  resetRecipients() {
    this.arg.trigger_receiver = [];
  }

}