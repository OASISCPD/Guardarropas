import { useMediaQuery } from "react-responsive";
import { Sidebar } from "../sidebars/Sidebar";

export interface ResolutionsDto {
    MobileComponent?: React.ComponentType;
    TabletComponent?: React.ComponentType;
    DesktopComponent?: React.ComponentType;
}

export function RedirectScreen({ MobileComponent, TabletComponent, DesktopComponent }: ResolutionsDto) {

    const isMobile = useMediaQuery({ maxWidth: 639 }); //hasta sm
    const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 })// desde sm hasta md
    const isDesktop = useMediaQuery({ minWidth: 1024 })

    return (
        <>

            {isMobile && MobileComponent && <MobileComponent />}
            {isTablet && TabletComponent && <TabletComponent />}
            {isDesktop && DesktopComponent && <div className="">
                <Sidebar />
                <div className="flex-1 ml-64">
                    <DesktopComponent />
                </div>
            </div>}
        </>
    );
}
