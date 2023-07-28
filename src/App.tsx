function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[20%] bg-white rounded-3xl gap-5 p-5 shadow-lg flex flex-col">
        <img
          src="/image-qr-code.png"
          alt="qr-code"
          className="rounded-2xl"
        />
        <h1 className="text-2xl font-bold px-3 text-center">
          Improve your front-end skills by building projects
        </h1>
        <span className="text-center px-5 text-md leading-5 text-highlight mb-5">
          Scan the QR code to visit Frontend Mentor and take
          your coding skills to the next level
        </span>
      </div>
    </div>
  );
}

export default App;
