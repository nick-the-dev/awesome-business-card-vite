import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

const Reviews = () => {
  return (
    <div className="reviewsWrapper">
      <Carousel className="w-full" dir="ltr">
        <CarouselContent>
          {profileData.reviews.map((src, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="">
                <img src={src} alt="" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Reviews
