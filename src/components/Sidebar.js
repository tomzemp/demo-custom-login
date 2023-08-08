import { useLoginSettings } from '@dhis2/app-runtime'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import React from 'react'
import classes from './Sidebar.module.css'

export const LanguageSelect = () => {
    const { refreshOnTranslation, uiLocale } = useLoginSettings()

    const localesUI = [
        { locale: 'en', name: 'English' },
        { locale: 'es', name: 'español' },
        { locale: 'fr', name: 'français' },
    ]

    return (
        <>
            <span className={classes.languageFont}>
                No comprendes? Change the language!
            </span>

            <SingleSelectField
                dense
                prefix="Language"
                selected={
                    localesUI.map((l) => l.locale).includes(uiLocale)
                        ? uiLocale
                        : 'en'
                }
                onChange={({ selected }) => {
                    refreshOnTranslation({ locale: selected })
                }}
            >
                {localesUI &&
                    localesUI.map((locale) => (
                        <SingleSelectOption
                            key={locale.locale}
                            value={locale.locale}
                            label={locale.name}
                        />
                    ))}
            </SingleSelectField>
        </>
    )
}

export const Sidebar = () => {
    const { applicationNotification } = useLoginSettings()
    return (
        <div className={classes.sidebarContainer}>
            <div className={classes.mainContent}>
                <span className={classes.barbieFont}>
                    Barbie&apos;s dream dhis2 instance
                </span>

                <span className={classes.applicationNotificationFont}>
                    {applicationNotification}
                </span>
            </div>
            <div className={classes.footer}>
                <LanguageSelect />
            </div>
        </div>
    )
}
