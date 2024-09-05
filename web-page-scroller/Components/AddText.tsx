import React from 'react'

const AddText = ({cardRef, text, tags}) => {
  return (
    <div
      className=" flex flex-col items-center justify-center shadow-lg rounded-xl p-2 w-64 bg-white overflow-hidden"
      ref={cardRef}
    >
      <div className=" flex items-center justify-center w-fit h-96 p-5  leading-relaxed  relative  rounded-xl text-3xl ">
        {text}
      </div>
      <div className=" flex jusitfy-start w-full rounded-b-xl p-4 p-l-2">
        {tags}
      </div>
    </div>
  )
}

export default AddText
