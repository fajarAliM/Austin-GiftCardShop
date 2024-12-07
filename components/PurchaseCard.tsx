import { useState } from "react";
import GiftCard from "./GiftCard";
import { TGiftCard } from "./types/GiftCard";
import { getRedeem, purchaseCard } from "@/lib/reloadly";
import emailjs from 'emailjs-com';

interface PurchaseCardProps {
    currentCard: TGiftCard | undefined;
}

const PurchaseCard = ({ currentCard }: PurchaseCardProps) => {
    const [loading, setLoading] = useState(false);
    const [currPayment, setCurrPayment] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: 'US',
        phoneNumber: '',
        recharge: 0,
        quantity: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let newValue: string | number = value;

        if (name === 'quantity') {
            newValue = Number(value);
        } else if (name === 'recharge') {
            newValue = parseFloat(value);
        }

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const sendEmail = async (productId: number, transactionId: number) => {
        const redeem = await getRedeem(productId);

        emailjs.send('service_e1m4w2p', 'template_sz9lkiu', {
            to_email: formData.email,
            from_name: `${formData.firstName} ${formData.lastName}`,
            transactionId: transactionId,
            redeem: redeem.verbose,
        }, '7f_3dddqhfloTvbqF')
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (error) => {
            console.error('FAILED...', error);
        });
    };

    const handleCardSubmit = async () => {
        console.log('form data >>>', formData);

        if (!currentCard) return;

        setLoading(true);

        try {
            const data = await purchaseCard(formData, currentCard);
            console.log('response >>>', data);

            sendEmail(data.product.productId, data.transactionId)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('error >>>', error);
        }
    };

    return (
        <div className="overflow-y-auto pr-8" style={{ height: 'calc(100vh - 128px)' }}>
            <div className="min-h-[300px] max-w-[600px]">
                {currentCard ? <GiftCard giftcard={currentCard} /> : <div className="w-full min-h-[300px] border border-slate-300 rounded-md flex items-center justify-center text-3xl">
                    <p>Select Card</p>
                </div>}
            </div>
            <form action={handleCardSubmit}>
                <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6">
                    <div className="sm:col-span-6 font-semibold">Sender Name:</div>
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">First name</label>
                        <div className="mt-2">
                            <input type="text" name="firstName" id="first-name" autoComplete="given-name" value={formData.firstName} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">Last name</label>
                        <div className="mt-2">
                            <input type="text" name="lastName" id="last-name" autoComplete="family-name" value={formData.lastName} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required />
                        </div>
                    </div>

                    <div className="sm:col-span-6 font-semibold mt-3">Recipient Info:</div>
                    <div className="sm:col-span-3">
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">Country Code</label>
                        <div className="mt-2 grid grid-cols-1">
                            <select id="country" name="country" autoComplete="country-name" value={formData.country} onChange={handleChange} className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                <option>US</option>
                                <option>CA</option>
                                <option>MX</option>
                            </select>
                            <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="phone-number" className="block text-sm/6 font-medium text-gray-900">Phone number</label>
                        <div className="mt-2.5">
                            <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                    <select id="country" name="country" autoComplete="country" aria-label="Country" className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pl-3.5 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                        <option>US</option>
                                        <option>CA</option>
                                        <option>EU</option>
                                    </select>
                                    <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" name="phoneNumber" id="phone-number" value={formData.phoneNumber} onChange={handleChange} className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="123-456-7890" required />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6">
                    <div className="sm:col-span-6 font-semibold">Payment:</div>
                    <div className="sm:col-span-3">
                        <label htmlFor="recharge" className="block text-sm/6 font-medium text-gray-900">Recharge</label>
                        <div className="mt-2">
                            <input type="number" name="recharge" id="recharge" value={formData.recharge} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="quantity" className="block text-sm/6 font-medium text-gray-900">Quantity</label>
                        <div className="mt-2">
                            <input type="number" name="quantity" id="quantity" value={formData.quantity} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required />
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-2">
                    <div onClick={() => setCurrPayment(0)} className="flex justify-between items-center gap-x-3 px-3 border border-neutral-300 rounded-md">
                        <div className="flex items-center gap-x-3">
                            <input
                                checked={currPayment == 0}
                                onChange={() => setCurrPayment(0)}
                                id="push-everything"
                                name="push-notifications"
                                type="radio"
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                            />
                            <label htmlFor="push-everything" className="block text-sm/6 font-medium text-gray-900">
                                Paypal
                            </label>
                        </div>
                        <img src="/images/paypal.png" alt="Paypal" className="w-14 h-14" />
                    </div>
                    <div onClick={() => setCurrPayment(1)} className="flex justify-between items-center gap-x-3 px-3 border border-neutral-300 rounded-md">
                        <div className="flex items-center gap-x-3">
                            <input
                                checked={currPayment == 1}
                                onChange={() => setCurrPayment(1)}
                                id="push-email"
                                name="push-notifications"
                                type="radio"
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                            />
                            <label htmlFor="push-email" className="block text-sm/6 font-medium text-gray-900">
                                Apple Pay
                            </label>
                        </div>
                        <img src="/images/apple-pay.png" alt="Apple Pay" className="w-14 h-14" />
                    </div>
                    <div onClick={() => setCurrPayment(2)} className="flex justify-between items-center gap-x-3 px-3 border border-neutral-300 rounded-md">
                        <div className="flex items-center gap-x-3">
                            <input
                                checked={currPayment == 2}
                                onChange={() => setCurrPayment(2)}
                                id="push-nothing"
                                name="push-notifications"
                                type="radio"
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                            />
                            <label htmlFor="push-nothing" className="block text-sm/6 font-medium text-gray-900">
                                Google Pay
                            </label>
                        </div>
                        <img src="/images/google-pay.png" alt="Google Pay" className="w-14 h-14" />
                    </div>
                </div>

                <div className="mt-6 w-full">
                    <button type="submit" className="flex items-center justify-center rounded-md w-full border border-transparent bg-indigo-500 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-indigo-600" disabled={loading}>
                        {loading && <div className="border-gray-300 h-4 w-4 mr-3 animate-spin rounded-full border-2 border-t-blue-600" />}
                        Purchase Card
                    </button>
                </div>
            </form>
        </div>
    )
};

export default PurchaseCard;