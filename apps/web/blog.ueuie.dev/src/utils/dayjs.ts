import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

dayjs.extend(duration);
dayjs.extend(utc);

export default dayjs;
