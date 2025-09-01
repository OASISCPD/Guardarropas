import { Navbar } from "../Navbar";
import { Sidebar } from "../sidebars/Sidebar";

export interface ResolutionsDto {
    Component: React.ComponentType;
}

export function RedirectScreen({ Component }: ResolutionsDto) {
    return (
        <>
            {/* Layout desktop - usando CSS Grid */}
            <div className="hidden lg:grid lg:grid-cols-[256px_1fr] min-h-screen">
                <Sidebar />
                <div className="overflow-x-auto">
                    <Component />
                </div>
            </div>
            {/* Layout mobile */}
            <div className="block lg:hidden">
                <Navbar />
                <Component />
            </div>
        </>
    );
}
