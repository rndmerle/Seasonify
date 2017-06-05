const defaults = {
  text: '',
  position: 'bottom',
  buttonText: 'OK',
};
const baseDuration = 3000;

export default {
  success: {
    ...defaults,
    type: 'success',
    duration: baseDuration,
  },

  neutral: {
    ...defaults,
    duration: baseDuration,
  },

  warning: {
    ...defaults,
    type: 'warning',
    duration: baseDuration * 2,
  },

  error: {
    ...defaults,
    type: 'danger',
    duration: baseDuration * 3,
  },
};
