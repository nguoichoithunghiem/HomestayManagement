import React from "react";
import "./Introduce.css";
import { assets } from "../../assets/assets";
const Introduce = () => {
  return (
    <div>
      <div className="khoiheader">
        <img className="nenpage" src={assets.introduce2} alt="" />
        <div className="text-overlay">Giới thiệu</div>
      </div>
      <div className="content1">
        <div className="box1content1">
          <div className="line11">
            <div className="anh1">
              <div className="chuthich chuthich1">
                <div className="hoatdong">Hoạt động</div>
                <div className="trainghiem">Trải nghiệm tuyệt vời nhất</div>
              </div>
              <img className="anhhoatdong" src={assets.anhhoatdong} alt="" />
            </div>
            <div className="anh2">
              <div className="chuthich chuthich2">
                <div className="phucvu">Phục vụ chuyên nghiệp</div>
                <div className="nhanvien">
                  Nhân viên phục vụ chuyên nghiệp và có trình độ cao
                </div>
              </div>
              <img className="anhhoatdong" src={assets.anhphucvu} alt="" />
            </div>
          </div>
          <div className="line1 line2">
            <div className="anh1 anh3">
              <div className="chuthich chuthich1">
                <div className="hoatdong">Dịch vụ</div>
                <div className="trainghiem">Dịch vụ chuyên nghiệp</div>
              </div>
              <img className="anhhoatdong" src={assets.anhdichvu} alt="" />
            </div>
            <div className="anh2 anh4">
              <div className="chuthich chuthich2">
                <div className="phucvu">Trải nghiệm</div>
                <div className="nhanvien">Trải nghiệm tuyệt vời</div>
              </div>
              <img className="anhhoatdong" src={assets.anhtrainghiem} alt="" />
            </div>
          </div>
        </div>
        <div className="box2content1">
          <div>
            <h1 className="title11">Welcom to Ha Long Bay</h1>
            <div className="khampha">
              Khám phá các địa điểm yêu thích của bạn tại Hạ Long
            </div>
            <div className="voinhung">
              Với những HomeStay dịch vụ đạt chuẩn 5*. Chúng tôi xin hân hạnh
              phục vụ bạn với những chuyến nghỉ dưỡng tuyệt vời nhất{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="video">
        <video
          width="100%"
          height="auto"
          src={assets.videogioithieu}
          type="video/mp4"
          controls
        ></video>
      </div>
      <div className="content2">
        <img src={assets.anhvechungtoi} alt="" />
        <div className="box2content2">
          <h1 className="title11">Về chúng tôi</h1>
          <div className="khampha">
            Hãy làm cho chuyến nghỉ dưỡng của bạn thật tuyệt vời
          </div>
          <div className="voinhung">
            Với những HomeStay dịch vụ đạt chuẩn 5*. Chúng tôi xin hân hạnh phục
            vụ bạn với những chuyến nghỉ dưỡng tuyệt vời nhất{" "}
          </div>
        </div>
      </div>
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
  );
};

export default Introduce;
