import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { TarjetCourseItemComponent } from "./tarjet-course-item/tarjet-course-item.component";
import { CourseService } from '../../services/course-service';
import { ToastService } from '../../shared/toast/toast.service';



@Component({
  selector: 'app-course-list',
  imports: [TarjetCourseItemComponent ],
  templateUrl: './course-list.component.html',
})
export class CourseListComponent { 
  constructor(private toast: ToastService){}
  courseService = inject(CourseService);

  
  courses = this.courseService.getCourses();
  showActive = signal(true);

filteredCourses = computed(() => {
  return this.courses().filter(course => course.active === this.showActive());
});


onDeleted(id:number) :void{
  this.courseService.deleteCourse(id);
  this.toast.show('Curso eliminado correctamente', 'danger');
  }

onToggleCourse(id: number): void{
    this.courseService.toggleCourseActive(id);  
   this.toast.show('Estado del curso cambio correctamente', 'success');
  }
  


}
