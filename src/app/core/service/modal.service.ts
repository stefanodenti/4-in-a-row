import {
  ApplicationRef, ComponentRef, createComponent,
  Inject,
  Injectable,
  TemplateRef,
  Type
} from '@angular/core';
import {ModalComponent} from "../components/modal/modal.component";
import {Subject, take} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(
    private applicationRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document) {
  }

  openModal<T>(content: TemplateRef<any> | Type<T>, options?: {
    title?: string,
    showCloseButton?: boolean,
    backdropDismiss?: boolean,
    position?: 'center' | 'top' | 'bottom',
    size?: 'sm' | 'md' | 'lg'
  }) {
    let modalComponent: ComponentRef<ModalComponent>;
    if (content instanceof TemplateRef) {
      const embeddedView = content.createEmbeddedView(null);
      modalComponent = createComponent(ModalComponent,
        {
          environmentInjector: this.applicationRef.injector,
          projectableNodes: [embeddedView.rootNodes]
        });
      this.applicationRef.attachView(embeddedView);
    } else {
      modalComponent = createComponent(ModalComponent, {environmentInjector: this.applicationRef.injector});
      const componentViewRef = modalComponent.instance.modalDirective.viewContainerRef;
      componentViewRef.clear();
      const component = componentViewRef.createComponent(content);
      component.hostView.detectChanges();
    }
    modalComponent.instance.title = options?.title;
    modalComponent.instance.showCloseButton = options?.showCloseButton ?? true;
    modalComponent.instance.backdropDismiss = options?.backdropDismiss ?? false;
    modalComponent.instance.position = options?.position ?? 'center';
    modalComponent.instance.size = options?.size ?? 'lg';
    modalComponent.hostView.detectChanges();
    modalComponent.changeDetectorRef.detectChanges();
    modalComponent.instance.closeEvent.pipe(take(1)).subscribe({
      next: () => modalComponent.destroy(),
    })
    this.document.body.appendChild(modalComponent.location.nativeElement);
    return modalComponent.instance;
  }
}
