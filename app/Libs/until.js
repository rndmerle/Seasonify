// https://github.com/airbnb/enzyme/issues/539
/* istanbul ignore next */
export default function until(selector, { context } = this.options) {
  if (this.isEmptyRender() || typeof this.node.type === 'string') {
    return this;
  }

  const instance = this.instance();
  if (instance.getChildContext) {
    context = {
      ...context,
      ...instance.getChildContext(),
    };
  }

  return this.is(selector)
    ? this
    : this.shallow({ context })::until(selector, { context });
}
