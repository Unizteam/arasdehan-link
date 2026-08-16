import type { SiteConfig } from "@/types/site";

/**
 * Central content and links for the page.
 * Interface language is Persian; only brand and proper names stay Latin.
 * Media lives in /public/media — see docs/asset-sources.md.
 */
export const siteConfig: SiteConfig = {
  year: 2026,
  locale: "fa",
  direction: "rtl",
  countdownTarget: "2030-01-01T00:00:00+03:00",
  profile: {
    name: "Aras Dehan",
    title: "توسعه‌دهنده نرم‌افزار و سازنده محصولات دیجیتال",
    bio: "محصولات دیجیتال کاربردی می‌سازم، محتوای آموزشی تولید می‌کنم و مسیر تبدیل ایده به محصول را با شما به اشتراک می‌گذارم.",
    avatar: "/media/profile/aras-dehan.webp",
    avatarAlt: "تصویر پروفایل Aras Dehan",
    avatarObjectPosition: "50% 16%",
  },
  links: {
    NEOTRACKED_URL: "https://neutracked.netlify.app/",
    UNIELITEZ_URL: "https://unielitez.netlify.app/?tuitionCurrency=USD",
    ETVAVIDA_URL: "https://etvavida.netlify.app/",
    TURKISH_COURSE_URL: "",
    TELEGRAM_URL: "https://t.me/arasdehan",
    INSTAGRAM_URL: "",
    LINKEDIN_URL: "",
    GITHUB_URL: "",
    YOUTUBE_URL: "",
    CONTACT_EMAIL: "arasdehan@gmail.com",
  },
  socials: [
    { platform: "instagram", label: "Instagram", hrefKey: "INSTAGRAM_URL" },
    { platform: "linkedin", label: "LinkedIn", hrefKey: "LINKEDIN_URL" },
    { platform: "github", label: "GitHub", hrefKey: "GITHUB_URL" },
    { platform: "youtube", label: "YouTube", hrefKey: "YOUTUBE_URL" },
    { platform: "telegram", label: "Telegram", hrefKey: "TELEGRAM_URL" },
  ],
  ui: {
    explore: "مشاهده پروژه‌ها و خدمات",
    share: "اشتراک‌گذاری این صفحه",
    linkCopied: "لینک کپی شد",
    comingSoon: "به‌زودی",
    open: "باز کردن",
    prev: "محتوای قبلی",
    next: "محتوای بعدی",
    backToTop: "بازگشت به بالا",
    poweredBy: "POWERED BY",
    categoriesNav: "دسته‌بندی پروژه‌ها",
  },
  categories: [
    { id: "neotracked", emoji: "📊", label: "NeoTracked" },
    { id: "unielitez", emoji: "🎓", label: "UniEliteZ" },
    { id: "etvavida", emoji: "", label: "EtvaVida", hrefKey: "ETVAVIDA_URL" },
    { id: "turkish-course", emoji: "", label: "Türkçe Kursum" },
    { id: "telegram", emoji: "✈️", label: "کانال Telegram" },
  ],
  sections: [
    {
      id: "neotracked",
      emoji: "📊",
      title: "NeoTracked",
      subtitle: "زمانت را برنامه‌ریزی کن، تمرکزت را بسنج و پیشرفت واقعی‌ات را ببین.",
      accent: "neo",
      hrefKey: "NEOTRACKED_URL",
      featured: {
        title: "NeoTracked",
        message: "زمانت را مدیریت کن، پیشرفتت را ببین",
        description:
          "برنامه‌ریزی کن، تمرکزت را حفظ کن و پیشرفت روزانه‌ات را با امتیازها، نمودارها و ابزارهای کاربردی دنبال کن.",
        ctaLabel: "مشاهده NeoTracked",
        image: "/media/neotracked/hero.webp",
        imageAlt: "میز کار با برنامه‌ریزی و مدیریت زمان در NeoTracked",
        objectPosition: "center 40%",
      },
      row: {
        ariaLabel: "ویژگی‌های NeoTracked",
        variant: "detail",
        items: [
          {
            id: "daily",
            title: "امتیاز عملکرد روزانه",
            description:
              "عملکرد هر روزت را با یک امتیاز واضح و تقویم رنگی بررسی کن.",
            image: "/media/neotracked/daily-score.webp",
            imageAlt: "تقویم امتیاز عملکرد روزانه در NeoTracked",
            objectPosition: "22% center",
          },
          {
            id: "countdown",
            title: "شمارش معکوس",
            description:
              "زمان باقی‌مانده تا هدف‌ها و مهلت‌های مهمت را لحظه‌به‌لحظه دنبال کن.",
            visualKey: "neotracked-countdown",
            imageAlt: "شمارش معکوس زنده NeoTracked",
          },
          {
            id: "languagegym",
            title: "LanguageGym",
            description: "تمرین واژگان در همان سیستم روزانه.",
            image: "/media/neotracked/language.webp",
            imageAlt: "تمرین واژگان و یادگیری زبان در NeoTracked",
            objectPosition: "center 35%",
          },
          {
            id: "mindgym",
            title: "MindGym",
            description:
              "تمرین محاسبات ذهنی، دنباله‌های عددی و چالش‌های منطقی برای تقویت ذهن.",
            image: "/media/neotracked/mindgym.webp",
            imageAlt: "تمرین ریاضی، دنباله عددی و محاسبات ذهنی در MindGym",
            objectPosition: "center 42%",
          },
          {
            id: "analytics",
            title: "تحلیل پیشرفت",
            description: "روند، آمار و ریتم هفتگی در یک نمای واحد.",
            visualKey: "neotracked-analytics",
            imageAlt: "نمودار تحلیل پیشرفت و روند عملکرد هفتگی در NeoTracked",
          },
        ],
      },
    },
    {
      id: "unielitez",
      emoji: "🎓",
      title: "UniEliteZ",
      subtitle:
        "دانشگاه‌ها، رشته‌ها، شهریه‌ها و فرصت‌های تحصیلی را هوشمندانه مقایسه کن.",
      accent: "uni",
      hrefKey: "UNIELITEZ_URL",
      featured: {
        title: "UniEliteZ",
        message: "دانشگاه مناسب آینده‌ات را پیدا کن",
        description:
          "جست‌وجو و مقایسه دانشگاه‌ها، رشته‌ها و شهریه‌ها در یک مسیر روشن.",
        ctaLabel: "مشاهده UniEliteZ",
        image: "/media/unielitez/hero.webp",
        imageAlt: "محوطه دانشگاهی و فضای تحصیلی UniEliteZ",
        objectPosition: "center 35%",
      },
      row: {
        ariaLabel: "دسته‌بندی‌های UniEliteZ",
        variant: "detail",
        items: [
          {
            id: "turkiye",
            title: "🇹🇷 دانشگاه‌های ترکیه",
            description:
              "دانشگاه‌ها، رشته‌ها و شهریه‌های تحصیلی در ترکیه را بررسی و مقایسه کن.",
            image: "/media/unielitez/turkiye.webp",
            imageAlt:
              "محوطه دانشگاه بوغازیچی در استانبول با فضای سبز و ساختمان تاریخی",
            objectPosition: "center 42%",
          },
          {
            id: "germany",
            title: "🇩🇪 دانشگاه‌های آلمان",
            description:
              "فرصت‌های تحصیلی، دانشگاه‌ها و مسیرهای آموزشی در آلمان را کشف کن.",
            image: "/media/unielitez/germany.webp",
            imageAlt:
              "ساختمان رایش‌تاگ و پرچم آلمان در برلین، نمادی از فرصت‌های تحصیلی در آلمان",
            objectPosition: "center 38%",
          },
          {
            id: "europe",
            title: "🇪🇺 دانشگاه‌های اروپا",
            description: "مسیرهای تحصیلی معتبر در کشورهای اروپایی.",
            image: "/media/unielitez/europe.webp",
            imageAlt: "ساختمان دانشگاهی کلاسیک در اروپا",
            objectPosition: "center 40%",
          },
          {
            id: "compare",
            title: "مقایسه رشته‌ها و شهریه‌ها",
            description: "رشته‌ها و شهریه‌ها را کنار هم ببین.",
            image: "/media/unielitez/compare.webp",
            imageAlt: "دانشجو در حال مقایسه رشته‌ها و شهریه‌ها",
            objectPosition: "center 35%",
          },
          {
            id: "scholarships",
            title: "جست‌وجوی بورسیه‌ها",
            description: "فرصت‌هایی که تحصیل را ممکن می‌کنند.",
            image: "/media/unielitez/scholarships.webp",
            imageAlt: "فضای فارغ‌التحصیلی و فرصت‌های بورسیه تحصیلی",
            objectPosition: "center 30%",
          },
          {
            id: "match",
            title: "پیدا کردن بهترین انتخاب",
            description: "مسیری روشن‌تر تا انتخاب درست.",
            image: "/media/unielitez/match.webp",
            imageAlt: "دانشجویان در حال یافتن بهترین مسیر تحصیلی",
            objectPosition: "center 40%",
          },
        ],
      },
    },
    {
      id: "etvavida",
      emoji: "",
      title: "EtvaVida",
      subtitle:
        "از طراحی محصول تا حضور حرفه‌ای در فضای دیجیتال، برای ساخت و رشد برندت کنارت هستیم.",
      accent: "etva",
      hrefKey: "ETVAVIDA_URL",
      featured: {
        title: "EtvaVida",
        message: "برند و کسب‌وکار دیجیتال خودت را حرفه‌ای بساز",
        description:
          "طراحی، توسعه و برندینگ برای کسب‌وکارهایی که می‌خواهند جدی دیده شوند.",
        badge: "خدمات دیجیتال",
        ctaLabel: "شروع همکاری با EtvaVida",
        image: "/media/etvavida/hero.webp",
        imageAlt: "فضای کاری مدرن و خدمات دیجیتال EtvaVida",
        objectPosition: "center 45%",
      },
      row: {
        ariaLabel: "خدمات EtvaVida",
        variant: "detail",
        items: [
          {
            id: "web",
            title: "طراحی و توسعه وب",
            description: "وب‌سایت‌های سریع، مدرن و متناسب با هویت برند شما.",
            image: "/media/etvavida/web.webp",
            imageAlt: "توسعه وب و کدنویسی حرفه‌ای",
            objectPosition: "center 35%",
          },
          {
            id: "mobile",
            title: "توسعه اپلیکیشن موبایل",
            description: "طراحی و ساخت اپلیکیشن‌های کاربردی برای iOS و Android.",
            image: "/media/etvavida/mobile.webp",
            imageAlt: "طراحی و توسعه اپلیکیشن موبایل",
            objectPosition: "center 40%",
          },
          {
            id: "social",
            title: "مدیریت شبکه‌های اجتماعی",
            description: "استراتژی محتوا، مدیریت صفحات و خدمات SMMA.",
            image: "/media/etvavida/social.webp",
            imageAlt: "مدیریت شبکه‌های اجتماعی و استراتژی محتوا",
            objectPosition: "center 45%",
          },
          {
            id: "brand",
            title: "برندینگ و هویت بصری",
            description: "ساخت هویت منسجم، حرفه‌ای و قابل‌تشخیص برای برند شما.",
            image: "/media/etvavida/brand.webp",
            imageAlt: "طراحی هویت بصری و برندینگ حرفه‌ای",
            objectPosition: "center 40%",
          },
          {
            id: "product",
            title: "طراحی محصول دیجیتال",
            description: "تبدیل ایده اولیه به یک تجربه کاربری و محصول واقعی.",
            image: "/media/etvavida/product.webp",
            imageAlt: "طراحی تجربه کاربری و محصول دیجیتال",
            objectPosition: "center 35%",
          },
          {
            id: "strategy",
            title: "مشاوره و استراتژی محتوا",
            description: "برنامه‌ریزی محتوایی برای رشد هدفمند و بلندمدت.",
            image: "/media/etvavida/strategy.webp",
            imageAlt: "جلسه مشاوره و برنامه‌ریزی استراتژی محتوا",
            objectPosition: "center 40%",
          },
        ],
      },
    },
    {
      id: "turkish-course",
      emoji: "",
      title: "Türkçe Kursum",
      subtitle:
        "آموزش کاربردی ترکی استانبولی برای زندگی روزمره، دانشگاه و محیط کار.",
      accent: "tr",
      hrefKey: "TURKISH_COURSE_URL",
      featured: {
        title: "Türkçe Kursum",
        message: "ترکی استانبولی را با اعتمادبه‌نفس صحبت کن",
        description:
          "درس‌های ساده و کاربردی ترکی استانبولی برای زندگی روزمره، دانشگاه و محیط کار.",
        ctaLabel: "مشاهده دوره‌ها",
        image: "/media/turkish/hero.webp",
        imageAlt: "نمایی از استانبول برای دوره آموزش ترکی استانبولی",
        objectPosition: "center 22%",
      },
      row: {
        ariaLabel: "دسته‌بندی درس‌های ترکی استانبولی",
        variant: "detail",
        items: [
          {
            id: "daily",
            title: "ترکی استانبولی روزمره",
            description: "عبارت‌های کاربردی برای زندگی روزانه.",
            image: "/media/turkish/daily.webp",
            imageAlt: "مکالمه روزمره و یادگیری ترکی استانبولی",
            objectPosition: "center 40%",
          },
          {
            id: "university",
            title: "ترکی استانبولی برای دانشگاه",
            description: "زبان کلاس، دانشگاه و متن‌های علمی.",
            image: "/media/turkish/university.webp",
            imageAlt: "یادگیری ترکی استانبولی برای محیط دانشگاهی",
            objectPosition: "center 35%",
          },
          {
            id: "work",
            title: "ترکی استانبولی برای محیط کار",
            description: "جلسه، ایمیل و مکالمه‌های کاری.",
            image: "/media/turkish/work.webp",
            imageAlt: "مکالمه ترکی استانبولی در محیط کار",
            objectPosition: "center 40%",
          },
          {
            id: "speaking",
            title: "تمرین مکالمه",
            description: "تمرین مکالمه و تلفظ در ترکی استانبولی",
            image: "/media/turkish/speaking.webp",
            imageAlt: "تمرین مکالمه و تلفظ ترکی استانبولی",
            objectPosition: "center 30%",
          },
          {
            id: "persian",
            title: "ترکی استانبولی برای فارسی‌زبانان",
            description: "توضیح ویژه برای فارسی‌زبانان.",
            image: "/media/turkish/persian.webp",
            imageAlt: "آموزش ترکی استانبولی ویژه فارسی‌زبانان",
            objectPosition: "center 40%",
          },
        ],
      },
    },
    {
      id: "telegram",
      emoji: "✈️",
      title: "کانال Telegram",
      subtitle:
        "پروژه‌ها، نکات برنامه‌نویسی، منابع کاربردی و تازه‌ترین به‌روزرسانی‌ها.",
      accent: "tg",
      hrefKey: "TELEGRAM_URL",
      featured: {
        title: "Telegram",
        message: "پروژه‌ها و نکات برنامه‌نویسی",
        description:
          "پروژه‌های جدید، نکات فنی و منابع کاربردی — مستقیم در Telegram.",
        meta: "به جمع کانال بپیوندید",
        ctaLabel: "عضویت در کانال Telegram",
        visualKey: "telegram-hero",
      },
    },
  ],
  contact: {
    heading: "با من در ارتباط باشید",
    title: "همکاری‌ها و پیشنهادهای پروژه",
    message:
      "برای همکاری در زمینه طراحی وب، اپلیکیشن موبایل، برندینگ، مدیریت شبکه‌های اجتماعی و پروژه‌های دیجیتال از طریق ایمیل با من در ارتباط باشید.",
    ctaHint: "ارسال ایمیل",
  },
};

export const sectionIds = siteConfig.categories.map((category) => category.id);
