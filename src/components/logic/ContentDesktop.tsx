import { Fragment, ReactNode } from "react";
import { SidebarDesktop } from "../sidebars/SidebarDesktop";

interface logicDTO {
    children: ReactNode
}

export function LogicDesktopView({ children }: logicDTO) {
    return (
        <Fragment>
            <div>
                <SidebarDesktop />
            </div>
            {children}
        </Fragment>
    )
}