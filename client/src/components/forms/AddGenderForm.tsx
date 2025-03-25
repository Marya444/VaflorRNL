const AddGenderForm = () => {
  return (
    <>
      <div className="formgroup">
        <div className="mb-3">
          <label htmlFor="gender">Genders</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            name="gender"
          />
        </div>
      </div>
    </>
  );
};

export default AddGenderForm;
