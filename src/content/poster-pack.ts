export type PosterPackItem = {
  id: string;
  number: number;
  title: string;
  note: string;
  src: string;
  downloadName: string;
  alt: string;
  width: 1122;
  height: 1402;
};

const posterRoot = "/images/ziggy/poster-pack";

export const posterPackDownload =
  "/downloads/the-monkey-shop-poster-pack/THE_MONKEY_SHOP_POSTER_PACK_2026.zip";

export const posterPackQrTarget = "https://www.themonkeyshop.com/";

export const posterPackItems: readonly PosterPackItem[] = [
  {
    id: "victorian-anniversary",
    number: 1,
    title: "The Anniversary Gentleman",
    note: "Full ceremonial portrait · thirty-year seal · Frankston skyline",
    src: `${posterRoot}/01_the_monkey_shop_victorian_anniversary_poster.png`,
    downloadName: "01_the_monkey_shop_victorian_anniversary_poster.png",
    alt: "Ornate black and gold Victorian anniversary poster with Ziggy holding his tray, a thirty-year seal and a QR code at lower right",
    width: 1122,
    height: 1402,
  },
  {
    id: "thirty-years-of-ziggy",
    number: 2,
    title: "Thirty Years of Ziggy",
    note: "Formal anniversary plate · 1996–2026 · civic theatre",
    src: `${posterRoot}/02_the_monkey_shop_thirty_years_of_ziggy.png`,
    downloadName: "02_the_monkey_shop_thirty_years_of_ziggy.png",
    alt: "Black and gold thirtieth anniversary poster with Ziggy in an imagined vintage Frankston streetscape and a QR code at upper right",
    width: 1122,
    height: 1402,
  },
  {
    id: "thank-you-frankston",
    number: 3,
    title: "Thank You, Frankston",
    note: "Shop-window celebration · local gratitude · thirty years",
    src: `${posterRoot}/03_the_monkey_shop_30_years_of_victorian_style.png`,
    downloadName: "03_the_monkey_shop_30_years_of_victorian_style.png",
    alt: "Victorian-style Monkey Shop poster with Ziggy outside a glowing shop, anniversary balloons, a thank-you message and a QR code at lower right",
    width: 1122,
    height: 1402,
  },
  {
    id: "ziggy-monumental",
    number: 4,
    title: "Ziggy, Monumental",
    note: "Close portrait · maximum ornament · tray at the ready",
    src: `${posterRoot}/04_ziggy_ornate_monkey_shop_poster.png`,
    downloadName: "04_ziggy_ornate_monkey_shop_poster.png",
    alt: "Highly ornate black and gold Ziggy poster with a close full-body portrait, silver tray and a QR code at upper right",
    width: 1122,
    height: 1402,
  },
  {
    id: "scan-here",
    number: 5,
    title: "Scan Here",
    note: "Direct invitation · split-panel format · strongest call to action",
    src: `${posterRoot}/05_vintage_frankston_monkey_shop_scan_here_poster.png`,
    downloadName: "05_vintage_frankston_monkey_shop_scan_here_poster.png",
    alt: "Split-panel vintage poster with Ziggy and the thirty-year seal on the left and a large Monkey Shop QR invitation on the right",
    width: 1122,
    height: 1402,
  },
  {
    id: "honoured-citizen",
    number: 6,
    title: "Honoured Citizen",
    note: "Old Vic civic portrait · proud Frankston institution · full pomp",
    src: `${posterRoot}/06_the_monkey_shop_frankston_institution_poster.png`,
    downloadName: "06_the_monkey_shop_frankston_institution_poster.png",
    alt: "Fictional Old Vic State civic poster honouring Ziggy as a Frankston institution, with ornate heraldry and a QR code at upper right",
    width: 1122,
    height: 1402,
  },
] as const;
