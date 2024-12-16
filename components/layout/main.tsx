'use client';

import Link from "next/link";

const Main = () => {

    return (
        <div className="w-full">
            <div className="home-hero flex flex-col justify-center items-center px-4">
                <h1 className="text-yellow-300 text-5xl font-bold drop-shadow-lg pt-16">Unbox Your Gift Card Like a Champ!</h1>
                <h3 className="text-white text-2xl font-bold drop-shadow-xl py-6">Forget boring gift cards. Play. Win. Celebrate.</h3>
                <Link href="/purchase" className="bg-blue-500 hover:bg-blue-400 inline-flex items-center justify-center px-12 py-3 text-base text-center text-white uppercase font-semibold rounded-lg my-12">
                    Ready to Score?
                </Link>
            </div>
            <div className="flex items-center justify-center gap-12 p-8">
                <div className="flex-1 border rounded-3xl py-8 px-12 min-h-[420px] max-w-[640px]">
                    <p className="text-2xl font-semibold text-center">How It Works</p>
                    <div className="py-2">
                        <p className="text-xl py-2">1. Choose Your Gift Card</p>
                        <p className="pl-6">We’ve got the goods! Pick from your favorite brands. We promise, no lame options.</p>
                    </div>
                    <div className="py-2">
                        <p className="text-xl py-2">2. Send With a Twist</p>
                        <p className="pl-6">Your recipient has to earn their gift! They’ll battle it out in a quick mini-game.</p>
                    </div>
                    <div className="py-2">
                        <p className="text-xl py-2">3. Victory Tastes Sweet</p>
                        <p className="pl-6">Game over? Gift unlocked. Cue the happy dance (and maybe a humble brag).</p>
                    </div>
                </div>
                <div className="flex-1 border rounded-3xl py-8 px-12 min-h-[420px] max-w-[640px]">
                    <p className="text-2xl font-semibold text-center">Why ScoreCard?</p>
                    <div className="py-2">
                        <p className="text-xl py-2">Make It Memorable:</p>
                        <p className="pl-6">A gift they won’t forget… because they had to fight for it!</p>
                    </div>
                    <div className="py-2">
                        <p className="text-xl py-2">Bring the Laughs:</p>
                        <p className="pl-6">Win or lose, the experience is hilarious (and slightly competitive).</p>
                    </div>
                    <div className="py-2">
                        <p className="text-xl py-2">Easy Peasy:</p>
                        <p className="pl-6">Pick, play, gift. It’s faster than learning TikTok dances.</p>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-3xl font-bold text-center py-8">Who’s It For?</h2>
                <div className="flex justify-center items-center gap-8 p-8">
                    <div>
                        <h3 className="text-2xl font-semibold text-center py-4">🎂 Birthdays:</h3>
                        <p className="text-xl text-center px-12">Surprise! Now beat this level to claim your cake money!</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-center py-4">🎉 Celebrations:</h3>
                        <p className="text-xl text-center px-12">Congrats on the new job! Time to prove you deserve it.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-center py-4">🎄 Holidays:</h3>
                        <p className="text-xl text-center px-12">Santa upgraded to gamer mode this year.</p>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-3xl font-bold text-center pt-12 pb-8">Testimonials</h2>
                <div className="flex gap-8 p-8 pt-0">
                    <div className="flex-1 px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 border rounded-xl shadow-lg">
                        <figure className="max-w-screen-md mx-auto">
                            <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
                            </svg>
                            <blockquote>
                                <p className="text-2xl font-medium text-gray-900 dark:text-white">&quot;I laughed so hard I almost forgot to redeem the card! &quot;</p>
                            </blockquote>
                            <figcaption className="flex items-center justify-center mt-6 space-x-3">
                                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                    <div className="pr-3 font-medium text-gray-900 dark:text-white">Sarah J.</div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="flex-1 px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 border rounded-xl shadow-lg">
                        <figure className="max-w-screen-md mx-auto">
                            <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
                            </svg>
                            <blockquote>
                                <p className="text-2xl font-medium text-gray-900 dark:text-white">&quot;10/10 would force my friends to battle for gifts again. &quot;</p>
                            </blockquote>
                            <figcaption className="flex items-center justify-center mt-6 space-x-3">
                                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                    <div className="pr-3 font-medium text-gray-900 dark:text-white">Dave J.</div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="flex-1 px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 border rounded-xl shadow-lg">
                        <figure className="max-w-screen-md mx-auto">
                            <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
                            </svg>
                            <blockquote>
                                <p className="text-2xl font-medium text-gray-900 dark:text-white">&quot;Best gift experience ever. My dad rage-quit, and we all laughed. &quot;</p>
                            </blockquote>
                            <figcaption className="flex items-center justify-center mt-6 space-x-3">
                                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                    <div className="pr-3 font-medium text-gray-900 dark:text-white">Jamie J.</div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>

            <div className="py-4 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently asked questions</h2>
                <div className="pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700">
                    <div className="mb-10">
                        <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                            What if I stink at games?
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">No worries! There’s an “I Give Up” button if things get too intense. We’ll still let you unlock the gift.</p>
                    </div>
                    <div className="mb-10">
                        <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                            Can I customize the game?
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">You bet! Add a personal message or make it extra tough if you’re feeling mischievous.</p>
                    </div>
                    <div className="mb-10">
                        <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                            What’s the point?
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">Fun. Pure, unfiltered fun. Oh, and gifting that stands out.</p>
                    </div>
                </div>
            </div>

            <div className="home-final flex flex-col justify-center items-center px-4">
                <h1 className="text-green-600 text-5xl font-bold drop-shadow-lg pt-16">Stop Sending Boring Gift Cards!</h1>
                <h3 className="text-indigo-500 text-2xl font-bold drop-shadow-xl py-6">Put the fun back in gifting. Let them win (or lose) their way to happiness.</h3>
                <Link href="/purchase" className="bg-green-500 hover:bg-green-400 inline-flex items-center justify-center px-12 py-3 text-base text-center text-white uppercase font-semibold rounded-lg my-12">
                    Level Up Your Gifts!
                </Link>
            </div>
        </div>
    );
}

export default Main;
