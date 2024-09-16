import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  private activatedRoute: ActivatedRoute;
	private router: Router;
  constructor( activatedRoute: ActivatedRoute, router: Router ) {

		this.activatedRoute = activatedRoute;
		this.router = router;

	}


  public closeChatView() : void {

		this.router.navigate(
			[
				{
					outlets: {
						chat: null
					}
				}
			],
			{
				relativeTo: this.activatedRoute.parent
			}
		);

	}
}
