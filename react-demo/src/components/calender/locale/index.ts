import { type CalendarType } from "./types";
import zh_CN from "./zh-CN";
import en_US from "./en-US";

const locales: Record<string, CalendarType> = {
  "zh-CN": zh_CN,
  "en-US": en_US,
};

export default locales;
