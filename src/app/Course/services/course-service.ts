import { computed, effect, Injectable, signal, WritableSignal } from '@angular/core';
import { ICourse } from '../interfaces/Course.interfaces';
import { of } from 'rxjs';


const loadFromLocalStorage = (): ICourse[] => {
  const courses = localStorage.getItem('courses')
  return courses ? JSON.parse(courses) : [];
}


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  getCourseById(id: string) {
    const course = this._courses().find(c => String(c.id) === String(id));
    return of(course);
  }

  updateCourse(course: ICourse) {
    const updated = this._courses().map(c => c.id === course.id ? course : c);
    this._courses.set(updated);
    this.saveToLocalStorage;
    return of(true);
  }
  

  private _courses: WritableSignal<ICourse[]> = signal<ICourse[]>(loadFromLocalStorage());
  public courses = computed(() => this._courses());

getCourses() {
    return this.courses;
  }

  addCourse(course: ICourse) {
     this._courses.update(courses => [...courses, course]);
     this.saveToLocalStorage;
 }



 deleteCourse(id: number): void {
    const updated = this.courses().filter(c => c.id !== id);
    this._courses.set(updated);
    this.saveToLocalStorage;
  }

  
  toggleCourseActive(id: number): void {
  const updated = this._courses().map(course =>
    course.id === id ? { ...course, active: !course.active } : course
  );
  console.log("Cambie el estado")
  this._courses.set(updated);
  this.saveToLocalStorage;
}

  
  saveToLocalStorage = effect( () => {
    localStorage.setItem('courses', JSON.stringify(this.courses()));
  });


  

}
