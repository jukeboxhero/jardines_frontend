export function request(endpoint, method='get') {
  return fetch(`/api/v1/${endpoint}`, {
  	headers: new Headers({
  		'access-token': localStorage['access-token'],
  		'client': localStorage['client'],
  		'expiry': localStorage['expiry'],
  		'uid': localStorage['uid']
  	})
  })
}

export function get(endpoint) {
	return request(endpoint, 'get');
}
export function post(endpoint) {
	return request(endpoint, 'post');
}
export function put(endpoint) {
	return request(endpoint, 'put');
}
export function del(endpoint) {
	return request(endpoint, 'delete');
}