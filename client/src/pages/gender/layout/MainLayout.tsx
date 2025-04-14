import Navbar from "../../../components/Navbar";

interface MainLayoutProps {
  content: React.ReactNode;
}

const MainLayout = ({ content }: MainLayoutProps) => {
  return (
    <>
      <div className="container-fluid">
        <Navbar />
      </div>

      <div>{content}</div>
    </>
  );
};

export default MainLayout;
