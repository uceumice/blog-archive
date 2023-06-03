export function Logo(props: { class?: string[] | string }) {
  const _class = typeof props.class === 'undefined' ? [] : typeof props.class === 'string' ? [props.class] : props.class;

  return <img src="/icon-white.svg" class={[..._class].join(' ')} />;
}
