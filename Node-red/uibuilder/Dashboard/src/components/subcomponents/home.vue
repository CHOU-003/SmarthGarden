<template>
    <b-container fluid class="home-page" style="margin-top: 3%;">
      <!-- Hero Section -->
      <b-row align-h="center" class="mb-5">
        <b-col cols="12" md="10" lg="8">
          <b-card class="text-center p-4 shadow rounded-lg hero-card" style="background: linear-gradient(135deg, #56ab2f, #a8e063); color: white;">
            <h1 class="display-4 mb-3">Chào mừng đến với NDC SmarthGardenX</h1>
            <p class="lead mb-4">Tự động hóa khu vườn của bạn với hệ thống giám sát và điều khiển thông minh theo thời gian thực. Xanh hóa cuộc sống ngay hôm nay!</p>
            <b-button variant="light" href="#" class="mt-3" style="font-weight: bold;">Khám phá tính năng</b-button>
          </b-card>
        </b-col>
      </b-row>
  
      <!-- Feature Section -->
      <b-row class="text-center mb-5">
        <b-col md="4" class="mb-4">
          <b-card class="p-3 shadow-sm feature-card" style="background-color: #f5f5f5;">
            <b-icon icon="droplet-half" variant="success" font-scale="3"></b-icon>
            <h4 class="mt-3">Độ ẩm đất</h4>
            <p>Theo dõi độ ẩm đất theo thời gian thực để tối ưu hóa sự phát triển của cây trồng và hệ thống tưới tiêu.</p>
          </b-card>
        </b-col>
        <b-col md="4" class="mb-4">
          <b-card class="p-3 shadow-sm feature-card" style="background-color: #f5f5f5;">
            <b-icon icon="thermometer-half" variant="danger" font-scale="3"></b-icon>
            <h4 class="mt-3">Kiểm soát nhiệt độ</h4>
            <p>Giám sát nhiệt độ khu vườn và tự động điều chỉnh hệ thống che nắng hoặc phun sương.</p>
          </b-card>
        </b-col>
        <b-col md="4" class="mb-4">
          <b-card class="p-3 shadow-sm feature-card" style="background-color: #f5f5f5;">
            <b-icon icon="lightning" variant="warning" font-scale="3"></b-icon>
            <h4 class="mt-3">Tưới tiêu thông minh</h4>
            <p>Điều khiển máy bơm nước thông minh dựa trên dự báo thời tiết và nhu cầu thực tế của đất.</p>
          </b-card>
        </b-col>
      </b-row>
  
      <!-- News Section -->
      <b-row class="mb-5">
            <b-col cols="12">
                <h2 class="text-center mb-4">Tin tức Nông nghiệp mới nhất</h2>
            </b-col>

            <b-col md="4" v-for="(article, index) in news" :key="index" class="mb-4">
                <b-card :title="article.title" class="shadow-sm d-flex flex-column" style="height: 100%;">
                <div class="news-image-container">
                    <img :src="article.image" alt="Hình ảnh Tin tức" class="news-image">
                </div>
                <b-card-text class="mt-3">
                    {{ article.description }}
                </b-card-text>
                <div class="mt-auto">
                    <b-button variant="success" :href="article.link" target="_blank">XEM THÊM</b-button>
                </div>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
  </template>
  
  
  <script>
  module.exports = {
    data() {
      return {
        news: [
          {
            title: "Sống chung với khô hạn",
            description: "Ninh Thuận là vùng đất thường xuyên thiếu nước tưới trong mùa khô, do vậy chuyển đổi cây trồng từ đất lúa kém hiệu quả sang cây trồng cạn là việc không thể không làm.",
            image: "https://t.ex-cdn.com/nongnghiepmoitruong.vn/480w/files/chidp/2025/04/22/0429-song-chung-voi-kho-han-bai-1-chuyen-doi-co-cau-cay-trong-hieu-qua-kep-205709_935.jpg",
            link: "https://nongnghiepmoitruong.vn/song-chung-voi-kho-han-bai-1-chuyen-doi-cay-trong-than-tai-go-cua-d749719.html"
          },
          {
            title: "Chuyện rau sắng, bò khai, khoai tầng vàng ở Vườn quốc gia Xuân Sơn",
            description: "Hễ nhắc đến rau sắng, người ta thường nghĩ ngay đến chùa Hương, xã Hương Sơn (Hà Nội), tuy nhiên ở Vườn quốc gia Xuân Sơn (Phú Thọ) lại có quần thể cây rất lớn.",
            image: "https://i.ex-cdn.com/nongnghiepmoitruong.vn/files/content/2025/04/28/dsc_4433_1-172638_274-105730.jpg",
            link: "https://nongnghiepmoitruong.vn/chuyen-rau-sang-bo-khai-khoai-tang-vang-o-vuon-quoc-gia-xuan-son-d749050.html"
          },
          {
            title: "Giống lúa TBR97 chinh phục nông dân Đà Nẵng ngay vụ đầu",
            description: "Gặt kiểm tra năng suất trên cánh đồng, ai cũng ngỡ ngàng năng suất của giống lúa TBR97 khi đạt đến 11 tấn lúa tươi/ha.",
            image: "https://i.ex-cdn.com/nongnghiepmoitruong.vn/files/content/2025/04/27/1-221427_947-220431.jpg",
            link: "https://nongnghiepmoitruong.vn/giong-lua-tbr97-chinh-phuc-nong-dan-da-nang-ngay-vu-dau-d749085.html"
          }
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  .home-page {
    background: url('@/assets/garden-background.jpg') no-repeat center center;
    background-size: cover;
    background-attachment: fixed;
    padding-bottom: 50px;
  }
  
  .hero-card {
    border: none;
  }
  
  .feature-card {
    transition: transform 0.3s;
  }
  .feature-card:hover {
    transform: translateY(-5px);
  }

  .news-image-container {
  width: 100%;
  height: 200px; /* Chiều cao cố định */
  overflow: hidden;
  border-radius: 5px;
    }

    .news-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ảnh căn chỉnh đẹp */
    }
  
  </style>