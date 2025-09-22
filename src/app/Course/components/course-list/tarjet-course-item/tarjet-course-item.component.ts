import { Router, RouterLink } from '@angular/router';
import { CourseService } from '../../../services/course-service';
import { ICourse } from '../../../interfaces/Course.interfaces';
import { Component, input, inject, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tarjet-course-item',
  imports: [],
  templateUrl: './tarjet-course-item.component.html',
  
})
export class TarjetCourseItemComponent {
  router = inject(Router)

  onEdit() {
    this.router.navigate(['/courses/edit', this.course().id])
}

  courseService = inject(CourseService);
  @Output() delete = new EventEmitter<number>()
  @Output() toggleActive = new EventEmitter<number>();
  
  public course = input.required<ICourse>();

  onDeletedCourse(): void{
    this.delete.emit(this.course().id);
  }
  onToggle(){
    this.toggleActive.emit(this.course().id);
  }

  
 }
