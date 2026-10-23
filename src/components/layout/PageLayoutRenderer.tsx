
import type {
    Page,
    PracticeArea,
    Attorney,
    Testimonial,
    Faq,
    Post,
    GuidingPrinciple,
} from '@/payload-types'

import { getAllPracticeAreas } from '@/lib/payload/practiceAreas'
import { getAllAttorneys } from '@/lib/payload/attorneys'
import { getPublishedPosts } from '@/lib/payload/posts'

import PageHero from '@/components/layout/PageHero'
import CTASection from '@/components/layout/CTASection'
import HomeHeroSection from '@/components/Home/HomeHeroSection'

import PracticeAreasSection from '@/components/sections/PracticeAreasSection'
import PracticeAreasDirectory from '../sections/PracticeAreasDirectorySection'
import AboutFirmSection from '@/components/sections/AboutFirmSection'
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection'
import GuidingPrinciplesSection from '@/components/sections/GuidingPrinciplesSection'
import AttorneysSection from '@/components/sections/AttorneysSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import ArticlesListSection from '@/components/sections/ArticlesListSection'

type PageLayoutRendererProps = {
    layout?: Page['layout'] | null
    pageSlug?: string
}

export default async function PageLayoutRenderer({
    layout,
    pageSlug,
}: PageLayoutRendererProps) {
    if (!layout?.length) {
        return null
    }

    // Fetch all practice areas only when the directory block exists.
    const hasDirectory = layout.some(
        (block) => block.blockType === 'practiceAreasDirectory',
    )

    const allPracticeAreas = hasDirectory
        ? await getAllPracticeAreas()
        : []

    // Fetch all attorneys whenever an attorneys block uses "all".
    const needsAllAttorneys = layout.some(
        (block) =>
            block.blockType === 'attorneysSection' &&
            block.displayMode === 'all',
    )

    const allAttorneys = needsAllAttorneys
        ? await getAllAttorneys()
        : []

    // Fetch all published posts only when an insights block uses "all".
    const needsAllPosts = layout.some(
        (block) =>
            block.blockType === 'insightsSection' &&
            block.displayMode === 'all',
    )

    const allPosts = needsAllPosts
        ? await getPublishedPosts()
        : []

    return (
        <>
            {layout.map((block, index) => {
                const key = block.id ?? `${block.blockType}-${index}`

                switch (block.blockType) {
                    case 'homeHero':
                        return (
                            <HomeHeroSection
                                key={key}
                                slides={block.slides ?? []}
                            />
                        )

                    case 'pageHero':
                        return (
                            <PageHero
                                key={key}
                                heading={block.heading}
                                description={block.description ?? undefined}
                            />
                        )

                    case 'aboutFirm':
                        return (
                            <AboutFirmSection
                                key={key}
                                eyebrow={block.eyebrow ?? undefined}
                                heading={block.heading}
                                image={block.image}
                                description={block.description}
                                buttonLabel={block.buttonLabel ?? undefined}
                                buttonUrl={block.buttonUrl ?? undefined}
                            />
                        )

                    case 'whyChooseUs':
                        return (
                            <WhyChooseUsSection
                                key={key}
                                eyebrow={block.eyebrow ?? undefined}
                                heading={block.heading}
                                description={block.description ?? undefined}
                                secondaryDescription={
                                    block.secondaryDescription ?? undefined
                                }
                                buttonLabel={block.buttonLabel ?? undefined}
                                buttonUrl={block.buttonUrl ?? undefined}
                                highlightText={block.highlightText ?? undefined}
                                statOneValue={block.statOneValue ?? undefined}
                                statOneLabel={block.statOneLabel ?? undefined}
                                statTwoValue={block.statTwoValue ?? undefined}
                                statTwoLabel={block.statTwoLabel ?? undefined}
                            />
                        )


                    case 'guidingPrinciples': {
                        const principles = (block.principles ?? []).filter(
                            (item): item is GuidingPrinciple =>
                                typeof item === 'object' &&
                                item !== null &&
                                item._status === 'published',
                        )

                        return (
                            <GuidingPrinciplesSection
                                key={key}
                                principles={principles}
                                heading={block.heading}
                                description={block.description ?? undefined}
                            />
                        )
                    }


                    case 'practiceAreasGrid': {
                        const practiceAreas = (block.practiceAreas ?? []).filter(
                            (area): area is PracticeArea =>
                                typeof area === 'object' && area !== null,
                        )

                        return (
                            <PracticeAreasSection
                                key={key}
                                heading={block.heading}
                                practiceAreas={practiceAreas}
                            />
                        )
                    }

                    case 'practiceAreasDirectory':
                        return (
                            <PracticeAreasDirectory
                                key={key}
                                practiceAreas={allPracticeAreas}
                            />
                        )

                    case 'attorneysSection': {
                        const attorneys =
                            block.displayMode === 'all'
                                ? allAttorneys
                                : (block.attorneys ?? []).filter(
                                    (item): item is Attorney =>
                                        typeof item === 'object' &&
                                        item !== null,
                                )

                        return (
                            <AttorneysSection
                                key={key}
                                attorneys={attorneys}
                                heading={block.heading}
                                description={block.description ?? undefined}
                                viewAllLabel={block.viewAllLabel ?? undefined}
                                viewAllUrl={block.viewAllUrl ?? undefined}
                            />
                        )
                    }

                    case 'testimonials': {
                        const testimonials = (block.testimonials ?? []).filter(
                            (item): item is Testimonial =>
                                typeof item === 'object' && item !== null,
                        )

                        return (
                            <TestimonialsSection
                                key={key}
                                testimonials={testimonials}
                                heading={block.heading}
                                description={block.description ?? undefined}
                            />
                        )
                    }

                    case 'faqs': {
                        const faqs = (block.faqs ?? []).filter(
                            (item): item is Faq =>
                                typeof item === 'object' && item !== null,
                        )

                        return (
                            <FAQSection
                                key={key}
                                faqs={faqs}
                                heading={block.heading}
                                description={block.description ?? undefined}
                            />
                        )
                    }

                    case 'insightsSection': {
                        const posts =
                            block.displayMode === 'all'
                                ? allPosts
                                : (block.posts ?? []).filter(
                                    (item): item is Post =>
                                        typeof item === 'object' &&
                                        item !== null,
                                )

                        return (
                            <ArticlesListSection
                                key={key}
                                posts={posts}
                                heading={block.heading}
                                description={block.description ?? undefined}
                                viewAllLabel={block.viewAllLabel ?? undefined}
                                viewAllUrl={block.viewAllUrl ?? undefined}
                            />
                        )
                    }

                    case 'cta':
                        return (
                            <CTASection
                                key={key}
                                heading={block.heading}
                                buttonLabel={block.primaryButtonLabel}
                                buttonUrl={block.primaryButtonUrl}
                            />
                        )

                    default:
                        return null
                }
            })}
        </>
    )
}
