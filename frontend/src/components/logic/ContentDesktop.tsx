import { Fragment, ReactNode } from "react";
import { Sidebar } from "../sidebars/Sidebar";

interface logicDTO {
    children: ReactNode
}

export function LogicDesktopView({ children }: logicDTO) {
    return (
        <Fragment>
            <div>
                <Sidebar />
            </div>
            {children}
        </Fragment>
    )
}