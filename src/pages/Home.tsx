import Logo from "../images/Logo.png";

function Home() {
  return (
    <div className="w-full h-screen bg-primary flex flex-col">
      <div>
        <img src={Logo} alt="" className="m-auto w-md" />
      </div>
      <div className="bg-secondary h-full"></div>
    </div>
  );
}

export default Home;
