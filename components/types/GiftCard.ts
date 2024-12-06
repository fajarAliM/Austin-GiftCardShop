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
    fixedSenderDenominations: number[];
    fixedRecipientToSenderDenominationsMap: Record<string, number>;
    metadata: Record<string, unknown>;
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