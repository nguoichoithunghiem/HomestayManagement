import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const Home = () => {
  return (
    <div>
      <div className="header">
        <div class="background-image">
          <img src={assets.image} alt="" />
        </div>
        <div className="thanhde"></div>
        <div class="title">
          <h1 class="title1">Welcom to Ha Long Bay</h1>
          <div class="title2">
            <h1>Khám phá các địa điểm yêu thích của bạn tại Hạ Long</h1>
          </div>
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
      </div>
      <div>
        <h1 class="danhsach danhsach1">Danh sách</h1>
        <h1 class="diadiem">Địa điểm HomeStay</h1>
      </div>
      <div class="container">
        <div>
          <div class="note note4">Bãi biển nhân tạo Bãi Cháy</div>
          <img class="picture picture4" src={assets.gioithieu4} alt="" />
        </div>
        <div>
          <div class="note note3">Khu vui chơi giải trí quốc tế Tuần Châu</div>
          <img class="picture picture3" src={assets.gioithieu3} alt="" />
        </div>
        <div>
          <div class="note note2">Công viên Hạ Long</div>
          <img class="picture picture2" src={assets.gioithieu2} alt="" />
        </div>
        <div>
          <div class="note note1">
            Tổ hợp thương mại và giải trí Marine Plaza{" "}
          </div>
          <img class="picture picture1" src={assets.gioithieu1} alt="" />
        </div>
        <div class="background">
          <img
            src="https://img.freepik.com/free-vector/white-abstract-background_23-2148806276.jpg?w=2000"
            alt=""
          />
        </div>
      </div>
      <h1 class="danhsach1">Danh sách</h1>
      <h1 class="emptyroom">Phòng trống</h1>
      <div>
        <div class="line1">
          <div class="room1">
            <div class="boxdetail">
              <h1 class="tenphong">
                <Link to="/introduce">Giới thiệu</Link>
              </h1>
              <div class="detail">
                <img class="icon" src={assets.iconplace} alt="" />
                <div class="detail1">
                  Địa điểm : Tổ hợp thương mại và giải trí Marine Plaza
                </div>
              </div>
              <div class="detail">
                <img class="icon" src={assets.localhotel} alt="" />
                <div class="detail1 detail2">Loại phòng: Phòng đôi</div>
              </div>
            </div>
            <div class="discount">-10%</div>
            <div class="giaphong">680.000</div>
            <img class="phong phong1" src={assets.phong1} alt="" />
          </div>
          <div class="room2">
            <div class="boxdetail">
              <h1 class="tenphong">Phòng Luxury</h1>
              <div class="detail">
                <img class="icon" src={assets.iconplace} alt="" />
                <div class="detail1 detail3">
                  Địa điểm : Gần rạp chiếu phim CGV
                </div>
              </div>
              <div class="detail">
                <img class="icon" src={assets.localhotel} alt="" />
                <div class="detail1 detail2">Loại phòng: Phòng VIP</div>
              </div>
            </div>
            <div class="discount">-10%</div>
            <div class="giaphong">800.000</div>
            <img class="phong phong1" src={assets.phong2} alt="" />
          </div>
          <div class="room3">
            <div class="boxdetail">
              <h1 class="tenphong">Deluxe Room with Balcony</h1>

              <div class="detail">
                <img class="icon" src={assets.iconplace} alt="" />
                <div class="detail1">Địa điểm : Bãi biển nhân tạo Bãi Cháy</div>
              </div>
              <div class="detail">
                <img class="icon" src={assets.localhotel} alt="" />
                <div class="detail1 detail2">Loại phòng: Phòng đôi</div>
              </div>
            </div>
            <div class="discount">-10%</div>
            <div class="giaphong">1.250.000</div>
            <img class="phong phong1" src={assets.phong3} alt="" />
          </div>
        </div>
        <div class="room4">
          <div class="boxdetail">
            <h1 class="tenphong">Deluxe Room with Hammock</h1>
            <div class="detail">
              <img class="icon" src={assets.iconplace} alt="" />
              <div class="detail1 detail4">Địa điểm : Công viên Hạ Long</div>
            </div>
            <div class="detail">
              <img class="icon" src={assets.localhotel} alt="" />
              <div class="detail1 detail2">Loại phòng: Phòng đôi</div>
            </div>
          </div>
          <div class="discount">-10%</div>
          <div class="giaphong">680.000</div>
          <img class="phong phong1" src={assets.phong4} alt="" />
        </div>
        <video
          width="100%"
          height="auto"
          src={assets.videogioithieu}
          type="video/mp4"
          controls
        ></video>
        <div class="comment">
          <img class="nen2" src={assets.nen2} alt="" />
        </div>
        <div class="comment2">
          <h1 class="danhsach danhsach2">Danh sách</h1>
          <h1 class="diadiem">Bình luận nổi bật</h1>
          <div class="contentcomment">
            <div class="box box1">
              <div class="danhgia">Phòng đẹp 5*</div>
              <div class="avtvacmt">
                <img class="avt avt1" src={assets.avt1} alt="" />
                <div>
                  <div class="tenkhach">HIEUTHUHAI</div>
                  <div class="phanloai">Thành viên</div>
                </div>
              </div>
            </div>
            <div class="box box2">
              <div class="danhgia">Phòng đẹp 5*</div>
              <div class="avtvacmt">
                <img class="avt avt1" src={assets.avt2} alt="" />
                <div>
                  <div class="tenkhach">HurryKNG</div>
                  <div class="phanloai">Thành viên</div>
                </div>
              </div>
            </div>
            <div class="box box3">
              <div class="danhgia">Phòng đẹp 5*</div>
              <div class="avtvacmt">
                <img class="avt avt1" src={assets.avt3} alt="" />
                <div>
                  <div class="tenkhach">Negav</div>
                  <div class="phanloai">Thành viên</div>
                </div>
              </div>
            </div>
          </div>
          <div class="tintuc">
            <div>
              <h1 class="danhsach danhsach1">Danh sách</h1>
              <h1 class="diadiem baidang">Bài đăng gần đây</h1>
            </div>
            <div class="khoitintuc">
              <div class="tintuc1">
                <div class="ngaythang">
                  <div class="ngay">9</div>
                  <div class="thangnam">
                    <div>2024</div>
                    <div>sep</div>
                  </div>
                </div>
                <div class="detailtintuc">
                  <div class="tieude">Bếp nhỏ xinh, luôn gọn gàng, sạch sẽ</div>
                  <div class="noidung">
                    HomeStay được thiết kế theo phong cách hơi cổ kính và khá là
                    đáng yêu bởi cách trang trí giản dị tiện nghi
                  </div>
                  <div class="buttonxemthem">Xem Thêm</div>
                </div>
                <img class="imgtintuc1" src={assets.tintuc1} alt="" />
              </div>
              <div class="tintuc2">
                <div class="ngaythang">
                  <div class="ngay">8</div>
                  <div class="thangnam">
                    <div>2024</div>
                    <div>sep</div>
                  </div>
                </div>
                <div class="detailtintuc detailtintuc2">
                  <div class="tieude">Thêm cơ sở mới gần khu vui chơi</div>
                  <div class="noidung">Giá rẻ danh cho sinh viên</div>
                  <div class="buttonxemthem">Xem Thêm</div>
                </div>
                <img class="imgtintuc1" src={assets.tintuc2} alt="" />
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
    </div>
  );
};

export default Home;
