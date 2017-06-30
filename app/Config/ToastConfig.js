/* @flow */
import type { Toast, Toasts } from 'Types';

const baseDuration = 3000;

const defaults: Toast = {
  text: '',
  level: 'neutral',
  duration: baseDuration,
};

const toastConfig: Toasts = {
  neutral: {
    ...defaults,
  },

  success: {
    ...defaults,
    level: 'success',
  },

  warning: {
    ...defaults,
    level: 'warning',
    duration: baseDuration * 3,
  },

  error: {
    ...defaults,
    level: 'error',
    duration: baseDuration * 4,
  },
};

export default toastConfig;
