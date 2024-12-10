import { TGiftCard } from "./components/types/GiftCard";

export const initialCards:TGiftCard[] = [
    {
        "productId": 12740,
        "productName": "Target US",
        "global": false,
        "status": "ACTIVE",
        "supportsPreOrder": true,
        "senderFee": 1.0,
        "senderFeePercentage": 0.00,
        "discountPercentage": 1.2,
        "denominationType": "FIXED",
        "recipientCurrencyCode": "USD",
        "minRecipientDenomination": null,
        "maxRecipientDenomination": null,
        "senderCurrencyCode": "USD",
        "minSenderDenomination": null,
        "maxSenderDenomination": null,
        "fixedRecipientDenominations": [
            1.0,
            5.0,
            10.0,
            20.0,
            25.0,
            50.0,
            75.0,
            100.0
        ],
        "fixedSenderDenominations": [
            1.0,
            5.0,
            10.0,
            20.0,
            25.0,
            50.0,
            75.0,
            100.0
        ],
        "fixedRecipientToSenderDenominationsMap": {
            "1.0": 1.0,
            "5.0": 5.0,
            "10.0": 10.0,
            "20.0": 20.0,
            "25.0": 25.0,
            "50.0": 50.0,
            "75.0": 75.0,
            "100.0": 100.0
        },
        "metadata": {},
        "logoUrls": [
            "https://cdn.reloadly.com/giftcards/4ba0f8b8-2958-46aa-a47c-3698d8d12867.png"
        ],
        "brand": {
            "brandId": 82,
            "brandName": "Target"
        },
        "category": {
            "id": 5,
            "name": "Shopping"
        },
        "country": {
            "isoName": "US",
            "name": "United States",
            "flagUrl": "https://s3.amazonaws.com/rld-flags/us.svg"
        },
        "redeemInstruction": {
            "concise": "Visit http://www.target.com on your computer or mobile device. Sign into your account and add this gift card.",
            "verbose": "To redeem your Target eGift Card at Target.com: Enter your Target eGift Card number and access number when checking out. Your eGift Card will be automatically applied. To save to your Target.com account: Visit http://www.target.com on your computer or mobile device. Sign into your account and add this gift card. Pay in store when you are signed into Target.com on your mobile device. To redeem your Target e-Gift Card in a Target store in the U.S.: Show the barcode on your web-enabled mobile phone to the cashier when checking out. The Target Team Member will scan the barcode and enter the Access Number. (Please note that data rates may apply). Print this eGift Card. At checkout, the cashier will scan the barcode and enter the Access Number."
        },
        "additionalRequirements": {
            "userIdRequired": false
        }
    },
    {
        "productId": 13044,
        "productName": "Uber Eats US",
        "global": false,
        "status": "ACTIVE",
        "supportsPreOrder": true,
        "senderFee": 1.0,
        "senderFeePercentage": 0.00,
        "discountPercentage": 1.5,
        "denominationType": "FIXED",
        "recipientCurrencyCode": "USD",
        "minRecipientDenomination": null,
        "maxRecipientDenomination": null,
        "senderCurrencyCode": "USD",
        "minSenderDenomination": null,
        "maxSenderDenomination": null,
        "fixedRecipientDenominations": [
            15.0,
            20.0,
            25.0,
            50.0,
            75.0,
            100.0
        ],
        "fixedSenderDenominations": [
            15.0,
            20.0,
            25.0,
            50.0,
            75.0,
            100.0
        ],
        "fixedRecipientToSenderDenominationsMap": {
            "15.0": 15.0,
            "20.0": 20.0,
            "25.0": 25.0,
            "50.0": 50.0,
            "75.0": 75.0,
            "100.0": 100.0
        },
        "metadata": {},
        "logoUrls": [
            "https://cdn.reloadly.com/giftcards/f192817b-33af-454f-b69f-1ac4d0ea44f4.png"
        ],
        "brand": {
            "brandId": 87,
            "brandName": "Uber"
        },
        "category": {
            "id": 4,
            "name": "Food and Entertainment"
        },
        "country": {
            "isoName": "US",
            "name": "United States",
            "flagUrl": "https://s3.amazonaws.com/rld-flags/us.svg"
        },
        "redeemInstruction": {
            "concise": "Go to the Payment section in the Uber app, add Payment Method, select Gift Card and Enter Gift Code.",
            "verbose": "Go to the Payment section in the Uber app Tap Add Payment Method and select Gift Card Enter Gift Code. For full terms and conditions and customer service, visit https://www.uber.com/legal/gift-cards/en-us/"
        },
        "additionalRequirements": {
            "userIdRequired": false
        }
    },
    {
        "productId": 3940,
        "productName": "Google play US",
        "global": false,
        "status": "ACTIVE",
        "supportsPreOrder": true,
        "senderFee": 1.0,
        "senderFeePercentage": 0.00,
        "discountPercentage": 0.0,
        "denominationType": "FIXED",
        "recipientCurrencyCode": "USD",
        "minRecipientDenomination": null,
        "maxRecipientDenomination": null,
        "senderCurrencyCode": "USD",
        "minSenderDenomination": null,
        "maxSenderDenomination": null,
        "fixedRecipientDenominations": [
            5.0,
            10.0,
            15.0,
            20.0,
            25.0,
            50.0,
            100.0
        ],
        "fixedSenderDenominations": [
            5.0,
            10.0,
            15.0,
            20.0,
            25.0,
            50.0,
            100.0
        ],
        "fixedRecipientToSenderDenominationsMap": {
            "5.0": 5.0,
            "10.0": 10.0,
            "15.0": 15.0,
            "20.0": 20.0,
            "25.0": 25.0,
            "50.0": 50.0,
            "100.0": 100.0
        },
        "metadata": {},
        "logoUrls": [
            "https://cdn.reloadly.com/giftcards/da7374a4-a2b0-45ea-adae-a6ed972c4121.png"
        ],
        "brand": {
            "brandId": 25,
            "brandName": "Google play"
        },
        "category": {
            "id": 2,
            "name": "Software"
        },
        "country": {
            "isoName": "US",
            "name": "United States",
            "flagUrl": "https://s3.amazonaws.com/rld-flags/us.svg"
        },
        "redeemInstruction": {
            "concise": "To redeem, enter code in the Play Store app or https://play.google.com/store",
            "verbose": "Use this gift card code on Google Play. Any other request for the code may bea scam. To redeem, enter code in the Play Store app or https://play.google.com/store See play.google.com/us-card-terms for full terms. Usable for purchases of eligible items on Google Play only. Not usable for hardware and certain subscriptions. Other limits may apply. No fees or expiration dates. Except as required by law, card is not redeemable for cash or other cards not reloadable or refundable cannot be combined with other non-Google Play balances in your Google Payments account, resold, exchanged or transferred for value."
        },
        "additionalRequirements": {
            "userIdRequired": false
        }
    },
    {
        "productId": 13959,
        "productName": "Vanilla® eGift Visa",
        "global": false,
        "status": "ACTIVE",
        "supportsPreOrder": true,
        "senderFee": 6.0,
        "senderFeePercentage": 0.00,
        "discountPercentage": 0.0,
        "denominationType": "RANGE",
        "recipientCurrencyCode": "USD",
        "minRecipientDenomination": 20.0,
        "maxRecipientDenomination": 100.0,
        "senderCurrencyCode": "USD",
        "minSenderDenomination": 20.0,
        "maxSenderDenomination": 100.0,
        "fixedRecipientDenominations": [],
        "fixedSenderDenominations": null,
        "fixedRecipientToSenderDenominationsMap": null,
        "metadata": null,
        "logoUrls": [
            "https://cdn.reloadly.com/giftcards/cdf0a915-a88d-4eb5-8cb8-a4fd00accc7eVanilla.jpg"
        ],
        "brand": {
            "brandId": 95,
            "brandName": "Vanilla® eGift Visa"
        },
        "category": {
            "id": 1,
            "name": "Payment Cards"
        },
        "country": {
            "isoName": "US",
            "name": "United States",
            "flagUrl": "https://s3.amazonaws.com/rld-flags/us.svg"
        },
        "redeemInstruction": {
            "concise": "To redeem, visit yourrewardcard.com",
            "verbose": "Virtual Account is a prepaid Virtual Account loaded by the Corporate Sponsor, redeemable to buy goods and services anywhere Visa debit Virtual Accounts are accepted, as described in the Virtual Account Use and Fees section. The Virtual Account is NOT a credit card. The Virtual Account is not a checking account or connected in any way to any account other than a stored value account where your funds are held. The expiration date of the Virtual Account and the Virtual Account funds is identified on the Virtual Account. &#13;eReward Visa Virtual Accountholder Agreement CUSTOMER SERVICE CONTACT INFORMATION: &#13;Address: P.O. Box 826 Fortson, GA 31808 &#13;Website: YourRewardCard.com &#13;Phone Number: 1-833-634-3155"
        },
        "additionalRequirements": {
            "userIdRequired": false
        }
    },
    {
        "productId": 5,
        "productName": "Amazon US",
        "global": false,
        "status": "ACTIVE",
        "supportsPreOrder": true,
        "senderFee": 1.0,
        "senderFeePercentage": 0.00,
        "discountPercentage": 0.9,
        "denominationType": "RANGE",
        "recipientCurrencyCode": "USD",
        "minRecipientDenomination": 1.0,
        "maxRecipientDenomination": 100.0,
        "senderCurrencyCode": "USD",
        "minSenderDenomination": 1.0,
        "maxSenderDenomination": 100.0,
        "fixedRecipientDenominations": [],
        "fixedSenderDenominations": null,
        "fixedRecipientToSenderDenominationsMap": null,
        "metadata": null,
        "logoUrls": [
            "https://cdn.reloadly.com/giftcards/fbef9b57-e0b0-4ead-aee3-fdc2bc80e2db.png"
        ],
        "brand": {
            "brandId": 2,
            "brandName": "Amazon"
        },
        "category": {
            "id": 5,
            "name": "Shopping"
        },
        "country": {
            "isoName": "US",
            "name": "United States",
            "flagUrl": "https://s3.amazonaws.com/rld-flags/us.svg"
        },
        "redeemInstruction": {
            "concise": "Visit www.amazon.com/redeem and enter the Claim Code when prompted.",
            "verbose": "Amazon.com Gift Cards never expire and can be redeemed towards millions of items at www.amazon.com To redeem your gift card, follow these steps: . Visit www.amazon.com/redeem . Enter the Claim Code when prompted. . Gift card funds will be applied automatically to eligible orders during the checkout process. . You must pay for any remaining balance on your order with another payment method. Your gift card claim code may also be entered when prompted during checkout. To redeem your gift card using the Amazon.com service, first add the gift card funds to Your Account. If you have questions about redeeming your gift card, please visit www.amazon.com/gc-redeem"
        },
        "additionalRequirements": {
            "userIdRequired": false
        }
    }
];