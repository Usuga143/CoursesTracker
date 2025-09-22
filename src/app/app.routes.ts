import { Routes } from '@angular/router';
import { FormCourseComponent } from './Course/components/form-course/form-course.component';

export const routes: Routes = [
    
    {
        path: 'courses/edit/:id',
        component: FormCourseComponent
    },
    {
        path: 'courses',
        loadComponent: () => import('./Course/pages/courses/courses.component'),
    },
    {
        path: 'add',
        loadComponent: () => import('./Course/pages/add-course/add-course.component')
        },
        
    {
        path: '**',
        redirectTo: 'courses',
    },
];
