export const getActiveFilter = state => {
  const activeFilter = state.filters.filter(f => f.active)[0];
  return activeFilter ? activeFilter.id : null;
}

export const concatUrlParams = params => Object.keys(params)
  .map(param => encodeURIComponent(param) + '=' + encodeURIComponent(params[param]))
  .join('&');
