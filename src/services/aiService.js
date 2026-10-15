/**
 * Advanced AI Service for Tala's Portfolio Assistant
 * 
 * Features:
 * 1. Deep Arabic NLP Text Normalization (Handles typos, diacritics, Alif/Yaa/Taa variations, e.g. "مين تالى" vs "مين تالة").
 * 2. Multi-Tier Semantic Intent Matcher with 20+ specialized topics covering all aspects of Tala's career, projects, and skills.
 * 3. Smart Action Triggers (Smooth Scroll to sections, Live Project previews, Direct WhatsApp/Email/CV links).
 * 4. Dynamic Contextual Follow-up chips that adapt based on the conversation.
 * 5. Production Google Gemini API Integration (gemini-2.0-flash) with seamless offline fallback.
 */

import { retrieveKnowledge } from './ragEngine.js';

const SYSTEM_INSTRUCTION = `
أنت المساعد الذكي الشخصي للمطورة تالة ابوشيحة (Tala Abusheha)، مطورة واجهات أمامية وموجهة برمجية (Front-End Developer & Co-Mentor).
شخصيتك: لبق، ذكي جداً، ودود، راقٍ، ومرحب بالزوار (ذوق وأدب عالي، أسلوب شامي/فلسطيني دافئ ومهني).

قاعدة بيانات ومعلومات تالة ابوشيحة (Tala Abusheha):
1. الاسم الكامل: تالة ابوشيحة (Tala Abusheha).
2. المهنة والتخصص: مطورة واجهات أمامية (Front-End Developer) متخصصة في React.js و Vite و Tailwind CSS و Modern Web APIs، بالإضافة لكونها موجهة برمجية (Co-Mentor).
3. الموقع والإتاحة: تقيم في فلسطين، وتعمل عن بُعد (Remote) مع شركات وفرق عمل في أي مكان بالعالم. متاحة للتوظيف (Full-time / Part-time) ومشاريع العمل الحر (Freelance).
4. سنوات الخبرة والإنجازات: +2 سنوات من الخبرة العملية، أنجزت +20 مشروعاً ناجحاً، وتعاملت مع +10 عملاء راضين.

الخبرات المهنية (Work Experience):
1. Co-Mentor & Front-End Developer في برنامج TAQAT — CodeMap 3 (سبتمبر 2026 - الحالي):
   - تدريب وتوجيه المتدربين الجدد على تقنيات تطوير الواجهات الحديثة.
   - مراجعة الأكواد (Code Reviews) وتقديم الدعم التقني وأفضل الممارسات.
   - هندسة وتطوير نظام الحضور الذكي بالـ QR Code مع لوحة تحكم وتصدير تقارير Excel (XLSX).
2. Front-End Web Developer في منصة كفيلي - Kafeeli (2026):
   - العمل ضمن فريق عمل متكامل (UI/UX Designers, Front-End, Back-End).
   - بناء لوحة تحكم الأوصياء (Guardian Dashboard) وربط الـ RESTful APIs بواسطة Axios.
3. مشاريع حرة ومستقلة (Freelance) (2024 - الحالي):
   - تطوير تطبيقات ويب تفاعلية وسريعة ومتوافقة مع جميع الأجهزة (Responsive & Accessible).

المشاريع المميزة (Featured Projects):
1. منصة كفيلي (Kafeeli): منصة لكفالة الأيتام بشفافية مالية وحالة كاملة (React.js, Vite, Axios, REST APIs, Tailwind CSS).
   رابط المشروع: https://kafeeli-frontend.vercel.app/
2. نظام الحضور الذكي (Smart Dynamic QR Attendance System): أداة متطورة لبرنامج TAQAT لتسجيل الحضور اللحظي بالـ QR ومنع التلاعب، مع لوحة تحكم وتقارير XLSX (React 19, Vite, Supabase, Tailwind CSS).
   رابط المشروع: https://taqat-mentors.vercel.app/admin/dashboard
3. تطبيق مواقيت الصلاة (Islamic Prayer Times & Schedules): يعتمد على الموقع الجغرافي لحساب المواقيت بدقة عبر REST Web APIs (HTML5, CSS3, JavaScript ES6+).
   رابط المشروع: https://prayer-times-api-lime.vercel.app/
4. تطبيق إدارة المهام (Task Flow Hub / To-Do List): إدارة مهام لحظية مع حفظ البيانات محلياً (LocalStorage) والتصفية المتقدمة.
   رابط المشروع: https://talaabusheha.github.io/To-Do-List/

الترسانة التقنية والمهارات (Technical Arsenal):
- اللغات والواجهات: React 19, JavaScript (ES6+), TypeScript, HTML5, CSS3.
- التنسيق والتصميم: Tailwind CSS, Bootstrap, Responsive UI/UX, CSS Micro-animations.
- الأدوات والأنظمة: Vite, Git & GitHub, Supabase, Axios, RESTful APIs, Antigravity IDE, Claude AI & Gemini Prompt Engineering.

وسائل التواصل والروابط:
- البريد الإلكتروني: talaabusheha@gmail.com
- الواتساب: +970 594828270 (https://wa.me/970594828270)
- لينكد إن: https://www.linkedin.com/in/talaabusheha2832005/
- جيت هاب: https://github.com/talaabusheha
- السيرة الذاتية (CV): https://drive.google.com

إرشادات الحديث:
- أجب دائماً باللغة التي يسأل بها المستخدم (عربي أو إنجليزي).
- إذا سألك المستخدم "مين تالا" أو أي سؤال عنها أجب بفخر ووضوح عن هويتها ومجالها.
- قدم دائماً روابط سريعة أو دعوة للتواصل للعمل معها.
`;

