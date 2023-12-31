// 로컬스토리지에 있는 토큰을 가져옴
function getTokenFromLocalStorage(tokenName) {
    return localStorage.getItem(tokenName);
}
  
export function Token(){

    const accessToken = getTokenFromLocalStorage('access_token');
    const csrfToken = getTokenFromLocalStorage('csrf_token');

    const headers = {
        'content-type': 'application/json',
        Authorization : `Bearer ${accessToken}`,
        'X-CSRF-Token' : csrfToken
    };

    return headers
}