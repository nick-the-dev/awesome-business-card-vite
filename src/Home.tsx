import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button'
import { AddToContactsButton } from '@/components/addToContactsButton'

import phoneIcon from '@/assets/icons/phoneIcon.svg'
import whatsappIcon from '@/assets/icons/whatsappIcon.svg'
import heartIcon from '@/assets/icons/heartIcon.svg'
import fbIcon from '@/assets/icons/fbIcon.svg'
import instIcon from '@/assets/icons/instIcon.svg'

const Home = () => {
  const profileData = {
    name: 'שיר מנחם ניסים',
    shortName: 'שיר',
    title: 'מאפרת ומעצב שיער לכלות',
    phoneNumber: '+972540000000',
    whatsappNumber: '+972540000000',
    facebookUrl: '',
    instagramUrl: '',
    logoUrl: '',
    qrCodeUrl: '',
    gallery: [
      'https://placehold.co/365x667/895c30/31343C',
      'https://placehold.co/365x667/895c30/31343C',
    ],
    reviews: [],
  }

  return (
    <>
      <Helmet>
        <title>
          {profileData.name} - {profileData.title}
        </title>
      </Helmet>
      <div className="bg-gray-500">
        <div className="flex flex-col justify-center items-center h-screen gap-10 appContainer">
          <h1 className="text-center text-white text-3xl">
            {profileData.name}
            <br />
            {profileData.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-y-5">
            <div className="text-white flex flex-col items-center gap-1 text-center text-3xl w-1/3">
              <Button className="roundButton" variant="circle">
                <img src={phoneIcon} alt="Phone icon" />
              </Button>
              <span>חייגו על {profileData.shortName}</span>
            </div>
            <div className="text-white flex flex-col items-center gap-1 text-center text-3xl w-1/3">
              <Button className="roundButton" variant="circle">
                <img src={whatsappIcon} alt="Whatsapp icon" />
              </Button>
              <span>וואטסאפ</span>
            </div>
            <div className="text-white flex flex-col items-center gap-1 text-center text-3xl w-1/3">
              <Button className="roundButton" variant="circle">
                <img src={heartIcon} alt="Headrt icon" />
              </Button>
              <span>המלצות</span>
            </div>
            <div className="text-white flex flex-col items-center gap-1 text-center text-3xl w-1/3">
              <Button className="roundButton" variant="circle">
                <img src={fbIcon} alt="Facebook icon" />
              </Button>
              <span>פייסבוק</span>
            </div>
            <div className="text-white flex flex-col items-center gap-1 text-center text-3xl w-1/3">
              <Button className="roundButton" variant="circle">
                <img src={instIcon} alt="Instagram icon" />
              </Button>
              <span>אינסטגרם</span>
            </div>
          </div>
          <AddToContactsButton
            name={profileData.name}
            phoneNumber={profileData.phoneNumber}
            buttonText="שמור אותי באנשי הקשר +"
          />
        </div>
      </div>
    </>
  )
}

export default Home
