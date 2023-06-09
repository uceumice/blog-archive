import { Bell, BellFill } from './components/icons';
import { SubmitHandler, createForm, zodForm } from '@modular-forms/solid';
import { NewsletterSubscription, schemaNewsletterSubscription } from './modules/validation';
import { blinking as createBlinkingDots } from './components/hooks/create-blinking';
import { trpc } from '~/utils/trpc';
import { clsx } from 'clsx';

// ----
export function NewsletterSubscription() {
  const placeholderBlinkingDots = createBlinkingDots();
  const [form, { Form, Field }] = createForm({
    validate: zodForm(schemaNewsletterSubscription),
  });

  const onSubmit: SubmitHandler<NewsletterSubscription> = ({ email }) => {
    // TODO: Complete the email notifications functionality...
    // trpc.newsletter.add.mutate({ email, lang: 'en', pref: { mode: 'light' } }).then((value) => {
    //   console.log({ value });
    //   localStorage.setItem('autofill.newsletter.email', email);
    // });
  };

  return (
    <div class={clsx(['w-full'])}>
      <Form class="input-group" onSubmit={onSubmit}>
        <Field name="email">
          {({ error }, props) => (
            <fieldset class={clsx(['form-control', 'w-full max-w-xs'])}>
              <input
                required
                {...props}
                type="email"
                placeholder={`Get notified when the page goes live${placeholderBlinkingDots()}`}
                class={clsx(['input input-sm input-lg input-primary', 'w-full', error && 'input-error'])}
              />
              {error && (
                <label class="label">
                  <label class="label-text text-error">{error}</label>
                </label>
              )}
            </fieldset>
          )}
        </Field>

        <button class="btn btn-sm btn-square">{form.submitted ? <BellFill class="w-5 h-5" /> : <Bell class="w-5 h-5" />}</button>
      </Form>
    </div>
  );
}
