import React from 'react';
import UserComponent from '../../components/common_components/UserComponent';
import PageHeading from '../../components/common_components/PageHeading';

const Homepage = () => {
  return (
    <div className=''>
        <UserComponent />
       <PageHeading pageTitle = "Homepage" />
      <div className='container mt-5 mb-5'>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum animi praesentium amet doloribus laborum expedita provident odit aliquam ipsum! Quasi nobis molestiae error nisi pariatur quaerat ex optio quos nesciunt!</p>
      </div>
    </div>
  )
}

export default Homepage
