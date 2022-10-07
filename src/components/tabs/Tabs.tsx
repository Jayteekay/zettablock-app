import { ReactNode, useState } from "react";

export type ITab = {
    id: string;
    title: string;
    body: ReactNode;
}

type TabsProps = {
    tabs: ITab[]
}
const Tabs = ({ tabs }: TabsProps) => {
    const [tabIndex, setTabIndex] = useState(0);

    return <div>
        <nav>
            <ul role="tablist">{tabs.map((tab, index) =>
                <li role="presentation">
                    <button onClick={() => { setTabIndex(index) }} role="tab" aria-selected={tabIndex === index}>{tab.title}</button>
                </li>
            )}
            </ul>
        </nav>
        <section role="tabpanel">
            {tabs[tabIndex].body}
        </section>
    </div>
}

export default Tabs;