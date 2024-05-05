"use client";
import { fetchCities, fetchDistricts, fetchWards } from "@/actions/address";
import { getProfile, updateProfile } from "@/actions/auth";
import Button from "@/components/Button";
import LoadingSection from "@/components/Layout/LoadingSection";
import FormIpt from "@/components/FormIpt";
import { IUser } from "@/types";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specific_address: string;
  city: string;
  district: string;
  ward: string;
}
interface IFormInfo {
  userInfo: IUser | null;
}
interface IAddressData {
  cities: any[];
  districts: any[];
  wards: any[];
}
const FormInfo = ({ userInfo }: IFormInfo) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [formSubmiting, setFormSubmiting] = useState<boolean>(false);
  // const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [addressData, setAddressData] = useState<IAddressData | null>(null);
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  // Fetch exist user information
  useEffect(() => {
    // Set formik fields values based on userInfo state
    if (userInfo) {
      if (userInfo.city && userInfo.district && userInfo.ward) {
        console.log("co address");
        const userCity = addressData?.cities.find(
          (item: any) => item.name === userInfo.city
        );
        const userDistrict = addressData?.districts.find(
          (item: any) =>
            item.name === userInfo.district &&
            item.idProvince === userCity?.idProvince
        );
        const userWard = addressData?.wards.find(
          (item: any) =>
            item.name === userInfo.ward &&
            item.idDistrict === userDistrict?.idDistrict
        );
        if (userCity && userDistrict && userWard) {
          setSelectedCity(userCity.idProvince);
          setSelectedDistrict(userDistrict.idDistrict);
          setSelectedWard(userWard.idCommune);
          formik.setValues({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            phone: userInfo.phone,
            specific_address: userInfo.specific_address,
            city: userCity.idProvince,
            district: userDistrict.idDistrict,
            ward: userWard.idCommune,
          });
        }
      } else {
        formik.setValues({
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          phone: userInfo.phone,
          specific_address: userInfo.specific_address,
          city: "",
          district: "",
          ward: "",
        });
      }
    }
  }, [userInfo, addressData]);

  useEffect(() => {
    const fetchData = async () => {
      const cities = await fetchCities();
      const districts = await fetchDistricts();
      const wards = await fetchWards();
      setAddressData({
        cities,
        districts,
        wards,
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setWards([]);
    setDistricts([]);
    if (addressData) {
      const filtedData: any[] = addressData.districts.filter(
        (item: any) => item.idProvince === selectedCity
      );
      setDistricts(filtedData);
    }
  }, [selectedCity, addressData]);

  useEffect(() => {
    console.log(selectedDistrict);

    if (addressData) {
      const filtedData = addressData.wards.filter(
        (item: any) => item.idDistrict === selectedDistrict
      );
      setWards(filtedData);
    }
  }, [selectedDistrict, addressData]);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specific_address: "",
    city: "",
    district: "",
    ward: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    specific_address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    district: Yup.string().required("Required"),
    ward: Yup.string().required("Required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: IForm) => {
      try {
        setLoading(true);
        const cityName = addressData?.cities.find(
          (city: any) => city.idProvince === values.city
        ) as any;
        const districtName = addressData?.districts.find(
          (district: any) => district.idDistrict === values.district
        ) as any;
        const wardName = addressData?.wards.find(
          (ward: any) => ward.idCommune === values.ward
        ) as any;

        const formData = {
          ...values,
          city: cityName?.name,
          district: districtName?.name,
          ward: wardName?.name,
        };
        const data = await updateProfile(formData);
        if (data.message === "success") {
          toast.success("Update profile successfully");
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Update profile failed");
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <div className="relative mt-8">
      {loading && <LoadingSection className="z-20 !w-[calc(100%+64px)] !h-[calc(100%+64px)] -translate-x-[32px] -translate-y-[32px]" />}
      <form onSubmit={formik.handleSubmit} className="flex flex-wrap gap-8">
        <div className="w-[calc(50%-16px)] relative">
          {formSubmiting && formik.errors.firstName && (
            <small className="px-2 text-[12px] text-red-600 absolute left-0 bottom-0 translate-y-full">
              {formik.errors.firstName}
            </small>
          )}
          <FormIpt
            id="firstName"
            name="firstName"
            placeholder="First name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
        </div>
        <div className="w-[calc(50%-16px)] relative">
          {formSubmiting && formik.errors.lastName && (
            <small className="px-2 text-[12px] text-red-600 absolute left-0 bottom-0 translate-y-full">
              {formik.errors.lastName}
            </small>
          )}
          <FormIpt
            id="lastName"
            name="lastName"
            placeholder="Last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
        </div>
        <div className="w-[calc(50%-16px)] relative">
          {formSubmiting && formik.errors.email && (
            <small className="px-2 text-[12px] text-red-600 absolute left-0 bottom-0 translate-y-full">
              {formik.errors.email}
            </small>
          )}
          <FormIpt
            id="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div className="w-[calc(50%-16px)] relative">
          {formSubmiting && formik.errors.phone && (
            <small className="px-2 text-[12px] text-red-600 absolute left-0 bottom-0 translate-y-full">
              {formik.errors.phone}
            </small>
          )}
          <FormIpt
            id="phone"
            name="phone"
            placeholder="Number phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
        </div>
        <div className="w-full relative">
          {formSubmiting && formik.errors.specific_address && (
            <small className="px-2 text-[12px] text-red-600 absolute left-0 bottom-0 translate-y-full">
              {formik.errors.specific_address}
            </small>
          )}
          <FormIpt
            id="specific_address"
            name="specific_address"
            placeholder="Address"
            value={formik.values.specific_address}
            onChange={formik.handleChange}
          />
        </div>
        <div className="w-[calc(100%/3-64px/3)] relative">
          {formSubmiting && formik.errors.city && (
            <small className="px-2 text-[12px] text-red-600 absolute left-0 bottom-0 translate-y-full">
              {formik.errors.city}
            </small>
          )}
          <select
            value={formik.values.city || ""}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              formik.setFieldValue("city", e.target.value);
            }}
            name="city"
            id="city"
            className="w-full h-[60px] bg-transparent outline-none border-cs_primary_yellow border-[1px] rounded-xl px-2"
          >
            <option value="">Select city</option>
            {addressData?.cities.map((city: any, index: number) => (
              <option
                key={index}
                className="text-black"
                value={city.idProvince}
              >
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[calc(100%/3-64px/3)] relative">
          {formSubmiting && formik.errors.district && (
            <small className="px-2 text-[12px] text-red-600 absolute left-0 bottom-0 translate-y-full">
              {formik.errors.district}
            </small>
          )}
          <select
            value={formik.values.district || ""}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              formik.setFieldValue("district", e.target.value);
            }}
            name="district"
            id="district"
            className="w-full h-[60px] bg-transparent outline-none border-cs_primary_yellow border-[1px] rounded-xl px-2"
          >
            <option value="">Select district</option>
            {districts.map((district: any, index: number) => (
              <option
                key={index}
                className="text-black"
                value={district.idDistrict}
              >
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[calc(100%/3-64px/3)] relative">
          {formSubmiting && formik.errors.ward && (
            <small className="px-2 text-[12px] text-red-600 absolute left-0 bottom-0 translate-y-full">
              {formik.errors.ward}
            </small>
          )}
          <select
            value={formik.values.ward || ""}
            onChange={(e) => {
              setSelectedWard(e.target.value);
              formik.setFieldValue("ward", e.target.value);
            }}
            name="ward"
            id="ward"
            className="w-full h-[60px] bg-transparent outline-none border-cs_primary_yellow border-[1px] rounded-xl px-2"
          >
            <option value="">Select ward</option>
            {wards.map((ward: any, index: number) => (
              <option key={index} className="text-black" value={ward.idCommune}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>
        <Button
          onClick={() => setFormSubmiting(true)}
          className="mx-auto"
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default FormInfo;
