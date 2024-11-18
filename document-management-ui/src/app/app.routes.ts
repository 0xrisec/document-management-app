import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RedirectAuthGuard } from './core/guards/redirect-auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { DocumentListComponent } from './features/document-management/document-list/document-list.component';
import { UploadDocumentComponent } from './features/document-management/upload-document/upload-document.component';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent, canActivate: [RedirectAuthGuard] },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: 'upload', component: UploadDocumentComponent },
            { path: 'documents', component: DocumentListComponent },
            { path: '', redirectTo: 'upload', pathMatch: 'full' } // Default route
        ],
        canActivate: [AuthGuard]
    },
    { path: 'login', component: LoginComponent, canActivate: [RedirectAuthGuard] },
    // { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
    { path: '**', redirectTo: '/login' } // Wildcard route for a 404 page];
]