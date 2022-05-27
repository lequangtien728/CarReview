import tokenService from './tokenService';

const BASE_URL = '/api/comments';

export function create(comment,id) {console.log(comment)
    return fetch(`${BASE_URL}/${id}`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken(),
        'Content-Type': 'application/json'
      }
    
    }).then(res => {
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
    })
  }

  // export function getAll() {
  //   return fetch(BASE_URL, {
  //     headers: {
  //       'Authorization': 'Bearer ' + tokenService.getToken()
  //     }
  //   })
  //   .then(res => {
  //     if(res.ok) return res.json();
  //     throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
  //   })
  // }