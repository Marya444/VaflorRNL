const AddUserForm = () => {
  return (
    <>
      <div className="row">
        {/* Left Column */}
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              id="first_name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="middle_name">Middle Name</label>
            <input
              type="text"
              className="form-control"
              name="middle_name"
              id="middle_name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              id="last_name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="suffix_name">Suffix Name</label>
            <input
              type="text"
              className="form-control"
              name="suffix_name"
              id="suffix_name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="birth_date">Birth Date</label>
            <input
              type="date"
              className="form-control"
              name="birth_date"
              id="birth_date"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="gender">Gender</label>
            <select className="form-select" name="gender" id="birth_date">
              <option value=""></option>
            </select>
          </div>
        </div>

        {/* Right Column */}

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              id="address"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contact_number">Contact Number</label>
            <input
              type="text"
              className="form-control"
              name="contact_number"
              id="contact_number"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input
              type="password"
              className="form-control"
              name="password_confirmation"
              id="password_confirmation"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserForm;
