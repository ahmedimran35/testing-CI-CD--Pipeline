/**
 * This component renders a input field to take asset title in add asset form.
 *
 * @param {string} name The user's name.
 * @returns {ReactNode} input field for asset title using react hook form.
 */
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
const InputAssetTitle = ({ register, title, label }) => {
  return (
    <TextField
      size="small"
      className="w-full customTextField"
      {...register(`${title}`, {
        required: true,
        pattern: {
          value: /^[a-zA-Z\s:-]+$/g,
          message: `invalid ${title} format`,
        },
      })}
      id={`${title}`}
      label={label}
      InputLabelProps={{ shrink: true }}
      variant="outlined"
      sx={{
        fieldset: { borderColor: "#cbd5e1" },
      }}
    />
  );
};

InputAssetTitle.propTypes = {
  register: PropTypes.func,
  title: PropTypes.string,
  label: PropTypes.string
};

export default InputAssetTitle;
