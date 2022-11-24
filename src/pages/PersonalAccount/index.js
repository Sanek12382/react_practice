import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useFetch } from "../../CustomHooks/useFetch";
import { editUser } from "../../api/userServises";
import {useFormik} from "formik";

export const PersonalAccount = () => {
  const { firstName, lastName, img, age, nickName } = useContext(UserContext);
  const [isEdit, setIsEdit] = useState(false);
  const [changeData, setChangeData] = useState({
    firstName: firstName,
    lastName: lastName,
    age: age,
    img: img,
    nickName: nickName,
  });

  const [data, fetchFunc] = useFetch(editUser);

  const handleEditData = () => {
    setIsEdit(!isEdit);
  };


  useEffect(() => {
    if (data) {
      setChangeData(data);
      setIsEdit(false);
    }
  }, [data]);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      age: '',
      img: '',
      nickName:'',
    },

    onSubmit: values => {
    setChangeData(values);
      fetchFunc("user", 1, values);
    },
  });
  return (
    <div>
      <button onClick={handleEditData}>Edit</button>


      <h1>
        {changeData.firstName} - {changeData.lastName} - возраст:{" "}
        {changeData.age}

      </h1>
      {isEdit && (
        <>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
            />

            <label htmlFor="age">Age</label>
            <input
                id="age"
                name="age"
                type="age"
                onChange={formik.handleChange}
                value={formik.values.age}
            />
            <label htmlFor="img">Image for profile</label>
            <input
                id="img"
                name="img"
                type="img"
                onChange={formik.handleChange}
                value={formik.values.img}
            />
            <label htmlFor="nickName">Nickname</label>
            <input
                id="nickName"
                name="nickName"
                type="nickName"
                onChange={formik.handleChange}
                value={formik.values.nickName}
            />

            <button type="submit">Submit</button>
          </form>
        </>
      )}
      <p style={{fontSize:25, fontStyle:"bold"}}>{changeData.nickName}</p>

      <figure>
        <img width="300" height="300" src={changeData.img} alt="Картинка" />
      </figure>
    </div>
  );
};
