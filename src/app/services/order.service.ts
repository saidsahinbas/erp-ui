import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {OrderCreateRequest} from "../models/order/order-create-request";
import {Observable} from "rxjs";
import {UpdateOrderStatusRequest} from "../models/order/update-order-status-request";
import {GetOrderByUserResponse} from "../models/order/get-order-by-user-response";
import {Order} from "../models/order/order";
import {GetAllStockResponseDto} from "../models/stock/get-all-stock-response-dto";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly API_URL = environment.API_URL + '/order';

  constructor(private httpClient: HttpClient) { }

  createOrder(orderRequest: OrderCreateRequest){
    return this.httpClient.post<OrderCreateRequest>(`${this.API_URL}/create`, orderRequest);
  }

  updateOrderStatus(updateOrderStatusRequest: UpdateOrderStatusRequest){
    return this.httpClient.post<UpdateOrderStatusRequest>(`${this.API_URL}/updateStatus`, updateOrderStatusRequest)
  }

  getOrderByUser(userId: number): Observable<GetOrderByUserResponse[]> {
    return this.httpClient.get<GetOrderByUserResponse[]>(`${this.API_URL}/getOrderByUser/${userId}`);
  }

  //onay bekleyen siparişler
  getOrderByApproval(): Observable<GetOrderByUserResponse[]> {
    return this.httpClient.get<GetOrderByUserResponse[]>(`${this.API_URL}/approvalOrder`);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.API_URL}/getOrder/${orderId}`);
  }

}
