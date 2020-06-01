
export default (res = {}) => res?.errors ? res.errors[0] : undefined
