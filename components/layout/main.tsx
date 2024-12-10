'use client';

import { useEffect, useState } from "react";
import VerticalCards from "../VerticalCards";
import { TGiftCard } from "../types/GiftCard";
import PurchaseCard from "../PurchaseCard";
import { initialCards } from "@/constants";

const Main = () => {
    const [giftcards, setGiftCards] = useState<TGiftCard[]>([]);
    const [selectedCard, setSelectedCard] = useState<TGiftCard>();

    useEffect(() => {
        setGiftCards(initialCards);
    }, []);

    const handleSelectedCard = (giftcard: TGiftCard) => {
        setSelectedCard(giftcard);
    }

    // console.log('selected card >>>', selectedCard);

    return (
        <div className="p-8 flex justify-center items-center gap-8">
            <VerticalCards giftcards={giftcards} handleSelectedCard={handleSelectedCard} />
            <PurchaseCard currentCard={selectedCard} />
        </div>
    );
}

export default Main;
