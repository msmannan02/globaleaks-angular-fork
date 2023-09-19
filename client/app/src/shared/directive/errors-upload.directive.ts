import { ComponentFactoryResolver, Directive, Input, ViewContainerRef } from '@angular/core';
import { UploadErrorMsgsComponent } from '../partials/upload-error-msgs/upload-error-msgs.component';

@Directive({
  selector: '[srcErrorsUpload]'
})
export class ErrorsUploadDirective {

  @Input() fileErrorMessages: string[] = [];
  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    // Create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UploadErrorMsgsComponent);

    // Create the component instance
    const componentRef = this.viewContainerRef.createComponent(componentFactory);

    // You can interact with the component instance if needed
    const dynamicComponentInstance = componentRef.instance;

    // Optionally, you can set input properties or subscribe to component events
    dynamicComponentInstance.file_error_msgs = this.fileErrorMessages;
    // dynamicComponentInstance.someEvent.subscribe(event => { /* handle event */ });

  }

}
