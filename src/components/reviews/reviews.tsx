import { profileData } from '@/components/data'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const Reviews = () => {
  return (
    <>
      <Swiper
        style={{
          height: '100dvh',
        }}
        navigation={true}
        modules={[Navigation]}
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
