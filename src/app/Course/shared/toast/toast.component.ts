import { Component, OnInit } from '@angular/core';
import { ToastService, ToastMessage } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  message: ToastMessage | null = null;
  show = false;
  timeout: any;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toastState$.subscribe(msg => {
      this.message = msg;
      this.show = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.show = false, 3000);
    });
  }
}
