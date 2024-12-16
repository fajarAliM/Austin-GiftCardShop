'use client';

import { useEffect, useState } from "react";

import { initialCards } from "@/constants";
import { TGiftCard } from "@/components/types/GiftCard";
import VerticalCards from "@/components/VerticalCards";
import PurchaseCard from "@/components/PurchaseCard";
import Header from "@/components/layout/header";

const Purchase = () => {
    const [giftcards, setGiftCards] = useState<TGiftCard[]>([]);
    const [selectedCard, setSelectedCard] = useState<TGiftCard>();

    useEffect(() => {
        setGiftCards(initialCards);
    }, []);

    const handleSelectedCard = (giftcard: TGiftCard) => {
        setSelectedCard(giftcard);
    }

    return (
        <div>
            <Header />
            <div className="p-8 flex justify-center items-center gap-8">
                <VerticalCards giftcards={giftcards} handleSelectedCard={handleSelectedCard} />
                <PurchaseCard currentCard={selectedCard} />
            </div>
        </div>
    );
}

export default Purchase;
