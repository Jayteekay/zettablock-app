import { ReactNode, useState } from "react";

import styles from "./tabs.module.scss";

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

    return <div className={styles.tabs}>
        <nav>
            <ul role="tablist">{tabs.map((tab, index) =>
                <li key={tab.id} role="presentation">
                    <button className={tabIndex === index ? styles.active_tab : ""} onClick={() => { setTabIndex(index) }} role="tab" aria-selected={tabIndex === index}>{tab.title}</button>
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