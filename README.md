# Recaptcha
[[عربي]](README.ar.md)

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
  
* Add module `Recaptcha` to the modules that WebPlatform will look for endpoints in:

```
def serverModules: { MyServer, Recaptcha };
buildAndRunServer[serverModules](options);
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

### Note

Tokens are only usable in a single call to `verify`. To re-use the captcha after `verify` is called you
need to reset the captcha using the `reset` member function so that you can get a new token. The user in
this case will need to re-check the captcha box.

---

## License

Copyright © 2026 Sarmad Abdullah

This project is licensed under the GNU Lesser General Public License v3.0 (LGPL-3.0). See the `COPYING` and `COPYING.LESSER` files for details.

