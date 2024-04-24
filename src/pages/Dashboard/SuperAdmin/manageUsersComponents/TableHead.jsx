/**
 * This component renders  head part of a table where all users are shown to admin.
 *
 * @param {}
 * @returns {ReactNode} A React element that renders head of a table for all users.
 */

import { tableHeadingsStyle } from "../../../../constants/dashboardTableConstants";

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th scope="col" className={` ${tableHeadingsStyle}  rounded-tl-lg`}>
          Name
        </th>
        <th scope="col" className={tableHeadingsStyle}>
          UserName
        </th>
        <th scope="col" className={tableHeadingsStyle}>
          Email
        </th>
        <th scope="col" className={tableHeadingsStyle}>
          Role
        </th>
        {/* <th scope="col" className={` ${tableHeadingsStyle}  rounded-tr-lg`}>
          Action
        </th> */}
      </tr>
    </thead>
  );
};

export default TableHead;
