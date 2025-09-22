
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CourseService } from '../../services/course-service';
import { ICourse, level } from '../../interfaces/Course.interfaces';
import { ToastService } from '../../shared/toast/toast.service';
import { AppRequiredAsterisk } from '../../shared/directive/required-asterisk';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-course',
  imports: [AppRequiredAsterisk, ReactiveFormsModule ],
  templateUrl: './form-course.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class FormCourseComponent implements OnInit { 
  // constructor(private toast: ToastService){}

  // courses = signal<ICourse[]>([
  //    { id: 1, name: 'Angular Basics', category: 'Frontend', level: 'Beginner', active: true },
  // ])

  private courseService = inject(CourseService);

  isEditMode = false;
  constructor(private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.isEditMode = true;
      this.courseService.getCourseById(id).subscribe((course: ICourse | undefined ) =>{
        if (course){
          this.name.set(course.name);
          this.category.set(course.category);
          this.level.set(course.level);
          this.active.set(course.active);
        }
      });
    }
  }

  onSubmit(){
    const id = this.route.snapshot.paramMap.get('id');
    const course: ICourse = {
      id: id ? Number(id) : Math.floor(Math.random() * 1000),
      name: this.name(),
      category: this.category(),
      level: this.level() as level,
      active: this.active(),
    };
    if(this.isEditMode){
      this.courseService.updateCourse(course).subscribe(()=>{
        this.toast.show('Curso editado exitosamente', 'success');
        this.router.navigate(['/courses']);
      });
    } else {
      this.courseService.addCourse(course)
      this.toast.show('Curso agregado con exito', 'success')
    }
  }

  courses = signal<ICourse[]>([])
  levels = ['Beginner', 'Intermediate', 'Advanced'];
  name = signal<string>('');
  category = signal<string>('');
  level = signal<string>(this.levels[0]);
  active = signal<boolean>(true);
  
  addCourse() {
  const newCourse: ICourse = {
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      category: this.category(),
      level: this.level() as level,
      active: this.active(),
  };
  if (this.name().trim().length < 4) {
    alert('El nombre debe tener al menos 4 caracteres');
    return;
  }
  this.courseService.addCourse(newCourse);
  this.resetFields();
  this.toast.show('Curso Agregado correctamente', 'success');
  }


  resetFields(){
    this.name.set(''),
    this.category.set('')
    this.level.set(this.levels[0])
    this.active.set(true)
  }
}

