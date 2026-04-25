/**
 * Cortisol Estimation Logic for CORTICARE
 * Note: This is a simplified conceptual model based on research.
 * Cortisol levels are estimated, not clinically diagnosed.
 */

const CORTISOL_WEIGHTS = {
  sleep_quality: -0.3, // Higher quality reduces cortisol
  stress_perception: 0.4, // Higher stress increases cortisol
  exercise_intensity: {
    moderate: -0.2, // Regular moderate exercise lowers basal levels
    extreme: 0.3,   // Overtraining increases cortisol
    none: 0.1
  },
  nutrition: {
    high_sugar: 0.2,
    caffeine_excess: 0.2,
    balanced: -0.1
  },
  circadian_alignment: -0.2 // Good routine reduces cortisol spikes
};

function estimateCortisolStatus(userData) {
  let score = 50; // Base score (Optimal midpoint)

  // Sleep Impact (1-5 scale)
  score += (5 - userData.sleep_quality) * 10 * Math.abs(CORTISOL_WEIGHTS.sleep_quality);

  // Stress Impact (1-10 scale)
  score += userData.stress_level * 10 * CORTISOL_WEIGHTS.stress_perception;

  // Diet/Lifestyle
  if (userData.diet === 'high_sugar') score += 10;
  if (userData.caffeine > 3) score += 10;

  // Categorization
  if (score < 30) return "Low";
  if (score >= 30 && score <= 60) return "Optimal";
  if (score > 60 && score <= 85) return "Elevated";
  return "Chronic High";
}

module.exports = { estimateCortisolStatus };
