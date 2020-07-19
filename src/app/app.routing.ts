import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {AuthGuardService} from './auth-guard.service';



export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
        canActivate: [AuthGuardService]



    }, {
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
                path: '',
                loadChildren: './dashboard/dashboard.module#DashboardModule',

          },{
                path: 'components',
                loadChildren: './components/components.module#ComponentsModule'
            },  {
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule'
            },

          {
              path: '',
              loadChildren: './users/users.module#UsersModule'},

            {      
                path: '',
                loadChildren: './lists/lists.module#ListsModule'},
  ],
        canActivate: [AuthGuardService]

    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: '',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];
