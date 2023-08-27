import slugify from "slugify";
import React from "react";
import Input from "../components/form/Input";
import GoogleLogin from "../components/form/GoogleLogin";
import Button from "../components/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SignupValidationSchema } from "../utils/valdition";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
/* ====================================================== */

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(SignupValidationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Handle user sign up
  const Signup = async (data) => {
    if (!isValid) return;
    try {
      createUserWithEmailAndPassword(auth, data.email, data.password);
      const currentUser = auth.currentUser;

      const userRef = collection(db, "users");
      await addDoc(userRef, {
        userId: currentUser.uid,
        slug: slugify(data.username, { lower: true }),
        photoURL: "https://i.imgur.com/2LDUDB6.jpeg",
        ...data,
      });

      reset({
        username: "",
        email: "",
        password: "",
      });

      toast.success("Welcome to instagram !", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
        pauseOnHover: false,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="w-full max-w-lg p-5 mx-auto rounded-md bg-Charcoal">
        <div className="w-[50px] h-[50px]">
          <img className="img-cover" src="/logo.png" alt="instagram-logo" />
        </div>

        <div className="my-5">
          <h1 className="text-3xl font-semibold">Sign up</h1>
          <small className="inline-block mt-2 font-medium">
            Or continue with...
          </small>
        </div>

        <GoogleLogin />

        <div className="w-full h-[1px] my-5 bg-text_3"></div>
        <form onSubmit={handleSubmit(Signup)} className="flex flex-col gap-3 ">
          <Input
            name="username"
            error={errors.username}
            register={register}
            placeholder="Enter your username..."
          />
          <Input
            type="email"
            name="email"
            error={errors.email}
            register={register}
            placeholder="Enter your email..."
          />
          <Input
            type="password"
            name="password"
            error={errors.password}
            register={register}
            placeholder="Enter your password..."
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Sign up
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
