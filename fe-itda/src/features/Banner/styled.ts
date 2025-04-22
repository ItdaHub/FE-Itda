import styled from "styled-components";

export const BannerStyled = styled.div`
  &.banner-wrap {
    max-width: 1020px;
    margin: 0 auto;
    margin-top: 40px;

    .swiper-button-prev,
    .swiper-button-next {
      color: ${({ theme }) => theme.colors.primary};
    }
    .swiper-pagination-bullet-active {
      background-color: ${({ theme }) => theme.colors.primary};
    }

    .banner-img {
      width: 100%;
      height: 382px;
      object-fit: cover;
      overflow: hidden;
    }
  }
`;
