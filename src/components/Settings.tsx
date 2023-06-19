import ClickableText from "./ClickableText"
import Logo from "./Logo"
import styles from "../styles/Settings.module.scss"
import { SETTINGS } from "../constants/settings"
import SettingsItem from './SettingsItem'
import React from "react"
import useGoToMenu from "../hooks/useGoToMenu"
import { GO_BACK_TEXT } from "../constants/labels"

const SETTINGS_TITLE = "SETTINGS"

const Settings = () => {
    const onGoBack = useGoToMenu()

    return (
        <div className={styles.settings}>
            <Logo />
            {SETTINGS_TITLE}
            <div className={styles.settingsList}>
                {SETTINGS.map(option => <SettingsItem key={option} name={option} />)}
            </div>
            <ClickableText text={GO_BACK_TEXT} onClick={onGoBack} />
        </div>
    )
}

// const filterItemsToShow = (settings: SettingsWithValue) => SETTINGS.filter(item => !SETTINGS_PROPERTIES[item].dependsOn || SETTINGS_PROPERTIES[item].dependsOn.every(dependency => settings[dependency] === true))

export default Settings