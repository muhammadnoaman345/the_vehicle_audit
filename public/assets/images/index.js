const heroItems = [
  "/assets/images/hero-item-1.svg",
  "/assets/images/hero-item-2.svg",
  "/assets/images/hero-item-3.png",
  "/assets/images/hero-item-4.svg",
  "/assets/images/hero-item-5.svg",
];

const serviceItems = [
  "/assets/images/service-item-1.jpg",
  "/assets/images/service-item-2.jpg",
  "/assets/images/service-item-3.jpg",
  "/assets/images/service-item-4.jpg",
  "/assets/images/service-item-5.jpg",
  "/assets/images/service-item-6.jpg",
];

const flags = [
  { country: "Scotland", path: "/assets/images/flag-scotland.png" },
  { country: "Canada", path: "/assets/images/flag-canada.png" },
  { country: "Australia", path: "/assets/images/flag-australia.png" },
  { country: "Newzealand", path: "/assets/images/flag-newzealand.png" },
  { country: "Ireland", path: "/assets/images/flag-ireland.png" },
];

const reports = [
  {
    type: "car",
    path: "/assets/images/report-car.jpg",
    url: "/packages/car",
  },
  { type: "RV", path: "/assets/images/report-rv.jpg", url: "/packages/rv" },
  {
    type: "bike",
    path: "/assets/images/report-byke.jpg",
    url: "/packages/bike",
  },
];

const blurImgs = {
  car: "/assets/images/car-blur.jpg",
  bike: "/assets/images/bike-blur.jpg",
  rv: "/assets/images/rv-blur.png",
};

const auditMetrics = [
  { label: "Accident", path: "/assets/images/accident.png", percentage: 10 },
  { label: "Values", path: "/assets/images/values.png", percentage: 22 },
  { label: "Title Record", path: "/assets/images/title.png", percentage: 34 },
  { label: "Recalls", path: "/assets/images/car-1.png", percentage: 46 },
  {
    label: "Problem Checks",
    path: "/assets/images/engine.png",
    percentage: 56,
  },
  { label: "Specs", path: "/assets/images/settings.png", percentage: 66 },
  {
    label: "Sales History",
    path: "/assets/images/seller.png",
    percentage: 78,
  },
  { label: "Odometer", path: "/assets/images/odometer.png", percentage: 88 },
  {
    label: "Salvage Records",
    path: "/assets/images/land.png",
    percentage: 100,
  },
];

const socials = {
  wa: "/assets/images/whatsapp.png",
};

export const images = {
  heroBackground: "/assets/images/hero-car.jpg",
  heroItems,
  serviceItems,
  carImage: "/assets/images/car.png",
  flags,
  reports,
  logo: "/assets/images/logo.png",
  logo_dark: "/assets/images/logo_dark.png",
  blurImgs,
  auditMetrics,
  socials,
};
