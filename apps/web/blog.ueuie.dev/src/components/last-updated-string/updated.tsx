import { createMemo, createSignal, onCleanup } from 'solid-js';
import dayjs from '../../utils/dayjs';

// ----
const updated = dayjs.utc();

// ----
export function LastUpdatedString() {
  const [diff, setDiff] = createSignal(dayjs.utc().diff(updated, 'minutes'));

  const readable = createMemo(() => {
    return getReadableDuration(diff());
  });

  const interval = setInterval(() => {
    setDiff(diff() + 1);
  }, dayjs.duration({ minutes: 1 }).as('ms'));
  onCleanup(() => clearInterval(interval));

  return (
    <>
      <b>LAST EDITED:</b> {readable()}
    </>
  );
}

function getReadableDuration(minutes: number) {
  const units = 'minutes';
  if (minutes < dayjs.duration({ minutes: 1 }).as(units)) {
    return `NOW`;
  } else if (minutes < dayjs.duration({ hours: 1 }).as(units)) {
    return `${dayjs.duration({ minutes }).asMinutes().toFixed(0)} minutes ago`;
  } else if (minutes < dayjs.duration({ days: 1 }).as(units)) {
    return `${dayjs.duration({ minutes }).asHours().toFixed(0)} hours ago`;
  } else if (minutes < dayjs.duration({ weeks: 1 }).as(units)) {
    return `${dayjs.duration({ minutes }).asDays().toFixed(0)} days ago`;
  } else {
    return updated.local().format('D MMM. YYYY');
  }
}
