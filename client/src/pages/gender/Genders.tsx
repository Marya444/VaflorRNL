import AddGenderForm from "../../components/forms/AddGenderForm"
import GenderTable from "../../tables/GenderTable";
import MainLayout from "./layout/MainLayout"
const Genders = () => {
    const content = (

    <>
    <div className="row">
        <div className="col-md-4">
            <AddGenderForm />
            </div>
        <div className="col-md 8">
         < GenderTable />
        </div>
    </div>
    </>

)
  return <MainLayout content={content} />;
}

export default Genders