import { profileData } from '@/components/data'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Reviews = () => {
  return (
    <>
      <Swiper
        key="he"
        style={{
          height: '100dvh',
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {profileData.reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <img src={review} alt={`Review ${index}`} loading="lazy" />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Reviews
