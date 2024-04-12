import { FormEvent, useRef, useState } from "react";
import CrossIcon from "../../../assets/icons/CrossIcon.svg";
import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon.svg";
import CheckIcon from "../../../assets/icons/CheckIcon.svg";
import { Formik, Field, Form, FormikErrors } from "formik";

interface FormValues {
  errorMessage: string;
  smokeOrNot: string;
  smokingTypes: [];
  readyToRestrict: string;
}

export const Select = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const selectRef = useRef<HTMLInputElement | null>(null);
  const formikRef = useRef(null);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        errorMessage: "",
        smokeOrNot: "",
        smokingTypes: [],
        readyToRestrict: "",
      }}
      validate={(values) => {
        const errors: FormikErrors<FormValues> = {};
        if (
          values.smokingTypes.length === 0 &&
          values.readyToRestrict.length === 0 &&
          values.smokeOrNot.length === 0
        ) {
          errors.errorMessage = "Виберіть хоча б один вид паління";
        }
        return errors;
      }}
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values, handleChange, setValues, errors }) => (
        <Form action="POST">
          <div className="custom-select">
            <div
              className={`cursor-pointer justify-between w-md-1 flex border ${"border-lightblue"} ${
                errors.errorMessage && "border-red-500"
              } rounded-t-md py-2`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Field
                className={`selected-value w-full text-base ml-3 ${
                  errors.errorMessage && "text-red-500"
                }`}
                required
                readOnly
                ref={selectRef}
                onChange={handleChange}
                value={
                  errors.errorMessage
                    ? errors.errorMessage
                    : `${values.smokeOrNot} ${values.smokingTypes.join(", ")}`
                }
              />
              {showDropdown ? (
                <img
                  src={CrossIcon}
                  alt={"close"}
                  className="mr-3"
                  onClick={() =>
                    setValues({
                      smokeOrNot: "",
                      smokingTypes: [],
                      readyToRestrict: "",
                      errorMessage: "",
                    })
                  }
                />
              ) : (
                <img
                  src={ArrowDownIcon}
                  onClick={() => setShowDropdown(true)}
                  alt={"open"}
                  className="mr-3"
                />
              )}
            </div>

            {showDropdown && (
              <ul className="select-dropdown border-t-2 border-darkblue bg-white shadow-md pl-3 pt-1 pb-2">
                <li>
                  <div className="flex items-end">
                    <Field
                      type="radio"
                      id="smokeOrNot"
                      name="smokeOrNot"
                      value="Палю"
                      className="mt-3 checked:bg-darkblue checked:ring-darkblue accent-darkblue border-darkblue bg-darkblue w-5 h-5"
                      onChange={(e: FormEvent<HTMLInputElement>) => {
                        handleChange(e);
                      }}
                    />
                    <label htmlFor="smoking" className="pl-2">
                      Палю
                    </label>
                  </div>
                  {values.smokeOrNot === "Палю" && (
                    <div className="mt-2">
                      <div className="flex flex-wrap w-[200px] justify-left text-left ml-7">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <div className="flex justify-center w-5 items-center">
                              <Field
                                type="checkbox"
                                placeholder="Цигарки"
                                value="Цигарки"
                                name="smokingTypes"
                                className="relative peer shrink-0
                            
                            appearance-none w-5 h-5 border-2 border-darkblue rounded-sm bg-white
                            mt-1
                            checked:bg-darkblue checked:border-0
                            focus:outline-none
                            "
                              />
                              <img
                                src={CheckIcon}
                                alt="icon"
                                className="invisible peer-checked:visible absolute 
                            w-[14px] h-[14px] mt-1
                            m-auto
                            hidden peer-checked:block
                            pointer-events-none"
                              />
                            </div>
                            <label>Цигарки</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex justify-center w-5 items-center">
                              <Field
                                type="checkbox"
                                placeholder="IQOS"
                                value="IQOS"
                                name="smokingTypes"
                                className="relative peer shrink-0
                            
                            appearance-none w-5 h-5 border-2 border-darkblue rounded-sm bg-white
                            mt-1
                            checked:bg-darkblue checked:border-0
                            focus:outline-none
                            "
                              />
                              <img
                                src={CheckIcon}
                                alt="icon"
                                className="invisible peer-checked:visible absolute 
                            w-[14px] h-[14px] mt-1
                            m-auto
                            hidden peer-checked:block
                            pointer-events-none"
                              />
                            </div>
                            <label>IQOS</label>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 justify-center ml-6">
                          <div className="flex  items-center gap-2">
                            <div className="flex justify-center w-5 items-center">
                              <Field
                                type="checkbox"
                                placeholder="Вейп"
                                value="Вейп"
                                name="smokingTypes"
                                className="relative peer shrink-0
                            
                            appearance-none w-5 h-5 border-2 border-darkblue rounded-sm bg-white
                            mt-1
                            checked:bg-darkblue checked:border-0
                            focus:outline-none
                            "
                              />
                              <img
                                src={CheckIcon}
                                alt="icon"
                                className="invisible peer-checked:visible absolute 
                            w-[14px] h-[14px] mt-1
                            m-auto
                            hidden peer-checked:block
                            pointer-events-none"
                              />
                            </div>
                            <label>Вейп</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex justify-center w-5 items-center">
                              <Field
                                type="checkbox"
                                placeholder="Тютюн"
                                value="Тютюн"
                                name="smokingTypes"
                                className="relative peer shrink-0
                            
                            appearance-none w-5 h-5 border-2 border-darkblue rounded-sm bg-white
                            mt-1
                            checked:bg-darkblue checked:border-0
                            focus:outline-none
                            "
                              />
                              <img
                                src={CheckIcon}
                                alt="icon"
                                className="invisible peer-checked:visible absolute 
                            w-[14px] h-[14px] mt-1
                            m-auto
                            hidden peer-checked:block
                            pointer-events-none"
                              />
                            </div>
                            <label>Тютюн</label>
                          </div>
                        </div>
                      </div>
                      <div className="ml-10 mt-2">
                        <span className="text-deepblue">
                          Готовий обмежитись?
                        </span>
                        <ul>
                          <li>
                            <Field
                              type="radio"
                              id="ready-to-restrict"
                              name="readyToRestrict"
                              value="Ні"
                              className="mt-3 checked:bg-darkblue mr-2 checked:ring-darkblue accent-darkblue border-darkblue bg-darkblue w-5 h-5"
                            />
                            <label htmlFor="smoking">Ні</label>
                          </li>
                          <li>
                            <Field
                              type="radio"
                              id="ready-to-restrict"
                              name="readyToRestrict"
                              value="Тільки на балконі"
                              className="mt-3 checked:bg-darkblue mr-2 checked:ring-darkblue accent-darkblue border-darkblue bg-darkblue w-5 h-5"
                            />
                            <label htmlFor="smoking">Тільки на балконі</label>
                          </li>
                          <li>
                            <Field
                              type="radio"
                              id="ready-to-restrict"
                              name="readyToRestrict"
                              value="Не в квартирі"
                              className="mt-3 checked:bg-darkblue mr-2 checked:ring-darkblue accent-darkblue border-darkblue bg-darkblue w-5 h-5"
                            />
                            <label htmlFor="smoking">Не в квартирі</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
                <li>
                  <Field
                    type="radio"
                    id="not-smoking"
                    name="smokeOrNot"
                    value="Не курящі"
                    className="mt-3 checked:bg-darkblue checked:ring-darkblue accent-darkblue border-darkblue bg-darkblue w-5 h-5"
                    onChange={(e: FormEvent<HTMLInputElement>) => {
                      values.smokingTypes = [];
                      values.readyToRestrict = "";
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="not-smoking" className="pl-2">
                    Не палю
                  </label>
                </li>
              </ul>
            )}
          </div>
          <button type="submit">Відправити</button>
        </Form>
      )}
    </Formik>
  );
};
