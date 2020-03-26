import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-broadcast-message-show',
  templateUrl: './broadcast-message-show.component.html',
  styleUrls: ['./broadcast-message-show.component.css']
})
export class BroadcastMessageShowComponent implements OnInit {

  constructor(private userService: UserService,
    private route: Router) { }

  ngOnInit() {
    if(this.userService.roleMatch(['Shacho'])) {
      this.route.navigate(['/report/show']);
    }
  }

}
