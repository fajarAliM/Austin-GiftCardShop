import { useState } from "react";
import GiftCard from "./GiftCard";
import { TGiftCard } from "./types/GiftCard";
import { purchaseCard } from "@/lib/reloadly";

interface PurchaseCardProps {
    currentCard: TGiftCard | undefined;
}

const PurchaseCard = ({ currentCard }: PurchaseCardProps) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: 'US',
        phoneNumber: ''
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const handleCardSubmit = async () => {
        console.log('form data >>>', formData);

        const data = await purchaseCard(formData, currentCard);
        console.log("Purchase Card >>>", data);
    };

    return (
        <div className="">
            <div className="min-h-[300px] max-w-[600px]">
                {currentCard && <GiftCard giftcard={currentCard} />}
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6">
                <div className="sm:col-span-6 font-semibold">Sender Name:</div>
                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">First name</label>
                    <div className="mt-2">
                        <input type="text" name="firstName" id="first-name" autoComplete="given-name" value={formData.firstName} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">Last name</label>
                    <div className="mt-2">
                        <input type="text" name="lastName" id="last-name" autoComplete="family-name" value={formData.lastName} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div className="sm:col-span-6 font-semibold mt-3">Recipient Info:</div>
                <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div className="mt-2">
                        <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
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
                            <input type="text" name="phoneNumber" id="phone-number" value={formData.phoneNumber} onChange={handleChange} className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="123-456-7890" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                payment options
            </div>
            <div className="mt-6 w-full">
                <button onClick={handleCardSubmit} className="flex items-center justify-center rounded-md w-full border border-transparent bg-indigo-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-600">Send Card</button>
            </div>
        </div>
    )
};

export default PurchaseCard;