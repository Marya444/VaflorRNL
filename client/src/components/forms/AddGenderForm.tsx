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
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            SAVE
          </button>
        </div>
      </div>
    </>
  );
};

export default AddGenderForm;
