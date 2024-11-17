import React, { useState, useEffect } from "react";
import axios from "axios";
import "./News.css";
import { assets } from "../../assets/assets";

const News = () => {
  const [posts, setPosts] = useState([]); // State để lưu danh sách bài viết
  const url = "https://homestaymanagement-backend.onrender.com"; // Địa chỉ API của bạn (cập nhật theo đúng URL của bạn)

  // Lấy dữ liệu bài viết từ API khi component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${url}/api/posts/list`);
        if (response.data.success) {
          // Lọc chỉ các bài viết có trạng thái "published"
          const publishedPosts = response.data.data.filter(post => post.status === "published");
          
          // Đảo ngược mảng bài viết để bài viết mới nhất ở trên cùng
          publishedPosts.reverse();
          
          setPosts(publishedPosts); // Lưu bài viết đã lọc và đảo ngược vào state
        } else {
          console.log(response.data.message); // Xử lý thông báo lỗi nếu có
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, []); // Chạy một lần khi component được render lần đầu
   // Chạy một lần khi component được render lần đầu

  return (
    <div className="news-container">
      {/* Header */}
      <div className="news-header">
        <img className="news-background" src={assets.news2} alt="Background" />
        <div className="news-title-overlay">Tin Tức</div>
      </div>

      <div className="news-main-content">
        {/* Content Section - Danh sách bài viết */}
        <div className="news-content">
          <h1 className="news-title">Danh sách bài viết</h1>

          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="news-item">
                <h2 className="news-item-title">{post.title}</h2>
                {post.postImage && (
                  <img
                    className="news-item-image"
                    src={`${url}/images/${post.postImage}`}
                    alt={post.title}
                  />
                )}
                <p className="news-item-summary">{post.content.substring(0, 50000)}...</p>
                <div className="news-item-footer">
                </div>
                <hr />
              </div>
            ))
          ) : (
            <p>Không có bài viết nào.</p>
          )}
        </div>

        {/* Sidebar */}
        <div className="news-sidebar">
          <input
            className="news-search"
            type="text"
            placeholder="Tìm kiếm..."
          />

          <h1 className="news-category-title">Danh mục</h1>
          <div className="news-category">
            <h2>Tin tức</h2>
            <h1>(1)</h1>
          </div>
          <hr />
          <div className="news-category">
            <h2>HomeStay</h2>
            <h1>(1)</h1>
          </div>

          <h1 className="news-recent-posts-title">Bài viết mới</h1>
          <div className="news-recent-posts">
            <div className="news-recent-post">
              <div className="news-recent-post-image">
                <img src={assets.contentbaiviet1} alt="Content 1" />
              </div>
              <div className="news-recent-post-text">
                <div className="news-recent-post-title">Thêm cơ sở mới gần khu vui chơi</div>
                <div className="news-post-meta">
                  <div className="news-post-date">Sep 09, 2024</div>
                  <div className="news-post-author">
                    <img src={assets.person} alt="Person" />
                    <span>Admin</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="news-recent-post">
              <div className="news-recent-post-image">
                <img src={assets.contentbaiviet2} alt="Content 2" />
              </div>
              <div className="news-recent-post-text">
                <div className="news-recent-post-title">Bếp nhỏ xinh, luôn gọn gàng, sạch sẽ</div>
                <div className="news-post-meta">
                  <div className="news-post-date">Sep 09, 2024</div>
                  <div className="news-post-author">
                    <img src={assets.person} alt="Person" />
                    <span>Admin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
