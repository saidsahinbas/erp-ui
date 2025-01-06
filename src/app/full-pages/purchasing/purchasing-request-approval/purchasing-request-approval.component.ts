import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../../services/order.service";
import {GetOrderByUserResponse} from "../../../models/order/get-order-by-user-response";
import {UpdateOrderStatusRequest} from "../../../models/order/update-order-status-request";

@Component({
  selector: 'app-purchasing-request-approval',
  templateUrl: './purchasing-request-approval.component.html',
  styleUrls: ['./purchasing-request-approval.component.css']
})
export class PurchasingRequestApprovalComponent implements OnInit {
  userSession: any = {}; // Kullanıcı oturum bilgisi
  orders: GetOrderByUserResponse[] = []; // Sipariş listesi
  canUpdateOrDelete: boolean = false; // Onaylama ve reddetme butonlarının görünürlüğü

  currentPage: number = 1; // Şu anki sayfa
  itemsPerPage: number = 5; // Sayfa başına gösterilecek sipariş sayısı
  totalPages: number = 0; // Toplam sayfa sayısı
  paginatedOrders: GetOrderByUserResponse[] = []; // Şu anki sayfa için siparişler

  filters = {
    warehouseId: '',
    startDate: '',
    endDate: '',
    orderStatus: '',
    userId: '',
  };

  filteredOrders: any[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userSessionString = sessionStorage.getItem('userSession');
    if (userSessionString) {
      this.userSession = JSON.parse(userSessionString);

      // Yetki kontrolü
      const screenPermissions = this.userSession.screens.find(
        (screen: { screenName: string }) =>
          screen.screenName === 'Purchase Request Approval'
      );

      if (screenPermissions) {
        // Buton görünürlüğü için update veya delete yetkisini kontrol et
        this.canUpdateOrDelete = screenPermissions.update || screenPermissions.delete;

        // Eğer read yetkisi yoksa ana sayfaya yönlendir
        if (!screenPermissions.read) {
          this.router.navigate(['/home']);
          return;
        }

        // Yetkilere göre uygun metodu çağır
        if (this.canUpdateOrDelete) {
          this.loadApprovalOrders();
        } else {
          this.loadUserOrders();
        }
      } else {
        // Eğer ekran yetkisi yoksa ana sayfaya yönlendir
        this.router.navigate(['/home']);
      }
    } else {
      // Eğer oturum yoksa ana sayfaya yönlendir
      this.router.navigate(['/home']);
    }
  }

  loadApprovalOrders(): void {
    this.orderService.getOrderByApproval().subscribe(
      (data) => {
        this.orders = data;
        this.setupPagination(); // Pagination ayarlarını çağır
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
        this.setupPagination(); // Pagination ayarlarını çağır
      },
      (error) => {
        console.error('Kullanıcı siparişleri yüklenirken hata oluştu:', error);
      }
    );
  }

  updateOrderStatus(orderId: number, status: boolean): void {
    const updateRequest: UpdateOrderStatusRequest = {
      orderId: orderId,
      userId: this.userSession.id, // Kullanıcı ID
      status: status // True: Onayla, False: Reddet
    };

    this.orderService.updateOrderStatus(updateRequest).subscribe(
      (response) => {
        alert(status ? 'Sipariş onaylandı!' : 'Sipariş reddedildi!');
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
