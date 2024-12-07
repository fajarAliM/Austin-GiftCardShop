// lib/reloadly.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = "aPwDlKvcbxtJg8JnioA6gIF9kdbl5EmY"; // Store your client ID in .env.local
const CLIENT_SECRET =
  "YIGqiueOzW-bUwREezBTPJkcESNe1X-Fqh66kQnx3qJp79Sw6BWwEsjpL7D1tJy"; // Store your client secret in .env.local

let accessToken = "";

async function getAccessToken() {
  if (accessToken) return accessToken; // Return cached token if available

  const tokenUrl = "https://auth.reloadly.com/oauth/token";
  const response = await axios.post(tokenUrl, {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "client_credentials",
    audience: "https://giftcards-sandbox.reloadly.com",
  });

  accessToken = response.data.access_token;
  return accessToken;
}

export async function fetchGiftCards() {
  const token = await getAccessToken();

  const giftCardsUrl = "https://giftcards-sandbox.reloadly.com/products";

  const response = await axios.get(giftCardsUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json, text/plain, */*",
    },
  });

  return response.data;
}

export async function purchaseCard(formData, currentCard) {
  const token = await getAccessToken();

  const purchaseUrl = "https://giftcards-sandbox.reloadly.com/orders";

  try {
    const response = await axios.post(
      purchaseUrl,
      {
        productId: currentCard.productId,
        countryCode: currentCard.country.isoName,
        quantity: formData.quantity,
        unitPrice: Number(formData.recharge),
        customIdentifier: `${currentCard.productId}-${currentCard.productName}-${Date.now()}`,
        senderName: `${formData.firstName} ${formData.lastName}`,
        recipientEmail: formData.email,
        recipientPhoneDetails: {
          countryCode: formData.country,
          phoneNumber: formData.phoneNumber,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json, text/plain, */*",
        },
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}

export async function getRedeem(productId) {
  const token = await getAccessToken();

  const redeemUrl = `https://giftcards-sandbox.reloadly.com/products/${productId}/redeem-instructions`;

  try {
    const response = await axios.get(redeemUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json, text/plain, */*",
      },
    });

    console.log("redeem response >>>", response);
    
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}