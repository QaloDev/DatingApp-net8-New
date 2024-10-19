import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  destroyRef = inject(DestroyRef);

  users = signal<any>(undefined);

  ngOnInit() {
    const subscribe = this.http
      .get('https://localhost:5001/api/users')
      .subscribe({
        next: (response) => this.users.set(response),
        error: (error) => console.error(error),
        complete: () => console.log('Request has completed'),
      });

    this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }
}
