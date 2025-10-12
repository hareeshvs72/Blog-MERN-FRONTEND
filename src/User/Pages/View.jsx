import React from 'react'
import Header from '../Components/Header'

function View() {
  return (
    <>
      <Header />
      <div className="md:p-10 flex flex-wrap gap-10">
        {/* Image Section */}
        <div className="md:min-w-[500px] w-full md:w-[500px]">
          <img
            src="/thumb.png"
            alt="blog image"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-[300px]">
          <div>
              <h1 className='text-2xl font-bold my-2'>Title</h1>
              <h3 className='text-xl font-bold my-2'>Sub title</h3>
             
           </div>
        </div>
        <div>
           <p className='font-semibold text-justify'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum aliquid quaerat labore quod illo tempore nobis aperiam culpa sequi voluptatum veniam reiciendis, velit tempora rerum vel alias quidem! Nam, odit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum rem, doloremque fugit sint quas architecto iste quae quibusdam laborum soluta quis repudiandae voluptatum iusto unde quam labore ullam qui ea repellendus earum blanditiis eos reprehenderit quaerat cupiditate! Dicta, cupiditate error. Sunt deserunt repudiandae minima placeat voluptatem voluptates, libero nihil et voluptas quas animi est enim culpa necessitatibus ipsa excepturi? Ea, itaque odit id, laborum voluptate ab consectetur, quia corporis magnam consequatur necessitatibus officia doloremque accusamus veritatis quaerat impedit iste dolorem! Quia, necessitatibus maiores molestias eveniet dicta, soluta saepe ratione similique recusandae voluptatem aspernatur quisquam nobis voluptate quam rem accusamus ullam, magnam beatae repellat laboriosam. Blanditiis a ad ipsam dolores! Officiis ipsum iste velit voluptatum. Nobis exercitationem, obcaecati, saepe aut corporis aspernatur ipsam nam excepturi explicabo tempora unde sequi officia quidem velit commodi sed assumenda fugit sunt ipsa vel maxime, fuga asperiores voluptate accusantium. Quis ex fuga quia optio expedita quaerat, ipsum veritatis ipsam, nesciunt adipisci veniam deleniti similique eveniet consectetur quas soluta quod nam doloremque voluptatum maxime, enim dignissimos. Ducimus accusamus maxime, tenetur eos fugit perferendis repellat nihil porro numquam, possimus exercitationem nemo quidem reiciendis sed distinctio sint ut quisquam, sunt deserunt et cupiditate labore? Itaque facilis quae quasi repellat.</p>
        </div>
      </div>
      
    </>
  )
}

export default View
