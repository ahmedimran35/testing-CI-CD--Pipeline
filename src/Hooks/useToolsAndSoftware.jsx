import { useContext } from 'react';
import { CategoryToolsAndSoftwareContext } from '../Providers/ToolsAndSoftwareProvider';

// import { CategoryContext } from '../Providers/CategoryProvider';

const useToolsAndSoftwareCategory = () => {
    const categoryToolsAndSoftwareContextCall = useContext(CategoryToolsAndSoftwareContext);
    return categoryToolsAndSoftwareContextCall
};

export default useToolsAndSoftwareCategory;