import Card from './Card'
import './style/Users.css'


function Users(props) {
  return (
    <div className="users-container">
      {props.userList.map((user, index) => {
        const query = `?q=${user.id}`

        if (props.userList.length - 1 === index) {
          return (
            <div key={user.id} ref={props.setLastElement}>
              <Card
                id={user.id}
                fullName={`${user.prefix} ${user.name} ${user.lastName}`}
                title={user.title}
                imgUrl={user.imageUrl + query}
              />
            </div>
          )
        }
        return (
          <Card
            key={user.id}
            id={user.id}
            fullName={`${user.prefix} ${user.name} ${user.lastName}`}
            title={user.title}
            imgUrl={user.imageUrl + query}
          />
        )
      })}
    </div>
  )
}

export default Users
