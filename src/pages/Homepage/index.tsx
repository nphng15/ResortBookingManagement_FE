import SearchSection from "../../components/SearchSection"
import { CTASection, DestinationSection, FeaturesSection, StatsSection, TestimonialSection } from "../../components/HomepageSection"

function HomePage(){
    return (
        <>
            <SearchSection/>
            <FeaturesSection/>
            <DestinationSection/>
            <StatsSection/>
            <TestimonialSection/>
            <CTASection/>
        </>
    )
}

export default HomePage