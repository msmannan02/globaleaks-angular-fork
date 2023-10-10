import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { NodeResolver } from '../../resolvers/node.resolver';
import { UtilsService } from '../../services/utils.service';
import { FlowDirective } from '@flowjs/ngx-flow';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'app/src/services/authentication.service';
import * as Flow from '@flowjs/flow.js';
import {AppConfigService} from "../../../services/app-config.service";
import {AppDataService} from "../../../app-data.service";

@Component({
  selector: 'src-admin-file',
  templateUrl: './admin-file.component.html',
  styleUrls: ['./admin-file.component.css']
})
export class AdminFileComponent implements AfterViewInit, OnDestroy {
  @ViewChild('flow')
  flow: FlowDirective;
  @Input() adminFile: any;
  nodeData: any = []
  autoUploadSubscription: Subscription;
  flowConfig: any = {};
  @ViewChild('uploader') uploaderElementRef!: ElementRef<HTMLInputElement>;

  constructor(public appConfigService: AppConfigService, public appDataService: AppDataService, public utilsService: UtilsService, public authenticationService: AuthenticationService) {
  }
  ngOnInit() {
    this.nodeData["css"] = this.appDataService.public.node.css
    this.nodeData["script"] = this.appDataService.public.node.script
    this.nodeData["favicon"] = this.appDataService.public.node.favicon
  }
 
  ngAfterViewInit() {
    this.autoUploadSubscription = this.flow.events$.subscribe(event => {
      // to get rid of incorrect `event.type` type you need Typescript 2.8+
      if (event.type === 'filesSubmitted') {
        // this.flow.upload();
      }
    });
  }
  onFileSelected(files: FileList | null) {
    if (files && files.length > 0) {
      const file = files[0]; // Assuming you only handle a single file at a time

      const flowJsInstance = this.flow.flowJs;

      flowJsInstance.on('fileSuccess', (file, message) => {
        this.appConfigService.reinit(false)
        this.utilsService.reloadCurrentRoute()
      });

      flowJsInstance.on('fileError', (file, message) => {
      });

      const fileNameParts = file.name.split('.');
      const fileExtension = fileNameParts.pop();
      const fileNameWithoutExtension = fileNameParts.join('.');
      const timestamp = new Date().getTime();
      const fileNameWithTimestamp = `${fileNameWithoutExtension}_${timestamp}.${fileExtension}`;
      const modifiedFile = new File([file], fileNameWithTimestamp, { type: file.type });

      flowJsInstance.addFile(modifiedFile);
      flowJsInstance.upload();
    }
  }
  reload() {
  }

  delete_file(url: string): void {
    this.utilsService.deleteFile(url).subscribe(
      () => {
        this.utilsService.reloadCurrentRoute();
      },
      (error) => {
        console.error('Error deleting file:', error);
      }
    );
  }

  ngOnDestroy() {
    this.autoUploadSubscription.unsubscribe();
  }
 
}
