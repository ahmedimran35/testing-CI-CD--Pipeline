/**
 * This component renders body part of a table where all users are shown to admin.
 *
 * @param {}
 * @returns {ReactNode} A React element that renders body of a table for all users.
 */
import PropTypes from "prop-types";
// import { MdDelete } from "react-icons/md";
import { tdStyle } from "../../../../constants/dashboardTableConstants";
const TableBody = ({ allUser }) => {
  return (
    <tbody>
      {allUser &&
        allUser?.data?.map((normaluser) => (
          <tr key={normaluser._id}>
            <td className={tdStyle}>{normaluser?.name}</td>
            <td className={tdStyle}>{normaluser?.username}</td>
            <td className={tdStyle}>{normaluser?.email}</td>
            <td
              className={`${tdStyle} font-bold ${
                normaluser?.role === "864910b487ac2b8247e708b993c929c8dc248f78c18afbcf89efab2f2ec99f47"
                  ? "text-[#ff0000]"
                  : normaluser?.role === "71e3fbabd25ad65e984a05f178e7e02564fae80001bf6acd89b1e4c96ad3c467"
                  ? "text-green-600"
                  : "text-blue-600"
              }`}
            >
              {normaluser?.role === "864910b487ac2b8247e708b993c929c8dc248f78c18afbcf89efab2f2ec99f47"
                  ? "Admin"
                  : normaluser?.role === "71e3fbabd25ad65e984a05f178e7e02564fae80001bf6acd89b1e4c96ad3c467"
                  ? "SEO"
                  : "User"}
            </td>

            {/* <td className={tdStyle}>
                <button className="font-bold bg-[#ff0000] text-white p-1 rounded-md">
                  <MdDelete className="md:text-xl lg:text-2xl" />
                </button>
              </td> */}
          </tr>
        ))}
    </tbody>
  );
};

TableBody.propTypes = {
  allUser: PropTypes.any,
};

export default TableBody;
