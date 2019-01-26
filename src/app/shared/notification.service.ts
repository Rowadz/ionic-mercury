import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // constructor(private readonly socket: Socket) {}
  // listen(id: number) {
  //   this.commentOnYourPost(id);
  //   this.followRequestApproved(id);
  //   this.newFollowRequest(id);
  //   this.newExchangeRequest(id);
  //   this.exchangeRequestApproved(id);
  // }
  // private commentOnYourPost(id: number) {
  //   this.socket.on(`newCommentNotify:${id}`, data => {
  //     alert('newCommentNotify');
  //   });
  // }
  // private followRequestApproved(id: number) {
  //   this.socket.on(`approvedFollowNotify:${id}`, data => {
  //     alert('approvedFollowNotify');
  //   });
  // }
  // private newFollowRequest(id: number) {
  //   this.socket.on(`newFollowRequestNotify:${id}`, data => {
  //     alert('newFollowRequestNotify');
  //   });
  // }
  // private newExchangeRequest(id: number) {
  //   this.socket.on(`newExchangeRequestNotify:${id}`, data => {
  //     alert('newExchangeRequestNotify');
  //   });
  // }
  // private exchangeRequestApproved(id: number) {
  //   this.socket.on(`exchangeRequestApprovedNotify:${id}`, data => {
  //     alert('newExchangeRequestNotify');
  //   });
  // }
}
