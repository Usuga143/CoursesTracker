
import { Component, inject, computed, ViewChild, ElementRef } from '@angular/core';
import { CourseListComponent } from "../../components/course-list/course-list.component";
import { CourseService } from '../../services/course-service';
//import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';


@Component({
  selector: 'app-courses',
  imports: [ CourseListComponent, ],
  templateUrl: './courses.component.html',

})
export default class CoursesComponent {
  courseService = inject(CourseService);
  courses = this.courseService.courses;

  
  totalCourses = computed(() => this.courses().length);
// fecha = new Date;

// text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
// money = 2000532431  
}
