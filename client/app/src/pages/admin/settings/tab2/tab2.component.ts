import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as Flow from '@flowjs/flow.js';
import { FlowEvent, FlowFile } from '@flowjs/flow.js';
import { FlowDirective } from '@flowjs/ngx-flow';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/src/services/authentication.service';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { PreferenceResolver } from 'app/src/shared/resolvers/preference.resolver';
import { UtilsService } from 'app/src/shared/services/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'src-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.css']
})
export class Tab2Component implements OnInit {
  @Input() contentForm: NgForm;
  @ViewChild('flowAdvanced', { static: true }) flowAdvanced: FlowDirective;
  @ViewChild('uploader') uploader: ElementRef;

  admin_files: any[] = [
      {
        "title": "Favicon",
        "varname": "favicon",
        "filename": "custom_favicon.ico",
        "size": "200000"
      },
      {
        "title": "CSS",
        "varname": "css",
        "filename": "custom_stylesheet.css",
        "size": "10000000"
      },
      {
        "title": "JavaScript",
        "varname": "script",
        "filename": "custom_script.js",
        "size": "10000000"
      }
];

  files: FlowFile[] = [];
  flow: FlowDirective;
  flowConfig: any = {};
  autoUploadSubscription: Subscription;
  preferenceData: any = [];
  authenticationData: any = []

  constructor(public preference: PreferenceResolver, private httpClient: HttpClient, public utilsService: UtilsService, public node: NodeResolver, config: NgbTooltipConfig, public authenticationService: AuthenticationService) { }


  // onFileSelected(files: FileList | null) {
  //   if (files && files.length > 0) {
  //     const file = files[0]; // Assuming you only handle a single file at a time

  //     const flowJsInstance = this.flow.flowJs;
  //     flowJsInstance.addFile(file);
  //     flowJsInstance.upload();
  //   }
  // }




  ngOnInit(): void {
    this.preferenceData = this.preference.dataModel
    this.authenticationData = this.authenticationService
    this.authenticationData.permissions = {
      can_upload_files: false
    };
    this.preferenceData.permissions = {
      can_upload_files: false
    };
    this.updateFiles();
  }
  onFileSelected(files: FileList | null) {
    if (files && files.length > 0) {
      const file = files[0]; // Assuming you only handle a single file at a time

      const flowJsInstance = new Flow({ target: 'api/admin/files/custom', speedSmoothingFactor: 0.01, singleFile: true, allowDuplicateUploads: false, testChunks: false, permanentErrors: [500, 501], headers: { 'X-Session': this.authenticationService.session.id } });
      flowJsInstance.addFile(file);
      flowJsInstance.upload();
      this.utilsService.reloadCurrentRoute();

    }
  }
  // ngAfterViewInit() {
  //   this.autoUploadSubscription = this.flowAdvanced.events$.subscribe(event => {
  //     if (event.type === 'filesSubmitted') {
  //       // this.flow.upload();
  //     }
  //   });
  // }

  // ngOnDestroy() {
  //   this.autoUploadSubscription.unsubscribe();
  // }
  reload(): void {
    // Implement reload logic if needed
  }

  delete_file(url: string): void {
    this.utilsService.deleteFile(url).subscribe(
      () => {
        this.updateFiles();
        this.utilsService.reloadCurrentRoute();
      },
      (error) => {
        console.error('Error deleting file:', error);
      }
    );
  }
  updateFiles(): void {
    this.utilsService.getFiles().subscribe(
      (updatedFiles) => {
        this.files = updatedFiles;
      },
      (error) => {
        console.error('Error fetching files:', error);
      }
    );
  }
  uploadSuccess($event: FlowEvent): void {
    // Implement upload success logic
    this.reload();
  }
 
  togglePermissionUploadFiles(status:any): void {
    
    this.authenticationData.session.permissions.can_upload_files = !this.authenticationData.session.permissions.can_upload_files;
    status.checked = this.authenticationData.session.permissions.can_upload_files
  
    if (!this.authenticationData.session.permissions.can_upload_files) {
      this.utilsService.runAdminOperation("enable_user_permission_file_upload", {},false).subscribe(
        () => {
          this.authenticationData.session.permissions.can_upload_files = true;
          status.checked = true
        },
        () => {
          this.authenticationData.session.permissions.can_upload_files = false;
          status.checked = false
        }
      );
    } else {
      this.utilsService.runAdminOperation("disable_user_permission_file_upload", {},false).subscribe(
        () => {
          this.authenticationData.session.permissions.can_upload_files = false;
          status.checked = false
        },
        () => {}
      );
    }
  }
}
