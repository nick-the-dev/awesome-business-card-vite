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
import { useLocation } from 'react-router-dom'


//icons
import phoneIcon from '@/assets/icons/phoneIcon.svg'
import whatsappIcon from '@/assets/icons/whatsappIcon.svg'
import heartIcon from '@/assets/icons/heartIcon.svg'
import fbIcon from '@/assets/icons/fbIcon.svg'
import instIcon from '@/assets/icons/instIcon.svg'
import { profileData } from '@/components/data'

const Home = () => {
  const [reviewsOpen, setReviewsOpen] = useState(false)
  const [qrShown, setQrShown] = useState(false)

  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/qr') {
      setQrShown(true)
    }
  }, [location]) 

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
        <div className="flex flex-col justify-center items-center h-[calc(100dvh)] gap-10 appContainer z-10 relative">
          {qrShown && (
            <div className="qrWrapper">
              <QRCode value={window.location.href} />
            </div>
          )}
          <h1
            className="text-center text-white text-3xl mainTitle"
            style={{
              fontSize: '2rem',
            }}
          >
            {profileData.name}
            <br />
            {profileData.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-y-5 buttonsWrapper">
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
        {/* if reviews is open */}
        {reviewsOpen && (
          <div className="reviewsWrapper">
            <Button
              className="roundButton"
              variant="rounded"
              onClick={() => setReviewsOpen(!reviewsOpen)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 2,
                fontSize: '2.1rem',
                width: 'auto',
                display: 'flex',
                gap: '1rem',
                height: 'auto',
                padding: '0.6rem 1.5rem 0.8rem',
                backgroundColor: '#CACAC8',
                color: '#707070',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.597"
                height="13.979"
              >
                <g data-name="חץ לחזור אחורה למסך הבית">
                  <g data-name="Group 35">
                    <path
                      fill="#707070"
                      d="M3.335 13.708c-.114.371-.428.342-.969.029C.085 12.51-.969 8.263 1.14 5.185a16.877 16.877 0 0 1 2.708-3.279 3.951 3.951 0 0 1 1.283-.684c1.454-.6 2.908-1.369 4.561-1.2a5.213 5.213 0 0 1 4.048 2.395 13.183 13.183 0 0 1 .969 1.767 7.984 7.984 0 0 1 .285 1.654l-.142.085a2.489 2.489 0 0 1-.342-.484c-.713-2.309-1.967-4.133-4.476-4.648a3.833 3.833 0 0 0-1.881.144 9.465 9.465 0 0 0-4.048 1.824 10.328 10.328 0 0 0-2.423 3.333A5.4 5.4 0 0 0 .826 8.97c.228 2.2.827 3.682 2.509 4.738Z"
                      data-name="Path 128"
                    />
                  </g>
                  <g data-name="Group 36">
                    <path
                      fill="#707070"
                      d="M16.453 9.892c.057-.766.167-1.3.189-1.889a30.01 30.01 0 0 1 .421-6.009.4.4 0 0 1 .475.237c.181.358-.086 3.6-.4 8.177-.011.166-.15.459-.289.5a.789.789 0 0 1-.614-.2l-2.992-2.474a76.317 76.317 0 0 1-2.825-2.527c-.114-.1-.32-.251-.094-.56.972.21 3.271 2.332 5.081 3.873.278.238.586.464 1.048.872Z"
                      data-name="Path 129"
                    />
                  </g>
                </g>
              </svg>
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
