import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomeStay.css";
import { assets } from "../../assets/assets";

const HomeStay = () => {
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/homestay/list');
        // Lọc homestays chỉ hiển thị những cái có status là 'available'
        const availableHomestays = response.data.data.filter(homestay => homestay.status === 'available');
        setHomestays(availableHomestays);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomestays();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      <div className="khoiheader">
        <img className="nenpage" src={assets.nenhomestay2} alt="" />
        <div className="text-overlay">HomeStay</div>
      </div>
      <div className="filter-bar">
        <select className="option1">
          <option value="">Chọn HomeStay</option>
          {homestays.map(homestay => (
            <option key={homestay._id} value={homestay._id}>
              {homestay.homestayName}
            </option>
          ))}
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
        {homestays.map((homestay) => (
          <div key={homestay._id} className="homestay-box1">
            <div className="homestay-gia">
              <h1>{homestay.homestayPrice} VNĐ</h1>
            </div>
            <div className="homestay-gia homestay-discount">
              <h1>-10%</h1>
            </div>
            <div className="homestay-boxdetail">
              <h1>{homestay.homestayName}</h1>
              <div className="homestay-diadiem homestay-margin-content1">
                <img src={assets.iconplace} alt="" />
                <div>{homestay.location}</div>
              </div>
              <div className="homestay-margin-content1">
                {homestay.description}
              </div>
              <div className="homestay-button-xemthem homestay-margin-content1">
                Xem thêm
              </div>
            </div>
            <img src={`http://localhost:5000/images/${encodeURIComponent(homestay.homestayImage)}`} alt={homestay.homestayName} />
          </div>
        ))}
      </div>
      <div className="footer">
        <div className="contentoffooter">
          <div className="cot cot1">
            <div>Về chúng tôi</div>
            <div className="chuxam">
              <div>Khám phá các địa điểm yêu thích của bạn tại Hạ Long</div>
            </div>
          </div>
          <div className="cot cot2">
            <div>Menu</div>
            <div className="chuxam">
              <div>Trang chủ</div>
              <div>Giới thiệu</div>
              <div>HomeStay</div>
              <div>Tin tức</div>
              <div>Liên hệ</div>
              <div>Đăng ký</div>
              <div>Đăng nhập</div>
            </div>
          </div>
          <div className="cot cot3">
            <div>Thông tin địa chỉ</div>
            <div className="diachi">
              <div className="tenduongvaicon">
                <img className="iconplacecolor" src={assets.iconplacecolor} alt="" />
                <div className="tenduong">Đ. Hoàng Quốc Việt, Hùng Thắng, Thành phố Hạ Long, Quảng Ninh</div>
              </div>
              <div className="phonevaicon">
                <img className="iconplacecolor" src={assets.iconphone} alt="" />
                <div className="sophone">0123456798</div>
              </div>
              <div className="sendvaicon">
                <img className="iconplacecolor" src={assets.iconsend} alt="" />
                <div className="email">vantruong@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
        <img src={assets.nenfooter} alt="" />
      </div>
    </div>
  );
};

export default HomeStay;
