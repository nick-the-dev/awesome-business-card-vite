import { useEffect } from 'react'
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

//icons
import phoneIcon from '@/assets/icons/phoneIcon.svg'
import whatsappIcon from '@/assets/icons/whatsappIcon.svg'
import heartIcon from '@/assets/icons/heartIcon.svg'
import fbIcon from '@/assets/icons/fbIcon.svg'
import instIcon from '@/assets/icons/instIcon.svg'

//images
import logo from '@/assets/logo.svg'
import gallery1 from '@/assets/gallery/1.jpg'
import gallery2 from '@/assets/gallery/2.jpg'
import gallery3 from '@/assets/gallery/3.jpg'
import gallery4 from '@/assets/gallery/4.jpg'
import gallery5 from '@/assets/gallery/5.jpg'
import gallery6 from '@/assets/gallery/6.jpg'
import gallery7 from '@/assets/gallery/7.jpg'
import gallery8 from '@/assets/gallery/8.jpg'
import gallery9 from '@/assets/gallery/9.jpg'
import gallery10 from '@/assets/gallery/10.jpg'
import gallery11 from '@/assets/gallery/11.jpg'

import review1 from '@/assets/reviews/1.jpg'
import review2 from '@/assets/reviews/2.jpg'
import review3 from '@/assets/reviews/3.jpg'
import review4 from '@/assets/reviews/4.jpg'
import review5 from '@/assets/reviews/5.jpg'
import review6 from '@/assets/reviews/6.jpg'
import review7 from '@/assets/reviews/7.jpg'
import review8 from '@/assets/reviews/8.jpg'
import review9 from '@/assets/reviews/9.jpg'
import review10 from '@/assets/reviews/10.jpg'
import review11 from '@/assets/reviews/11.jpg'
import review12 from '@/assets/reviews/12.jpg'
import review13 from '@/assets/reviews/13.jpg'
import review14 from '@/assets/reviews/14.jpg'
import review15 from '@/assets/reviews/15.jpg'
import review16 from '@/assets/reviews/16.jpg'
import review17 from '@/assets/reviews/17.jpg'
import review18 from '@/assets/reviews/18.jpg'
import review19 from '@/assets/reviews/19.jpg'

const Home = () => {
  const profileData = {
    name: 'שיר מנחם ניסים',
    shortName: 'שיר',
    title: 'מאפרת ומעצב שיער לכלות',
    phoneNumber: '+972525422608',
    whatsappNumber: '972525422608',
    facebookUrl: 'https://www.facebook.com/shir.menachem.73?locale=he_IL',
    instagramUrl: 'https://www.instagram.com/shir_menachem_nissim/',
    logoUrl: logo,
    qrCodeUrl: '',
    gallery: [
      gallery1,
      gallery2,
      gallery3,
      gallery4,
      gallery5,
      gallery6,
      gallery7,
      gallery8,
      gallery9,
      gallery10,
      gallery11,
    ],
    reviews: [
      review1,
      review2,
      review3,
      review4,
      review5,
      review6,
      review7,
      review8,
      review9,
      review10,
      review11,
      review12,
      review13,
      review14,
      review15,
      review16,
      review17,
      review18,
      review19,
    ],
  }

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
              <Button className="roundButton" variant="circle">
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
      </div>
    </>
  )
}

export default Home
