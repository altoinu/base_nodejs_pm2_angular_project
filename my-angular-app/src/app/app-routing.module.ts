import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RandomCoolComponent } from './components/random-cool/random-cool.component';
import { ReallyAwesomeFormComponent } from './components/really-awesome-form/really-awesome-form.component';
import { AboutComponent } from './components/about/about.component';
import { NoMatch404Component } from './components/no-match404/no-match404.component';
import blah from './models/blah.model';

// Client side routing by angular router
// - <base href="/"> in index.html - used by angular router during client side routing
// - ng build options (ex via command line or in angular.json)
//   - baseHref - used by angular router during client side routing
//   - deployUrl - used by build process so generated HTML file can refer to stuff to include
// https://angular.io/cli/build
// https://shekhargulati.com/2017/07/06/angular-4-use-of-base-href-and-deploy-url-build-options/
// https://stackoverflow.com/questions/51182322/whats-the-difference-between-base-href-and-deploy-url-parameters-of-angular
const routes: Routes = [
    {
        path: '',
        component: RandomCoolComponent,
        pathMatch: 'full',
        data: {
            blah
            /*
            blah: blah
            blah: {
                text: '(data defined in app-routing) really cool app, yo',
                foobar: 'woot'
            }
            */
        }
    },
    {
        path: 'form',
        component: ReallyAwesomeFormComponent
    },
    {
        path: 'about/:superduperparam',
        component: AboutComponent,
        data: {
            blah: {
                text: '(data defined in app-routing) really cool app, yoyo',
                foobar: 'woot'
            },
            someprop: 'Hello world'
        }
    },
    {
        path: '**',
        component: NoMatch404Component
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