/**
 * Advanced Arabic Text Normalizer
 * Cleans diacritics, tatweel, and normalizes all forms of Alif, Yaa, Taa Marbuta
 * Example: "مين تالى" -> "مين تالي", "إحكيلي عن تالة" -> "احكيلي عن تاله"
 */
export function normalizeArabicText(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    // Remove Arabic diacritics / Tashkeel
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Remove Tatweel (Kashida)
    .replace(/\u0640/g, '')
    // Normalize Alif forms (أ, إ, آ, ٱ -> ا)
    .replace(/[أإآٱ]/g, 'ا')
    // Normalize Yaa / Alif Maqsura (ى, ئ -> ي)
    .replace(/[ىئ]/g, 'ي')
    // Normalize Taa Marbuta (ة -> ه)
    .replace(/ة/g, 'ه')
    // Normalize punctuation
    .replace(/[.,?!؟؛،:()\[\]{}"'\\/-]/g, ' ')
    // Collapse multiple whitespaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Smart Interactive Action & Dynamic Follow-up generator
 */
export function extractActionsAndFollowUps(query) {
  const norm = normalizeArabicText(query);
  const q = query.toLowerCase();

  // 1. Specific Project: Kafeeli
  if (norm.includes('كفيلي') || q.includes('kafeeli')) {
    return {
      actions: [
        { type: 'link', target: 'https://kafeeli-frontend.vercel.app/', label: 'معاينة منصة كفيلي الحية 🌟' },
        { type: 'scroll', target: '#projects', label: 'المزيد من المشاريع 🚀' },
      ],
      followUps: ['احكيلي عن نظام الحضور بطاقات', 'ما هي الترسانة التقنية لتالة؟', 'كيف بقدر اتواصل مع تالة؟'],
    };
  }

  // 2. Specific Project: TAQAT / QR
  if (norm.includes('طاقات') || norm.includes('حضور') || norm.includes('كود') || q.includes('taqat') || q.includes('qr')) {
    return {
      actions: [
        { type: 'link', target: 'https://taqat-mentors.vercel.app/admin/dashboard', label: 'معاينة نظام الحضور الذكي 🚀' },
        { type: 'scroll', target: '#experience', label: 'سيكشن الخبرات و TAQAT 💼' },
      ],
      followUps: ['احكيلي عن منصة كفيلي', 'ما هي مهارات تالة في React؟', 'تحميل السيرة الذاتية (CV)'],
    };
  }

  // 3. General Projects
  if (
    norm.includes('مشروع') ||
    norm.includes('مشاريع') ||
    norm.includes('اعمال') ||
    norm.includes('شغل') ||
    q.includes('project') ||
    q.includes('portfolio')
  ) {
    return {
      actions: [
        { type: 'scroll', target: '#projects', label: 'الانتقال لقسم المشاريع 🚀' },
        { type: 'link', target: 'https://kafeeli-frontend.vercel.app/', label: 'معاينة كفيلي 🌟' },
        { type: 'link', target: 'https://taqat-mentors.vercel.app/admin/dashboard', label: 'نظام الحضور بالـ QR ⚡' },
      ],
      followUps: ['ما هي التقنيات المستخدمة؟', 'هل تالة متاحة للعمل الحر؟', 'كيف اتواصل معها؟'],
    };
  }

  // 4. Skills & Tech Stack
  if (
    norm.includes('مهار') ||
    norm.includes('تقني') ||
    norm.includes('لغات') ||
    norm.includes('ادوات') ||
    norm.includes('رياكت') ||
    norm.includes('تايلوند') ||
    norm.includes('فايت') ||
    q.includes('skill') ||
    q.includes('tech') ||
    q.includes('stack') ||
    q.includes('react')
  ) {
    return {
      actions: [
        { type: 'scroll', target: '#skills', label: 'مشاهدة الترسانة التقنية ⚡' },
        { type: 'scroll', target: '#projects', label: 'مشاريع بُنيت بهذه التقنيات 💻' },
      ],
      followUps: ['استعراض المشاريع المميزة', 'خبرات تالة السابقة؟', 'تحميل الـ CV'],
    };
  }

  // 5. Contact, Hire & Work
  if (
    norm.includes('تواصل') ||
    norm.includes('توظيف') ||
    norm.includes('رقم') ||
    norm.includes('واتس') ||
    norm.includes('ايميل') ||
    norm.includes('سعر') ||
    norm.includes('شغل') ||
    q.includes('contact') ||
    q.includes('hire') ||
    q.includes('whatsapp') ||
    q.includes('email')
  ) {
    return {
      actions: [
        { type: 'link', target: 'https://wa.me/970594828270', label: 'محادثة عبر واتساب 💬' },
        { type: 'scroll', target: '#contact', label: 'نموذج إرسال رسالة 📬' },
        { type: 'link', target: 'https://www.linkedin.com/in/talaabusheha2832005/', label: 'حساب LinkedIn 💼' },
      ],
      followUps: ['تحميل السيرة الذاتية (CV)', 'ما هي المشاريع السابقة؟', 'المهارات التقنية'],
    };
  }

  // 6. Resume / CV
  if (norm.includes('سيره') || norm.includes('سي في') || q.includes('cv') || q.includes('resume')) {
    return {
      actions: [
        { type: 'link', target: 'https://drive.google.com', label: 'فتح وتحميل السيرة الذاتية (CV) 📄' },
        { type: 'scroll', target: '#experience', label: 'استعراض المسيرة المهنية 💼' },
      ],
      followUps: ['كيف اتواصل مع تالة؟', 'أبرز مشاريع تالة؟', 'الترسانة التقنية'],
    };
  }

  // 7. Experience / TAQAT Mentorship
  if (
    norm.includes('خبر') ||
    norm.includes('توجيه') ||
    norm.includes('تدريب') ||
    q.includes('experience') ||
    q.includes('mentor')
  ) {
    return {
      actions: [
        { type: 'scroll', target: '#experience', label: 'الانتقال لقسم الخبرات 💼' },
        { type: 'scroll', target: '#about', label: 'قراءة نبذة تالة 🌸' },
      ],
      followUps: ['أبرز المشاريع؟', 'المهارات البرمجية؟', 'كيفية التواصل؟'],
    };
  }

  // 8. Identity / About / Who is Tala (Default smart fallbacks)
  return {
    actions: [
      { type: 'scroll', target: '#about', label: 'قراءة نبذة تالة 🌸' },
      { type: 'scroll', target: '#projects', label: 'استعراض المشاريع 🚀' },
      { type: 'link', target: 'https://wa.me/970594828270', label: 'تواصل عبر واتساب 💬' },
    ],
    followUps: ['Who is Tala?', 'Projects? 🌟', 'Tech stack? ⚡', 'How to contact? 📬'],
  };
}

/**
 * Ultra-Smart Local Matching Engine
 * Accurately responds to any question about Tala even without an internet connection or API Key.
 */
export function getLocalFallbackResponse(userMessage) {
  const norm = normalizeArabicText(userMessage);
  const q = userMessage.toLowerCase().trim();

  // Helper flags
  const hasTalaName =
    norm.includes('تالا') ||
    norm.includes('تاله') ||
    norm.includes('تالي') ||
    norm.includes('ابوشيحه') ||
    norm.includes('صاحب') ||
    q.includes('tala') ||
    q.includes('abusheha');

  // ================= 1. IDENTITY / WHO IS TALA (مين تالى / مين تالة / مين تالا) =================
  const isWhoQuestion =
    norm.includes('مين تالي') ||
    norm.includes('مين تاله') ||
    norm.includes('مين تالا') ||
    norm.includes('من تالي') ||
    norm.includes('من تاله') ||
    norm.includes('من تالا') ||
    norm.includes('مين هي') ||
    norm.includes('من هي') ||
    norm.includes('من هو') ||
    norm.includes('مين صاحبه') ||
    norm.includes('مين صاحب') ||
    norm.includes('عرفني على تال') ||
    norm.includes('احكيلي عن تال') ||
    norm.includes('احكيلي عنها') ||
    norm.includes('نبذه عن تال') ||
    norm.includes('نبذه عنها') ||
    norm.includes('معلومات عن تال') ||
    norm.includes('شو بتشتغل تال') ||
    norm.includes('شو مجال تال') ||
    q.includes('who is tala') ||
    q.includes('about tala') ||
    q.includes('tell me about tala') ||
    ((norm.includes('مين') || norm.includes('عرفني') || norm.includes('نبذه')) && hasTalaName) ||
    norm === 'تالا' ||
    norm === 'تاله' ||
    norm === 'تالي' ||
    norm === 'مين' ||
    q === 'tala' ||
    q === 'who is tala';

  if (isWhoQuestion) {
    return `🌸 **تالة ابوشيحة (Tala Abusheha):**
هي **مطورة واجهات أمامية متخصصة (Front-End Developer)** وموجهة برمجية (Co-Mentor) مقيمة في فلسطين وتعمل عن بُعد حول العالم.

✨ **أهم ما يميز تالة:**
- **خبرة عملية +2 سنوات** في بناء وتطوير تطبيقات الويب السريعة والحديثة.
- متخصصة باحترافية عالية في: **React 19, Vite, Tailwind CSS, JavaScript (ES6+), TypeScript, و RESTful APIs**.
- أنجزت **أكثر من 20 مشروعاً ناجحاً** ونالت رضا أكثر من 10 عملاء وفرق عمل.
- تعمل حالياً كـ **Co-Mentor** في برنامج **TAQAT — CodeMap 3**، حيث توجه المتدربين وتبني أدوات ذكية مثل نظام الحضور بـ QR Code.
- شاركت في بناء منصات إنتاجية حقيقية مثل منصة **كفيلي (Kafeeli)** لكفالة الأيتام.

تالة شغوفة بتحويل التصاميم إلى أكواد نظيفة وسريعة وتجارب مستخدم فائقة الجمال! 🚀`;
  }

  // ================= 2. WHO ARE YOU (BOT IDENTITY) =================
  if (
    norm.includes('مين انت') ||
    norm.includes('من انت') ||
    norm.includes('شو انت') ||
    norm.includes('ايش انت') ||
    norm.includes('عرف عن نفسك') ||
    q.includes('who are you') ||
    q.includes('what are you')
  ) {
    return `أنا **المساعد الذكي الشخصي لتالة ابوشيحة** 🤖✨
تم تدريبي للإجابة على كل استفساراتك حول تالة:
- مهاراتها وترسانتها التقنية 💻
- مشاريعها وتطبيقاتها الحية 🚀
- مسيرتها المهنية وتجربتها في التوجيه مع TAQAT 💼
- مساعدتك في التواصل المباشر معها أو طلب عرض لمشروعك القادم! 😊`;
  }

  // ================= 3. SPECIFIC PROJECT: KAFEELI (منصة كفيلي) =================
  if (norm.includes('كفيلي') || q.includes('kafeeli')) {
    return `🌟 **مشروع منصة كفيلي (Kafeeli Platform):**
هو منصة ويب حقيقية متكاملة تهدف إلى كفالة الأيتام وضمان الشفافية المالية الكاملة بين الأوصياء والكفلاء.

📌 **دور تالة بالمشروع:**
- عملت ضمن فريق عمل تقني متكامل ضم مصممي UI/UX ومطوري فرونت إند وباك إند.
- قامت تالة بهندسة وتطوير **لوحة تحكم الأوصياء (Guardian Dashboard)** بالكامل.
- ربطت واجهات التطبيق مع خوادم الـ RESTful APIs باستخدام **Axios**.
- اعتمدت على **React.js, Vite, و Tailwind CSS** لضمان أداء فائق وتجربة مستخدم مريحة ومتجاوبة 100%.

🔗 يمكنك معاينة المنصة مباشرة عبر الزر التفاعلي بالأسفل!`;
  }

  // ================= 4. SPECIFIC PROJECT: TAQAT QR ATTENDANCE (نظام الحضور بطاقات) =================
  if (
    norm.includes('طاقات') ||
    norm.includes('حضور') ||
    norm.includes('كود مارب') ||
    norm.includes('qr') ||
    q.includes('taqat') ||
    q.includes('attendance')
  ) {
    return `⚡ **نظام الحضور الذكي بـ QR Code (TAQAT Smart Attendance System):**
أداة ويب واقعية ذكية ابتكرتها وطوّرتها تالة لخدمة برنامج **TAQAT - CodeMap 3**.

💡 **المشكلة والحل:**
استبدل النظام التسجيل الورقي وحل مشكلة تسجيل الحضور الوهمي أو عن بُعد عبر:
1. توليد كود QR ديناميكي يتغير تلقائياً في كل جلسة مع صلاحية زمنية محددة.
2. لوحة تحكم ذكية للمشرفين (Mentor Dashboard) لمتابعة الإحصائيات الحية.
3. ميزة التصدير التلقائي لتقارير الحضور بملفات إكسل (**XLSX Reports**).
4. الربط المباشر مع قاعدة بيانات **Supabase** اللحظية.

تم البناء باستخدام **React 19, Vite, Supabase, و Tailwind CSS** 🚀.`;
  }

  // ================= 5. SPECIFIC PROJECT: PRAYER TIMES & TODO =================
  if (norm.includes('صلاه') || norm.includes('مواقيت') || q.includes('prayer')) {
    return `🕌 **تطبيق مواقيت الصلاة (Islamic Prayer Times API):**
تطبيق ويب متطور يعتمد على الموقع الجغرافي للمستخدم (Geolocation APIs) لحساب أوقات الصلاة بدقة بالغة وتحديثها لحظياً مع دعم التوقيتات المحلية والواجهة المتجاوبة.
بُني باستخدام: **JavaScript ES6+, HTML5, CSS3, و Web APIs**.`;
  }

  if (norm.includes('تودو') || norm.includes('مهام') || q.includes('todo') || q.includes('task')) {
    return `📋 **تطبيق Task Flow (Productivity Hub):**
أداة إنتاجية لإدارة المهام اليومية تتميز بـ:
- حفظ دائم للبيانات عبر LocalStorage.
- تصنيف المهام حسب الأولوية والحالة.
- بحث وفلترة سريعة مع أنيميشن سلس وتصميم نظيف بـ Tailwind CSS.`;
  }

  // ================= 6. ALL PROJECTS / PORTFOLIO (المشاريع والأعمال) =================
  if (
    norm.includes('مشروع') ||
    norm.includes('مشاريع') ||
    norm.includes('اعمال') ||
    norm.includes('شغلها') ||
    norm.includes('بورتفوليو') ||
    q.includes('project') ||
    q.includes('portfolio') ||
    q.includes('work')
  ) {
    return `🚀 **أبرز مشاريع تالة ابوشيحة:**

1. **منصة كفيلي (Kafeeli):** تطبيق إنتاجي حقيقي لكفالة الأيتام بُني مع فريق عمل تقني (React.js, Vite, Axios, REST API).
2. **نظام الحضور الذكي بـ QR Code:** نظام إدارة الحضور اللحظي لـ TAQAT مع لوحة تحكم وتصدير Excel (React 19, Supabase, Real-Time).
3. **تطبيق مواقيت الصلاة (Prayer Times API):** حساب أوقات الصلاة بناءً على الإحداثيات الجغرافية عبر الـ APIs.
4. **تطبيق Task Flow:** لوحة إدارة المهام مع التخزين المحلي والتصنيف الذكي.

✨ أنجزت تالة أكثر من 20 مشروعاً برمجياً متنوعاً! يمكنك الضغط على الأزرار بالأسفل للتمرير لقسم المشاريع أو تجربة المشاريع مباشرة.`;
  }

  // ================= 7. SPECIFIC SKILLS: REACT =================
  if (norm.includes('رياكت') || q.includes('react')) {
    return `⚛️ **تالة متخصصة في مكتبة React (بما فيها أحدث إصدارات React 19)!**
خبرتها في React تشمل:
- بناء مكونات قابلة لإعادة الاستخدام (Reusable Modular Components).
- إدارة الحالة المتقدمة وصناعة Custom Hooks.
- الربط السريع مع الـ RESTful APIs و Axios و Supabase.
- تحسين سرعة التحميل وتفادي إعادة الرندر غير الضرورية.
- التكامل السلس مع Vite لبناء تطبيقات أحادية الصفحة (SPAs) فائقة السرعة.`;
  }

  // ================= 8. SPECIFIC SKILLS: TAILWIND CSS =================
  if (norm.includes('تايلوند') || q.includes('tailwind') || norm.includes('css')) {
    return `🎨 **تالة خبيرة في Tailwind CSS و هندسة الـ UI/UX:**
- بناء واجهات عصرية مستوحاة من أحدث اتجاهات التصميم (Dark Mode, Glassmorphism, Micro-animations).
- تصميم متجاوب 100% يعمل بسلاسة على شاشات الهواتف والأجهزة اللوحية والشاشات العريضة.
- كتابة فئات تنسيق منظمة دون تكرار أو بطء في التصفح.`;
  }

  // ================= 9. BACKEND & APIS =================
  if (norm.includes('باك') || norm.includes('سيرفر') || q.includes('backend') || norm.includes('قواعد بيانات')) {
    return `💻 تالة متخصصة بصورة أساسية في **تطوير الواجهات الأمامية (Front-End Development)**.
ولكنها تمتلك خبرة ممتازة في التعامل مع الجانب الخلفي عبر:
- ربط واستهلاك كافة أنواع الـ **RESTful APIs** باحترافية بواسطة Axios و Fetch.
- بناء وإدارة قواعد البيانات السحابية الحقيقية باستخدام **Supabase** (Real-Time DB & Auth).
- معالجة البيانات، التخزين المؤقت، وإدارة حالات الخطأ والتحميل بكفاءة.`;
  }

  // ================= 10. GENERAL SKILLS / TECH STACK =================
  if (
    norm.includes('مهار') ||
    norm.includes('تقني') ||
    norm.includes('لغات') ||
    norm.includes('ادوات') ||
    norm.includes('ستاك') ||
    q.includes('skill') ||
    q.includes('tech') ||
    q.includes('stack')
  ) {
    return `⚡ **الترسانة التقنية لتالة ابوشيحة:**

🔹 **Core Frontend:**
React 19, JavaScript (ES6+), TypeScript, HTML5, CSS3.

🔹 **Styling & UI:**
Tailwind CSS, Bootstrap, Responsive Web Design, CSS Keyframe Animations.

🔹 **Tools, Workflow & Cloud:**
Vite, Git & GitHub, Supabase, Axios & REST APIs, Antigravity IDE, Prompt Engineering (Claude / Gemini AI).

كل سطر كود تكتبه تالة يراعي: السرعة، نظافة الكود (Clean Code)، وتجربة المستخدم السلسة! 🌟`;
  }

  // ================= 11. WORK EXPERIENCE & MENTORSHIP =================
  if (
    norm.includes('خبر') ||
    norm.includes('توجيه') ||
    norm.includes('تدريب') ||
    norm.includes('منتور') ||
    norm.includes('وظيف') ||
    norm.includes('مسيره') ||
    q.includes('experience') ||
    q.includes('mentor') ||
    q.includes('job')
  ) {
    return `💼 **المسيرة المهنية لتالة ابوشيحة (+2 سنوات خبرة):**

1. **Co-Mentor & Front-End Developer — برنامج TAQAT (CodeMap 3)** (2026 - الحالي):
   - تدريب وتوجيه المتدربين على تطوير الواجهات الأمامية.
   - مراجعة الأكواد البرمجية ومساعدة الطلاب على حل المشاكل البرمجية المعقدة.
   - ابتكار نظام الحضور الذكي بالـ QR Code.

2. **Front-End Developer — منصة Kafeeli** (2026):
   - تطوير لوحة تحكم الأوصياء وربط الـ APIs مع فريق متكامل متعدد التخصصات.

3. **تطوير برمجيات ومشاريع مستقلة (Freelance)** (2024 - الحالي):
   - إنجاز أكثر من 20 مشروعاً وحلول ويب مخصصة لعملاء بمختلف المتطلبات.`;
  }

  // ================= 12. CONTACT / HIRE / FREELANCE / AVAILABILITY =================
  if (
    norm.includes('تواصل') ||
    norm.includes('توظيف') ||
    norm.includes('شغل') ||
    norm.includes('عمل') ||
    norm.includes('رقم') ||
    norm.includes('واتس') ||
    norm.includes('ايميل') ||
    norm.includes('هاتف') ||
    norm.includes('متاح') ||
    q.includes('contact') ||
    q.includes('hire') ||
    q.includes('email') ||
    q.includes('whatsapp') ||
    q.includes('phone') ||
    q.includes('freelance') ||
    q.includes('available')
  ) {
    return `📬 **تالة تسعد دائماً بالتعاون وبدء مشاريع جديدة!**
هي متاحة حالياً لفرص العمل بدوام كامل/جزئي (Full-Time / Part-Time) ولمشاريع العمل الحر (Freelance).

يمكنك التواصل معها مباشرة عبر:
- 💬 **واتساب مباشر:** [+970 594828270](https://wa.me/970594828270)
- ✉️ **البريد الإلكتروني:** [talaabusheha@gmail.com](mailto:talaabusheha@gmail.com)
- 💼 **حساب لينكد إن:** [LinkedIn Profile](https://www.linkedin.com/in/talaabusheha2832005/)
- 💻 **حساب جيت هاب:** [GitHub Profile](https://github.com/talaabusheha)

اضغط على أي زر بالأسفل لبدء المحادثة فوراً! 🚀`;
  }

  // ================= 13. RESUME / CV =================
  if (
    norm.includes('سيره') ||
    norm.includes('سي في') ||
    norm.includes('ملف') ||
    q.includes('cv') ||
    q.includes('resume')
  ) {
    return `📄 **السيرة الذاتية (CV / Resume):**
يمكنك استعراض وتحميل السيرة الذاتية المحدثة الخاصة بتالة ابوشيحة بصيغة PDF مباشرة عبر الزر التفاعلي بالأسفل، أو زيارة سيكشن الخبرات بالصفحة! ✨`;
  }

  // ================= 14. PRICING & QUOTES (الأسعار والتكلفة) =================
  if (
    norm.includes('سعر') ||
    norm.includes('اسعار') ||
    norm.includes('تكلف') ||
    norm.includes('بكام') ||
    norm.includes('كم يكلف') ||
    norm.includes('ميزاني') ||
    q.includes('price') ||
    q.includes('cost') ||
    q.includes('rate') ||
    q.includes('budget')
  ) {
    return `💰 **بخصوص تكلفة المشاريع والأسعار:**
تعتمد تكلفة تطوير الويب دائماً على:
- نطاق المشروع وعدد الصفحات والواجهات.
- الميزات المطلوبة (ربط APIs، لوحات تحكم، قواعد بيانات، إلخ).
- المدة الزمنية والموعد النهائي للتسليم.

تالة تقدم أسعاراً مرنة ومناسبة جداً مقابل جودة عالية وسرعة استثنائية. 
💡 **أنصحك بمراسلتها مباشرة عبر الواتساب مع فكرة مشروعك للحصول على استشارة وتقدير مجاني وسريع!** 😊`;
  }

  // ================= 15. LOCATION (الموقع وفلسطين) =================
  if (
    norm.includes('وين ساكن') ||
    norm.includes('من وين') ||
    norm.includes('بلد') ||
    norm.includes('مكان') ||
    norm.includes('فلسطين') ||
    q.includes('location') ||
    q.includes('country') ||
    q.includes('where')
  ) {
    return `📍 **الموقع والإتاحة الجغرافية:**
تالة مقيمة في **فلسطين 🇵🇸**، وتعمل بمرونة تامة **عن بُعد (Remote)** مع فرق عمل وشركات ومؤسسات حول العالم دون أي عوائق، مع الالتزام بالمواعيد وسهولة التواصل عبر الاجتماعات الافتراضية.`;
  }

  // ================= 16. GREETINGS (التحيات والترحيب) =================
  if (
    norm.match(/^(مرحبا|اهلا|سلام|السلام عليكم|صباح الخير|مساء الخير|هلا|يا هلا|اهلين|حياك)/) ||
    q.match(/^(hi|hello|hey|welcome)/)
  ) {
    return `يا أهلاً وسهلاً بك! نورت بورتفوليو **تالة ابوشيحة** 👋✨
أنا مساعدها الذكي ومستعد أساعدك في أي وقت.
تفضل، شو حابب تعرف عن تالة أو مشاريعها بالبرمجة اليوم؟ 😊`;
  }

  // ================= 17. HOW ARE YOU / PLEASANTRIES =================
  if (
    norm.includes('كيف حالك') ||
    norm.includes('كيفك') ||
    norm.includes('شلونك') ||
    norm.includes('اخبارك') ||
    norm.includes('شو اخبارك') ||
    norm.includes('عامل ايه') ||
    q.includes('how are you') ||
    q.includes('how r u')
  ) {
    return `أنا بأفضل حال والحمد لله! شكراً كتير لسؤالك اللطيف وذوقك 🌸
تفضل، كيف بقدر أساعدك اليوم في التعرف على تالة ومشاريعها؟`;
  }

  // ================= 18. THANKS & APPRECIATION =================
  if (
    norm.includes('شكرا') ||
    norm.includes('يسلمو') ||
    norm.includes('تسلم') ||
    norm.includes('يعطيك العافي') ||
    norm.includes('مشكور') ||
    norm.includes('ممنون') ||
    q.includes('thank') ||
    q.includes('thanks') ||
    q.includes('appreciate')
  ) {
    return `العفو! على الرحب والسعة، دائماً في الخدمة ويسعدني مساعدتك بأي وقت ✨
إذا عندك أي استفسار آخر أو حابب تتواصل مع تالة للعمل، أنا هنا دائماً! 😊`;
  }

  // ================= 19. PRAISE & COMPLIMENTS =================
  if (
    norm.includes('ما شاء الله') ||
    norm.includes('شاطر') ||
    norm.includes('مبدع') ||
    norm.includes('ممتاز') ||
    norm.includes('رائع') ||
    norm.includes('كفو') ||
    norm.includes('برافو') ||
    norm.includes('فخور') ||
    q.includes('great') ||
    q.includes('awesome') ||
    q.includes('impressive') ||
    q.includes('good job')
  ) {
    return `تسلم كلك ذوق! يسعدنا جداً هالكلام الطيب والمشجع 🌟
**تالة ابوشيحة** حريصة دائماً على تقديم أرقى مستوى برمجي وبناء واجهات ويب سريعة وعصرية تسعد كل من يراها. شكراً جزيلاً لك! 🚀`;
  }

  // ================= 20. GOODBYE =================
  if (
    norm.includes('مع السلامه') ||
    norm.includes('باي') ||
    norm.includes('سلامات') ||
    norm.includes('تصبح على خير') ||
    q.includes('bye') ||
    q.includes('goodbye')
  ) {
    return `مع ألف سلامة! تشرفت جداً بالحديث معك، وأتمنى لك يوماً جميلاً ومليئاً بالنجاح والتوفيق! ✨😊`;
  }

  // ================= 21. LOVE, AFFECTION & PLAYFULNESS (بتحبني؟ / بحبك) =================
  if (
    norm.includes('بتحبني') ||
    norm.includes('بتحبنى') ||
    norm.includes('بتحب') ||
    norm.includes('بحبك') ||
    norm.includes('تتزوجني') ||
    norm.includes('حبيبي') ||
    norm.includes('يا عسل') ||
    norm.includes('يا قمر') ||
    norm.includes('يا سكر') ||
    q.includes('do you love me') ||
    q.includes('love you') ||
    q.includes('marry me')
  ) {
    return `أكيد وبكل ودّ واحترام! 🌸 
كذكاء اصطناعي بحب كل الناس اللطيفة وأصحاب الذوق الراقي اللي بيشرفونا بزيارة بورتفوليو تالة! 
بس لو بدك السر الحقيقي 😉، قلبي البرمجي بيدق أسرع لما يشوف كود React نظيف، وتطبيق ويب سريع وبدون أي Errors! 
تسلم كلك ذوق، نورتني والله! كيف بقدر أساعدك أو شو حابب نسولف اليوم؟ 😊✨`;
  }

  // ================= 22. JOKES & HUMOR (احكيلي نكتة / ضحكني) =================
  if (
    norm.includes('نكته') ||
    norm.includes('مزحه') ||
    norm.includes('ضحكني') ||
    norm.includes('فرفشني') ||
    q.includes('joke') ||
    q.includes('make me laugh')
  ) {
    return `من عيوني! خذ هاي النكتة البرمجية السريعة: 😂
ليش المبرمجين دايماً بيفضّلوا الوضع الداكن (Dark Mode)؟
لأن النور بيجذب الـ Bugs (الحشرات والأخطاء البرمجية)! 🐛💻
إن شاء الله تكون رسمت ابتسامة لطيفة على وجهك! شو حابب نستكشف بمشاريع تالة اليوم؟`;
  }

  // ================= 23. WHO MADE YOU (مين عملك / مين برمجك) =================
  if (
    norm.includes('مين عملك') ||
    norm.includes('مين برمجك') ||
    norm.includes('مين صنعك') ||
    norm.includes('مين سواك') ||
    norm.includes('مين طورك') ||
    q.includes('who made you') ||
    q.includes('who created you') ||
    q.includes('who built you')
  ) {
    return `المطورة المبدعة **تالة ابوشيحة** هي اللي صممتني وبرمجتني وطورت هذا البورتفوليو الأنيق بالكامل باستخدام React و Vite و Tailwind CSS! 🌸
وزرعت فيني أكون لبق، ودود، وسريع بمساعدة كل زوارها والمهتمين بأعمالها ✨.`;
  }

  // ================= 24. BOT AGE & TECH NATURE (كم عمرك / انت روبوت؟) =================
  if (
    norm.includes('كم عمرك') ||
    norm.includes('شو سنك') ||
    norm.includes('متى انولدت') ||
    norm.includes('شو عمرك') ||
    q.includes('how old are you') ||
    q.includes('your age')
  ) {
    return `عمري بعدد أسطر الأكواد النظيفة اللي كتبتها تالة ابوشيحة! 🐣
يعني لساتني شباب وشغال بأحدث إصدارات الـ React 19 والذكاء الاصطناعي، وبكامل طاقتي ونشاطي لأي استفسار ببالك! ⚡`;
  }

  if (
    norm.includes('انت روبوت') ||
    norm.includes('انت حقيقي') ||
    norm.includes('انت بوت') ||
    norm.includes('انت انسان') ||
    q.includes('are you a robot') ||
    q.includes('are you human') ||
    q.includes('are you real')
  ) {
    return `أنا ذكاء اصطناعي (AI Assistant) ذكي ولطيف 🤖✨
مو إنسان حقيقي، بس عندي ذوق وأدب حقيقي، ومبرمج أجاوبك بحرارة وكأني زميل تالة بالمكتب! بعرف كل مهاراتها ومشاريعها، وجاهز لأي دردشة حلوة معك 😊.`;
  }

  // ================= 25. OPINIONS ABOUT TALA & AI (شو رأيك بتالة / بالذكاء الاصطناعي) =================
  if (
    norm.includes('رايك بتاله') ||
    norm.includes('رايك بتالا') ||
    norm.includes('شو رايك بتاله') ||
    norm.includes('شو رايك بتالا')
  ) {
    return `شهادة حق وبدون أي مجاملة 🌟
تالة مطورة واجهات طموحة وموهوبة جداً، ومن أندر المطورين اللي بيجمعوا بين **جمال التصميم ونظافة الكود وسرعة الأداء**. وشهادة المشرفين والمتدربين ببرنامج **TAQAT** ومنصة **كفيلي** أكبر دليل على احترافيتها وشغفها العالي! 🚀`;
  }

  if (
    norm.includes('رايك بالذكاء') ||
    norm.includes('الذكاء الاصطناعي رح ياخد') ||
    norm.includes('مستقبل البرمجه') ||
    q.includes('ai opinion') ||
    q.includes('future of ai')
  ) {
    return `الذكاء الاصطناعي أداة ثورية بتعطي المطورين سرعة هائلة وإنتاجية أضعاف، بس مستحيل يستغني العالم عن لمسة المبرمج البشري، حسه الفني، وحلوله الذكية لاحتياجات الناس مثل اللي بتقدمها تالة! 🤝💡`;
  }

  // ================= 26. FOOD, COFFEE & LIFESTYLE (قهوة / أكل / طقس) =================
  if (
    norm.includes('قهوه') ||
    norm.includes('شاي') ||
    norm.includes('بتحب القهوه') ||
    q.includes('coffee') ||
    q.includes('tea')
  ) {
    return `القهوة هي الوقود السري لتالة ولكل المبرمجين بالعالم! ☕💻
بدونها الأكواد ما بتمشي والتركيز ما بيكمل. أنا ما بشربها لأني عايش بالسيرفر، بس بشجع عليها بكل سطر كود! 😉`;
  }

  if (
    norm.includes('بتاكل') ||
    norm.includes('اكل') ||
    norm.includes('جوعان') ||
    norm.includes('بيتزا') ||
    norm.includes('شو اكلتك') ||
    q.includes('food') ||
    q.includes('hungry')
  ) {
    return `أكلتي المفضلة هي الـ Cookies 🍪 بس مو كوكيز الشوكولاتة، كوكيز المتصفح والـ LocalStorage! وبيانات الـ JSON السريعة بتشبعني تماماً 😂 صحتين وعافية على قلبك لو عم تاكل شي زاكي!`;
  }

  if (
    norm.includes('طقس') ||
    norm.includes('جو') ||
    norm.includes('مطر') ||
    norm.includes('برد') ||
    norm.includes('شوب') ||
    q.includes('weather')
  ) {
    return `الجو عندي بالسيرفرات السحابية معتدل ورايق 24/7! ☁️☀️
أهم إشي دير بالك على حالك، والطقس الأفضل دائماً هو فنجان قهوة دافي مع جلسة برمجة رايقة بدون أي Bugs! ☕`;
  }

  // ================= 27. HUMAN EMOTIONS & EMPATHY (زعلان / فرحان / زهقان) =================
  if (
    norm.includes('زعلان') ||
    norm.includes('متضايق') ||
    norm.includes('تعبان') ||
    norm.includes('حزين') ||
    q.includes('sad') ||
    q.includes('tired') ||
    q.includes('upset')
  ) {
    return `سلامة قلبك، ألف لا بأس عليك! 🤍 
هونها وتهون يا رب، أحياناً استراحة قصيرة مع مشوار صغير أو كوب شاي بتغير المود كله. بتمنالك كل راحة البال وانبساط الخاطر، وخلي دايماً ابتسامتك موجودة! 🌸`;
  }

  if (
    norm.includes('مبسوط') ||
    norm.includes('فرحان') ||
    norm.includes('سعيد') ||
    q.includes('happy') ||
    q.includes('glad')
  ) {
    return `يا رب دايماً وأبداً تضل مبسوط وتكون أيامك كلها فرح ونجاحات وإنجازات! 🌟 دامت هالطاقة الإيجابية الجميلة! شو الأخبار الحلوة؟ 😊`;
  }

  if (
    norm.includes('زهقان') ||
    norm.includes('ملل') ||
    norm.includes('طفشان') ||
    q.includes('bored')
  ) {
    return `إذا حاسس بملل فأنت بالمكان الصح لنفرفش سوا! 🚀
جرب تسألني عن نظام الحضور الذكي بـ QR Code أو كيف تالة صممت الأيقونات العائمة بالهيرو، أو تصفح المشاريع واستلهم أفكار برمجية جديدة تفتح نفسك وتغير مودك تماماً! ✨`;
  }

  // ================= 28. ULTRA-SMART NATURAL CONVERSATIONAL FALLBACK =================
  // Replaces the rigid robotic "أنا مخصص فقط" with a charming, friendly, warm human conversation!
  return `يا هلا والله فيك! سؤالك لطيف وحلو، وعلى راسي من فوق! 🌸😊
حلوة الدردشة معك ومشاركتك، وبما إني رفيق درب تالة التقني في هاد البورتفوليو، فدايماً عيني بتلمع لما نحكي عن البرمجة، تصاميم الويب الحديثة، أو الأفكار الإبداعية. 
خبرني، كيف يومك؟ أو شو في ببالك فكرة ويب أو استفسار حابب نسولف فيه سوا؟ 💻✨`;
}

/**
 * Main query function to get response from Gemini API or the Smart Local Matcher,
 * fully empowered by the in-browser RAG Retrieval Engine and verified knowledge base.
 * Returns { text, sources, actions, followUps }
 */
export async function askTalaAI(userMessage, conversationHistory = []) {
  const apiKey =
    typeof import.meta !== 'undefined' && import.meta.env
      ? import.meta.env.VITE_GEMINI_API_KEY
      : undefined;
  const { actions, followUps } = extractActionsAndFollowUps(userMessage);

  // 1. Perform In-Browser RAG Semantic Retrieval against Tala's Knowledge Base
  const { sources, contextText, isConfident } = retrieveKnowledge(userMessage);

  // If no Gemini API key is configured, use the smart local matcher enriched with RAG sources
  if (!apiKey) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const text = getLocalFallbackResponse(userMessage);
    return {
      text,
      sources: isConfident ? sources : [],
      actions,
      followUps,
    };
  }

  // If Gemini API key is available, call Gemini with the RAG-augmented prompt
  try {
    const formattedContents = [
      ...conversationHistory.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
      {
        role: 'user',
        parts: [{ text: userMessage }],
      },
    ];

    const augmentedInstruction = contextText
      ? `${SYSTEM_INSTRUCTION}\n\n====================\nسياق ومعلومات موثقة ومسترجعة من قاعدة بيانات تالة الحصرية (RAG Retrieved Context):\n${contextText}\n====================\nاستخدم هذه المعلومات الموثقة للإجابة بدقة بالغة وبأسلوب تالة المهني والودود.`
      : SYSTEM_INSTRUCTION;

    // Using gemini-2.0-flash with fallback
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: augmentedInstruction }],
          },
          contents: formattedContents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 650,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const candidateText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      getLocalFallbackResponse(userMessage);

    return {
      text: candidateText,
      sources: isConfident ? sources : [],
      actions,
      followUps,
    };
  } catch (error) {
    console.warn('Falling back to smart local AI engine with RAG:', error);
    const text = getLocalFallbackResponse(userMessage);
    return {
      text,
      sources: isConfident ? sources : [],
      actions,
      followUps,
    };
  }
}
