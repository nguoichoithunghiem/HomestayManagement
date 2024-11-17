import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HomeStay.css";
import { assets } from "../../assets/assets";

const HomeStay = () => {
  const [homestays, setHomestays] = useState([]);
  const [filteredHomestays, setFilteredHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Các trạng thái cho các bộ lọc
  const [category, setCategory] = useState(""); // Loại (Nguyên căn, Phòng)
  const [location, setLocation] = useState("");  // Địa điểm
  const [priceRange, setPriceRange] = useState(""); // Khoảng giá

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const response = await axios.get('https://homestaymanagement-backend.onrender.com/api/homestay/list');
        // Lọc homestays chỉ hiển thị những cái có status là 'available'
        const availableHomestays = response.data.data.filter(homestay => homestay.status === 'available');
        setHomestays(availableHomestays);
        setFilteredHomestays(availableHomestays); // Mặc định hiển thị tất cả
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomestays();
  }, []);

  // Hàm lọc dựa trên các bộ lọc
  const filterHomestays = () => {
    let filtered = [...homestays];

    // Lọc theo loại (Nguyên căn hoặc Phòng)
    if (category) {
      filtered = filtered.filter(homestay => homestay.homestayCategory.toLowerCase() === category.toLowerCase());
    }

    // Lọc theo địa điểm (Chỉ cần chứa các từ khóa như Hà Nội, Sapa, Đà Nẵng, TP.HCM, Phú Quốc)

    // Lọc theo khoảng giá
    if (priceRange) {
      const priceLimit = parseInt(priceRange, 10);
      if (priceLimit === 500000) {
        filtered = filtered.filter(homestay => homestay.homestayPrice <= 500);
      } else if (priceLimit === 1000000) {
        filtered = filtered.filter(homestay => homestay.homestayPrice > 500 && homestay.homestayPrice <= 1000);
      } else if (priceLimit === 2000000) {
        filtered = filtered.filter(homestay => homestay.homestayPrice > 1000);
      }
    }

    setFilteredHomestays(filtered); // Cập nhật danh sách đã lọc
  };

  // Xử lý sự thay đổi của các bộ lọc
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  // Gọi hàm lọc mỗi khi một trong các bộ lọc thay đổi
  useEffect(() => {
    filterHomestays();
  }, [category, location, priceRange]);

  // Hàm định dạng giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price * 1000); // Nhân với 1000 để hiển thị đúng giá
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      <div className="khoiheader">
        <img className="nenpage" src={assets.nenhomestay2} alt="" />
        <div className="text-overlay">HomeStay</div>
      </div>
      <div className="filter-bar">
        {/* Bộ lọc HomeStay */}
        <select className="option1" value={category} onChange={handleCategoryChange}>
          <option value="">Chọn Loại HomeStay</option>
          <option value="Nguyên căn">Nguyên căn</option>
          <option value="Phòng">Phòng</option>
        </select>


        {/* Bộ lọc Khoảng giá */}
        <select value={priceRange} onChange={handlePriceRangeChange}>
          <option value="">Khoảng Giá</option>
          <option value="500000">Dưới 500.000 VNĐ</option>
          <option value="1000000">500.000 VNĐ - 1.000.000 VNĐ</option>
          <option value="2000000">Trên 1.000.000 VNĐ</option>
        </select>

        <button type="button" onClick={filterHomestays}>Tìm Kiếm</button>
      </div>

      <div className="homestay-content1">
        {filteredHomestays.map((homestay) => (
          <div key={homestay._id} className="homestay-box1">
            <div className="homestay-gia">
              {/* Hiển thị giá đã được nhân với 1000 để hiển thị đúng VNĐ */}
              <h1>{formatPrice(homestay.homestayPrice)}</h1>
            </div>
            <div className="homestay-gia homestay-discount">
              <h1>-10%</h1>
            </div>
            <div className="homestay-boxdetail">
              <h1>{homestay.homestayName}</h1>
              <div className="homestay-diadiem homestay-margin-content1">
                <img src={assets.iconplace} alt="" />
                <div>Địa chỉ: {homestay.homestayAddress}</div>
              </div>
              <div className="homestay-margin-content1">
                Thuê: {homestay.homestayCategory}
              </div>
              <div className="homestay-button-xemthem homestay-margin-content1">
                <Link to={`/homestay/${homestay._id}`}>Xem thêm</Link>
              </div>
            </div>
            <img src={`http://localhost:5000/images/${encodeURIComponent(homestay.homestayImage)}`} alt={homestay.homestayName} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeStay;
