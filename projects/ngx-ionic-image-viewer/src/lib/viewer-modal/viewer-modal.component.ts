import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'ion-viewer-modal',
  templateUrl: './viewer-modal.component.html',
  styleUrls: ['./viewer-modal.component.scss']
})
export class ViewerModalComponent implements OnInit {
  @Input() alt?: string;
  @Input() scheme?: string;
  @Input() slideOptions?: object;
  @Input() src: string;
  @Input() srcHighRes?: string;
  @Input() text?: string;
  @Input() title?: string;

  defaultSlideOptions = {
    centeredSlides: true,
    passiveListeners: false,
    zoom: {
      enabled: true
    }
  };

  options = {};

  @ViewChild('sliderRef', { static: true }) slides: IonSlides;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.options = { ...this.defaultSlideOptions, ...this.slideOptions };
    this.src = this.srcHighRes || this.src;
    this.setStyle();
    this.setScheme(this.scheme);

    this.slides.update();
  }

  setStyle() {
    const el: HTMLElement = document.querySelector('.modal-fullscreen');
    el.style.setProperty('--height', '100%');
    el.style.setProperty('--width', '100%');
    el.style.setProperty('--border-radius', '0');
  }

  setScheme(scheme: string) {
    if (scheme === 'auto') {
      return;
    }

    const el: HTMLElement = document.querySelector('.modal-fullscreen');

    if (this.scheme === 'light') {
      el.style.setProperty('--ion-background-color', '#ffffff');
      el.style.setProperty('--ion-background-color-rgb', '255, 255, 255');
      el.style.setProperty('--ion-text-color', '#000');
      el.style.setProperty('--ion-text-color-rgb', '0,0,0');
    }

    if (this.scheme === 'dark') {
      if (el.classList.contains('ios')) {
        el.style.setProperty('--ion-background-color', '#000000');
        el.style.setProperty('--ion-background-color-rgb', '0, 0, 0');
      } else {
        el.style.setProperty('--ion-background-color', '#121212');
        el.style.setProperty('--ion-background-color-rgb', '18,18,18');
      }
      el.style.setProperty('--ion-text-color', '#ffffff');
      el.style.setProperty('--ion-text-color-rgb', '255,255,255');
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
