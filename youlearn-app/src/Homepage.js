import React from 'react'
function Homepage ({user}) {

    return (
        <div>
            <h1>Welcome{user.usename}</h1>
            <h3>email : {user.email}, role : {user.role}</h3>
        </div>
    )

}

export default Homepage;