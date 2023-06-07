import { createSignal, onCleanup } from 'solid-js';
import dayjs from '../../../utils/dayjs';

export interface SolidProps {
  latest: Date;
  labels: {
    last_edited: string;
  } & ReadableDurationLabels;
}

// ----
export function Solid({ latest, labels }: SolidProps) {
  const [readableDuration, setReadableDuration] = createSignal(getReadableDuration(latest, labels));

  const runEveryMinute = setInterval(() => {
    setReadableDuration(getReadableDuration(latest, labels));
  }, dayjs.duration({ minutes: 1 }).as('ms'));
  onCleanup(() => clearInterval(runEveryMinute));

  return (
    <div>
      <b>{labels.last_edited}:</b> {readableDuration()}
    </div>
  );
}

type ReadableDurationLabels = {
  minutes_ago: (minutes: number) => string;
  hours_ago: (hours: number) => string;
  days_ago: (days: number) => string;
  now: string;
};

function getReadableDuration(latest: Date, labels: ReadableDurationLabels) {
  const duration = dayjs.duration(dayjs.utc().diff(dayjs.utc(latest), 'minutes'), 'minutes');
  const units: ('minutes' | 'hours' | 'days')[] = ['minutes', 'hours', 'days'];

  for (let i = 0; i < units.length; i++) {
    if (duration.as(units[i]!) < 1) {
      if (i === 0) {
        return labels.now;
      }

      return `${duration.as(units[i - 1]!).toFixed(0)} ${labels[`${units[i - 1]!}_ago`](Math.round(duration.as(units[i - 1]!)))}`;
    }
  }

  return dayjs.utc(latest).local().format('D MMM. YYYY');
}
