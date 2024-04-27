import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button'
import { AddToContactsButton } from '@/components/addToContactsButton'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import QRCode from 'react-qr-code'
import { updateBackgroundColor } from '@/helpers/updateBgColor'
import Reviews from '@/components/reviews/reviews'

//icons
import phoneIcon from '@/assets/icons/phoneIcon.svg'
import whatsappIcon from '@/assets/icons/whatsappIcon.svg'
import heartIcon from '@/assets/icons/heartIcon.svg'
import fbIcon from '@/assets/icons/fbIcon.svg'
import instIcon from '@/assets/icons/instIcon.svg'
import { profileData } from '@/components/data'

const Home = () => {
  const [reviewsOpen, setReviewsOpen] = useState(false)

  useEffect(() => {
    updateBackgroundColor()
  })

  return (
    <>
      <Helmet>
        <title>
          {profileData.name} - {profileData.title}
        </title>
      </Helmet>
      <div className="h-[calc(100dvh)] relative">
        {!reviewsOpen && (
          <>
            <div className="flex flex-col justify-center items-center h-[calc(100dvh)] gap-10 appContainer z-10 relative">
              <div className="qrWrapper">
                <QRCode value={window.location.href} />
              </div>
              <h1 className="text-center text-white text-3xl">
                {profileData.name}
                <br />
                {profileData.title}
              </h1>
              <div className="flex flex-wrap justify-center gap-y-5">
                <div className="text-white flex flex-col items-center gap-1 text-center text-3xl w-1/3">
                  <a href={`tel:${profileData.phoneNumber}`} target="_blank">
                    <Button className="roundButton" variant="circle">
                      <img src={phoneIcon} alt="Phone icon" />
                    </Button>
                  </a>
                  <span>חייגו על {profileData.shortName}</span>
                </div>
                <div className="text-white flex flex-col items-center gap-1 text-center text-3xl w-1/3">
                  <a
                    href={`https://wa.me/${profileData.whatsappNumber}`}
                    target="_blank"
                  >
                    <Button className="roundButton" variant="circle">
                      <img src={whatsappIcon} alt="Whatsapp icon" />
                    </Button>
                  </a>
                  <span>וואטסאפ</span>
                </div>
                <div className="text-white flex flex-col items-center gap-1 text-center text-3xl w-1/3">
                  {/* open reviews onclick */}
                  <Button
                    className="roundButton"
                    variant="circle"
                    onClick={() => setReviewsOpen(!reviewsOpen)}
                  >
                    <img src={heartIcon} alt="Headrt icon" />
                  </Button>
                  <span>המלצות</span>
                </div>
                <div className="text-white flex flex-col items-center gap-1 text-center text-3xl w-1/3">
                  <a href={profileData.facebookUrl} target="_blank">
                    <Button className="roundButton" variant="circle">
                      <img src={fbIcon} alt="Facebook icon" />
                    </Button>
                  </a>
                  <span>פייסבוק</span>
                </div>
                <div className="text-white flex flex-col items-center gap-1 text-center text-3xl w-1/3">
                  <a href={profileData.instagramUrl} target="_blank">
                    <Button className="roundButton" variant="circle">
                      <img src={instIcon} alt="Instagram icon" />
                    </Button>
                  </a>
                  <span>אינסטגרם</span>
                </div>
              </div>
              <AddToContactsButton
                name={profileData.name}
                phoneNumber={profileData.phoneNumber}
                buttonText="שמור אותי באנשי הקשר"
              />
              <img src={profileData.logoUrl} alt="Logo" />
            </div>
            <div className="carouselWrapper">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 5000,
                  }),
                ]}
                className="w-full"
                dir="ltr"
              >
                <CarouselContent>
                  {profileData.gallery.map((src, index) => (
                    <CarouselItem key={index} className="pl-0">
                      <div className="">
                        <img src={src} alt="" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </>
        )}
        {/* if reviews is open */}
        {reviewsOpen && (
          <div className="reviewsWrapper">
            <Button
              className="roundButton"
              variant="rounded"
              onClick={() => setReviewsOpen(!reviewsOpen)}
            >
              <span>חזרי אחורה</span>
            </Button>
            <Reviews />
          </div>
        )}
      </div>
    </>
  )
}

export default Home
