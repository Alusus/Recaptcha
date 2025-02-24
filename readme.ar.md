# Recaptcha
[[English]](readme.md)

مكتبة لاستخدام Google reCAPTCHA من برامج الأسس. تم تصميم هذه المكتبة للعمل مع مـنصة_ويب.

## الاستخدام

تفترض هذه الخطوات أن لديك بالفعل مشروعًا على منصة الويب وتريد إضافة Recaptcha إليه.

* أضف المكتبة إلى مشروعك:

<div dir=rtl>

```
اشمل "مـحا"؛
مـحا.اشمل_ملف("Alusus/Recaptcha"، "ريـكابجا")؛
```

</div>

```
import "Apm";
Apm.importFile("Alusus/Recaptcha");
```

* أضف الاعتمادات الأخرى إذا لم يتم إضافتها بالفعل في مشروعك إما مباشرةً أو غير مباشرة. بالإضافة إلى
  منصة الويب، تعتمد هذه المكتبة على الحزم التالية:
  * `مـتم.شـبكة` (`Srl.Net`)
  * `مـتم.ذاكـرة` (`Srl.Memory`)
  * `مـتم.نـم` (`Srl.Fs`)
  * `مـتم.نـظام` (`Srl.System`)
  * `مـتم.نـص` (`Srl.String`)
  * `مـتم.سـندنا` (`Srl.SrdRef`)
  * `جـيسون` (`Json`)
  * `مـؤجلات` (`Promises`)

* أضف الوحدة `ريـكابجا` (`Recaptcha`) إلى وحدات الخادم التي تبحث فيها مـنصة_ويب عن منافذ الخادم:

<div dir=rtl>

```
عرف وحدات_الخادم: { خـادمي، ريـكابجا }؛
ابن_وشغل_الخادم[وحدات_الخادم](خيارات)؛
```

</div>

```
def serverModules: { MyServer, Recaptcha };
buildAndRunServer[serverModules](options);
```

* هيئ الواجهة من المنفذ المرئي الذي سيعرض الكابجا:

<div dir=rtl>

```
انتظر(ريـكابجا.هيئ_الواجهة())؛
```

</div>

```
await(Recaptcha.initializeFrontend());
```

* أضف captcha الخاص بك إلى المشهد بنفس طريقة إضافة أي مركب آخر، وقم بتزويده بمفتاح الموقع (sitekey)
  الخاص بـ reCAPTCHA. ستحتاج إلى حفظ سند للمكون حتى تتمكن من استخدامه فيما بعد عند إرسال البيانات.

<div dir=rtl>

```
صنف المـشهد {
    @حقنة عرف مركب: مـركب؛
    عرف كابجا: سـندنا[ريـكابجا.كـابجا]؛
    
    عملية هذا~هيئ() {
        عرف الكائن: سند[هذا_الصنف](هذا)؛
        هذا.المشهد = صـندوق().{
            ...
            أضف_فروع({
                ...
                ريـكاجا.كـابجا(نـص(مفتاح_واجهة_كابجا)).{
                    الكائن.كابجا = هذا؛
                }
            })؛
            ...
        }
        ...
    }
    ...
}
```

</div>

```
class ParentView {
    @injection def component: Component;
    def captcha: SrdRef[Recaptcha.Captcha];
  
    handler this~init() {
        def self: ref[this_type](this);
        this.view = Box().{
            ...
            addChildren({
                ...
                Recaptcha.Captcha(String(recaptchaSitekey)).{
                  self.captcha = this;
                },
                ...
            });
            ...
        };
    }
    ...
}
```

* قبل إرسال البيانات، اجلب قيمة الإجابة من الكابجا:

<div dir=rtl>

```
عرف رمز: نـص = هذا.كابجا.هات_الإجابة()؛
إذا رمز == "" {
    // اعرض خطأ للمستخدم
} وإلا {
    // أرسل البيانات وأرفق معها الرمز
}
```

</div>

```
def token: String = this.captcha.getResponse();
if token == "" {
    // show error to the user
} else {
    // submit your data and include the token.
}
```

* في الخادم تحقق من الرمز الذي تم استلامه:

<div dir=rtl>

```
إذا ريـكابجا.تحقق(مفتاح_خادم_كابجا، الرمز) {
    // نجح التحقق. تابع العملية.
} وإلا {
    // فشل التحقق. أرجع إشعار خطأ للمنادي.
}
```

</div>

```
if Recaptcha.verify(recaptchaSecret, token) {
  // Success. Proceed with the
} else {
  // Failure. Return an error to the caller.
}
```

### ملاحظة

رمز التحقق قابل للاستخدام مرة واحدة في دالة `تحقق`. لإعادة استخدام الكابجا بعد استدعاء `تحقق` يجب
إعادة ضبط الكابجا باستخدام الوظيفة `أعد_الضبط` (`reset`). سيحتاج المستخدم لإعادة إجابة أسئلة الكابجا.

