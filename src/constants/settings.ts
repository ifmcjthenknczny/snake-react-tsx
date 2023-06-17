import {
  SettingProperties,
  SettingName,
  SettingsWithValue,
} from "../types/types";

export const SETTINGS = [
  "STARTING_MOVE_REFRESH_MS",
  "STARTING_LENGTH",
  "SNAKE_SPEED_MULTIPLIER",
  "APPLES_TO_SPEED_UP_SNAKE",
  "WALLS",
  "NEW_MINE_INTERVAL_MS",
] as const;

export const SETTINGS_PROPERTIES: Record<SettingName, SettingProperties> = {
  STARTING_MOVE_REFRESH_MS: {
    min: 1,
    max: 10,
    defaultValue: 3,
    step: 1,
    realMin: 100,
    realMax: 800,
    label: "INITIAL SNAKE SPEED",
    inverselyProportional: true,
  },
  SNAKE_SPEED_MULTIPLIER: {
    min: 1,
    max: 2,
    step: 0.05,
    defaultValue: 1.25,
    label: "SPEED MULTIPLIER",
    isDecimal: true,
  },
  APPLES_TO_SPEED_UP_SNAKE: {
    min: 1,
    max: 10,
    defaultValue: 5,
    step: 1,
    label: "APPLES TO SPEED UP",
  },
  NEW_MINE_INTERVAL_MS: {
    min: 1,
    max: 10,
    defaultValue: 1,
    step: 1,
    realMin: 1000,
    realMax: 30000,
    label: "MINE DEPLOYMENT SPEED",
    inverselyProportional: true,
  },
  WALLS: {
    min: false,
    max: true,
    defaultValue: false,
    step: 1,
    label: "WALLS",
    isBoolean: true,
  },
  STARTING_LENGTH: {
    min: 2,
    max: 10,
    defaultValue: 3,
    step: 1,
    label: "STARTING LENGTH",
  },
};

export const SETTINGS_DEFAULTS = Object.keys(SETTINGS_PROPERTIES).reduce(
  (acc, option) => ({
    ...acc,
    [option]: SETTINGS_PROPERTIES[option].defaultValue,
  }),
  {} as SettingsWithValue
);