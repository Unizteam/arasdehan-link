export type CourseLang = "fa" | "tr";

export const COURSE_LANG_STORAGE_KEY = "turkce-kursum-lang";

export const courseWhatsAppMessages: Record<CourseLang, string> = {
  fa: "سلام، می‌خواستم درباره دوره زبان ترکی اطلاعات بیشتری بگیرم.",
  tr: "Merhaba, Türkçe kursu hakkında bilgi almak istiyordum.",
};

export const courseContent = {
  fa: {
    metaTitle: "Türkçe Kursum — آموزش ترکی استانبولی",
    metaDescription:
      "دوره‌های ساده و کاربردی برای زندگی روزمره، دانشگاه و محیط کار در ترکیه.",
    skip: "رفتن به محتوا",
    home: "بازگشت به صفحه اصلی",
    brand: "Türkçe Kursum",
    flagLabel: "پرچم ترکیه",
    language: "زبان",
    pageNav: "ناوبری صفحه",
    nav: {
      courses: "دوره‌ها",
      format: "نحوه برگزاری",
      faq: "سؤالات متداول",
    },
    headerCta: "اطلاعات بیشتر",
    heroEyebrow: "Türkçe Kursum",
    heroTitle: "ترکی استانبولی رو برای زندگی واقعی یاد بگیر.",
    heroDescription:
      "دوره‌های ساده و کاربردی برای زندگی روزمره، دانشگاه و محیط کار در ترکیه.",
    heroPrimary: "اطلاعات بیشتر در واتساپ",
    heroSecondary: "مشاهده دوره‌ها",
    coursesHeading: "دوره‌ها",
    courses: [
      {
        id: "daily",
        title: "ترکی برای زندگی روزمره",
        description:
          "مکالمه‌های کاربردی برای خرید، رفت‌وآمد، کارهای اداری و زندگی روزانه.",
        image: "/media/turkish/daily.webp",
        imageAlt: "مکالمه روزمره در فضای شهری استانبول",
      },
      {
        id: "university",
        title: "ترکی برای دانشگاه",
        description:
          "زبان موردنیاز برای کلاس، ارائه، ارتباط با استاد و زندگی دانشجویی.",
        image: "/media/turkish/university.webp",
        imageAlt: "فضای دانشگاهی برای یادگیری ترکی استانبولی",
      },
      {
        id: "work",
        title: "ترکی برای محیط کار",
        description: "مکالمه، جلسه، ایمیل و ارتباط حرفه‌ای در محیط کاری.",
        image: "/media/turkish/work.webp",
        imageAlt: "ارتباط حرفه‌ای در محیط کار",
      },
    ],
    audienceHeading: "این دوره برای چه کسانیه؟",
    audience: [
      "تازه به ترکیه اومدی و می‌خوای راحت‌تر ارتباط بگیری",
      "دانشجویی و برای دانشگاه به ترکی نیاز داری",
      "می‌خوای در محیط کار با اعتمادبه‌نفس صحبت کنی",
      "ترکی بلدی، اما موقع صحبت کردن مکث می‌کنی",
    ],
    formatHeading: "دوره‌ها چطور برگزار می‌شن؟",
    format: [
      { id: "online", title: "کلاس آنلاین" },
      { id: "speaking", title: "تمرکز روی مکالمه واقعی" },
      { id: "practice", title: "تمرین‌های کاربردی" },
      { id: "group", title: "امکان کلاس فردی یا گروهی" },
    ],
    faqHeading: "سؤالات متداول",
    faq: [
      {
        q: "کلاس‌ها آنلاین هستن؟",
        a: "بله، کلاس‌ها آنلاین برگزار می‌شن. برای اطلاعات بیشتر از طریق واتساپ پیام بده.",
      },
      {
        q: "برای شروع باید ترکی بلد باشم؟",
        a: "نه، لازم نیست از قبل ترکی بلد باشی. سطح مناسبت رو با هم هماهنگ می‌کنیم — جزئیاتش از واتساپ.",
      },
      {
        q: "کلاس فردی هم برگزار می‌شه؟",
        a: "بله، هم کلاس فردی و هم گروهی ممکنه. اینکه کدوم برات بهتره رو در واتساپ مشخص می‌کنیم.",
      },
      {
        q: "چطور می‌تونم اطلاعات بیشتری بگیرم؟",
        a: "روی دکمه واتساپ بزن و پیام بده. درباره سطح، نحوه برگزاری و جزئیات دوره کمکت می‌کنم.",
      },
    ],
    ctaHeading: "برای شروع یا دریافت اطلاعات بیشتر پیام بده.",
    ctaDescription:
      "برای اطلاع از سطح مناسب، نحوه برگزاری و جزئیات دوره از طریق واتساپ در ارتباط باش.",
    ctaButton: "پیام در واتساپ",
    whatsappUnavailable:
      "ارتباط واتساپ الان ممکن نیست.",
  },
  tr: {
    metaTitle: "Türkçe Kursum — Pratik Türkçe",
    metaDescription:
      "Türkiye’de günlük yaşam, üniversite ve iş hayatı için pratik Türkçe dersleri.",
    skip: "İçeriğe geç",
    home: "Ana sayfaya dön",
    brand: "Türkçe Kursum",
    flagLabel: "Türkiye bayrağı",
    language: "Dil",
    pageNav: "Sayfa menüsü",
    nav: {
      courses: "Dersler",
      format: "Ders formatı",
      faq: "SSS",
    },
    headerCta: "Daha Fazla Bilgi",
    heroEyebrow: "Türkçe Kursum",
    heroTitle: "Türkçeyi gerçek hayat için öğren.",
    heroDescription:
      "Türkiye’de günlük yaşam, üniversite ve iş hayatı için pratik Türkçe dersleri.",
    heroPrimary: "WhatsApp’tan daha fazla bilgi",
    heroSecondary: "Dersleri gör",
    coursesHeading: "Dersler",
    courses: [
      {
        id: "daily",
        title: "Günlük Yaşam Türkçesi",
        description:
          "Alışveriş, ulaşım, resmi işler ve günlük hayat için pratik konuşmalar.",
        image: "/media/turkish/daily.webp",
        imageAlt: "İstanbul’da günlük konuşma",
      },
      {
        id: "university",
        title: "Üniversite Türkçesi",
        description:
          "Ders, sunum, hoca ile iletişim ve öğrenci hayatı için gereken Türkçe.",
        image: "/media/turkish/university.webp",
        imageAlt: "Üniversite ortamında Türkçe",
      },
      {
        id: "work",
        title: "İş Hayatı Türkçesi",
        description:
          "İş ortamında konuşma, toplantı, e-posta ve profesyonel iletişim.",
        image: "/media/turkish/work.webp",
        imageAlt: "İş ortamında profesyonel iletişim",
      },
    ],
    audienceHeading: "Bu kurs kimler için?",
    audience: [
      "Yeni Türkiye’ye geldin ve daha rahat iletişim kurmak istiyorsun",
      "Öğrencisin ve üniversite için Türkçeye ihtiyacın var",
      "İş ortamında kendinden emin konuşmak istiyorsun",
      "Türkçe biliyorsun ama konuşurken duraksıyorsun",
    ],
    formatHeading: "Dersler nasıl işleniyor?",
    format: [
      { id: "online", title: "Online ders" },
      { id: "speaking", title: "Gerçek konuşmaya odak" },
      { id: "practice", title: "Pratik alıştırmalar" },
      { id: "group", title: "Bireysel veya grup dersi imkânı" },
    ],
    faqHeading: "Sıkça sorulan sorular",
    faq: [
      {
        q: "Dersler online mı?",
        a: "Evet, dersler online. Daha fazla bilgi için WhatsApp’tan yaz.",
      },
      {
        q: "Başlamak için Türkçe bilmem gerekir mi?",
        a: "Hayır, önceden Türkçe bilmen gerekmiyor. Sana uygun seviyeyi birlikte netleştiririz — ayrıntı için WhatsApp.",
      },
      {
        q: "Bireysel ders de var mı?",
        a: "Evet, hem bireysel hem grup dersi mümkün. Hangisinin sana daha uygun olduğunu WhatsApp’tan konuşuruz.",
      },
      {
        q: "Daha fazla bilgiyi nasıl alabilirim?",
        a: "WhatsApp butonundan yaz. Seviye, ders formatı ve kurs ayrıntıları için yardımcı olurum.",
      },
    ],
    ctaHeading: "Başlamak veya daha fazla bilgi almak için yaz.",
    ctaDescription:
      "Uygun seviye, ders formatı ve kurs detayları için WhatsApp’tan iletişime geç.",
    ctaButton: "WhatsApp’tan Mesaj Gönder",
    whatsappUnavailable:
      "WhatsApp numarası henüz ayarlanmamış. Lütfen daha sonra tekrar dene.",
  },
} as const;
