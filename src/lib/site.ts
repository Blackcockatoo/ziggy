export const SITE_URL = "https://themonkeyshop.com";
export const SITE_NAME = "The Monkey Shop";
export const SITE_TITLE = "The Monkey Shop · Thirty Years in Frankston";
export const SITE_DESCRIPTION =
  "An unofficial digital tribute celebrating Rob, Carla and thirty years behind the counter in Frankston — made as a gift, with no strings attached.";

export function absoluteSiteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
