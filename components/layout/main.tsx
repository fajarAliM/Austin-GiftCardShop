'use client';

import { useEffect, useState } from "react";
import VerticalCards from "../VerticalCards";
import { TGiftCard } from "../types/GiftCard";
import { fetchGiftCards } from "@/lib/reloadly";
import PurchaseCard from "../PurchaseCard";

const Main = () => {
    const [giftcards, setGiftCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState<TGiftCard>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGiftCards = async () => {
            setLoading(true);
            try {
                const data = await fetchGiftCards();
                const uniqueBrands = data.content.reduce((acc: TGiftCard[], item: TGiftCard) => {
                    if (!acc.some((existingItem: TGiftCard) => existingItem.brand.brandName === item.brand.brandName)) {
                        acc.push(item);
                    }
                    return acc;
                }, []);
                setLoading(false);
                setGiftCards(uniqueBrands.slice(0, 10));
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        };

        loadGiftCards();
    }, []);

    const handleSelectedCard = (giftcard: TGiftCard) => {
        setSelectedCard(giftcard);
    }

    console.log('Main data >>>', giftcards);
    console.log('Selected >>>', selectedCard);

    return (
        <div className="p-8 flex justify-center items-center gap-8">
            {loading ? <div className="min-w-[380px] h-full flex justify-center items-center">
                <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
            </div> : <VerticalCards giftcards={giftcards} handleSelectedCard={handleSelectedCard} />}
            <PurchaseCard currentCard={selectedCard} />
        </div>
    );
}

export default Main;
