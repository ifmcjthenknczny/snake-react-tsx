import ClickableText from "./ClickableText"
import Logo from "./Logo"
import "../styles/Settings.css"
import { OptionsWithValue } from "../utils/types"
import { MENU_KEY, OPTIONS, OPTIONS_PROPERTIES } from "../utils/consts"
import SettingOption from './SettingOption'
import React from "react"
import { useKeyClick } from "../utils/hooks"

type Props = {
    onGoBack: () => void
    setSettings: React.Dispatch<React.SetStateAction<OptionsWithValue>>
    settings: OptionsWithValue
}

const GO_BACK_TEXT = "GO BACK"
const SETTINGS_TITLE = "SETTINGS"

const Settings = ({ onGoBack, setSettings, settings }: Props) => {
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === MENU_KEY) {
            onGoBack()
        }
    }

    useKeyClick(handleKeydown)

    return (
        <div className="Settings">
            <Logo />
            {SETTINGS_TITLE}
            <div className="Settings__options">
                {filterOptionsToShow(settings).map(option => <SettingOption key={option} name={option} setSettings={setSettings} startingValue={settings[option]} />)}
            </div>
            <ClickableText text={GO_BACK_TEXT} onClick={onGoBack} />
        </div>
    )
}

const filterOptionsToShow = (settings: OptionsWithValue) => OPTIONS.filter(option => !OPTIONS_PROPERTIES[option].dependsOn || OPTIONS_PROPERTIES[option].dependsOn.every(dependency => settings[dependency] === true))

export default Settings