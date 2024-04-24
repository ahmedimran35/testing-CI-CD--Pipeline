import { useForm, useFormContext, Controller } from "react-hook-form";



// eslint-disable-next-line react/prop-types
const AssetInputField = ({ assetTitle, id, label, placeholder, type }) => {
    // const { register } = useForm();
    const {
        control,
        formState: { errors },
    } = useFormContext();


    return (
        <div className="relative my-3">
            <Controller name={name}
                control={control}
                render={({ field }) => {
                    <input
                        {...field}
                        id={id}
                        label={label}
                        placeholder={placeholder}
                        type={type}
                        autoFocus={true}
                        className={inputClass}
                    />
                }
                }


            ></Controller>
            {/* <input
                id={assetTitle}
                name={assetTitle}
                {...register(assetTitle, { required: true })}
                type="text"
                placeholder="Asset Title"
                className={inputClass}
            />
            <label className={labelClass}>Asset Title</label> */}
        </div >
    );
};


const inputClass =
    "peer relative h-10 w-[170px] md:w-[250px] lg:w-[350px] rounded border border-slate-300 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#ff0000] focus:outline-none";

const labelClass =
    "absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500  peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#ff0000] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent";
export default AssetInputField;