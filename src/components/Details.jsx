import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import './style/Details.css'


function Details(props) {
  const { id } = useParams()
  const [userInfoData, setUserInfoData] = useState({})
  const [userAddressData, setUserAddressData] = useState({})

  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`,
    )
      .then((result) => {
        return result.json()
      })
      .then((data) => {
        const fullName = `${data.prefix} ${data.name} ${data.lastName}`

        props.setUserHistory((previous) => {
          if (previous.some((user) => user.id === id)) {
            return previous
          }
          return [...previous, { fullName, id }]
        })

        const userInfo = {
          image: `${data.imageUrl}?q=${id}`,
          fullName,
          title: data.title,
          email: data.email,
          ipAddress: data.ip,
          jobArea: data.jobArea,
          jobType: data.jobType,
        }

        const userAddress = {
          companyName: data.company.name,
          city: data.address.city,
          country: data.address.country,
          state: data.address.state,
          streetAddress: data.address.streetAddress,
          zip: data.address.zipCode,
        }

        setUserInfoData(userInfo)
        setUserAddressData(userAddress)
      })

  }, [id])

  return (
    <div className="user-details">
      <div className="image-container">
        <img className="user-image" alt="" src={userInfoData.image} />
      </div>

      <fieldset className="info">
        <legend>Info</legend>
          <strong>{userInfoData.fullName}</strong>       
          <i>{userInfoData.title}</i>       
        <br />       
          <span>Email</span>: {userInfoData.email}       
          <span>Ip Address</span>: {userInfoData.ipAddress}     
          <span>Job Area</span>: {userInfoData.jobArea}       
          <span>Job Type</span>: {userInfoData.jobType}       
      </fieldset>
      <fieldset className="address">
        <legend>Address</legend>        
          <strong>{userAddressData.companyName}</strong>
          <span>City</span>: {userAddressData.city}
          <span>Country</span>: {userAddressData.country}       
          <span>State</span>: {userAddressData.state}      
          <span>Street Address</span>: {userAddressData.streetAddress}       
          <span>ZIP</span>: {userAddressData.zip}      
      </fieldset>
    </div>
  )
}

export default Details
