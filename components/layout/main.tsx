'use client';

import { useEffect, useState } from "react";
import VerticalCards from "../VerticalCards";
import { TGiftCard } from "../types/GiftCard";
import { fetchGiftCards } from "@/lib/reloadly";
import PurchaseCard from "../PurchaseCard";

const Main = () => {
    const [giftcards, setGiftCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState<TGiftCard>();

    useEffect(() => {
        const loadGiftCards = async () => {
            try {
                const data = await fetchGiftCards();
                const uniqueBrands = data.content.reduce((acc: TGiftCard[], item: TGiftCard) => {
                    if (!acc.some((existingItem: TGiftCard) => existingItem.brand.brandName === item.brand.brandName)) {
                        acc.push(item);
                    }
                    return acc;
                }, []);

                setGiftCards(uniqueBrands.slice(0, 10));
            } catch (error) {
                console.error(error);
            }
        };

        loadGiftCards();
    }, []);

    const handleSelectedCard = ( giftcard: TGiftCard ) => {
        setSelectedCard(giftcard);
    }

    console.log("GiftCards >>>", giftcards);
    console.log("Selected Card >>>", selectedCard);
    
    return (
        <div className="p-8 flex justify-center items-start gap-8">
            <VerticalCards giftcards={giftcards} handleSelectedCard={handleSelectedCard} />
            <PurchaseCard currentCard={selectedCard} />
        </div>
    );
}

export default Main;
