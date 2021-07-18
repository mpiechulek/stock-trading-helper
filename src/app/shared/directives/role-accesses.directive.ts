import { Directive, ElementRef, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { User } from 'src/app/data/models/user.model';
@Directive({
  selector: '[appRoleDirective]'
})
export class RoleAccessesDirective {

  @Input() private accessType: string;
  @Input() private moduleType: string;

  private permissions = {  

    'User': [
      {
        'module_name': 'home',
        'create_action': false,
        'read_action': true,
        'delete_action': false,
        'edit_action': false.valueOf    
      },
      {
        'module_name': 'navigation',        
        'navigate_home_action': true,
        'navigate_trade_action': true,
        'navigate_calculator_action': false,
        'navigate_currency_action': true,
        'navigate_statistics_action': false,
        'navigate_calendar_action': false,
      }
    ],
    'Trader': [
      {
        'module_name': 'home',
        'create_action': true,
        'read_action': true,
        'delete_action': true,
        'edit_action': true       
      },
      {
        'module_name': 'navigation',        
        'navigate_home_action': true,
        'navigate_trade_action': true,
        'navigate_calculator_action': true,
        'navigate_currency_action': true,
        'navigate_statistics_action': true,
        'navigate_calendar_action': false,
      }
    ]

  }

  constructor(private elementRef: ElementRef, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {

    this.elementRef.nativeElement.style.display = "none";

    this.checkAccess();

  }

  /**
   * 
   */
  checkAccess(): void {

    const userValue: User = this.authenticationService.userValue;

    const useRole: string = userValue.role;

    const module: any = this.permissions[useRole].find(access => access.module_name === this.moduleType);

    this.elementRef.nativeElement.style.display = module[this.accessType] ? "block" : "none";

  }

}





