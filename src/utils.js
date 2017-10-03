export const getActiveFilter = state => {
  const activeFilter = state.filters.filter(f => f.active)[0];
  return activeFilter ? activeFilter.type : null;
}

export const filterNotNullParams = params => Object.keys(params)
  .reduce((res, par) => params[par] ? { ...res, [par]: params[par] } : res, {});

export const concatUrlParams = params => Object.keys(params)
  .map(param => params[param] ? encodeURIComponent(param) + '=' + encodeURIComponent(params[param]) : null)
  .filter(p => Boolean(p))
  .join('&');
