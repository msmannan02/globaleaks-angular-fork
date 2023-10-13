import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FlowDirective, Transfer} from "@flowjs/ngx-flow";
import {AuthenticationService} from "../../../services/authentication.service";
import {AppDataService} from "../../../app-data.service";
import {ControlContainer, NgForm} from "@angular/forms";
import { Subscription } from 'rxjs';
import { FlowOptions } from '@flowjs/flow.js';

@Component({
  selector: 'src-rfile-upload-button',
  templateUrl: './rfile-upload-button.component.html',
  styleUrls: ['./rfile-upload-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class RfileUploadButtonComponent implements AfterViewInit, OnDestroy, OnInit{

  @Input() fileupload_url:any;
  @Input() formuploader:boolean = true;
  @Input() uploads:any
  @Input() field:any = undefined
  // @ViewChild('flowAdvanced', { static: true }) flowAdvanced: FlowDirective;
  // @ViewChild('uploader') uploader: ElementRef;
  @Output() notifyFileUpload: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('flow')
  flow: FlowDirective;

  autoUploadSubscription: Subscription;

  fileinput:any
  showerror:boolean
  errorFile:Transfer
  confirmButton = false
  _fakemodel: any = {};
  currentSessionSize = 0
  flowConfig:FlowOptions
  constructor(public authenticationService:AuthenticationService, public appDataService:AppDataService,private cd: ChangeDetectorRef) {
    
  }
  ngOnInit(): void {
    if(this.authenticationService.session.id){      
      this.flowConfig ={target: this.fileupload_url, speedSmoothingFactor:0.01 , singleFile:(this.field !== undefined && !this.field.multi_entry), allowDuplicateUploads:false, testChunks:false, permanentErrors : [ 500, 501 ], headers : {'X-Session':this.authenticationService.session.id}}
    }
    this.fileinput = this.field ? this.field.id : 'status_page'
  }

  trackTransfer(transfer: Transfer):any {
    return transfer.id;
  }
  ngAfterViewInit() {
    const self = this;
    this.autoUploadSubscription = this.flow.transfers$.subscribe((event,) => {

      self.confirmButton = false;
      self.showerror = false

      if(!self.uploads){
        self.uploads = {}
      }
      if(self.uploads && !self.uploads[self.fileinput]){
        self.uploads[self.fileinput] = []
      }
      event.transfers.forEach(function(file){

        if(file.paused && self.errorFile){
          self.errorFile.flowFile.cancel()
          return
        }
        if(self.appDataService.public.node.maximum_filesize < (file.size/1000000)){
          self.showerror = true
          file.flowFile.pause()
          self.errorFile = file
        }else if(!file.complete){
          self.confirmButton = true
        }
      });
      self.uploads[self.fileinput]=self.flow
      this.notifyFileUpload.emit(self.uploads)
    });
  }

  deleteFile(){
  }

  ngOnDestroy() {
    this.autoUploadSubscription.unsubscribe();
  }
  onConfirmClick() {
    if(!this.flow.flowJs.isUploading()){
      this.flow.upload();
    }
  }

  protected readonly Float32Array = Float32Array;
  protected readonly undefined = undefined;
}
