import apiClient from "./client";
export const getCompanyInfo  = ()          => apiClient.get("/company-info/").then(r => r.data);
export const getServices     = (params={}) => apiClient.get("/services/",     { params }).then(r => r.data);
export const getProjects     = (params={}) => apiClient.get("/projects/",     { params }).then(r => r.data);
export const getGallery      = (params={}) => apiClient.get("/gallery/",      { params }).then(r => r.data);
export const getTestimonials = ()          => apiClient.get("/testimonials/").then(r => r.data);
export const getFAQs         = ()          => apiClient.get("/faqs/").then(r => r.data);
export const submitEnquiry   = (data)      => apiClient.post("/enquiries/", data).then(r => r.data);
