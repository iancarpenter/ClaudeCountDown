const REFERENCE = new Date(2026, 0, 23);   // 23 Jan 2026, local midnight
const TARGET    = new Date(2026, 6, 23);   // 23 Jul 2026, local midnight

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysBetween(a, b) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  return Math.round((b - a) / MS_PER_DAY);
}

function update() {
  const today = startOfToday();

  // — since —
  const sinceDays  = daysBetween(REFERENCE, today);
  const sinceWeeks = Math.floor(sinceDays / 7);

  document.getElementById('daysSince').textContent  = sinceDays;
  document.getElementById('weeksSince').textContent = sinceWeeks;

  // — until / since target —
  const diff      = daysBetween(today, TARGET);
  const absDiff   = Math.abs(diff);
  const absDiffWk = Math.floor(absDiff / 7);
  const isPast    = diff < 0;

  document.getElementById('daysUntil').textContent  = absDiff;
  document.getElementById('weeksUntil').textContent = absDiffWk;

  const untilSection = document.querySelector('.block.until');
  const label        = document.getElementById('countdownLabel');
  const daysUnit     = document.getElementById('daysUntilUnit');
  const weeksUnit    = document.getElementById('weeksUntilUnit');

  if (isPast) {
    untilSection.classList.add('is-past');
    label.textContent     = 'Time since 6-month mark (23/07/2026)';
    daysUnit.textContent  = 'days ago';
    weeksUnit.textContent = 'weeks ago';
  } else if (diff === 0) {
    label.textContent = 'Today is the 6-month mark!';
  } else {
    untilSection.classList.remove('is-past');
    label.textContent     = 'Time to 6 months (23/07/2026)';
    daysUnit.textContent  = 'days';
    weeksUnit.textContent = 'weeks';
  }
}

update();
setInterval(update, 60 * 1000);
