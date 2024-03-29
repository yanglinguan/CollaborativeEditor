import { Routes, RouterModule } from "@angular/router";
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

const routes : Routes = [
    {
        path: '',
        redirectTo: 'problems',
        pathMatch: 'full' // path match exactly
    },
    {
        path: 'problems',
        // when path match, render the component 
        component: ProblemListComponent
    },
    {
        path: 'problems/:id',
        component: ProblemDetailComponent
    },
    {
        path: '**',
        redirectTo: 'problems'
    }
];

// Routing is a Module
export const Routing = RouterModule.forRoot(routes);