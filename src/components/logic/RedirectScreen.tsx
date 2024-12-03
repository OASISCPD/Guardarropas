import { useMediaQuery } from "react-responsive";

export interface TestingPageProps {
    MobileComponent: React.ComponentType;
    TabletComponent: React.ComponentType;
    DesktopComponent: React.ComponentType;
}

export function RedirectScreen({ MobileComponent, TabletComponent, DesktopComponent }: TestingPageProps) {

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1223px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });

    return (
        <>
            {isMobile && <MobileComponent />}
            {isTablet && <TabletComponent />}
            {isDesktop && <DesktopComponent />}
        </>
    );
}
    