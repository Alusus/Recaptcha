# Recaptcha
[[عربي]](readme.ar.md)

Alusus bindings for Google reCAPTCHA. This library is designed to work with WebPlatform.

## Usage

These steps assume you already have a WebPlatform project and you want to add Recaptcha to it.

* Add the library to your project:

```
import "Apm";
Apm.importFile("Alusus/Recaptcha");
```

* Add other dependencies if they aren't already added in your project either directly or indirectly.
  In addition to WebPlatform, this library depends on the following packages:
  * Srl.Net
  * Srl.Memory
  * Srl.Fs
  * Srl.System
  * Srl.String
  * Srl.SrdRef
  * Json
  * Promises
  
* Initialize the server side of the library by calling this function **outside any endpoints**:

```
Recaptcha.initializeBackend();
```

* Initialize the frontend inside the endpoint that displays the captcha:

```
await(Recaptcha.initializeFrontend());
```

* Add your captcha to your view the same way you add any other component, giving it your reCAPTCHA sitekey.
  You will need to capture a reference to the component so you can use it later when submitting the data.

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

* Before submitting the data make a call to grab the response from the captcha:

```
def token: String = this.captcha.getResponse();
if token == "" {
    // show error to the user
} else {
    // submit your data and include the token.
}
```

* In the backend verify the received token:

```
if Recaptcha.verify(recaptchaSecret, token) {
  // Success. Proceed with the operation.
} else {
  // Failure. Return an error to the caller.
}
```

