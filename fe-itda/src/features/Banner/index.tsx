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

const Banner = () => {
  // 백엔드에 전체 책(랜덤 돌려서 4개만 보여주기?)
  // 해당 작품 ID도 받아서 클릭하면 해당 작품의 상세페이지로 이동!!
  // 근데 이미지가 긴거였으면 좋겠는데..?(gpt한테 크기 맞춰서 2개 만들어달라해야하나?)
  const getBanner = async () => {
    try {
      const response = await api.get("/banner");
      console.log(response.data);
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
      </Swiper>
    </BannerStyled>
  );
};

export default Banner;
