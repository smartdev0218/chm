import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FooterService } from 'app/services/footer.service';
import { MenuService } from 'app/services/menu.service';
import { LogoService } from 'app/services/logo.service';
import { MessagesService } from 'app/services/messages.service';
import { NotificationsService } from 'app/services/notifications.service';
import { User } from 'app/models/user';
import { Message } from 'app/models/message';
import { Notification } from 'app/models/notification';
import { TranslateService } from 'app/services/translate.service';
import { Observable } from 'rxjs/Observable';
import * as EventSource from 'eventsource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // define your footer links
  private footer = {
    left_part: `<strong>
        Copyright &copy; 2018
        <a href="#" >TOTVS</a>.
    	</strong>
      Omnichannel Platform`,
    right_part: '',
  };

  constructor(
    private footerServ: FooterService,
    private menuServ: MenuService,
    private logoServ: LogoService,
    private msgServ: MessagesService,
    private notifServ: NotificationsService,
    private translate: TranslateService,
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }
 
  // define here your logo
  private logo = {
    html_mini: 'CM',
    html_lg: '<img src="assets/img/moddologo.png" style="height:50px; padding-top: 2px;">'
  };

  public ngOnInit() {
    this.footerServ.setCurrent(this.footer);
    this.logoServ.setCurrent(this.logo);

    // FAKE MESSAGE
    // defining some test users
    const user1 = new User({
      avatarUrl: 'assets/img/user2-160x160.jpg',
      email: 'weber.antoine.pro@gmail.com',
      firstname: localStorage.getItem("username"),
      lastname: ''
    });
    const user2 = new User({
      avatarUrl: 'assets/img/user2-160x160.jpg',
      email: 'EMAIL',
      firstname: 'FIRSTNAME',
      lastname: 'LASTNAME'
    });
    // sending a test message
    this.msgServ.addMessage(new Message({
      author: user2,
      content: 'le contenu d\'un message d\'une importance extreme',
      destination: user1,
      title: 'un message super important'
    }));
    // sending a test notif
//    this.notifServ.addNotification(new Notification({
//      class: 'fa fa-users text-aqua',
//      content: '5 new members joined today',
//      link: '/page/2'
//    }));
      
      
        // Sucripción a las notificaciones de PUBLICACION_GUARDADA
        const eventSource = new EventSource('http://localhost:8080/chm/notification?types=PUBLICACION_GUARDADA&types=TIPO2&token='+localStorage.getItem('token'));
        eventSource.onmessage = e => {
            const notification = JSON.parse(e.data);
            
            console.log('Notificación recibida');
            console.log(notification);
                                  
            if(notification.type == 'PUBLICACION_GUARDADA') {
                
                this.notifServ.addNotification(new Notification({
                  class: 'fa fa-save text-aqua',
                  tooltip: '',
                  content: notification.title,
                  text: notification.description,
                  link: '#'
                }));
                
                this.changeDetectorRef.markForCheck();
                this.changeDetectorRef.detectChanges();
            }
            
        };
        eventSource.onopen = e => console.log('open');
        eventSource.onerror = e => {
            if (e.readyState == EventSource.CLOSED) {
                console.log('close');
            }
            else {
                console.log(e);
            }
        };
        eventSource.addEventListener('second', function(e) {
            console.log('second', e.data);
        }, false);
      
  }
    
}
