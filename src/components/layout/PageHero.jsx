import React from 'react'


export default function PageHero({ heading, description }) {
    return (
        <section className="bg-slate-900 py-12 text-white sm:py-16">
            
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
                <h1 className="max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                    {heading}
                </h1>

                {description && (
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                        {description}
                    </p>
                )}
            </div>
        </section>
    )
}