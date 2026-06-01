/**
 * lib/api/client.ts
 * ─────────────────
 * Axios instance สำหรับ client-side เรียก API routes (/api/...)
 * ทุก request ผ่าน instance นี้เพื่อให้มี base config กลาง
 */
import axios from "axios";

const apiClient = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
