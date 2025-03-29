"use client"

export default function postCard() {
  return (
    <div className=" m-5">  
      <div className="bg-base-100 shadow-sm">
        <figure>
          <img
            src="nature.jpg"
            alt="Movie"
            className="w-56 h-72"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New movie is released!</h2>
          <p>Click the button to watch on Jetflix app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </div>
  );
}
