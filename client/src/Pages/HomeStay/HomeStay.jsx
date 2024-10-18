import React from "react";
import "./HomeStay.css";
import { assets } from "../../assets/assets";
const HomeStay = () => {
  return (
    <div>
      <div className="khoiheader">
        <img className="nenpage" src={assets.nenhomestay2} alt="" />
        <div className="text-overlay">HomeStay</div>
      </div>
      <div class="filter-bar">
        <select class="option1">
          <option value="">Chọn HomeStay</option>
          <option value="homestay1">HomeStay 1</option>
          <option value="homestay2">HomeStay 2</option>
          <option value="homestay3">HomeStay 3</option>
        </select>

        <select>
          <option value="">Chọn Địa Điểm</option>
          <option value="hanoi">Hà Nội</option>
          <option value="hochiminh">Hồ Chí Minh</option>
          <option value="danang">Đà Nẵng</option>
        </select>

        <select>
          <option value="">Khoảng Giá</option>
          <option value="500000">Dưới 500.000 VNĐ</option>
          <option value="1000000">500.000 VNĐ - 1.000.000 VNĐ</option>
          <option value="2000000">Trên 1.000.000 VNĐ</option>
        </select>
        <button type="button">Search</button>
      </div>
      <div className="homestay-content1">
        <div className="homestay-line1">
          <div className="homestay-box1">
            <div className="homestay-gia">
              <h1>680.000</h1>
            </div>
            <div className="homestay-gia homestay-discount">
              <h1>-10%</h1>
            </div>
            <div className="homestay-boxdetail">
              <h1>Harmony HomeStay</h1>
              <div className="homestay-diadiem homestay-margin-content1">
                <img src={assets.iconplace} alt="" />
                <div>Gần rạp chiếu phim CGV</div>
              </div>
              <div className="homestay-margin-content1">
                Trung thành với tone màu xanh dịu mắt và tạo ấn tượng xuyên
                suốt, cũng nằm ở trung tâm phố cổ và không có lợi....
              </div>
              <div className="homestay-button-xemthem homestay-margin-content1">
                Xem thêm
              </div>
            </div>
            <img src={assets.homestay1} alt="" />
          </div>
          <div className="homestay-box1 homestay-box2">
            <div className="homestay-gia">
              <h1>680.000</h1>
            </div>
            <div className="homestay-gia homestay-discount">
              <h1>-10%</h1>
            </div>
            <div className="homestay-boxdetail">
              <h1>Tre House</h1>
              <div className="homestay-diadiem homestay-margin-content1">
                <img src={assets.iconplace} alt="" />
                <div>Công viên Hạ Long</div>
              </div>
              <div className="homestay-margin-content1">
                Tre House vẫn là một trong những homestay Hà Nội vô cùng đẹp và
                tiện nghi. Chủ nhà đã chăm sóc cho mỗi căn....
              </div>
              <div className="homestay-button-xemthem homestay-margin-content1">
                Xem thêm
              </div>
            </div>
            <img src={assets.homestay2} alt="" />
          </div>
          <div className="homestay-box1 homestay-box3">
            <div className="homestay-gia">
              <h1>680.000</h1>
            </div>
            <div className="homestay-gia homestay-discount">
              <h1>-10%</h1>
            </div>
            <div className="homestay-boxdetail">
              <h1>Ha Long Essence Hotel</h1>
              <div className="homestay-diadiem homestay-margin-content1">
                <img src={assets.iconplace} alt="" />
                <div>Tổ hợp thương mại Marine Plaza</div>
              </div>
              <div className="homestay-margin-content1">
                Nằm ở thành phố Hạ Long, cách Cáp treo Nữ hoàng 1.6km, Ha Long
                Essence Hotel cung cấp chỗ nghỉ với nhà hàng, chỗ đỗ xe riêng
              </div>
              <div className="homestay-button-xemthem homestay-margin-content1">
                Xem thêm
              </div>
            </div>
            <img src={assets.homestay3} alt="" />
          </div>
        </div>
        <div className="homestay-line1 homestay-line2">
          <div className="homestay-box1 homestay-box3 homestay-box4 ">
            <div className="homestay-gia">
              <h1>680.000</h1>
            </div>
            <div className="homestay-gia homestay-discount">
              <h1>-10%</h1>
            </div>
            <div className="homestay-boxdetail">
              <h1>Green Suites Hotel</h1>
              <div className="homestay-diadiem homestay-margin-content1">
                <img src={assets.iconplace} alt="" />
                <div>Tổ hợp thương mại Marine Plaza</div>
              </div>
              <div className="homestay-margin-content1">
                Tọa lạc tại vị trí thuận tiện ở phường Bãi Cháy thuộc thành phố
                Hạ Long, Green Suites Hotel nằm cách Cáp treo Nữ hoàng.....
              </div>
              <div className="homestay-button-xemthem homestay-margin-content1">
                Xem thêm
              </div>
            </div>
            <img src={assets.homestay4} alt="" />
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
                    Đ. Hoàng Quốc Việt, Hùng Thắng, Thành phố Hạ Long, Quảng
                    Ninh
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
    </div>
  );
};

export default HomeStay;
