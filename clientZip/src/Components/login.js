import React from 'react'

function login() {

    let num = 5;
    for(let i=1; i<=10; i++){
        let mul =  num*i
        return mul
    }
  return (

    <div>
      <h1> log in</h1>
      <h3>{mul}</h3>

    </div>
  )
}

export default login
