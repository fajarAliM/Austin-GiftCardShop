import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Mousewheel } from 'swiper/modules';
import GiftCard from "./GiftCard";
import { TGiftCard } from "./types/GiftCard";

interface GiftCardsProps {
    giftcards: TGiftCard[];
    handleSelectedCard: (giftcard: TGiftCard) => void;
}

const VerticalCards = ({ giftcards, handleSelectedCard }: GiftCardsProps) => {

    return (
        <div>
            <Swiper
                direction={'vertical'}
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                mousewheel={true}
                modules={[FreeMode, Mousewheel]}
                className="mySwiper"
            >
                {giftcards.map((giftcard, key) => <SwiperSlide key={key}>
                    <GiftCard 
                        giftcard={giftcard} 
                        handleSelectedCard={handleSelectedCard}
                    />
                </SwiperSlide>)}
            </Swiper>
        </div>
    )
};

export default VerticalCards;