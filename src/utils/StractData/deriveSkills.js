// deriveSkills.js
export function deriveSkillsFromExperience(experience) {
  const freq = new Map();
  experience.forEach(it => {
    (it.stack || []).forEach(raw => {
      const name = String(raw).trim();
      if (!name) return;
      freq.set(name, (freq.get(name) || 0) + 1);
    });
  });

  return [...freq.entries()]
    .sort((a,b) => (b[1]-a[1]) || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({ name, count }));
}
