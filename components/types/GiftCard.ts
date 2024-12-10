export type TGiftCard = {
    productId: number;
    productName: string;
    global: boolean;
    status: string;
    supportsPreOrder: boolean;
    senderFee: number;
    senderFeePercentage: number;
    discountPercentage: number;
    denominationType: string;
    recipientCurrencyCode: string;
    minRecipientDenomination: number | null;
    maxRecipientDenomination: number | null;
    senderCurrencyCode: string;
    minSenderDenomination: number | null;
    maxSenderDenomination: number | null;
    fixedRecipientDenominations: number[];
    fixedSenderDenominations: number[] | null;
    fixedRecipientToSenderDenominationsMap: Record<string, number> | null;
    metadata: Record<string, unknown> | null;
    logoUrls: string[];
    brand: {
        brandId: number;
        brandName: string;
    };
    category: {
        id: number;
        name: string;
    };
    country: {
        isoName: string;
        name: string;
        flagUrl: string;
    };
    redeemInstruction: {
        concise: string;
        verbose: string;
    };
    additionalRequirements: {
        userIdRequired: boolean;
    };
};

export type TRedeemCode = {
    cardNumber: string;
    pinCode: string;
}