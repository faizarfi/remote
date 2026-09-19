export function triggerHapticFeedback(
  type: 'light' | 'medium' | 'heavy' | 'power' | 'error' | 'tick' = 'light',
  enabled = true
) {
  if (!enabled || typeof window === 'undefined' || !navigator.vibrate) return;

  try {
    switch (type) {
      case 'tick':
        navigator.vibrate(8);
        break;
      case 'light':
        navigator.vibrate(15);
        break;
      case 'medium':
        navigator.vibrate(30);
        break;
      case 'heavy':
        navigator.vibrate(50);
        break;
      case 'power':
        navigator.vibrate([20, 50, 40]);
        break;
      case 'error':
        navigator.vibrate([40, 30, 40, 30, 80]);
        break;
      default:
        navigator.vibrate(15);
    }
  } catch (err) {
    console.debug('Haptic feedback not supported on this platform:', err);
  }
}
