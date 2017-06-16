const baseDuration = 3000;

const defaults: {
  text: string,
  position: string,
  buttonText: string,
  duraction: number,
} = {
  text: '',
  position: 'bottom',
  buttonText: 'OK',
  duration: baseDuration,
};

export default {
  neutral: {
    ...defaults,
  },

  success: {
    ...defaults,
    type: 'success',
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
