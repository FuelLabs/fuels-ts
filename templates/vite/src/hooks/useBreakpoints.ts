import { useMedia } from "react-use";

export const useBreakpoints = () => {
    const isMobile = useMedia("(max-width: 640px)", false);
    const isTablet = useMedia("(max-width: 768px)", false);

    return { isMobile, isTablet };
}
