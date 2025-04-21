import clsx from "clsx";
import { BannerStyled } from "./styled";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner1 from "@/assets/images/banner.png";
import banner2 from "@/assets/images/banner2.png";
import banner3 from "@/assets/images/banner3.png";
import banner4 from "@/assets/images/banner4.png";
import api from "@/utill/api";
import { useEffect, useState } from "react";

interface Banner {
  id: number;
  title: string;
  image_path: string;
}

const Banner = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    getBanner();
  }, []);

  const getBanner = async () => {
    try {
      const response = await api.get("/banner");
      setBanners(response.data);
    } catch (e) {
      console.error("배너 요청 실패: ", e);
    }
  };

  SwiperCore.use([Autoplay]);
  return (
    <BannerStyled className={clsx("banner-wrap")}>
      <Swiper
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        speed={500}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <img className="banner-img" src={banner1.src} alt="test" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="banner-img" src={banner2.src} alt="test" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="banner-img" src={banner3.src} alt="test" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="banner-img" src={banner4.src} alt="test" />
        </SwiperSlide>
        {/* 실제 관리자에 추가된 배너 나타내기 */}
        {/* {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              className="banner-img"
              src={`http://localhost:5001${banner.image_path}`}
              alt={banner.title}
            />
          </SwiperSlide>
        ))} */}
      </Swiper>
    </BannerStyled>
  );
};

export default Banner;
