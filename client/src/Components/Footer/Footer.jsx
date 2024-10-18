import React from "react";
import "./Footer.css";
const footer = () => {
  return (
    <div>
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

export default footer;
