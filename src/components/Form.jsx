import Autocomplete from "react-google-autocomplete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../utils/helpers";

const Form = ({ handleSubmitManager, setUser, user, setUserExists }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const existingUser = localStorage.getItem(user.email);
    if (existingUser) {
      setUserExists(true);
    } else {
      localStorage.setItem(user.email, JSON.stringify(data));
      setUser({
        name: data.name,
        surname: data.surname,
        email: data.email,
        country: data.country,
        city: data.city,
        house: data.house,
        code: data.code,
      });
      handleSubmitManager();
      reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form_wrapper">
          <div className="form_list">
            <div className="form_item">
              <div className="label">Name:</div>
              <input
                {...register("name", { required: true })}
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={user.name}
                className="inputItem"
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    name: e.target.value,
                  }));
                  setValue("name", e.target.value);
                  clearErrors("name");
                }}
              />
            </div>
            <div>
              {errors.name && (
                <span className="error">This field is required</span>
              )}
            </div>
          </div>
          <div className="form_list">
            <div className="form_item">
              <div className="label">Surname:</div>
              <input
                {...register("surname", { required: true })}
                type="text"
                name="surname"
                placeholder="Surname"
                value={user.surname}
                className="inputItem"
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    surname: e.target.value,
                  }));
                  clearErrors("surname");
                }}
              />
            </div>
            <div>
              {errors.surname && (
                <span className="error">This field is required</span>
              )}
            </div>
          </div>
          <div className="form_list">
            <div className="form_item">
              <div className="label">Email:</div>
              <input
                {...register("email", { required: true })}
                type="text"
                name="email"
                placeholder="Email"
                value={user.email}
                className="inputItem"
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    email: e.target.value,
                  }));
                  clearErrors("email");
                }}
              />
            </div>
            <div>
              {errors.email && (
                <span className="error">This field is required</span>
              )}
            </div>
          </div>
          <div className="address_wrapper">
            <div className="label">Address</div>
            <div>
              <div className="address_list">
                <div className="label">Country:</div>
                <Autocomplete
                  apiKey={import.meta.env.VITE_APP_GOOGLE_API_KEY}
                  {...register("country", { required: true })}
                  onPlaceSelected={(place) => {
                    const country = place.formatted_address;
                    setUser((prevUser) => ({
                      ...prevUser,
                      country: place.formatted_address,
                    }));
                    setValue("country", country);
                  }}
                  onBlur={(e) => {
                    const country = e.target.value;
                    setUser((prevUser) => ({
                      ...prevUser,
                      country,
                    }));
                    setValue("country", country);
                    clearErrors("country");
                  }}
                  placeholder="Country"
                  types={["(countries)"]}
                  language="en"
                  className="inputItem"
                />
              </div>
              <div>
                {errors.country && (
                  <span className="error">This field is required</span>
                )}
              </div>
            </div>
            <div>
              <div className="address_list">
                <div className="label">City:</div>
                <Autocomplete
                  apiKey={import.meta.env.VITE_APP_GOOGLE_API_KEY}
                  {...register("city", { required: true })}
                  onPlaceSelected={(place) => {
                    const city = place.address_components[0].long_name;
                    setUser((prevUser) => ({
                      ...prevUser,
                      city: place.address_components[0].long_name,
                    }));
                    setValue("city", city);
                  }}
                  onBlur={(e) => {
                    const city = e.target.value;
                    setUser((prevUser) => ({
                      ...prevUser,
                      city,
                    }));
                    setValue("city", city);
                    clearErrors("city");
                  }}
                  placeholder="City"
                  types={["(cities)"]}
                  language="en"
                  autoComplete="false"
                  className="inputItem"
                />
              </div>
              <div>
                {errors.city && (
                  <span className="error">This field is required</span>
                )}
              </div>
            </div>
            <div>
              <div className="address_list">
                <div className="label">Hosue:</div>
                <input
                  {...register("house", { required: true })}
                  type="text"
                  name="house"
                  placeholder="House"
                  value={user.house}
                  className="inputItem"
                  onChange={(e) => {
                    setUser((prevUser) => ({
                      ...prevUser,
                      house: e.target.value,
                    }));
                    clearErrors("house");
                  }}
                />
              </div>
              <div>
                {errors.house && (
                  <span className="error">This field is required</span>
                )}
              </div>
            </div>
            <div>
              <div className="address_list">
                <div className="label">Code:</div>
                <input
                  {...register("code", { required: true })}
                  type="text"
                  name="code"
                  placeholder="Code"
                  value={user.code}
                  className="inputItem"
                  onChange={(e) => {
                    setUser((prevUser) => ({
                      ...prevUser,
                      code: e.target.value,
                    }));
                    clearErrors("code");
                  }}
                />
              </div>
              <div>
                {errors.code && (
                  <span className="error">This field is required</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Form;
