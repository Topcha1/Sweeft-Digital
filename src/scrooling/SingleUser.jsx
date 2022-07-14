import './style/SingleUser.css'
import Users from '../components/Users'
import Details from '../components/Details'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import History from '../components/History'


function SingleUserPage(props) {
  const { id } = useParams()
  const [userFriends, setUserFriends] = useState([])
  const [userHistory, setUserHistory] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [lastElement, setLastElement] = useState(null)

  const observerRef = useRef(
    new IntersectionObserver((elements) => {

      console.log('here')
      if (elements[0].isIntersecting) {
        setPageNumber((prev) => prev + 1)
      }
    }),
  )

  useEffect(() => {
    const currentObserver = observerRef.current
    if (lastElement) {
      currentObserver.observe(lastElement)
    }


    return () => {
      if (lastElement) {
        currentObserver.unobserve(lastElement)
      }
    }
  }, [lastElement])

  useEffect(() => {
    setUserFriends([]);
    setPageNumber(1)
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/1/20`,
    )
      .then((result) => result.json())
      .then((data) => {
        setUserFriends(data.list)
      })
  }, [id])

  useEffect(() => {
    if (pageNumber !== 1) {
      fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${pageNumber}/20`,
      )
        .then((result) => result.json())
        .then((data) => {
          setUserFriends((prev) => [...prev, ...data.list])
        })
    }
  }, [pageNumber])

  return (
    <div className="user-page-container">
      <Details setUserHistory={setUserHistory} />
      <History userHistory={userHistory} />
      <h2>Friends:</h2>
      <Users setLastElement={setLastElement} userList={userFriends} />
    </div>
  )
}

export default SingleUserPage
