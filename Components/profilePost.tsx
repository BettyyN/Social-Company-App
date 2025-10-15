

function profilePost({ }) {
  return (
    <div className="flex flex-col shadow-4xl shadow-indigo-600 h-80">
      <div className="w-full rounded-full pt-5 pl-5 ">
        <span className="flex gap-1">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="rounded-full w-14 h-14"
          />
          <span className="flex flex-col text-sm pt-2">
            <h2>User Name</h2>
            <h3 className="pl-2">2017/2/12</h3>
          </span>
        </span>
      </div>
      <div className="flex md:flex-row flex-col px-10">
        <div className="p-5 md:w-1/3  w-full">
          <figure>
            <img src="nature.jpg" alt="Movie" className="h-48 w-full" />
          </figure>
        </div>
        <div className="px-3 pt-4 md:w-2/3 full">
          <h2 className="">New movie is released!</h2>
          <p>
            Click the button to watch on Jetflix app.Click the button to watch
            on Jetflix app Click the button to watch on Jetflix app Click the
            button to watch on Jetflix app Click the button to watch on Jetflix
            app Click the button to watch on Jetflix app Click the button to
            watch on Jetflix app Click the button to watch on Jetflix app Click
            the button to watch on Jetflix app Click the button to watch on
            Jetflix app Click the button to watch on Jetflix app Click the
            button to watch on Jetflix app
          </p>
          <div className=" justify-end">
            <button className="bg-primary">Watch</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profilePost