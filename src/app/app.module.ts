/* // app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';

// Estos componentes son standalone
import { RestaurantComponent } from './restaurant/restaurant.component';
import { BookingComponent } from './booking/booking.component';
import { BoardComponent } from './board/board.component';
import { TurnComponent } from './turn/turn.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule,
    RestaurantComponent,
    BookingComponent,
    BoardComponent,
    TurnComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 */

