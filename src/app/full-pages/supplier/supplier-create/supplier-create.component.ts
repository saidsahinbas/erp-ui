import { Component, OnInit } from '@angular/core';
import {Supplier} from "../../../models/supplier/supplier";
import {SupplierService} from "../../../services/supplier.service";
import {Router} from "@angular/router";
import {City} from "../../../models/city/city";
import {Country} from "../../../models/country/country";
import {CountryCityService} from "../../../services/country-city.service";
import {SupplierStatus} from "../../../models/supplier/supplier-status";

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {
  supplier: Supplier = new Supplier(); // Supplier object for form binding
  cities: City[] = [];
  countries: Country[] = [];
  supplierStatuses = Object.values(SupplierStatus); // Enum values for supplier status

  uploadedDocuments: File[] = []; // To store the uploaded files

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private countryCityService: CountryCityService
  ) {}

  ngOnInit(): void {
    this.getAllCountries();
    this.supplier.status = SupplierStatus.AKTIF; // Set default status
  }

  // Fetch all countries
  getAllCountries(): void {
    this.countryCityService.getAllCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  // Fetch cities based on the selected country
  getAllCitiesByCountryId(countryId: number): void {
    this.countryCityService.getCitiesByCountry(countryId).subscribe((cities) => {
      this.cities = cities;
    });
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      for (let i = 0; i < target.files.length; i++) {
        this.uploadedDocuments.push(target.files[i]); // Add files to the list
      }
    }
  }

  // Remove an uploaded document from the list
  removeDocument(index: number): void {
    this.uploadedDocuments.splice(index, 1); // Remove the document at the specified index
  }

  // Create supplier and send data to the backend
  createSupplier(): void {
    const formData = new FormData();
    formData.append('supplier', JSON.stringify({
      name: this.supplier.name,
      email: this.supplier.email,
      phone: this.supplier.phone,
      note: this.supplier.note,
      status: this.supplier.status,
      country: { id: this.supplier.country.id }, // Pass only the country ID
      city: { id: this.supplier.city.id } // Pass only the city ID
    }));

    // Add uploaded documents to the form data
    this.uploadedDocuments.forEach((file, index) => {
      formData.append(`document${index}`, file, file.name);
    });

    this.supplierService.createSupplier(formData).subscribe(
      (response) => {
        console.log('Supplier created successfully:', response);
        this.router.navigate(['/suppliers']); // Navigate back to the suppliers list
      },
      (error) => {
        console.error('Error creating supplier:', error);
      }
    );
  }
}
