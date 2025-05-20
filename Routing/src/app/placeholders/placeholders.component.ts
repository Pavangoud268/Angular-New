import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-placeholders',
  imports: [CommonModule,NgxSkeletonLoaderModule],
  templateUrl: './placeholders.component.html',
  styleUrl: './placeholders.component.css'
})
export class PlaceholdersComponent {

}
