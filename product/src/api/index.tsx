import axios, { AxiosInstance } from "axios";
export default class Api {
  static request: AxiosInstance;

  static createInstance(): void {
    if (!Api.request) {
      Api.request = axios.create({
        baseURL: "http://localhost:5200",
        timeout: 1000 * 120,
      });
      Api.request.interceptors.response.use((response) => {
        return response
      }, (error) => {
        return Promise.reject(error)
      });
    }
  }

  static async getCategories() {
    const url = "/api/rest/product/all_category";
    const { data, status } = await this.request.get(url);
    return { data, status }
  }

  static async getProductsByCategory(id: string | number) {
    const url = "/api/rest/product/filter_categories";
    const { data, status } = await this.request.post(url, { ids: id});
    return { data, status }
  }

  static async getProducts() {
    const url = "/api/rest/product/products";
    const { data, status } = await this.request.post(url, { ids: 1});
    return { data, status }
  }

  static async getFeaturedProducts() {
    const url = "api/rest/product/featured_products";
    const { data, status } = await this.request.get(url);
    return { data, status }
  }

  static async getLastedProducts(params: any) {
    const url = "api/rest/product/lasted_products";
    const { data, status } = await this.request.get(url, { params: { limit: params.limit } });
    return { data, status }
  }

  static async getRatedProducts(params: any) {
    const url = "api/rest/product/rated_products";
    const { data, status } = await this.request.get(url, { params: { limit: params.limit } });
    return { data, status }
  }

  static async getReviewedProducts(params: any) {
    const url = "api/rest/product/reviewed_products";
    const { data, status } = await this.request.get(url, { params: { limit: params.limit } });
    return { data, status }
  }

  static async getProductDetail(id: string | number) {
    const url = "api/rest/product/product_detail";
    const { data, status } = await this.request.get(url, { params: { id: id } });
    return { data, status }
  }

  static async getRelatedProducts() {
    const url = "api/rest/product/product_relative";
    const { data, status } = await this.request.get(url);
    return { data, status }
  }
}

Api.createInstance();
