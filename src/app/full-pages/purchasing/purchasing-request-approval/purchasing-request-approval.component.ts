import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../../services/order.service";
import {GetOrderByUserResponse} from "../../../models/order/get-order-by-user-response";
import {UpdateOrderStatusRequest} from "../../../models/order/update-order-status-request";
import {OrderStatus} from "../../../models/order/order-status";

@Component({
  selector: 'app-purchasing-request-approval',
  templateUrl: './purchasing-request-approval.component.html',
  styleUrls: ['./purchasing-request-approval.component.css']
})
export class PurchasingRequestApprovalComponent implements OnInit {
  userSession: any = {};
  orders: GetOrderByUserResponse[] = [];
  canUpdateOrDelete: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  paginatedOrders: GetOrderByUserResponse[] = [];

  // Make OrderStatus public
  public readonly OrderStatus = OrderStatus;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    const userSessionString = sessionStorage.getItem('userSession');
    if (userSessionString) {
      this.userSession = JSON.parse(userSessionString);

      const screenPermissions = this.userSession.screens.find(
        (screen: { screenName: string }) =>
          screen.screenName === 'Purchase Request Approval'
      );

      if (screenPermissions) {
        this.canUpdateOrDelete = screenPermissions.update || screenPermissions.delete;

        if (!screenPermissions.read) {
          this.router.navigate(['/home']);
          return;
        }

        if (this.canUpdateOrDelete) {
          this.loadApprovalOrders();
        } else {
          this.loadUserOrders();
        }
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/home']);
    }
  }

  loadApprovalOrders(): void {
    this.orderService.getOrderByApproval().subscribe(
      (data) => {
        this.orders = data;
        this.setupPagination();
      },
      (error) => {
        console.error('Onay bekleyen siparişler yüklenirken hata oluştu:', error);
      }
    );
  }

  loadUserOrders(): void {
    const userId = this.userSession.id;
    this.orderService.getOrderByUser(userId).subscribe(
      (data) => {
        this.orders = data;
        this.setupPagination();
      },
      (error) => {
        console.error('Kullanıcı siparişleri yüklenirken hata oluştu:', error);
      }
    );
  }

  updateOrderStatus(orderId: number, status: OrderStatus): void {
    const updateRequest: UpdateOrderStatusRequest = {
      orderId: orderId,
      userId: this.userSession.id,
      status: status,
    };

    this.orderService.updateOrderStatus(updateRequest).subscribe(
      () => {
        alert(status === OrderStatus.APPROVED ? 'Sipariş onaylandı!' : 'Sipariş reddedildi!');
        if (this.canUpdateOrDelete) {
          this.loadApprovalOrders();
        } else {
          this.loadUserOrders();
        }
      },
      (error) => {
        console.error('Sipariş durumu güncellenirken hata oluştu:', error);
        alert('Sipariş durumu güncellenemedi. Lütfen tekrar deneyin.');
      }
    );
  }

  markOrderAsRecieved(orderId: number): void {
    const updateRequest: UpdateOrderStatusRequest = {
      orderId: orderId,
      userId: this.userSession.id,
      status: OrderStatus.RECEIVED,
    };

    // Make API request to update status
    this.orderService.updateOrderStatus(updateRequest).subscribe(
      () => {
        alert('Sipariş teslim alındı!');
        this.router.navigate(['/quality/results']); // Navigate to quality results page
      },
      (error) => {
        console.error('Sipariş teslim alınırken hata oluştu:', error);
        alert('Sipariş teslim alınamadı. Lütfen tekrar deneyin.');
      }
    );
  }

  setupPagination(): void {
    this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
    this.updatePaginatedOrders();
  }

  updatePaginatedOrders(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedOrders = this.orders.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedOrders();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedOrders();
    }
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updatePaginatedOrders();
  }
}
