import { assign, createMachine } from "xstate";
import type { Lang } from "~/utils/i18n";
import { lang } from "@uceumice/constants"
import { tip } from "./select";
import { store } from "~/components/scripts/auto/locale/store";

/* -------------------------------------------------------------------------- */
/*                              Helper Functions                              */
/* -------------------------------------------------------------------------- */
const tooltip = {
    content: (selected: Lang) => {
        const tooltipContent = lang.map((locale) =>
            locale === selected ? `|${locale}|` : locale
        );
        return tooltipContent.join(' ');
    }
}

/* -------------------------------------------------------------------------- */
/*                               XState Typings                               */
/* -------------------------------------------------------------------------- */
interface Context {
    prefixed: boolean | null;
    selected: Lang | null;
}

/* -------------------------------------------------------------------------- */
/*                              XState Definition                             */
/* -------------------------------------------------------------------------- */
export const xstate = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOkwHt8AXMakgfXoBtz0ICp6AzAJ3NWblM6JvVhVyPdDADEESmBIEAbuQDWitFjyFSFarSoNBbDtz4CWw0eMnSwCFUPRVclANoAGALpfviUAAHclhcV0oAkAAPRABmAHYANhJE2IBODMTPACYAVjT47IAaEABPRABGXM8SNKzPCuyADkS6xKamgBYAX26SrRwCYjJKGjpGFlN8Tl5+QWsxCSlZMB4+HhJAphcuSVQSAZ1h-TGjCdZ2afM5qxFFuxhHfFVhcPw-P0jg0LfImIQEslUhk6jl8oUSuUAbl4iRGtVqk0Kp1Yqj4rlev0MINdCMDOMTJcZhZ5i43Ph6NgwGxVrA5AolM91JpsUc9KNDMZJkTrpZnG9KdSILSni8yR4fJ8kCBvmFyX9EGlcrESLk8jlPE14p4ElrIXFPMlldVYp10UqCj0+iBDkN2fizoSzLM+a9yYKaTw6at1pttlRdjx9rbcSdOecpsSbvz3VTPbBRTGJb4fF8QnKItL-kqVWrqtlNdrdfF9QhOmkmiROrly5lEsrPOX4pibay7XjTlyLs6ScKuOgAK5MKj0wiM1QaA5t0McgncntzPuD4eJt3JqVBdO-LOVTrl2rVTxpKrxPcVRKlzqJbJwiqeHXZK+xQ-N60h46zow8IWlGQAFQAeQAcSAgAZABRDcZS3eUdwQc9EmSRtcjvat63SJVS2yCpK0NTodQrGEYRyRIW3fUgJHIYdcECEhyECWhIBkABhUCAIAZXAgARKDZW3UB-myNJOhIWJ6x1WIjxrR8LzKRB0VyFImnvFo0mfNTCjI6dhko6jaMwFhYCYgCAAVwIAOW43iYMzATKmEkh4gqDJ4lPToKnRc9SyaFDamUzxcmvEEcIxFt8HIYV4Glci0x+WC7IQABaPIq3qBpElcjommw3JS2SlUQQKMT0ivGStO0dsw2oWKM3wBUEEfUtUirfy8gyI8UR1cqcQ-B0u0jXlSRsJZ7Bq-jonk4o5Pg1ySGQsF4mfbLcmVbq2Q7cMnSuF1SQFONhS9Mb4omhB6zSEgC1rPclSvJJS1RG9r3vdyWicpIMrWyrP36nkdqXIcqCO2yTsaQ1HP85VYh8+Iuk6S9FtqWsOnamErytLEKpnPrvzYKFNzi4H-nPCsqyqO8EgCrI4em01kmw-Dn2aDyYVfDGeoo8gqNcQIgbquDshvZUQSaWIBYqcWYdy6bEMrAt7zEtSugaCpPtxXTubohjCAgXn6qfRy73vJVH2U7JYlLGHYQQ09DVRZFslVnTOb0shDMgXW4O1VUMIrUXsIltILa6FJEJt1JYnt3peiAA */
    tsTypes: {} as import("./xstate.typegen").Typegen0,
    type: "parallel",
    predictableActionArguments: true,
    context: {
        selected: null,
        prefixed: null
    },
    schema: {
        context: {} as Context,
        services: {} as {
            "fetch:locale:from:headers": { data: Lang },
        }
    },
    states: {
        content: {
            initial: "init",
            states: {
                init: {
                    entry: assign(() => ({
                        selected: store.selected.get(),
                        prefixed: store.prefixed.get(),
                    })),
                    always: {
                        target: "idle"
                    },
                    exit: ["content.selected.sync.tooltip-content"]
                },
                idle: {
                    on: {
                        TOGGLE: {
                            target: "idle",
                            actions: ["content.selected.next", "content.selected.sync", "content.selected.sync.tooltip-content"]
                        },
                        RELOAD: {
                            target: "init"
                        }
                    }
                }
            }
        },
        tooltip: {
            initial: "closed",
            states: {
                opened: {
                    on: {
                        "CLOSED": {
                            target: "closed",
                            actions: [() => {
                                tip.classList.remove("tooltip-open");
                            }]
                        }
                    }
                },
                closed: {
                    on: {
                        "OPENED": {
                            target: "opened",
                            actions: [
                                () => {
                                    tip.classList.add("tooltip-open")
                                }
                            ]
                        }
                    }
                }
            }
        }
    },
}, {
    actions: {
        "content.selected.next": assign({
            selected: (ctx) => lang[(lang.indexOf(ctx.selected || lang[0]) + 1) % lang.length]!
        }),
        "content.selected.sync": (ctx) => {
            // [1] sync the local storage
            store.selected.set(ctx.selected || lang[0]);
            store.prefered.set(ctx.selected || lang[0]);

            console.log({ ctx })

            // [2] sync the location
            if (ctx.prefixed) {
                const [, ...href] = window.location.pathname.slice(1).split("/");
                window.location.replace(`/${ctx.selected || lang[0]}/${href.join("/")}`);
            }
        },
        "content.selected.sync.tooltip-content": (ctx) => {
            tip.setAttribute("data-tip", tooltip.content(ctx.selected || lang[0]));
        }
    }
});

