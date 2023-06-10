/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "product";

export interface CreateProductRequest {
  name: string;
  sku: string;
  stock: number;
  price: number;
}

export interface CreateProductResponse {
  status: number;
  error: string[];
  id: number;
}

export interface FindProductData {
  id: number;
  name: string;
  sku: string;
  stock: number;
  price: number;
}

export interface FindProductRequest {
  id: number;
}

export interface FindProductResponse {
  status: number;
  error: string[];
  data: FindProductData | undefined;
}

export interface DecreaseStockRequest {
  id: number;
  orderId: number;
}

export interface DecreaseStockResponse {
  status: number;
  error: string[];
}

export const PRODUCT_PACKAGE_NAME = "product";

export interface ProductServiceClient {
  createProduct(request: CreateProductRequest): Observable<CreateProductResponse>;

  findProduct(request: FindProductRequest): Observable<FindProductResponse>;

  decreaseStock(request: DecreaseStockRequest): Observable<DecreaseStockResponse>;
}

export interface ProductServiceController {
  createProduct(
    request: CreateProductRequest,
  ): Promise<CreateProductResponse> | Observable<CreateProductResponse> | CreateProductResponse;

  findProduct(
    request: FindProductRequest,
  ): Promise<FindProductResponse> | Observable<FindProductResponse> | FindProductResponse;

  decreaseStock(
    request: DecreaseStockRequest,
  ): Promise<DecreaseStockResponse> | Observable<DecreaseStockResponse> | DecreaseStockResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createProduct", "findProduct", "decreaseStock"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = "ProductService";
