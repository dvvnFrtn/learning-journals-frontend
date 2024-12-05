
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import PropTypes from 'prop-types';

export default function Tabs({ tabs }) {
    return (
        <TabGroup>
            <TabList className="relative flex border-b border-gray-200">
                {tabs.map(({ name }) => (
                    <Tab
                        key={name}
                        className={clsx(
                            "relative z-10 py-2 px-4 text-sm font-semibold w-full text-slate-400 border-b-2 border-slate-300",
                            "focus:outline-none data-[selected]:text-slate-900 data-[selected]:border-slate-900",
                            "transition-colors duration-150 ease-linear"
                        )}
                    >
                        {name}
                    </Tab>
                ))}
            </TabList>
            <TabPanels className="mt-3">
                {tabs.map(({ name, content }) => (
                    <TabPanel key={name}>
                        {content}
                    </TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    );
}

Tabs.propTypes = {
    tabs: PropTypes.array.isRequired
}
