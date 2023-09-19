import { ComponentFactoryResolver, Directive, ElementRef, HostListener, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { UploadErrorMsgComponent } from '../partials/upload-error-msg/upload-error-msg.component';

@Directive({
  selector: '[srcSingleErrorUpload]'
})
export class SingleErrorUploadDirective {

  @Input() fileErrorMessages: string[] = [];
  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    // Create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UploadErrorMsgComponent);

    // Create the component instance
    const componentRef = this.viewContainerRef.createComponent(componentFactory);

    // You can interact with the component instance if needed
    const dynamicComponentInstance = componentRef.instance;

    // Optionally, you can set input properties or subscribe to component events
    dynamicComponentInstance.file_error_msgs = this.fileErrorMessages;
    // dynamicComponentInstance.someEvent.subscribe(event => { /* handle event */ });

  }
  // constructor(private el: ElementRef, private renderer: Renderer2) { }

  // @HostListener('click') onClick() {
  //   this.resetErrorDisplay();
  // }

  // private resetErrorDisplay() {
  //   this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
  //   this.fileErrorMessages.push('');
  // }

}
