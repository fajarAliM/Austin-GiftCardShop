import { TGiftCard } from "./types/GiftCard";

interface GiftCardProps {
    giftcard: TGiftCard;
    handleSelectedCard?: (giftcard: TGiftCard) => void;
}

const GiftCard = ({ giftcard, handleSelectedCard }: GiftCardProps) => {
    return (
        <div
            onClick={() => handleSelectedCard && handleSelectedCard(giftcard)}
            className="h-full bg-slate-200 overflow-hidden rounded-xl border border-slate-300">
            {/* <div className="flex flex-col justify-center items-end">
                <span className="font-bold text-base">Virtual</span>
                <span className="font-light text-sm">REWARD</span>
            </div>
            <div className="py-3 flex flex-col items-start">
                <span className="font-light text-sm">Account Number</span>
                <span className="font-medium text-2xl">4000 1234 5678 9100</span>
            </div>
            <div className="pt-5 flex justify-between items-end">
                <span className="font-light text-sm">Limited Use</span>
                <span className="font-sans font-semibold text-xl text-blue-800 italic">VISA</span>
            </div> */}
            <img
                src={giftcard.logoUrls[0]}
                width={100}
                height={100}
                alt="gift card"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    )
};

export default GiftCard;