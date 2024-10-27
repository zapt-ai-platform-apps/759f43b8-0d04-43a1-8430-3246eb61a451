# New App - محادثة صوتية مع الذكاء الاصطناعي للمكفوفين

## وصف التطبيق

تطبيق **محادثة صوتية مع الذكاء الاصطناعي للمكفوفين** هو تطبيق يتيح للمستخدمين التفاعل مع الذكاء الاصطناعي من خلال الأوامر الصوتية، والحصول على استجابات صوتية. تم تصميم التطبيق خصيصًا ليكون متوافقًا مع احتياجات المكفوفين وضعاف البصر، مع التركيز على تجربة صوتية سلسة.

## رحلة المستخدم

### 1. بدء المحادثة

- عند فتح التطبيق، يتم تقديم زر كبير في المنتصف لبدء التحدث.
- يمكن للمستخدم الضغط على الزر باستخدام لوحة المفاتيح أو الأوامر الصوتية.

### 2. التحدث إلى الذكاء الاصطناعي

- بعد الضغط على زر التحدث، سيبدأ التطبيق بالاستماع إلى المستخدم.
- يقوم المستخدم بطرح سؤاله أو طلبه صوتيًا.
- يتم عرض إشارة صوتية تدل على أن التطبيق يستمع (مثل نغمة قصيرة).

### 3. معالجة الاستجابة

- يقوم التطبيق بإرسال الصوت إلى الخادم لتحويله إلى نص.
- يتم استخدام تقنية الذكاء الاصطناعي لمعالجة النص وتوليد استجابة مناسبة.
- يتم تحويل الاستجابة النصية إلى صوت باستخدام تقنية تحويل النص إلى كلام.

### 4. استلام الاستجابة

- يتم تشغيل الاستجابة الصوتية للمستخدم.
- يمكن للمستخدم التفاعل مرة أخرى بالضغط على زر التحدث أو باستخدام أمر صوتي مثل "استمرار".

### 5. الميزات الإضافية

- **دعم الأوامر الصوتية بالكامل**: يمكن للمستخدم التنقل في التطبيق باستخدام الأوامر الصوتية فقط.
- **تصميم بسيط وواضح**: تم تصميم الواجهة لتكون بسيطة وخالية من التعقيدات لتسهيل الاستخدام.
- **تحسين الوصولية**: جميع العناصر تحتوي على تسميات ARIA ويتم دعم برامج قراءة الشاشة.

## المتطلبات التقنية

- **الميكروفون**: يحتاج التطبيق إلى الوصول إلى ميكروفون الجهاز للاستماع إلى المستخدم.
- **الصوت**: يحتاج التطبيق إلى القدرة على تشغيل الصوت لإعطاء الاستجابات.

## الخدمات الخارجية المستخدمة

- **واجهة برمجة تطبيقات تحويل الكلام إلى نص**: لتحويل خطاب المستخدم إلى نص.
- **OpenAI ChatGPT**: لمعالجة النص وتوليد الاستجابات.
- **واجهة برمجة تطبيقات تحويل النص إلى كلام**: لتحويل الاستجابة النصية إلى صوت يتم تشغيله للمستخدم.

## المتغيرات البيئية المطلوبة (.env)

- `VITE_PUBLIC_APP_ID`: معرف التطبيق المستخدم في ZAPT.
- `SPEECH_TO_TEXT_API_KEY`: مفتاح API لخدمة تحويل الكلام إلى نص.
- `TEXT_TO_SPEECH_API_KEY`: مفتاح API لخدمة تحويل النص إلى كلام.

## ملاحظات إضافية

- التطبيق مصمم ليكون متجاوبًا ويعمل على مختلف الأجهزة.
- تم التركيز على الوصولية لضمان تجربة مستخدم سلسة للمكفوفين.