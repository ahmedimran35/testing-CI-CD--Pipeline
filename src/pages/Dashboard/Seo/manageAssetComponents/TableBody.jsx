import PropTypes from "prop-types"
import { RiDeleteBin6Fill, RiEditBoxFill } from "react-icons/ri";
import { tdStyle } from "../../../../constants/dashboardTableConstants";

const TableBody = ({ allAsset, navigate, deleteAsset }) => {
    return (
      <tbody>
        {allAsset &&
          allAsset?.data?.map((asset) => (
            <tr key={asset._id}>
              <td className={tdStyle}>{asset.title}</td>
              <td className={tdStyle}>
                <img src={asset?.url} alt="apple" width={30} 
                // loading="lazy" 
                
                />
              </td>
              <td className={tdStyle}>{asset?.type}</td>
              <td className={tdStyle}>{asset?.finalDownload}</td>
              <td className={tdStyle}>{asset?.download}</td>
              <td className={tdStyle}>{asset?.click}</td>
              <td className={tdStyle}>{asset?.category}</td>
              <td className={tdStyle}>
                <div className="flex items-center justify-around  hover:cursor-pointer">
                  <div>
                    <RiEditBoxFill
                      onClick={() =>
                        navigate(`/cf44bf790dc91eba457118f0cafd54bb980ebaeab506e0dc72a32c3eb5dc6c02/e0786eb19d491474c19552fb6fd4a14438a8600fa21f1e94f27a71d9f20e2b40/${asset?._id}`)
                      }
                      className="text-xl transition-colors duration-300 hover:text-green-400"
                    />
                  </div>
                  <div onClick={() => deleteAsset(asset?._id)}>
                    <RiDeleteBin6Fill className="text-xl transition-colors duration-300 hover:text-[#ff0000]" />
                  </div>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    );
  };

TableBody.propTypes = {
  allAsset: PropTypes.any,
  deleteAsset: PropTypes.func,
  navigate: PropTypes.func
}

  export default TableBody;