import React from "react";
import "./News.css";
import { assets } from "../../assets/assets";
const News = () => {
  return (
    <div>
      <div className="news-khoiheader">
        <img className="news-nenpage" src={assets.news2} alt="" />
        <div className="news-text-overlay">Tin Tức</div>
      </div>
      <div className="news-content1">
        <div className="news-box1">
          <h1>Bếp nhỏ xinh, luôn gọn gàng, sạch sẽ</h1>
          <h2>
            Home Stay được thiết kế theo phong cách hơi cổ kính và khá là đánh
            yêu bởi cách trang trí giản dị, tiện nghi qua gạch bông, drap
            giường, bàn ghế, những dây đèn và cả ban công xinh xắn. Đây đúng là
            một nơi dừng chân nghỉ ngơi thoải mái, tiết kiệm và thuận tiện cho
            việc di chuyển trong nội thành.
          </h2>
          <img src={assets.anhtintuc} alt="" />
          <hr />
          <h1 className="news-danhsach">Danh sách bình luận</h1>
          <h1 className="news-danhsach">Bạn cần đăng nhập để bình luận</h1>
        </div>
        <div className="news-box2">
          <input
            className="news-timkiem"
            type="text"
            placeholder="Tìm kiếm..."
          />
          <h1 className="news-danhmuc">Danh mục</h1>
          <div className="news-tintuc">
            <h2>Tin tức</h2>
            <h1>(1)</h1>
          </div>
          <hr />
          <div className="news-homestay">
            <h2>HomeStay</h2>
            <h1>(1)</h1>
          </div>
          <h1 className="news-textbaiviet">Bài viết mới</h1>
          <div className="news-contentbaiviet">
            <div className="news-contentbaiviet1">
              <div>
                <img src={assets.contentbaiviet1} alt="" />
              </div>
              <div className="news-textcontent">
                <div className="news-tieude">
                  Thêm cơ sở mới gần khu vui chơi
                </div>
                <div className="news-ngaythangphanquyen">
                  <div>
                    <img src={assets.event} alt="" />
                  </div>
                  <div className="news-textthang">Sep 09, 2024</div>
                  <div className="news-iconperson">
                    <img src={assets.person} alt="" />
                  </div>
                  <div className="news-textadmin">Admin</div>
                </div>
              </div>
            </div>
            <div className="news-contentbaiviet1 news-contentbaiviet2">
              <div>
                <img src={assets.contentbaiviet2} alt="" />
              </div>
              <div className="news-textcontent">
                <div className="news-tieude">
                  Bếp nhỏ xinh, luôn gọn gàng, sạch sẽ
                </div>
                <div className="news-ngaythangphanquyen">
                  <div>
                    <img src={assets.event} alt="" />
                  </div>
                  <div className="news-textthang">Sep 09, 2024</div>
                  <div className="news-iconperson">
                    <img src={assets.person} alt="" />
                  </div>
                  <div className="news-textadmin">Admin</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="contentoffooter">
          <div class="cot cot1">
            <div>Về chúng tôi</div>
            <div class="chuxam">
              <div>Khám phá các địa điểm yêu thích của bạn tại Hạ Long</div>
            </div>
          </div>
          <div class="cot cot2">
            <div>Menu</div>
            <div class="chuxam">
              <div>Trang chủ</div>
              <div>Giới thiệu</div>
              <div>HomeStay</div>
              <div>Tin tức</div>
              <div>Liên hệ</div>
              <div>Đăng ký</div>
              <div>Đăng nhập</div>
            </div>
          </div>
          <div class="cot cot3">
            <div>Thông tin địa chỉ</div>
            <div class="diachi">
              <div class="tenduongvaicon">
                <img
                  class="iconplacecolor"
                  src={assets.iconplacecolor}
                  alt=""
                />
                <div class="tenduong">
                  Đ. Hoàng Quốc Việt, Hùng Thắng, Thành phố Hạ Long, Quảng Ninh
                </div>
              </div>
              <div class="phonevaicon">
                <img class="iconplacecolor" src={assets.iconphone} alt="" />
                <div class="sophone">0123456798</div>
              </div>
              <div class="sendvaicon">
                <img class="iconplacecolor" src={assets.iconsend} alt="" />
                <div class="email">vantruong@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
        <img src={assets.nenfooter} alt="" />
      </div>
    </div>
  );
};

export default News;
