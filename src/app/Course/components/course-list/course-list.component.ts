import { Component, computed,  inject, signal } from '@angular/core';
import { TarjetCourseItemComponent } from "./tarjet-course-item/tarjet-course-item.component";
import { CourseService } from '../../services/course-service';
import { ToastService } from '../../shared/toast/toast.service';
import { level } from '../../interfaces/Course.interfaces';
import { BooleanPipePipe } from '../../pipes/BooleanPipe.pipe';
import { I18nSelectPipe } from '@angular/common';




@Component({
  selector: 'app-course-list',
  imports: [TarjetCourseItemComponent, BooleanPipePipe, I18nSelectPipe],
  templateUrl: './course-list.component.html',
})
export class CourseListComponent {

  constructor(private toast: ToastService){}
  courseService = inject(CourseService);
  selectedLevel = signal<level>('Beginner');
  
  translate  = {
    'Beginner':'Basico',
    'Intermediate':'Intermedio',
    'Advanced': 'Avanzado'
  }
  
  courses = this.courseService.getCourses();
  showActive = signal(true);

// filteredCourses = computed(() => {
//   return this.courses().filter(course => course.active === this.showActive());
// });
filteredCourses = computed(() => {
  return this.courses().filter(course => 
    course.active === this.showActive() &&
    course.level === this.selectedLevel()
  );
});

onDeleted(id:number) :void{
  this.courseService.deleteCourse(id);
  this.toast.show('Curso eliminado correctamente', 'danger');
  }

onToggleCourse(id: number): void{
    this.courseService.toggleCourseActive(id);  
   this.toast.show('Estado del curso cambio correctamente', 'success');
  }
  
onLevelChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedLevel.set(value as level);

    if (value) {
      this.selectedLevel.set(value as level);
    }

  }

}
