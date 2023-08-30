import slugify from "slugify";
import React from "react";
import Input from "../components/form/Input";
import GoogleLogin from "../components/form/GoogleLogin";
import Button from "../components/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SigninValidationSchema } from "../utils/valdition";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
/* ====================================================== */

const Signin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(SigninValidationSchema),
    defaultValues: {
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
      <div className="w-full max-w-sm p-5 mx-auto bg-white rounded-md shadow-lg md:max-w-lg border-2 border-[#eee] dark:bg-Charcoal">
        <div className="w-[50px] h-[50px]">
          <img className="img-cover" src="/logo.png" alt="instagram-logo" />
        </div>

        <div className="my-5">
          <h1 className="text-3xl font-semibold">Sign in</h1>
          <small className="inline-block mt-2 font-medium">
            Or continue with...
          </small>
        </div>

        <GoogleLogin />

        <div className="w-full h-[1px] my-5 bg-text_3"></div>
        <form onSubmit={handleSubmit(Signup)} className="flex flex-col gap-3 ">
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

          <div className="text-sm font-medium">
            No account?{" "}
            <Link className="text-BlueForst hover:underline" to="/sign-up">
              Sign up
            </Link>
          </div>

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

export default Signin;
