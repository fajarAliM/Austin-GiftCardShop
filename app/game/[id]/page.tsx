'use client';

import GiftCard from "@/components/GiftCard";
import Header from "@/components/layout/header";
import { MiniGame } from "@/components/MiniGame/MiniGame";
import { TGiftCard, TRedeemCode } from "@/components/types/GiftCard";
import { getProductById, getRedeemCode } from "@/lib/reloadly";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CardInfoProps {
    product: TGiftCard;
    redeemCode: TRedeemCode[],
}

const Game = () => {
    const { id } = useParams() as { id: string };
    const [display, setDisplay] = useState(false);
    const [stopGame, setStopGame] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cardInfo, setCardInfo] = useState<CardInfoProps>({
        product: {} as TGiftCard,
        redeemCode: {} as TRedeemCode[]
    });

    const productId = id.split('_')[0];
    const transactionId = id.split('_')[1];

    useEffect(() => {
        if (display) {
            fetchCardInfo();
        }
    }, [display]);

    const fetchCardInfo = async () => {
        setLoading(true);
        const product = await getProductById(productId);
        const redeemCode = await getRedeemCode(transactionId);

        setCardInfo({
            product: product,
            redeemCode: redeemCode
        });

        setLoading(false);
    };

    const handleDisplay = (value: boolean) => {
        setDisplay(value);
    };

    const handleGameStop = () => {
        setStopGame(true);
    }

    return (
        <div>
            <Header />
            <div className="w-2/3 mx-auto mt-24">
                <MiniGame handleDisplay={handleDisplay} stop={stopGame} />
                <div className="flex justify-end">
                    <button onClick={handleGameStop} className="flex justify-center rounded-md bg-indigo-500 mt-6 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Forgive!</button>
                </div>

            </div>
            {display && (loading ? (
                <div className="w-full flex flex-col items-center justify-center pt-12 gap-8">
                    <div className="border-gray-300 h-40 w-40 mr-3 animate-spin rounded-full border-2 border-t-blue-600" />
                    <p className="text-lg text-blue-600">Please wait for a while...</p>
                </div>
            ) : (
                <div className="flex flex-col items-center pt-16 gap-8">
                    <div className="max-w-[450px] h-64">
                        <GiftCard giftcard={cardInfo.product} />
                    </div>
                    <p><span className="mr-14 text-blue-600 text-lg font-medium">Pin Code:</span> {cardInfo.redeemCode[0]?.pinCode}</p>
                </div>
            ))}
        </div>
    );
};

export default Game;