import React from 'react'

const Comment = ({comment}) => {
  return (
    <div>
    <div className='border'>
        <p>{comment.content}</p>
    </div>
    <small>Written By: {comment.author.email}</small>
    </div>
  )
}

export default Comment