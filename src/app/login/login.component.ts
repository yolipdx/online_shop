import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MemberService }         from '../shared/member.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string;
  password: string;
  err: any;
  match: boolean;

  @Output() login = new EventEmitter();

  constructor(private memberService: MemberService, private router: Router) { }

  ngOnInit() {
  }


  onLogIn() {
    console.log('name:  ' + this.name);
    console.log('pass: ' +   this.password);
    this.match = false;

    // don't use verify(new LogInfo(this.email, this.password))
    // this won't work.   看来this真的是别乱用啊。上面的this应该是指的LogInfo了..

    this.memberService.verify({command: 'verify', name: this.name, password: this.password})
      .subscribe(
        (response: string) => {
            console.log(response);
            console.log('verify ret: ' + this.err);
            if (response !== 'valid')  {
              this.err = 'user name and password not match';
              this.match = false;
            } else {
              this.err = 'verified!';
              // this.login.emit();
              this.match = true;
              this.router.navigate(['/']);

            }
          },
          err => console.log(err)
      );
  }

  onRegister() {
    this.match = false;

    this.memberService.register({command: 'register', name: this.name, password: this.password})
      .subscribe(
        (response: string) => {
            this.err = response;
            this.match = 'registered ok' === response;
            console.log(response);
        },

        err => console.log(err)
      );
  }


}
