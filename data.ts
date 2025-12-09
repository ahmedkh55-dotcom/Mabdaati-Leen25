import { Question, QuestionCategory } from './types';

export const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "سار الكلب بسرعة بينما كانت الطيور تحلق ببطء. أي جملة تلخص التباين بين الفاعلين؟",
    category: QuestionCategory.Verbal,
    options: [
      "الطيور أسرع من الكلب",
      "الكلب أسرع من الطيور",
      "الكلب والطيور لهما نفس السرعة",
      "لا يمكن معرفة السرعة"
    ],
    correctAnswerIndex: 1,
    difficulty: 'easy',
    explanation: {
      method1: "كلمة 'سرعة' للكلب و'بطء' للطيور توضح الفرق مباشرة.",
      method2: "المقارنة اللفظية بين الصفتين المتضادتين (سرعة vs بطء).",
      method3: "استبعاد الخيارات التي لا تتفق مع النص الصريح.",
      whyCorrect: "النص ذكر صراحة أن الكلب يسير بسرعة والطيور ببطء.",
      whyOthersWrong: [
        "تعارض النص",
        "تعارض النص",
        "معلومة غير موجودة"
      ]
    }
  },
  {
    id: 2,
    text: "إذا تحركت 'لين' 5 أمتار شرقاً ثم 12 متراً شمالاً، فما أقصر مسافة بين نقطة البداية والنهاية؟",
    category: QuestionCategory.Mathematical,
    options: [
      "17 متر",
      "7 أمتار",
      "13 متر",
      "10 أمتار"
    ],
    correctAnswerIndex: 2,
    difficulty: 'medium',
    explanation: {
      method1: "تخيل مثلث قائم الزاوية، الوتر هو المسافة الأقصر.",
      method2: "نظرية فيثاغورس: الجذر التربيعي لـ (5² + 12²) = الجذر لـ (25 + 144) = جذر 169 = 13.",
      method3: "الأضلاع 5 و 12 هي جزء من مثلثات فيثاغورس الشهيرة (5-12-13).",
      whyCorrect: "المسافة المستقيمة هي الوتر في المثلث القائم.",
      whyOthersWrong: [
        "هذا مجموع المسافتين وليس الإزاحة",
        "رقم عشوائي",
        "حساب خاطئ"
      ]
    }
  },
  {
    id: 3,
    text: "ما العلاقة المشابهة لـ: (نخلة : تمر)؟",
    category: QuestionCategory.Verbal,
    options: [
      "سماء : نجوم",
      "بحر : سمك",
      "نحلة : عسل",
      "غابة : أشجار"
    ],
    correctAnswerIndex: 2,
    difficulty: 'medium',
    explanation: {
      method1: "النخلة تنتج التمر.",
      method2: "علاقة المصدر والمنتج.",
      method3: "ابحث عن كائن حي ومنتجه الغذائي.",
      whyCorrect: "النحلة تنتج العسل كما تنتج النخلة التمر.",
      whyOthersWrong: [
        "علاقة مكانية",
        "علاقة مكانية",
        "علاقة جزء من كل"
      ]
    }
  },
  {
    id: 4,
    text: "أي الأشكال التالية يكمل النمط؟ (مثلث، مربع، خماسي، ...)",
    category: QuestionCategory.Flexibility,
    options: [
      "سداسي",
      "دائرة",
      "مثلث",
      "مستطيل"
    ],
    correctAnswerIndex: 0,
    difficulty: 'easy',
    explanation: {
      method1: "عد الأضلاع: 3، 4، 5.. التالي يجب أن يكون 6.",
      method2: "زيادة عدد الأضلاع بمقدار 1 في كل خطوة.",
      method3: "استبعاد الأشكال التي لا تتبع التسلسل العددي.",
      whyCorrect: "السداسي له 6 أضلاع.",
      whyOthersWrong: [
        "لا أضلاع لها",
        "تكرار للشكل الأول",
        "4 أضلاع (تكرار)"
      ]
    }
  },
  {
    id: 5,
    text: "عندما تضع قطعة خشب ومسمار حديد في الماء، يطفو الخشب ويغوص المسمار. السبب هو:",
    category: QuestionCategory.Scientific,
    options: [
      "الخشب أثقل من الحديد",
      "كثافة الخشب أقل من كثافة الماء",
      "المسمار أطول من الخشب",
      "لون الخشب فاتح"
    ],
    correctAnswerIndex: 1,
    difficulty: 'medium',
    explanation: {
      method1: "الأشياء الخفيفة (بالنسبة لحجمها) تطفو.",
      method2: "قانون الطفو لأرخميدس: الكثافة هي العامل الحاسم.",
      method3: "استبعد الأسباب غير العلمية مثل اللون أو الطول.",
      whyCorrect: "المواد ذات الكثافة الأقل من السائل تطفو فوقه.",
      whyOthersWrong: [
        "الخشب عادة أخف وزناً نوعياً",
        "الطول لا علاقة له بالطفو",
        "اللون لا يؤثر في الفيزياء"
      ]
    }
  },
  {
    id: 6,
    text: "أكمل المتتالية التالية: 2، 5، 10، 17، ...",
    category: QuestionCategory.Mathematical,
    options: [
      "24",
      "26",
      "25",
      "27"
    ],
    correctAnswerIndex: 1,
    difficulty: 'hard',
    explanation: {
      method1: "لاحظ الفروق: +3، +5، +7. الفرق التالي يجب أن يكون +9.",
      method2: "المعادلة: n² + 1. (1²+1=2, 2²+1=5... 5²+1=26).",
      method3: "تجربة الخيارات في النمط.",
      whyCorrect: "17 + 9 = 26.",
      whyOthersWrong: ["حساب خاطئ", "حساب خاطئ", "حساب خاطئ"]
    }
  },
  {
    id: 7,
    text: "ما الكلمة الشاذة بين الكلمات التالية؟",
    category: QuestionCategory.Verbal,
    options: [
      "تفاح",
      "برتقال",
      "كرة",
      "موز"
    ],
    correctAnswerIndex: 2,
    difficulty: 'easy',
    explanation: {
      method1: "التصنيف: فواكه vs جماد.",
      method2: "كلهم يؤكلون ما عدا الكرة.",
      method3: "استبعاد الشيء الذي لا ينتمي للمجموعة.",
      whyCorrect: "الكرة جماد وليست فاكهة.",
      whyOthersWrong: ["فاكهة", "فاكهة", "فاكهة"]
    }
  },
  {
    id: 8,
    text: "إذا كان (أحمد) أطول من (علي)، و(علي) أطول من (سعد)، فمن الأقصر؟",
    category: QuestionCategory.Verbal,
    options: [
      "أحمد",
      "علي",
      "سعد",
      "لا يمكن التحديد"
    ],
    correctAnswerIndex: 2,
    difficulty: 'medium',
    explanation: {
      method1: "رتبهم تنازلياً: أحمد > علي > سعد.",
      method2: "الرسم البياني البسيط للأطوال.",
      method3: "المنطق المتعدي.",
      whyCorrect: "سعد هو الأخير في الترتيب.",
      whyOthersWrong: ["الأطول", "الوسط", "غير صحيح"]
    }
  },
  {
    id: 9,
    text: "أي من التالي يعتبر مصدراً للطاقة المتجددة؟",
    category: QuestionCategory.Scientific,
    options: [
      "الفحم",
      "النفط",
      "الغاز الطبيعي",
      "الرياح"
    ],
    correctAnswerIndex: 3,
    difficulty: 'easy',
    explanation: {
      method1: "ابحث عن المصدر الذي لا ينفد.",
      method2: "الوقود الأحفوري (فحم، نفط، غاز) غير متجدد.",
      method3: "الرياح طاقة طبيعية مستمرة.",
      whyCorrect: "الرياح مصدر لا ينضب وصديق للبيئة.",
      whyOthersWrong: ["وقود أحفوري", "وقود أحفوري", "وقود أحفوري"]
    }
  },
  {
    id: 10,
    text: "العلاقة (مطار : طائرات) تشبه العلاقة:",
    category: QuestionCategory.Verbal,
    options: [
      "مدرسة : طلاب",
      "ميناء : سفن",
      "شارع : سيارات",
      "سكة : قطار"
    ],
    correctAnswerIndex: 1,
    difficulty: 'medium',
    explanation: {
      method1: "المكان المخصص للوقوف والانطلاق.",
      method2: "الميناء هو مرسى السفن كما المطار مرسى الطائرات.",
      method3: "المدرسة للتعليم، الشارع للمرور، الميناء للتوقف والتحميل.",
      whyCorrect: "ميناء : سفن هي العلاقة الأكثر دقة مكانياً ووظيفياً.",
      whyOthersWrong: ["مكان تعلم", "مكان عبور", "مسار"]
    }
  },
  {
    id: 11,
    text: "ما هو الرقم المفقود في الجدول: (3، 9)، (4، 16)، (5، ؟)",
    category: QuestionCategory.Mathematical,
    options: ["20", "25", "30", "15"],
    correctAnswerIndex: 1,
    difficulty: 'easy',
    explanation: {
      method1: "العلاقة هي التربيع.",
      method2: "س² = ص. (3×3=9)، (4×4=16).",
      method3: "ابحث عن مربع الرقم 5.",
      whyCorrect: "5 × 5 = 25.",
      whyOthersWrong: ["ضرب في 4", "ضرب في 6", "ضرب في 3"]
    }
  },
  {
    id: 12,
    text: "أي من الغازات التالية هو الأكثر وفرة في الغلاف الجوي؟",
    category: QuestionCategory.Scientific,
    options: ["الأكسجين", "ثاني أكسيد الكربون", "النيتروجين", "الهيدروجين"],
    correctAnswerIndex: 2,
    difficulty: 'medium',
    explanation: {
      method1: "ليس الأكسجين كما يعتقد الكثيرون.",
      method2: "النسب العلمية: النيتروجين ~78%، الأكسجين ~21%.",
      method3: "استبعاد الغازات النادرة.",
      whyCorrect: "النيتروجين يشكل النسبة الأكبر من الهواء.",
      whyOthersWrong: ["21% فقط", "نسبة ضئيلة جداً", "نادر في الجو"]
    }
  },
  {
    id: 13,
    text: "عكس كلمة 'تفاؤل':",
    category: QuestionCategory.Verbal,
    options: ["نجاح", "تشاؤم", "أمل", "حزن"],
    correctAnswerIndex: 1,
    difficulty: 'easy',
    explanation: {
      method1: "الضد المباشر في اللغة.",
      method2: "التفاؤل هو توقع الخير، التشاؤم هو توقع الشر.",
      method3: "استبعاد المرادفات أو المشاعر الأخرى.",
      whyCorrect: "التشاؤم هو النقيض اللغوي للتفاؤل.",
      whyOthersWrong: ["نتيجة", "مرادف", "شعور مختلف"]
    }
  },
  {
    id: 14,
    text: "كم عدد أوجه المكعب؟",
    category: QuestionCategory.Flexibility,
    options: ["4", "6", "8", "12"],
    correctAnswerIndex: 1,
    difficulty: 'easy',
    explanation: {
      method1: "تخيل صندوقاً أو حجر نرد.",
      method2: "المكعب له: 6 أوجه، 8 رؤوس، 12 حرفاً.",
      method3: "عد الجوانب + السقف + الأرضية.",
      whyCorrect: "المكعب له 6 أوجه مربعة متطابقة.",
      whyOthersWrong: ["عدد الرؤوس", "عدد الأحرف", "خطأ"]
    }
  },
  {
    id: 15,
    text: "إذا كان اليوم هو الاثنين، فماذا سيكون اليوم بعد 10 أيام؟",
    category: QuestionCategory.Mathematical,
    options: ["الأربعاء", "الخميس", "الجمعة", "السبت"],
    correctAnswerIndex: 1,
    difficulty: 'hard',
    explanation: {
      method1: "أضف أسبوعاً (7 أيام) نعود للاثنين، يتبقى 3 أيام.",
      method2: "10 ÷ 7 = 1 والباقي 3. الاثنين + 3 أيام = خميس.",
      method3: "عد يدوياً: ثلاثاء، أربعاء، خميس...",
      whyCorrect: "الاثنين + 3 أيام = الخميس.",
      whyOthersWrong: ["حساب خاطئ", "حساب خاطئ", "حساب خاطئ"]
    }
  },
  {
    id: 16,
    text: "أي الأعضاء التالية مسؤول عن تنقية الدم في جسم الإنسان؟",
    category: QuestionCategory.Scientific,
    options: ["القلب", "الرئة", "الكلى", "المعدة"],
    correctAnswerIndex: 2,
    difficulty: 'medium',
    explanation: {
      method1: "القلب يضخ، الرئة تتنفس، المعدة تهضم.",
      method2: "وظيفة الكلية الأساسية هي الفلترة.",
      method3: "استبعاد الأعضاء ذات الوظائف الحركية أو الهضمية.",
      whyCorrect: "الكلى تقوم بفلترة الدم وإخراج السموم.",
      whyOthersWrong: ["ضخ الدم", "تبادل الغازات", "هضم الطعام"]
    }
  },
  {
    id: 17,
    text: "أكمل النمط: ○ ● ○○ ●● ○○○ ...",
    category: QuestionCategory.Flexibility,
    options: ["●●●", "○", "●", "○○○○"],
    correctAnswerIndex: 0,
    difficulty: 'medium',
    explanation: {
      method1: "زيادة عدد الدوائر البيضاء ثم السوداء.",
      method2: "1 أبيض، 1 أسود، 2 أبيض، 2 أسود، 3 أبيض، يجب أن يكون 3 أسود.",
      method3: "تتبع التكرار واللون.",
      whyCorrect: "الدور الآن لـ 3 دوائر سوداء.",
      whyOthersWrong: ["خطأ في العدد", "خطأ في اللون", "خطأ في العدد"]
    }
  },
  {
    id: 18,
    text: "العلاقة (شجرة : غصن) تشبه:",
    category: QuestionCategory.Verbal,
    options: ["بيت : غرفة", "سيارة : طريق", "كتاب : مكتبة", "إنسان : ملابس"],
    correctAnswerIndex: 0,
    difficulty: 'medium',
    explanation: {
      method1: "علاقة الكل بالجزء.",
      method2: "الغصن جزء من الشجرة، والغرفة جزء من البيت.",
      method3: "ابحث عن شيء يتكون من أجزاء.",
      whyCorrect: "الغرفة هي جزء أساسي من تكوين البيت.",
      whyOthersWrong: ["علاقة مكانية", "علاقة مكانية (جزء من مجموعة)", "علاقة ملكية"]
    }
  },
  // --- New Question ---
  {
    id: 19,
    text: "أي من الأشكال التالية لا يمكن تشكيله باستخدام خط مستقيم واحد فقط؟",
    category: QuestionCategory.Flexibility,
    options: ["المثلث", "الدائرة", "الخط", "الزاوية"],
    correctAnswerIndex: 1,
    difficulty: 'medium',
    explanation: {
      method1: "الدائرة منحنى مغلق بالكامل.",
      method2: "المثلث (3 خطوط)، الزاوية (خطين)، الخط (خط واحد)، الدائرة (خط منحني لا نهائي).",
      method3: "الخط المستقيم لا ينحني، والدائرة كلها انحناء.",
      whyCorrect: "الدائرة تتكون من خط منحني مغلق، ولا تحتوي على أي خطوط مستقيمة.",
      whyOthersWrong: ["يتكون من 3 خطوط مستقيمة", "هو خط مستقيم بحد ذاته", "تتكون من التقاء خطين مستقيمين"]
    }
  }
];
