import { useMemo, useState } from "react";
import GiftCard from "./GiftCard";
import { TGiftCard } from "./types/GiftCard";
import { getRedeem, purchaseCard } from "@/lib/reloadly";
import emailjs from 'emailjs-com';
import PaypalButton from "./PaypalButton";
import { Field, Label, Select } from "@headlessui/react";
import toast from "react-hot-toast";

interface PurchaseCardProps {
    currentCard: TGiftCard | undefined;
}

const PurchaseCard = ({ currentCard }: PurchaseCardProps) => {
    const [loading, setLoading] = useState(false);
    const [currPayment, setCurrPayment] = useState<number>(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        recharge: 0,
        quantity: 0,
    });

    const rechargeText = useMemo(() => currentCard?.fixedRecipientDenominations.length ? '' : `($${currentCard?.minRecipientDenomination} - $${currentCard?.maxRecipientDenomination})`, [currentCard]);

    const formValidation = () => {
        const { name, email, phoneNumber, recharge, quantity } = formData;

        return name && email && phoneNumber && recharge && quantity;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let newValue: string | number = value;

        if (name === 'quantity') {
            newValue = parseFloat(value);
        }

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            recharge: parseFloat(e.target.value),
        });
    };

    const sendEmail = async (productId: number, transactionId: number) => {
        const redeem = await getRedeem(productId);

        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY || '';
        const templateKey = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_KEY || '';
        const userKey = process.env.NEXT_PUBLIC_EMAILJS_USER_KEY || '';

        emailjs.send(serviceID, templateKey, {
            to_email: formData.email,
            from_name: formData.name,
            transactionId: transactionId,
            productId: productId,
            redeem: redeem.verbose,
        }, userKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                console.error('FAILED...', error);
            });
    };

    const handleCardSubmit = async () => {
        if (!currentCard && formValidation()) return;

        setLoading(true);

        console.log('Form data >>>>', formData);

        try {
            const data = await purchaseCard(formData, currentCard);
            console.log('response >>>', loading, data);

            sendEmail(data.product.productId, data.transactionId);

            toast.success('Gift Cards Purchased Successfully!');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error('Purchasing Failed...');
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
            <form>
                <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">From</label>
                        <div className="mt-2">
                            <input type="text" name="name" id="name" placeholder="Your name" value={formData.name} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">To</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" placeholder="johndoe@gmail.com" value={formData.email} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="phone-number" className="block text-sm/6 font-medium text-gray-900">Phone number</label>
                        <div className="mt-2">
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

                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <Field>
                            <Label className="block text-sm/6 font-medium text-gray-900">Recharge {currentCard && rechargeText}</Label>
                            <div className="relative mt-2">
                                {currentCard?.fixedRecipientDenominations.length ? <Select
                                    className="custom-select block w-full h-9 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    value={formData.recharge}
                                    onChange={handleSelectChange}
                                >
                                    {[0, ...currentCard.fixedRecipientDenominations].map((value, key) =>
                                        <option key={key} value={value}>{value}</option>
                                    )}
                                </Select> : <input type="number" name="recharge" id="recharge" value={formData.recharge} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required />}
                            </div>
                        </Field>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="quantity" className="block text-sm/6 font-medium text-gray-900">Quantity</label>
                        <div className="mt-2">
                            <input type="number" name="quantity" id="quantity" value={formData.quantity} onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required />
                        </div>
                    </div>
                </div>

                <div className="mt-12 space-y-2">
                    <div onClick={() => setCurrPayment(0)} className="flex justify-between items-center gap-x-3 px-3 border border-neutral-300 rounded-md">
                        <div className="flex items-center gap-x-3">
                            <input
                                checked={currPayment == 1}
                                onChange={() => setCurrPayment(1)}
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
                                checked={currPayment == 2}
                                onChange={() => setCurrPayment(2)}
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
                                checked={currPayment == 3}
                                onChange={() => setCurrPayment(3)}
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
                    {/* <button type="submit" className="flex items-center justify-center rounded-md w-full border border-transparent bg-indigo-500 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-indigo-600" disabled={loading}>
                        {loading && <div className="border-gray-300 h-4 w-4 mr-3 animate-spin rounded-full border-2 border-t-blue-600" />}
                        Purchase Card
                    </button> */}
                    {currPayment === 1 && <PaypalButton orderPrice={formData.recharge} handleCardSubmit={handleCardSubmit} />}
                </div>
            </form>
        </div>
    )
};

export default PurchaseCard;